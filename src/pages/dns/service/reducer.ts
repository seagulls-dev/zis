import { ActionType, DnsServiceActions } from './actions'
import { AsyncActionMode } from 'common/models'
import { DnsServiceState } from './models'

const DNSSERVICE_INITIAL_STATE: DnsServiceState = {
  isLoading: false,
  isSaving: false,
  error: undefined,
}

export default (state = DNSSERVICE_INITIAL_STATE, action: DnsServiceActions): DnsServiceState => {
  switch (action.type) {
    case ActionType.GET_DNSSERVICE:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          dnsservice: action.data,
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
    case ActionType.CREATE_DNSSERVICE:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          dnsservices: state.dnsservices?.concat(action.data),
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
    case ActionType.GET_DNSSERVICEES:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          dnsservices: action.data,
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
    case ActionType.DELETE_DNSSERVICE:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          dnsservices: state.dnsservices!.filter((dnsservice) => dnsservice.id !== action.request.id),
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

    case ActionType.UPDATE_DNSSERVICE:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          dnsservices: state.dnsservices!.map((dnsservice) =>
            dnsservice.id === action.data.id ? { ...action.data } : dnsservice,
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
