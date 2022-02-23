import { AsyncActionMode } from 'common/models'
import { InventoryTypeDetails, InventoryTypeError } from '../models'

export enum ActionType {
  GET_INVENTORY_TYPES = 'GET_INVENTORY_TYPES',
}

export type InventoryTypeActions =
  | GetInventoryTypesRequestAction
  | GetInventoryTypesResponseAction
  | GetInventoryTypesErrorAction

export class GetInventoryTypesRequestAction {
  readonly type = ActionType.GET_INVENTORY_TYPES
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetInventoryTypesResponseAction {
  readonly type = ActionType.GET_INVENTORY_TYPES
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetInventoryTypesRequestAction,
    public data: InventoryTypeDetails[],
  ) {}
}
export class GetInventoryTypesErrorAction {
  readonly type = ActionType.GET_INVENTORY_TYPES
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetInventoryTypesRequestAction,
    public error: InventoryTypeError,
  ) {}
}
