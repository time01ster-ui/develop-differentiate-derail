// Act II "Differentiate" stage views. The choice + ladder stages reuse the
// shared components; the divergent ones (Design, the mechanotransduction Bench,
// Analyze, Conclude, Iterate) are act-specific.

import type { Dispatch } from 'react'
import type { Action, LoopState } from '../../../state/loop'
import ToolsStage from '../ToolsStage'
import AskStage2 from './AskStage2'
import HypothesizeStage2 from './HypothesizeStage2'
import DesignStage2 from './DesignStage2'
import BenchStage from './BenchStage'
import AnalyzeStage2 from './AnalyzeStage2'
import ConcludeStage2 from './ConcludeStage2'
import IterateStage2 from './IterateStage2'

/** Returns the Act II view for the current step. */
export function renderAct2Stage(
  state: LoopState,
  dispatch: Dispatch<Action>,
  onSeeHonestN: () => void,
): React.ReactNode {
  switch (state.step) {
    case 0:
      return <AskStage2 state={state} dispatch={dispatch} />
    case 1:
      return <HypothesizeStage2 state={state} dispatch={dispatch} />
    case 2:
      return <ToolsStage state={state} dispatch={dispatch} />
    case 3:
      return <DesignStage2 state={state} dispatch={dispatch} />
    case 4:
      return <BenchStage state={state} dispatch={dispatch} />
    case 5:
      return <AnalyzeStage2 state={state} onSeeHonestN={onSeeHonestN} />
    case 6:
      return <ConcludeStage2 state={state} dispatch={dispatch} />
    case 7:
      return <IterateStage2 state={state} dispatch={dispatch} />
    default:
      return null
  }
}
