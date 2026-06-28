import { CHARACTERS, ONBOARDING } from '../content/story'
import { STARTING_BUDGET } from '../content/resources'
import { EmbryoFace } from './art/SciArt'
import { CharacterAvatar } from './art/Avatars'
import { Seal } from './Seal'

const mono = "'IBM Plex Mono'"

/** The "Day One" welcome, role, goal, how it works, and that wrong answers are
 *  safe, shown once before Stage 0. Fixes the unanimous "no onboarding" finding. */
export default function Onboarding({ onStart }: { onStart: () => void }) {
  return (
    <main style={{ position: 'relative', zIndex: 2, flex: 1, overflowY: 'auto' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '28px 22px 40px' }}>
        <div className="stage-enter" style={{ border: '1px solid var(--line)', borderRadius: 18, background: 'var(--panel)', overflow: 'hidden' }}>
          <div style={{ background: 'color-mix(in srgb, var(--accent) 7%, var(--bg2))', borderBottom: '1px solid var(--line)', padding: '14px 22px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.16em', color: 'var(--accent)' }}>{ONBOARDING.kicker}</div>
              <Seal kind="pathway" size={46} />
            </div>
            <EmbryoFace height={210} />
          </div>

          <div style={{ padding: '20px 24px 24px' }}>
            {/* The Baby Mateo intro film, embedded as the case introduction. Click
                to play (narrated + captioned); preload metadata only so it does not
                pull the file until a student chooses to watch. */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', color: 'var(--accent)', marginBottom: 8 }}>▶ WATCH FIRST · THE BABY MATEO STORY</div>
              <video
                controls
                playsInline
                preload="metadata"
                poster="/intro/baby-mateo-intro-poster.jpg"
                style={{ width: '100%', display: 'block', borderRadius: 12, border: '1px solid var(--line)', background: '#000', aspectRatio: '16 / 9' }}
              >
                <source src="/intro/baby-mateo-intro.mp4" type="video/mp4" />
                <a href="/intro/baby-mateo-intro.mp4" style={{ color: 'var(--accent)' }}>Download the intro video</a> (your browser cannot play it inline).
              </video>
            </div>

            <h1 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 30, lineHeight: 1.12, marginBottom: 14 }}>{ONBOARDING.title}</h1>

            <p style={{ color: 'var(--text)', lineHeight: 1.6, fontSize: 15.5, marginBottom: 12 }}>{ONBOARDING.role}</p>

            <p style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: 14, marginBottom: 14 }}>{ONBOARDING.foundation}</p>

            <div style={{ borderLeft: '2px solid var(--accent)', padding: '4px 0 4px 16px', marginBottom: 18 }}>
              <p style={{ color: 'var(--text)', lineHeight: 1.6, fontSize: 15.5 }}>{ONBOARDING.goal}</p>
            </div>

            {/* how it works + safety, as two clear chips */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
              <div style={{ flex: 1, minWidth: 220, border: '1px solid var(--line)', borderRadius: 12, background: 'var(--panel2)', padding: '12px 14px' }}>
                <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', color: 'var(--muted)', marginBottom: 5 }}>HOW IT WORKS</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--text)' }}>{ONBOARDING.mechanics}</div>
              </div>
              <div style={{ flex: 1, minWidth: 220, border: '1px solid color-mix(in srgb, var(--c-green) 40%, var(--line))', borderRadius: 12, background: 'color-mix(in srgb, var(--c-green) 8%, var(--panel2))', padding: '12px 14px' }}>
                <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', color: 'var(--c-green)', marginBottom: 5 }}>NO PRESSURE</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--text)' }}>{ONBOARDING.safety}</div>
              </div>
            </div>

            {/* the cast */}
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', color: 'var(--muted)', marginBottom: 10 }}>YOUR LAB · STARTING GRANT ${STARTING_BUDGET.toLocaleString()}</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
              {CHARACTERS.map((c) => (
                <div key={c.role} style={{ flex: 1, minWidth: 200, display: 'flex', gap: 11, alignItems: 'flex-start', border: '1px solid var(--line)', borderRadius: 12, background: 'var(--panel2)', padding: '11px 12px' }}>
                  <CharacterAvatar role={c.role} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                    <div style={{ fontFamily: mono, fontSize: 10.5, color: 'var(--muted)', marginBottom: 3 }}>{c.title}</div>
                    <div style={{ fontSize: 12, lineHeight: 1.45, color: 'var(--muted)' }}>{c.blurb}</div>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: mono, fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 20 }}>{ONBOARDING.loop}</p>

            <button
              onClick={onStart}
              style={{ width: '100%', minHeight: 50, borderRadius: 12, border: 'none', background: 'var(--accent)', color: '#04060c', fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 0 24px color-mix(in srgb, var(--accent) 45%, transparent)' }}
            >
              Read up, then begin →
            </button>
            <div style={{ textAlign: 'center', marginTop: 10, fontFamily: mono, fontSize: 10.5, color: 'var(--muted)' }}>
              (The display buttons up top, QUALITY, MOTION, LOOK, are safe to ignore. They won’t change the lesson.)
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
