import { ActionType, AsyncJobGroupActions } from './actions'
import { AsyncActionMode } from 'common/models'
import { AsyncJobGroupState } from './models'

const ASYNCJOBGROUP_INITIAL_STATE: AsyncJobGroupState = {
  isLoading: false,
  isSaving: false,
  error: undefined,
}

export default (
  state = ASYNCJOBGROUP_INITIAL_STATE,
  action: AsyncJobGroupActions
): AsyncJobGroupState => {
  switch (action.type) {
    case ActionType.GET_ASYNCJOBGROUP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          asyncjobgroup: action.data,
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
    case ActionType.CREATE_ASYNCJOBGROUP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          asyncjobgroups: state.asyncjobgroups?.concat(action.data),
          isSaving: false,
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          error: action.error,
          isSaving: false,
        }
      }
      break
    case ActionType.GET_ASYNCJOBGROUPS:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          asyncjobgroups: action.data,
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
    case ActionType.DELETE_ASYNCJOBGROUP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          asyncjobgroups: state.asyncjobgroups!.filter(
            (asyncjobgroup) => asyncjobgroup.id !== action.request.id
          ),
          isSaving: false,
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

    case ActionType.UPDATE_ASYNCJOBGROUP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          asyncjobgroups: state.asyncjobgroups!.map((asyncjobgroup) =>
            asyncjobgroup.id === action.data.id
              ? { ...action.data }
              : asyncjobgroup
          ),
          isSaving: false,
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
  }
  return state
}
