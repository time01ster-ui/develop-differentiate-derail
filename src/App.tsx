import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { STAGE_LABELS } from './content/act1'
import { getAct } from './content/registry'
import { WRONG_SAFE } from './content/story'
import { buildExperiment } from './lib/measure'
import { loadPersisted, persist } from './lib/urlState'
import { emptyReflection, loadReflections, saveReflections, type Reflection, type Reflections } from './lib/reflections'
import { canAdvance, initialState, loopReducer, type LoopState } from './state/loop'
import Header from './components/Header'
import Stepper from './components/Stepper'
import Footer from './components/Footer'
import CreditsPanel from './components/CreditsPanel'
import IntroModal from './components/IntroModal'
import Onboarding from './components/Onboarding'
import Library from './components/Library'
import ReflectionPanel from './components/ReflectionPanel'
import { ActStory, ProcessExplainer, StageBanner, StepGoal } from './components/StageChrome'
import ForcesRail from './components/ForcesRail'
import { AchievementsPanel, ProgressHud, XpToast } from './components/ProgressHud'
import { BudgetChip, BudgetPanel } from './components/Budget'
import { asset } from './lib/asset'
import { badgeById, loadGame, saveGame, type Badge, type GameState } from './lib/progress'
import { useTier } from './components/TierContext'
import AskStage from './components/stages/AskStage'
import HypothesizeStage from './components/stages/HypothesizeStage'
import ToolsStage from './components/stages/ToolsStage'
import DesignStage from './components/stages/DesignStage'
import RunStage from './components/stages/RunStage'
import AnalyzeStage from './components/stages/AnalyzeStage'
import ConcludeStage from './components/stages/ConcludeStage'
import IterateStage from './components/stages/IterateStage'
import LabReportButton from './components/LabReport'
import { renderAct2Stage } from './components/stages/act2/render'
import { renderAct3Stage } from './components/stages/act3/render'

function init(): LoopState {
  const p = loadPersisted()
  return p ? { ...initialState, ...p } : initialState
}

const NEXT_LABELS: Record<number, string> = {
  0: 'Form a hypothesis →',
  1: 'Choose tools →',
  2: 'Design experiment →',
  3: 'Run the experiment →',
  4: 'Analyze →',
  5: 'Draw a conclusion →',
  6: 'Close the loop →',
  7: 'Loop complete',
}

/** Footer hint + Next label. On a passing gate, the PI cheers you on; on a failing
 *  one, plain guidance plus a reminder that wrong answers are safe. */
function footerFor(s: LoopState, canNext: boolean): { footerHint: string; nextLabel: string } {
  const nextLabel = NEXT_LABELS[s.step] ?? 'Continue →'
  const passLine = getAct(s.act).passLine
  if (canNext && passLine[s.step]) return { footerHint: passLine[s.step], nextLabel }
  const isAct2 = s.act === 'differentiate'
  const isAct3 = s.act === 'derail'
  let footerHint: string
  switch (s.step) {
    case 0:
      footerHint = `Pick the question a scientist could actually test, then this unlocks. ${WRONG_SAFE}`
      break
    case 1:
      footerHint = `Pick the idea you want to test. ${WRONG_SAFE}`
      break
    case 2:
      footerHint = 'Select at least one tool you can run.'
      break
    case 3: {
      const repOK = s.replicates >= 3
      const repWord = isAct2 ? 'model runs' : isAct3 ? 'sample regions' : 'embryos'
      const labelHint = isAct2
        ? 'Label the bench honestly: it is a model, not Mateo.'
        : isAct3
          ? 'Label the sample honestly: a model sibling margin, not a patient.'
          : 'Label your distance (2D or 3D).'
      footerHint = !s.control ? 'Turn on a control group.' : !repOK ? `Set at least 3 ${repWord}.` : labelHint
      break
    }
    case 4:
      footerHint = isAct2 ? 'Take at least one reading on the bench.' : isAct3 ? 'Measure BOTH the normal tissue and the invasive front, then compare.' : 'Segment, then measure this embryo.'
      break
    case 6:
      footerHint =
        s.claimResult === 'blocked'
          ? `Over-claim blocked. Pick a claim within your ceiling, or go back and get a stronger tool. ${WRONG_SAFE}`
          : `Pick the claim your evidence supports. ${WRONG_SAFE}`
      break
    default:
      footerHint = 'Loop complete. Climb the ladder or open the next question.'
  }
  return { footerHint, nextLabel }
}

/** End-of-run recap built from the 6 Rs reflections. The student's REVISE entries
 *  (their self-corrections) are the headline evidence of learning; the carry-forward
 *  to-dos follow. */
