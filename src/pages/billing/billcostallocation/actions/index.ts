import { AsyncActionMode } from 'common/models'
import {
  BillCostAllocationParams,
  BillCostAllocationDetails,
  BillCostAllocationError,
} from '../models'

export enum ActionType {
  CREATE_BILL_COSTALLOCATION = 'CREATE_BILL_COSTALLOCATION',
  GET_BILL_COSTALLOCATIONS = 'GET_BILL_COSTALLOCATIONS',
  GET_BILL_COSTALLOCATIONS_BY_CATEGORY = 'GET_BILL_COSTALLOCATIONS_BY_CATEGORY',
  GET_BILL_COSTALLOCATION = 'GET_BILL_COSTALLOCATION',
  UPDATE_BILL_COSTALLOCATION = 'UPDATE_BILL_COSTALLOCATION',
  DELETE_BILL_COSTALLOCATION = 'DELETE_BILL_COSTALLOCATION',
  GET_BILL_COSTALLOCATIONS_BY_BILL = 'GET_BILL_COSTALLOCATIONS_BY_BILL',
}

export type BillCostAllocationActions =
  | CreateBillCostAllocationRequestAction
  | CreateBillCostAllocationResponseAction
  | CreateBillCostAllocationErrorAction
  | GetBillCostAllocationsRequestAction
  | GetBillCostAllocationsResponseAction
  | GetBillCostAllocationsErrorAction
  | GetBillCostAllocationRequestAction
  | GetBillCostAllocationResponseAction
  | GetBillCostAllocationErrorAction
  | GetBillCostAllocationByCategoryRequestAction
  | GetBillCostAllocationByCategoryResponseAction
  | GetBillCostAllocationByCategoryErrorAction
  | UpdateBillCostAllocationRequestAction
  | UpdateBillCostAllocationResponseAction
  | UpdateBillCostAllocationErrorAction
  | DeleteBillCostAllocationRequestAction
  | DeleteBillCostAllocationResponseAction
  | DeleteBillCostAllocationErrorAction
  | GetBillCostAllocationByBillRequestAction
  | GetBillCostAllocationByBillResponseAction
  | GetBillCostAllocationByBillErrorAction

export class GetBillCostAllocationByBillRequestAction {
  readonly type = ActionType.GET_BILL_COSTALLOCATIONS_BY_BILL
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetBillCostAllocationByBillResponseAction {
  readonly type = ActionType.GET_BILL_COSTALLOCATIONS_BY_BILL
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetBillCostAllocationByBillRequestAction,
    public data: BillCostAllocationDetails[],
  ) {}
}
export class GetBillCostAllocationByBillErrorAction {
  readonly type = ActionType.GET_BILL_COSTALLOCATIONS_BY_BILL
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetBillCostAllocationByBillRequestAction,
    public error: BillCostAllocationError,
  ) {}
}

export class GetBillCostAllocationByCategoryRequestAction {
  readonly type = ActionType.GET_BILL_COSTALLOCATIONS_BY_CATEGORY
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetBillCostAllocationByCategoryResponseAction {
  readonly type = ActionType.GET_BILL_COSTALLOCATIONS_BY_CATEGORY
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetBillCostAllocationByCategoryRequestAction,
    public data: BillCostAllocationDetails[],
  ) {}
}
export class GetBillCostAllocationByCategoryErrorAction {
  readonly type = ActionType.GET_BILL_COSTALLOCATIONS_BY_CATEGORY
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetBillCostAllocationByCategoryRequestAction,
    public error: BillCostAllocationError,
  ) {}
}

export class CreateBillCostAllocationRequestAction {
  readonly type = ActionType.CREATE_BILL_COSTALLOCATION
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: BillCostAllocationParams) {}
}
export class CreateBillCostAllocationResponseAction {
  readonly type = ActionType.CREATE_BILL_COSTALLOCATION
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateBillCostAllocationRequestAction,
    public data: BillCostAllocationDetails,
  ) {}
}
export class CreateBillCostAllocationErrorAction {
  readonly type = ActionType.CREATE_BILL_COSTALLOCATION
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateBillCostAllocationRequestAction,
    public error: BillCostAllocationError,
  ) {}
}

export class GetBillCostAllocationRequestAction {
  readonly type = ActionType.GET_BILL_COSTALLOCATION
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetBillCostAllocationResponseAction {
  readonly type = ActionType.GET_BILL_COSTALLOCATION
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetBillCostAllocationRequestAction,
    public data: BillCostAllocationDetails,
  ) {}
}
export class GetBillCostAllocationErrorAction {
  readonly type = ActionType.GET_BILL_COSTALLOCATION
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetBillCostAllocationRequestAction,
    public error: BillCostAllocationError,
  ) {}
}

export class GetBillCostAllocationsRequestAction {
  readonly type = ActionType.GET_BILL_COSTALLOCATIONS
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetBillCostAllocationsResponseAction {
  readonly type = ActionType.GET_BILL_COSTALLOCATIONS
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetBillCostAllocationsRequestAction,
    public data: BillCostAllocationDetails[],
  ) {}
}
export class GetBillCostAllocationsErrorAction {
  readonly type = ActionType.GET_BILL_COSTALLOCATIONS
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetBillCostAllocationsRequestAction,
    public error: BillCostAllocationError,
  ) {}
}

export class UpdateBillCostAllocationRequestAction {
  readonly type = ActionType.UPDATE_BILL_COSTALLOCATION
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: BillCostAllocationParams) {}
}
export class UpdateBillCostAllocationResponseAction {
  readonly type = ActionType.UPDATE_BILL_COSTALLOCATION
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateBillCostAllocationRequestAction,
    public data: BillCostAllocationDetails,
  ) {}
}
export class UpdateBillCostAllocationErrorAction {
  readonly type = ActionType.UPDATE_BILL_COSTALLOCATION
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateBillCostAllocationRequestAction,
    public error: BillCostAllocationError,
  ) {}
}

export class DeleteBillCostAllocationRequestAction {
  readonly type = ActionType.DELETE_BILL_COSTALLOCATION
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class DeleteBillCostAllocationResponseAction {
  readonly type = ActionType.DELETE_BILL_COSTALLOCATION
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteBillCostAllocationRequestAction,
    public data: BillCostAllocationDetails,
  ) {}
}
export class DeleteBillCostAllocationErrorAction {
  readonly type = ActionType.DELETE_BILL_COSTALLOCATION
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteBillCostAllocationRequestAction,
    public error: BillCostAllocationError,
  ) {}
}
