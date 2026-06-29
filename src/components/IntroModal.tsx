import { asset } from '../lib/asset'

const mono = "'IBM Plex Mono'"

/**
 * Baby Mateo intro video in a dismissible overlay. The same video also opens the
 * onboarding screen, but saved progress (URL hash / localStorage) skips onboarding
 * on a resume, so this keeps the intro reachable from any state via the header.
 */
export default function IntroModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="The Baby Mateo story (intro video)"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'grid',
        placeItems: 'center',
        padding: 'clamp(16px, 4vw, 48px)',
        background: 'color-mix(in srgb, #04060c 78%, transparent)',
        backdropFilter: 'blur(6px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(960px, 100%)',
          background: 'var(--bg2)',
          border: '1px solid var(--line)',
          borderRadius: 16,
          padding: 'clamp(14px, 2vw, 22px)',
          boxShadow: '0 20px 60px rgba(0,0,0,.5)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', color: 'var(--accent)' }}>
            ▶ THE BABY MATEO STORY
          </div>
          <button
            onClick={onClose}
            aria-label="Close intro video"
            style={{
              minHeight: 30,
              padding: '5px 11px',
              borderRadius: 7,
              border: '1px solid var(--line)',
              background: 'transparent',
              color: 'var(--muted)',
              cursor: 'pointer',
              fontFamily: mono,
              fontSize: 10,
              letterSpacing: '.06em',
            }}
          >
            ✕ CLOSE
          </button>
        </div>
        <video
          controls
          autoPlay
          playsInline
          preload="metadata"
          poster={asset('/intro/baby-mateo-intro-poster.jpg')}
          style={{ width: '100%', display: 'block', borderRadius: 12, border: '1px solid var(--line)', background: '#000', aspectRatio: '16 / 9' }}
        >
          <source src={asset('/intro/baby-mateo-intro.mp4')} type="video/mp4" />
          <a href={asset('/intro/baby-mateo-intro.mp4')} style={{ color: 'var(--accent)' }}>Download the intro video</a> (your browser cannot play it inline).
        </video>
      </div>
    </div>
  )
}