function ImprovementPlan({ reflections }: { reflections: Reflections }) {
  const rows = STAGE_LABELS.map((label, i) => ({
    label,
    revision: (reflections[i]?.revision ?? '').trim(),
    todos: (reflections[i]?.todos ?? '').trim(),
  })).filter((r) => r.revision || r.todos)
  if (rows.length === 0) return null
  const revisedCount = rows.filter((r) => r.revision).length
  const copyAll = () => {
    const text = rows
      .map((r) => `${r.label}:${r.revision ? `\n  revised: ${r.revision}` : ''}${r.todos ? `\n  next time: ${r.todos}` : ''}`)
      .join('\n\n')
    try {
      navigator.clipboard?.writeText(text)
    } catch {
      /* ignore */
    }
  }
  return (
    <section style={{ marginTop: 20, border: '1px solid color-mix(in srgb, var(--c-green) 35%, var(--line))', borderRadius: 16, background: 'color-mix(in srgb, var(--c-green) 6%, var(--panel))', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 10.5, letterSpacing: '.14em', color: 'var(--c-green)' }}>YOUR 6 Rs RECORD · WHAT YOU CORRECTED</div>
        <button onClick={copyAll} style={{ background: 'none', border: '1px solid var(--line)', borderRadius: 6, color: 'var(--muted)', cursor: 'pointer', fontFamily: "'IBM Plex Mono'", fontSize: 10, padding: '3px 8px' }}>copy all</button>
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 12, lineHeight: 1.5 }}>
        You revised your thinking on <b style={{ color: 'var(--c-green)' }}>{revisedCount}</b> of the steps you reflected on. That self-correction is the learning.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {rows.map((r) => (
          <div key={r.label}>
            <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 13.5, color: 'var(--text)', marginBottom: 3 }}>{r.label}</div>
            {r.revision && (
              <div style={{ fontSize: 12.5, color: 'var(--text)', lineHeight: 1.55, whiteSpace: 'pre-wrap', marginBottom: r.todos ? 5 : 0 }}>
                <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 10, color: 'var(--c-green)', letterSpacing: '.1em' }}>REVISED&nbsp;&nbsp;</span>
                {r.revision}
              </div>
            )}
            {r.todos && (
              <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 12, color: 'var(--muted)', lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>
                <span style={{ color: 'var(--accent)' }}>NEXT&nbsp;&nbsp;</span>
                {r.todos}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function App() {
  const [state, dispatch] = useReducer(loopReducer, undefined, init)
  const { reducedMotion } = useTier()
  const [creditsOpen, setCreditsOpen] = useState(false)
  const [introOpen, setIntroOpen] = useState(false)
  const [libraryOpen, setLibraryOpen] = useState(false)
  const [libraryChapter, setLibraryChapter] = useState<string | undefined>(undefined)
  const [openedChapters, setOpenedChapters] = useState<Set<string>>(new Set())
  const [reflections, setReflections] = useState<Reflections>(loadReflections)
  const [game, setGame] = useState<GameState>(loadGame)
  const [achievementsOpen, setAchievementsOpen] = useState(false)
  const [budgetOpen, setBudgetOpen] = useState(false)
  const [toast, setToast] = useState<Badge | null>(null)
  const [sawHonestN, setSawHonestN] = useState(false)
  const mainRef = useRef<HTMLElement>(null)

  const openLibrary = (chapter?: string) => {
    setLibraryChapter(chapter)
    setLibraryOpen(true)
    if (chapter) setOpenedChapters((s) => new Set(s).add(chapter))
  }

  useEffect(() => {
    persist(state)
  }, [state])

  // On any step or act change, return the stage scroll to the top so a student
  // always starts at the explanation, never landing in the middle of a picture.
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 })
  }, [state.step, state.act, state.started, state.libraryDone])

  useEffect(() => {
    saveReflections(reflections)
  }, [reflections])

  useEffect(() => {
    saveGame(game)
  }, [game])

  // Award rigor badges from the current state. Idempotent: each badge is earned
  // once, and including game.badges in the deps makes the effect settle (after a
  // grant, the fresh list is empty next run). Rewards rigor, never gates anything.
  useEffect(() => {
    const should: string[] = []
    if (state.qChoice === 'testable') should.push('testable_question')
    if (state.hypChoice) should.push('prediction')
    if (state.rungs.length > 0) should.push('tooled_up')
    // A fair design is labeled honestly: Act I labels distance, Acts II/III label the work as a model.
    if (state.control && state.replicates >= 3 && (state.act === 'develop' ? state.distance : state.modelLabeled)) should.push('fair_design')
    // A real measurement: a measured field (Acts I/III) or a bench reading (Act II).
    if (state.act === 'differentiate' ? state.benchSampled : state.everMeasured) should.push('verified_measure')
    if (sawHonestN) should.push('pseudoreplication_spotter')
    if (state.claimResult === 'valid') should.push('honest_ceiling')
    // Self-correction (the 6 Rs REVISE step): earned once any reflection is revised.
    if (Object.values(reflections).some((r) => r.revised)) should.push('self_corrector')
    if (state.libraryDone) should.push('studied_library')
    if (state.step >= 7) should.push('loop_closed')
    const have = new Set(game.badges)
    const fresh = should.filter((id) => !have.has(id))
    if (fresh.length === 0) return
    const top = fresh
      .map(badgeById)
      .filter((b): b is Badge => !!b)
      .sort((a, b) => b.points - a.points)[0]
    setGame((g) => ({ badges: Array.from(new Set([...g.badges, ...fresh])) }))
    if (top) setToast(top)
  }, [state.act, state.qChoice, state.hypChoice, state.rungs.length, state.control, state.replicates, state.distance, state.modelLabeled, state.everMeasured, state.benchSampled, sawHonestN, state.claimResult, state.libraryDone, state.step, reflections, game.badges])

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 3400)
    return () => window.clearTimeout(t)
  }, [toast])

  const updateReflection = (step: number, patch: Partial<Reflection>) =>
    setReflections((prev) => ({ ...prev, [step]: { ...(prev[step] ?? emptyReflection()), ...patch } }))

  // Experiment data is generated once per replicate count and cached.
  const data = useMemo(() => buildExperiment(state.replicates), [state.replicates])

  const canNext = canAdvance(state)
  const { footerHint, nextLabel } = footerFor(state, canNext)
  const A = getAct(state.act)

  // The act-specific stage view. Act I "Develop" uses its original components;
  // each later act supplies its own divergent stages (the bench, etc.).
  const renderStage = () => {
    if (state.act === 'differentiate') return renderAct2Stage(state, dispatch, () => setSawHonestN(true))
    if (state.act === 'derail') return renderAct3Stage(state, dispatch, data, () => setSawHonestN(true))
    switch (state.step) {
      case 0:
        return <AskStage state={state} dispatch={dispatch} />
      case 1:
        return <HypothesizeStage state={state} dispatch={dispatch} />
      case 2:
        return <ToolsStage state={state} dispatch={dispatch} />
      case 3:
        return <DesignStage state={state} dispatch={dispatch} />
      case 4:
        return <RunStage state={state} dispatch={dispatch} data={data} />
      case 5:
        return <AnalyzeStage state={state} data={data} onSeeHonestN={() => setSawHonestN(true)} />
      case 6:
        return <ConcludeStage state={state} dispatch={dispatch} />
      case 7:
        return <IterateStage state={state} dispatch={dispatch} data={data} />
      default:
        return null
    }
  }

  return (
    <div
      data-theme={state.theme}
      data-reduced-motion={reducedMotion ? 'true' : 'false'}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
        color: 'var(--text)',
        fontSize: 15,
        overflow: 'hidden',
      }}
    >
      {/* ambient field */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.5,
          background:
            'radial-gradient(900px 600px at 78% -8%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 60%), radial-gradient(700px 500px at 8% 110%, color-mix(in srgb, var(--c-green) 9%, transparent), transparent 60%)',
        }}
      />

      <Header
        theme={state.theme}
        onTheme={(t) => dispatch({ type: 'SET_THEME', theme: t })}
        onOpenCredits={() => setCreditsOpen(true)}
        onOpenIntro={() => setIntroOpen(true)}
        onStartOver={
          state.started
            ? () => {
                if (window.confirm("Start over from the beginning? This run's progress will be cleared. Your earned badges are kept.")) {
                  dispatch({ type: 'RESET_ALL' })
                }
              }
            : undefined
        }
        onOpenLibrary={state.started && state.libraryDone ? () => openLibrary() : undefined}
        hud={state.started ? <ProgressHud game={game} onOpen={() => setAchievementsOpen(true)} /> : undefined}
        budget={state.started ? <BudgetChip state={state} onOpen={() => setBudgetOpen(true)} /> : undefined}
        actLabel={`Act ${['', 'I', 'II', 'III'][A.index] ?? 'I'}, ${A.shortTitle}`}
      />

      {/* ATIT Research Lab affiliation, pinned top-right on every screen; links to the official lab site */}
      <a
        href="https://case.edu/artsci/biology/atitlab/"
        target="_blank"
        rel="noopener noreferrer"
        title="Visit the Atit Research Lab · Case Western Reserve University"
        aria-label="Atit Research Lab at Case Western Reserve University (opens in a new tab)"
        style={{
          position: 'fixed',
          top: 10,
          right: 16,
          zIndex: 6,
          display: 'block',
          lineHeight: 0,
        }}
      >
        <img
          src={asset('/brand/atit-research-lab.webp')}
          alt="ATIT Research Lab, Case Western Reserve University"
          style={{
            width: 'clamp(84px, 12vw, 112px)',
            height: 'auto',
            opacity: 0.92,
            userSelect: 'none',
            display: 'block',
          }}
        />
      </a>

      {!state.started ? (
        <Onboarding onStart={() => dispatch({ type: 'START' })} />
      ) : !state.libraryDone ? (
        <Library mode="study" chapters={A.chapters} onBegin={() => dispatch({ type: 'FINISH_LIBRARY' })} />
      ) : (
        <>
          <Stepper step={state.step} onJump={(i) => dispatch({ type: 'JUMP', step: i })} />
          <ForcesRail />

          <main ref={mainRef} style={{ position: 'relative', zIndex: 2, flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
            <div style={{ maxWidth: 1180, margin: '0 auto', padding: '30px 22px 28px' }}>
              {state.step === 0 && A.story && <ActStory act={state.act} onOpenLibrary={(ch) => openLibrary(ch)} />}
              <StepGoal step={state.step} act={state.act} />
              <StageBanner step={state.step} act={state.act} />
              {(() => {
                const relId = A.libraryForStage[state.step]
                const rel = relId ? A.chapters.find((c) => c.id === relId) : undefined
                if (!rel) return null
                const opened = openedChapters.has(rel.id)
                if (A.readBeforeChoosing.has(state.step)) {
                  return (
                    <div style={{ marginBottom: 16, border: `1px solid ${opened ? 'var(--line)' : 'color-mix(in srgb, var(--c-amber) 55%, var(--line))'}`, borderRadius: 12, background: opened ? 'var(--panel)' : 'color-mix(in srgb, var(--c-amber) 9%, var(--panel))', padding: '11px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                      <div style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.5, minWidth: 220, flex: 1 }}>
                        {opened ? '✓ ' : '📖 '}
                        <b>{opened ? 'Reread any time.' : 'Read for understanding before you choose.'}</b>{' '}
                        This step builds on <b>{rel.title}</b> in the Library.
                      </div>
                      <button onClick={() => openLibrary(rel.id)} style={{ flex: 'none', minHeight: 38, padding: '8px 14px', borderRadius: 9, border: '1px solid var(--accent)', background: 'color-mix(in srgb, var(--accent) 14%, transparent)', color: 'var(--text)', cursor: 'pointer', fontFamily: "'IBM Plex Mono'", fontSize: 11.5 }}>
                        📚 {opened ? 'Open again' : 'Open the reading'} →
                      </button>
                    </div>
                  )
                }
                return (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                    <button
                      onClick={() => openLibrary(rel.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 8, border: '1px solid color-mix(in srgb, var(--accent) 35%, var(--line))', background: 'color-mix(in srgb, var(--accent) 7%, transparent)', color: 'var(--muted)', cursor: 'pointer', fontFamily: "'IBM Plex Mono'", fontSize: 11 }}
                    >
                      📚 Related reading: <span style={{ color: 'var(--text)' }}>{rel.title}</span> →
                    </button>
                  </div>
                )
              })()}
              {!canNext && state.step !== 5 && state.step !== 7 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16, border: '1px solid color-mix(in srgb, var(--accent) 45%, var(--line))', borderRadius: 10, background: 'color-mix(in srgb, var(--accent) 9%, var(--panel))', padding: '9px 13px' }}>
                  <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 10, letterSpacing: '.1em', color: 'var(--accent)', flex: 'none' }}>TO CONTINUE</span>
                  <span style={{ fontSize: 13.5, lineHeight: 1.45, color: 'var(--text)' }}>{footerHint}</span>
                </div>
              )}
              {state.step === 4 && <ProcessExplainer act={state.act} />}
              {renderStage()}

              {state.step === 7 && <LabReportButton state={state} reflections={reflections} badges={game.badges} data={data} />}

              <ReflectionPanel
                step={state.step}
                reflection={reflections[state.step] ?? emptyReflection()}
                onChange={(patch) => updateReflection(state.step, patch)}
                act={state.act}
              />

              {state.step === 7 && <ImprovementPlan reflections={reflections} />}
            </div>
          </main>

          <Footer
            step={state.step}
            canNext={canNext}
            footerHint={footerHint}
            nextLabel={nextLabel}
            onBack={() => dispatch({ type: 'BACK' })}
            onNext={() => dispatch({ type: 'NEXT' })}
          />
        </>
      )}

      {creditsOpen && <CreditsPanel onClose={() => setCreditsOpen(false)} />}
      {introOpen && <IntroModal onClose={() => setIntroOpen(false)} />}
      {achievementsOpen && <AchievementsPanel game={game} onClose={() => setAchievementsOpen(false)} />}
      {budgetOpen && <BudgetPanel state={state} onClose={() => setBudgetOpen(false)} />}
      <XpToast badge={toast} />
      {libraryOpen && (
        <Library mode="reference" chapters={A.chapters} initialChapter={libraryChapter} onClose={() => setLibraryOpen(false)} />
      )}
    </div>
  )
}
