import { ActionType, ThemeActions } from './actions';
import { ThemeSwitcherState, Theme } from './models';

const INITIAL_STATE: ThemeSwitcherState = {
  theme: Theme.DEFAULT,
};

export default (
  state = INITIAL_STATE,
  action: ThemeActions
): ThemeSwitcherState => {
  switch (action.type) {
    case ActionType.CHANGE_THEME:
      return { ...state, theme: action.payload };
    case ActionType.RESET_THEME:
      return { ...state, theme: INITIAL_STATE.theme };
  }
  return state;
};
