import { ActionType, PhysicalServerActions } from './actions'
import { AsyncActionMode } from 'common/models'
import { PhysicalServerState } from './models'

const PHYSICALSERVER_INITIAL_STATE: PhysicalServerState = {
  isLoading: false,
  isSaving: false,
}

export default (
  state = PHYSICALSERVER_INITIAL_STATE,
  action: PhysicalServerActions,
): PhysicalServerState => {
  switch (action.type) {
    case ActionType.REMOVE_PHYSICALSERVER_FROM_RACK:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          physicalservers: state.physicalservers!.map((physicalserver) =>
            physicalserver.id === action.data.id
              ? {
                  ...physicalserver,
                  rack_id: undefined,
                  rack_pos: undefined,
                }
              : physicalserver,
          ),
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
    case ActionType.SWAP_COMPONENT_IN_PHYSICALSERVER:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          physicalservers: state.physicalservers!.map((physicalserver) =>
            physicalserver.id === action.request.payload.physical_server_id
              ? {
                  ...physicalserver,
                  serverComponents: physicalserver.serverComponents
                    ?.filter(
                      (c) => c.id !== action.request.payload.old_component_id,
                    )
                    .concat(action.data),
                }
              : physicalserver,
          ),
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
    case ActionType.SET_PHYSICALSERVER_RACK:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          physicalservers: state.physicalservers!.map((physicalserver) =>
            physicalserver.id === action.data.id ? action.data : physicalserver,
          ),
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
    case ActionType.REMOVE_COMPONENT_FROM_PHYSICALSERVER:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          physicalservers: state.physicalservers!.map((physicalserver) =>
            physicalserver.id === action.request.payload.physical_server_id
              ? {
                  ...physicalserver,
                  serverComponents: physicalserver.serverComponents?.filter(
                    (c) => c.id !== action.request.payload.server_component_id,
                  ),
                }
              : physicalserver,
          ),
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
    case ActionType.ADD_COMPONENT_TO_PHYSICALSERVER:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          physicalservers: state.physicalservers!.map((physicalserver) =>
            physicalserver.id === action.data.id
              ? {
                  ...physicalserver,
                  ...action.data,
                }
              : physicalserver,
          ),
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
    case ActionType.GET_PHYSICALSERVER:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          physicalserver: action.data,
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
    case ActionType.CREATE_PHYSICALSERVER:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          physicalservers: state.physicalservers?.concat(action.data),
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
    case ActionType.GET_PHYSICALSERVERS:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          physicalservers: action.data,
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
    case ActionType.MOVE_PHYSICALSERVER:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          physicalservers: state.physicalservers!.map((physicalserver) =>
            physicalserver.id === action.data.id
              ? { ...action.data }
              : physicalserver,
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

    case ActionType.UPDATE_PHYSICALSERVER:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          physicalservers: state.physicalservers!.map((physicalserver) =>
            physicalserver.id === action.data.id
              ? { ...action.data }
              : physicalserver,
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
