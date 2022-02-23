import { ActionType, RightSiderActions } from './actions'
import { RightSiderState } from './models'

const INITIAL_STATE: RightSiderState = {
  content: undefined,
}

export default (
  state = INITIAL_STATE,
  action: RightSiderActions,
): RightSiderState => {
  switch (action.type) {
    case ActionType.SET_SIDEBAR:
      return { ...state, ...action.payload }
  }
  return state
}
