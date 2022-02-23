import { AsyncActionMode } from 'common/models'
import {
  CreateCostAllocationParams,
  UpdateCostAllocationParams,
  CostAllocationDetails,
  CostAllocationError,
} from '../models'

export enum ActionType {
  CREATE_COSTALLOCATION = 'CREATE_COSTALLOCATION',
  GET_COSTALLOCATIONS = 'GET_COSTALLOCATIONS',
  GET_COSTALLOCATION = 'GET_COSTALLOCATION',
  UPDATE_COSTALLOCATION = 'UPDATE_COSTALLOCATION',
  DELETE_COSTALLOCATION = 'DELETE_COSTALLOCATION',
}

export type CostAllocationActions =
  | CreateCostAllocationRequestAction
  | CreateCostAllocationResponseAction
  | CreateCostAllocationErrorAction
  | GetCostAllocationsRequestAction
  | GetCostAllocationsResponseAction
  | GetCostAllocationsErrorAction
  | GetCostAllocationRequestAction
  | GetCostAllocationResponseAction
  | GetCostAllocationErrorAction
  | UpdateCostAllocationRequestAction
  | UpdateCostAllocationResponseAction
  | UpdateCostAllocationErrorAction
  | DeleteCostAllocationRequestAction
  | DeleteCostAllocationResponseAction
  | DeleteCostAllocationErrorAction

export class CreateCostAllocationRequestAction {
  readonly type = ActionType.CREATE_COSTALLOCATION
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CreateCostAllocationParams) {}
}
export class CreateCostAllocationResponseAction {
  readonly type = ActionType.CREATE_COSTALLOCATION
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateCostAllocationRequestAction,
    public data: CostAllocationDetails,
  ) {}
}
export class CreateCostAllocationErrorAction {
  readonly type = ActionType.CREATE_COSTALLOCATION
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateCostAllocationRequestAction,
    public error: CostAllocationError,
  ) {}
}

export class GetCostAllocationRequestAction {
  readonly type = ActionType.GET_COSTALLOCATION
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetCostAllocationResponseAction {
  readonly type = ActionType.GET_COSTALLOCATION
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetCostAllocationRequestAction,
    public data: CostAllocationDetails,
  ) {}
}
export class GetCostAllocationErrorAction {
  readonly type = ActionType.GET_COSTALLOCATION
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetCostAllocationRequestAction,
    public error: CostAllocationError,
  ) {}
}

export class GetCostAllocationsRequestAction {
  readonly type = ActionType.GET_COSTALLOCATIONS
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetCostAllocationsResponseAction {
  readonly type = ActionType.GET_COSTALLOCATIONS
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetCostAllocationsRequestAction,
    public data: CostAllocationDetails[],
  ) {}
}
export class GetCostAllocationsErrorAction {
  readonly type = ActionType.GET_COSTALLOCATIONS
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetCostAllocationsRequestAction,
    public error: CostAllocationError,
  ) {}
}

export class UpdateCostAllocationRequestAction {
  readonly type = ActionType.UPDATE_COSTALLOCATION
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: UpdateCostAllocationParams) {}
}
export class UpdateCostAllocationResponseAction {
  readonly type = ActionType.UPDATE_COSTALLOCATION
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateCostAllocationRequestAction,
    public data: CostAllocationDetails,
  ) {}
}
export class UpdateCostAllocationErrorAction {
  readonly type = ActionType.UPDATE_COSTALLOCATION
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateCostAllocationRequestAction,
    public error: CostAllocationError,
  ) {}
}

export class DeleteCostAllocationRequestAction {
  readonly type = ActionType.DELETE_COSTALLOCATION
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class DeleteCostAllocationResponseAction {
  readonly type = ActionType.DELETE_COSTALLOCATION
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteCostAllocationRequestAction,
    public data: CostAllocationDetails,
  ) {}
}
export class DeleteCostAllocationErrorAction {
  readonly type = ActionType.DELETE_COSTALLOCATION
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteCostAllocationRequestAction,
    public error: CostAllocationError,
  ) {}
}
