import { ActionType, InventoryActions } from './actions'
import { AsyncActionMode } from 'common/models'
import { InventoryState } from './models'

const INVENTORY_INITIAL_STATE: InventoryState = {
  isLoading: false,
  isSaving: false,
  error: undefined,
}

export default (
  state = INVENTORY_INITIAL_STATE,
  action: InventoryActions,
): InventoryState => {
  switch (action.type) {
    case ActionType.GET_INVENTORY:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          inventory: action.data,
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
    case ActionType.CREATE_INVENTORY:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          inventories: state.inventories?.concat(action.data),
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
    case ActionType.GET_INVENTORIES:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          inventories: action.data,
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
    case ActionType.DELETE_INVENTORY:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          inventories: state.inventories!.filter(
            (inventory) => inventory.id !== action.request.id,
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

    case ActionType.UPDATE_INVENTORY:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isSaving: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          inventories: state.inventories!.map((inventory) =>
            inventory.id === action.data.id ? { ...action.data } : inventory,
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
