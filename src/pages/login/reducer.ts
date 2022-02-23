import {ActionType, LoginActions} from './actions'
import {AuthState} from './models'
import {AsyncActionMode} from 'common/models'
import {currentUser} from 'helpers/authHelpers'

const INITIAL_STATE: AuthState = {
  authenticated: false,
  isLoading: false,
}

export default (
  state: AuthState = INITIAL_STATE,
  action: LoginActions,
): AuthState => {
  switch (action.type) {
    case ActionType.TRY_TO_LOAD_USER:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          token: currentUser(),
          authenticated: true,
          self: action.self,
          isLoading: false,
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          error: action.error,
        }
      }
      break

    case ActionType.USER_DETAILS:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          self: action.self,
          isLoading: false,
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          error: action.error,
        }
      }
      break
    case ActionType.GET_MENU_ROLES:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          menu_roles: action.menu_roles
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          error: action.error
        }
      }
      break
    case ActionType.LOGIN_USER:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          message: action.auth.message,
          token: action.auth.token,
          authenticated: true,
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          error: action.error,
          authenticated: false,
        }
      }
      break
    case ActionType.LOGOUT_USER:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          authenticated: false,
          token: undefined,
          menu_roles: {},
          self: undefined
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          error: action.error,
          authenticated: true,
        }
      }
      break

    case ActionType.TOKEN_EXPIRED:
      return { ...state, token: undefined, authenticated: false, menu_roles: {}, self: undefined }
  }
  return state
}
