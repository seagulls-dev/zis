import { ActionType, RoleActions } from './actions'
import { AsyncActionMode } from 'common/models'
import { RoleState } from './models'

const INITIAL_STATE: RoleState = {
  isLoading: false,
  roles: undefined,
  rolesPermissions: undefined,
  error: undefined,
}

export default (state: RoleState = INITIAL_STATE, action: RoleActions) => {
  switch (action.type) {
    case ActionType.GET_ROLES:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          roles: action.data,
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
    // eslint-disable-next-line
    case ActionType.GET_ROLES_PERMISSIONS:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          rolesPermissions: action.data,
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
    // eslint-disable-next-line
  }
  return state
}
