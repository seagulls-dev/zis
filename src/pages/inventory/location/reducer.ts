import { ActionType, InventoryLocationActions } from './actions'
import { AsyncActionMode } from 'common/models'
import { InventoryLocationState } from './models'

const INVENTORY_LOCATIONSLOCATION_INITIAL_STATE: InventoryLocationState = {
  isLoading: false,
  error: undefined,
}

export default (
  state = INVENTORY_LOCATIONSLOCATION_INITIAL_STATE,
  action: InventoryLocationActions,
): InventoryLocationState => {
  switch (action.type) {
    case ActionType.GET_INVENTORY_LOCATIONS:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          inventorylocation: action.data,
          isLoading: false,
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          error: action.error,
          isLoading: false,
        }
      }
      break
  }
  return state
}
