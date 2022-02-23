import { AsyncActionMode } from 'common/models'
import {
  CreateInventoryParams,
  InventoryDetails,
  UpdateInventoryParams,
  InventoryError,
} from '../models'

export enum ActionType {
  CREATE_INVENTORY = 'CREATE_INVENTORY',
  GET_INVENTORIES = 'GET_INVENTORIES',
  GET_INVENTORY = 'GET_INVENTORY',
  UPDATE_INVENTORY = 'UPDATE_INVENTORY',
  DELETE_INVENTORY = 'DELETE_INVENTORY',
}

export type InventoryActions =
  | CreateInventoryRequestAction
  | CreateInventoryResponseAction
  | CreateInventoryErrorAction
  | GetInventoriesRequestAction
  | GetInventoriesResponseAction
  | GetInventoriesErrorAction
  | GetInventoryRequestAction
  | GetInventoryResponseAction
  | GetInventoryErrorAction
  | UpdateInventoryRequestAction
  | UpdateInventoryResponseAction
  | UpdateInventoryErrorAction
  | DeleteInventoryRequestAction
  | DeleteInventoryResponseAction
  | DeleteInventoryErrorAction

export class CreateInventoryRequestAction {
  readonly type = ActionType.CREATE_INVENTORY
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CreateInventoryParams) {}
}
export class CreateInventoryResponseAction {
  readonly type = ActionType.CREATE_INVENTORY
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateInventoryRequestAction,
    public data: InventoryDetails,
  ) {}
}
export class CreateInventoryErrorAction {
  readonly type = ActionType.CREATE_INVENTORY
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateInventoryRequestAction,
    public error: InventoryError,
  ) {}
}

export class GetInventoryRequestAction {
  readonly type = ActionType.GET_INVENTORY
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetInventoryResponseAction {
  readonly type = ActionType.GET_INVENTORY
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetInventoryRequestAction,
    public data: InventoryDetails,
  ) {}
}
export class GetInventoryErrorAction {
  readonly type = ActionType.GET_INVENTORY
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetInventoryRequestAction,
    public error: InventoryError,
  ) {}
}

export class GetInventoriesRequestAction {
  readonly type = ActionType.GET_INVENTORIES
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetInventoriesResponseAction {
  readonly type = ActionType.GET_INVENTORIES
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetInventoriesRequestAction,
    public data: InventoryDetails[],
  ) {}
}
export class GetInventoriesErrorAction {
  readonly type = ActionType.GET_INVENTORIES
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetInventoriesRequestAction,
    public error: InventoryError,
  ) {}
}

export class UpdateInventoryRequestAction {
  readonly type = ActionType.UPDATE_INVENTORY
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: UpdateInventoryParams) {}
}
export class UpdateInventoryResponseAction {
  readonly type = ActionType.UPDATE_INVENTORY
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateInventoryRequestAction,
    public data: InventoryDetails,
  ) {}
}
export class UpdateInventoryErrorAction {
  readonly type = ActionType.UPDATE_INVENTORY
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateInventoryRequestAction,
    public error: InventoryError,
  ) {}
}

export class DeleteInventoryRequestAction {
  readonly type = ActionType.DELETE_INVENTORY
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class DeleteInventoryResponseAction {
  readonly type = ActionType.DELETE_INVENTORY
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteInventoryRequestAction,
    public data: InventoryDetails,
  ) {}
}
export class DeleteInventoryErrorAction {
  readonly type = ActionType.DELETE_INVENTORY
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteInventoryRequestAction,
    public error: InventoryError,
  ) {}
}
