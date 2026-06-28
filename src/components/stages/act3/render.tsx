// Act III "Derail" stage views. The choice + ladder stages reuse shared
// components; Run/Measure reuses the Act I Voronoi engine on a tumor-margin
// field; the rest is act-specific.

import type { Dispatch } from 'react'
import type { ExperimentData } from '../../../lib/measure'
import type { Action, LoopState } from '../../../state/loop'
import ToolsStage from '../ToolsStage'
import AskStage3 from './AskStage3'
import HypothesizeStage3 from './HypothesizeStage3'
import DesignStage3 from './DesignStage3'
import MarginRunStage from './MarginRunStage'
import AnalyzeStage3 from './AnalyzeStage3'
import ConcludeStage3 from './ConcludeStage3'
import IterateStage3 from './IterateStage3'

/** Returns the Act III view for the current step. */
export function renderAct3Stage(
  state: LoopState,
  dispatch: Dispatch<Action>,
  data: ExperimentData,
  onSeeHonestN: () => void,
): React.ReactNode {
  switch (state.step) {
    case 0:
      return <AskStage3 state={state} dispatch={dispatch} />
    case 1:
      return <HypothesizeStage3 state={state} dispatch={dispatch} />
    case 2:
      return <ToolsStage state={state} dispatch={dispatch} />
    case 3:
      return <DesignStage3 state={state} dispatch={dispatch} />
    case 4:
      return <MarginRunStage state={state} dispatch={dispatch} data={data} />
    case 5:
      return <AnalyzeStage3 state={state} data={data} onSeeHonestN={onSeeHonestN} />
    case 6:
      return <ConcludeStage3 state={state} dispatch={dispatch} />
    case 7:
      return <IterateStage3 state={state} dispatch={dispatch} data={data} />
    default:
      return null
  }
}
