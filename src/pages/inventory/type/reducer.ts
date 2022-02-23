import { ActionType, InventoryTypeActions } from './actions'
import { AsyncActionMode } from 'common/models'
import { InventoryTypeState } from './models'

const GET_INVENTORY_TYPES_INITIAL_STATE: InventoryTypeState = {
  error: undefined,
}

export default (
  state = GET_INVENTORY_TYPES_INITIAL_STATE,
  action: InventoryTypeActions,
): InventoryTypeState => {
  switch (action.type) {
    case ActionType.GET_INVENTORY_TYPES:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          inventorytype: action.data,
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          error: action.error,
        }
      }
      break
  }
  return state
}
