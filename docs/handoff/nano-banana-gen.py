#!/usr/bin/env python
"""Batch image generator for the Develop/Differentiate/Derail illustrations.
Reads a JSON list of jobs: [{"id","prompt","aspect","out"}], generates each with
Nano Banana Pro (gemini-3-pro-image), writes PNG bytes to `out`.

Usage: python gen.py spec.json
"""
import json, os, re, sys

KEY = None
envp = os.path.expanduser("~/.config/lloyd-gemini-email/lloyd.env")
with open(envp) as f:
    for line in f:
        m = re.match(r"^GEMINI_API_KEY\s*=\s*(.+)$", line.strip())
        if m:
            KEY = m.group(1).strip().strip('"').strip("'")
            break
if not KEY:
    print("NO KEY", file=sys.stderr); sys.exit(2)

from google import genai
from google.genai import types

client = genai.Client(api_key=KEY)
MODEL = "gemini-3-pro-image"

STYLE = (
    "Professional scientific illustration in a refined editorial textbook style, like a high-end "
    "developmental-biology figure. Mixed-media digital painting with clean vector-style labels. "
    "It is NOT a cartoon, NOT clip art, NOT a photograph. "
    "Palette: deep charcoal-navy background, structures rendered in muted teal and slate blue, "
    "cell nuclei in soft luminous cyan, key highlighted features in warm gold and emerald green, "
    "a gentle glow, restrained and elegant with generous negative space. "
    "Labels: small clean sans-serif text connected by thin elegant leader lines. "
    "Spell every label EXACTLY as listed and use ONLY those exact words, correctly spelled. "
    "No other text anywhere, no paragraphs, no sentences, no numbers, no watermark, no signature. "
    "Keep each label to 1 to 3 words. "
    "Composition: one clear, scientifically accurate focal subject, no invented structures, "
    "a thin subtle frame at the border only, the center uncluttered and readable. "
    "Do not use any dashes in the text."
)

def gen(prompt, aspect, out):
    full = STYLE + "\n\nSUBJECT: " + prompt
    cfg = None
    try:
        cfg = types.GenerateContentConfig(
            response_modalities=["IMAGE"],
            image_config=types.ImageConfig(aspect_ratio=aspect),
        )
    except Exception as e:
        print("  aspect cfg failed, using default:", e)
        cfg = types.GenerateContentConfig(response_modalities=["IMAGE"])
    resp = client.models.generate_content(model=MODEL, contents=full, config=cfg)
    if not resp.candidates:
        print(f"  BLOCKED {out}: no candidates. feedback=", getattr(resp, 'prompt_feedback', None))
        return
    wrote = False
    for part in resp.candidates[0].content.parts:
        if getattr(part, "inline_data", None) and part.inline_data.data:
            with open(out, "wb") as fh:
                fh.write(part.inline_data.data)
            wrote = True
            print(f"  OK {out}  {len(part.inline_data.data)//1024} KB")
            break
    if not wrote:
        print(f"  FAIL {out}: no image part. text=", getattr(resp.candidates[0].content.parts[0], 'text', '')[:200])

def main():
    spec = json.load(open(sys.argv[1]))
    for job in spec:
        print(f"[{job['id']}] {job['aspect']} -> {job['out']}")
        os.makedirs(os.path.dirname(job["out"]), exist_ok=True)
        try:
            gen(job["prompt"], job["aspect"], job["out"])
        except Exception as e:
            print(f"  ERROR {job['id']}: {e}")

if __name__ == "__main__":
    main()
