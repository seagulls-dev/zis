import { ActionType, IpActions } from './actions'
import { AsyncActionMode } from 'common/models'
import { IpState } from './models'

const INITIAL_STATE: IpState = {
  isSaving: false,
  isLoading: false,
  error: undefined,
}

export default (state: IpState = INITIAL_STATE, action: IpActions): IpState => {
  switch (action.type) {
    case ActionType.LIST_IP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          ips: action.ipList,
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

    case ActionType.GET_IP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          ip: action.data,
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

    case ActionType.CREATE_IP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isSaving: false,
          ips: state.ips?.concat(action.data),
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

    case ActionType.UPDATE_IP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          ips: state.ips!.map((ip) =>
            ip.id === action.data.id
              ? {
                  ...ip,
                  customer_id: action.data.customer_id,
                  comment: action.data.comment,
                  // revers: action.data.revers,
                }
              : ip,
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

    case ActionType.DELETE_IP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          ips: state.ips!.filter((ip) => ip.id !== action.id),
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
