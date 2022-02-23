import { ActionType, FontActions } from './actions'
import { FontSwitcherState, FontSize } from './models'

const INITIAL_STATE: FontSwitcherState = {
  fontSize: FontSize.DEFAULT,
}

export default (
  state = INITIAL_STATE,
  action: FontActions,
): FontSwitcherState => {
  switch (action.type) {
    case ActionType.CHANGE_FONT_SIZE:
      return { ...state, fontSize: action.payload }
    case ActionType.RESET_FONT_SIZE:
      return { ...state, fontSize: INITIAL_STATE.fontSize }
  }
  return state
}
