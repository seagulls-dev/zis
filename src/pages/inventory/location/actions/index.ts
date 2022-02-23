import { AsyncActionMode } from 'common/models'
import { InventoryLocationDetails, InventoryLocationError } from '../models'

export enum ActionType {
  GET_INVENTORY_LOCATIONS = 'GET_INVENTORY_LOCATIONS',
}

export type InventoryLocationActions =
  | GetInventoryLocationsRequestAction
  | GetInventoryLocationsResponseAction
  | GetInventoryLocationsErrorAction

export class GetInventoryLocationsRequestAction {
  readonly type = ActionType.GET_INVENTORY_LOCATIONS
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetInventoryLocationsResponseAction {
  readonly type = ActionType.GET_INVENTORY_LOCATIONS
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetInventoryLocationsRequestAction,
    public data: InventoryLocationDetails[],
  ) {}
}
export class GetInventoryLocationsErrorAction {
  readonly type = ActionType.GET_INVENTORY_LOCATIONS
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetInventoryLocationsRequestAction,
    public error: InventoryLocationError,
  ) {}
}
