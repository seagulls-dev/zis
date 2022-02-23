import { ActionType, LoginAction } from './actions';
import { AsyncActionMode } from 'common/models';
import { ChangePasswordState } from './models';

const INITIAL_STATE: ChangePasswordState = {
  error: undefined,
  isLoading: false,
  data: undefined,
};

export default (
  state: ChangePasswordState = INITIAL_STATE,
  action: LoginAction
): ChangePasswordState => {
  switch (action.type) {
    case ActionType.CHANGE_PASSWORD:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true };
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          data: action.data,
        };
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          error: action.error,
        };
      }
      break;
  }
  return state;
};
