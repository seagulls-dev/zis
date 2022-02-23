import {ActionType, UserActions} from './actions'
import {AsyncActionMode} from 'common/models'
import {UserState} from './models'

const INITIAL_STATE: UserState = {
  isSaving: false,
  isLoading: false,
  error: undefined,
  user: undefined,
  users: undefined,
  user_roles: undefined
}

export default (
  state: UserState = INITIAL_STATE,
  action: UserActions,
): UserState => {
  switch (action.type) {
    case ActionType.ALL_USERS:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          users: action.data,
          isLoading: false,
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          error: action.error,
          users: undefined
        }
      }
      break
    case ActionType.CREATE_USER:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isSaving: false,
          user: action.data,
          users: state.users?.concat(action.data)
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isSaving: false,
          error: action.error,
        }
      }
      break
    case ActionType.UPDATE_USER:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isSaving: false,
          user: action.data,
          users: state.users
            ? state.users.map((user) =>
              user.id === action.data.id ? { ...action.data } : user,
            )
            : [{ ...action.data }]
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isSaving: false,
          error: action.error,
        }
      }
      break
    case ActionType.PROFILE_USER:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isSaving: false,
          user: action.data
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isSaving: false,
          error: action.error,
        }
      }
      break
    case ActionType.DELETE_USER:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isSaving: false,
          user: action.data,
          users: state.users?.filter(user => user.id !== action.data.id)
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isSaving: false,
          error: action.error,
        }
      }
      break
    case ActionType.GET_USER:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isSaving: false,
          error: undefined,
          user: action.data,
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isSaving: false,
          error: action.error,
        }
      }
      break
    case ActionType.GET_USER_ROLES:
      if (action.mode === AsyncActionMode.REQUEST) {
        return {...state, isSaving: true}
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isSaving: false,
          error: undefined,
          user_roles: action.data
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isSaving: false,
          error: action.error
        }
      }
  }
  return state
}
