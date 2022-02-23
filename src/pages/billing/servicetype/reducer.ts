import {ActionType, ServiceTypeActions} from './actions'
import {AsyncActionMode} from 'common/models'
import {ServiceTypeState} from './model'

const SERVICETYPE_INITIAL_STATE : ServiceTypeState = {
  isLoading: false,
  isSaving: false,
  error: undefined,
}

export default (state = SERVICETYPE_INITIAL_STATE, action: ServiceTypeActions): ServiceTypeState => {
  switch (action.type) {
    case ActionType.GET_SERVICE_TYPE:
      if (action.mode === AsyncActionMode.REQUEST) {
        return {...state, isLoading: true}
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {...state, isLoading: false, servicetype: action.data}
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {...state, isLoading: false, error: action.error}
      }
      break
    case ActionType.CREATE_SERVICE_TYPE:
      if (action.mode === AsyncActionMode.REQUEST) {
        return {...state, isSaving: true}
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {...state, isSaving: false, servicetypes: state.servicetypes?.concat(action.data)}
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {...state, isSaving: false, error: action.error}
      }
      break
    case ActionType.GET_SERVICE_TYPES:
      if (action.mode === AsyncActionMode.REQUEST) {
        return {...state, isLoading: true}
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {...state, isLoading: false, servicetypes: action.data}
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {...state, isLoading: false, error: action.error}
      }
      break
    case ActionType.DELETE_SERVICE_TYPE:
      if (action.mode === AsyncActionMode.REQUEST) {
        return {...state, isSaving: true}
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {...state, isSaving: false, servicetypes: state.servicetypes!.filter(type => type.id !== action.request.id)}
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {...state, isSaving: false, error: action.error}
      }
      break
    case ActionType.UPDATE_SERVICE_TYPE:
      if (action.mode === AsyncActionMode.REQUEST) {
        return {...state, isSaving: true}
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {...state, isSaving: false, servicetypes: state.servicetypes!.map(item => item.id === action.data.id ? {...action.data} : item)}
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {...state, isSaving: false, error: action.error}
      }
      break
  }
  return state
}
