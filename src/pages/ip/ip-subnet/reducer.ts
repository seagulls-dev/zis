import { ActionType, IpSubnetActions } from './actions'
import { AsyncActionMode } from 'common/models'
import { IpSubnetState } from './models'

const INITIAL_STATE: IpSubnetState = {
  isSaving: false,
  isLoading: false,
  error: undefined,
}

export default (
  state: IpSubnetState = INITIAL_STATE,
  action: IpSubnetActions,
): IpSubnetState => {
  switch (action.type) {
    case ActionType.LIST_SUBNET_IP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          ipSubnets: action.rageList,
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
    case ActionType.GET_SUBNET_IP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          ipSubnet: action.data,
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
    case ActionType.CREATE_SUBNET_IP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isSaving: false,
          ipSubnets: state.ipSubnets?.concat(action.data),
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
    case ActionType.UPDATE_SUBNET_IP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          ipSubnets: state.ipSubnets!.map((subnet) =>
            subnet.id === action.data.id
              ? {
                  ...subnet,
                  customer_id: action.data.customer_id,
                  name: action.data.name,
                  location: action.data.location,
                  gateway: action.data.gateway,
                  vlan: action.data.vlan,
                  ipmi: action.data.ipmi,
                }
              : subnet,
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
    case ActionType.DELETE_SUBNET_IP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          ipSubnets: state.ipSubnets!.filter(
            (subnet) => subnet.id !== action.id,
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
