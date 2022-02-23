import { AsyncActionMode } from 'common/models'
import { BillParams, BillDetails, BillError } from '../models'

export enum ActionType {
  CREATE_BILL = 'CREATE_BILL',
  GET_BILLS = 'GET_BILLS',
  GET_BILL = 'GET_BILL',
  UPDATE_BILL = 'UPDATE_BILL',
  DELETE_BILL = 'DELETE_BILL',
}

export type BillActions =
  | CreateBillRequestAction
  | CreateBillResponseAction
  | CreateBillErrorAction
  | GetBillsRequestAction
  | GetBillsResponseAction
  | GetBillsErrorAction
  | GetBillRequestAction
  | GetBillResponseAction
  | GetBillErrorAction
  | UpdateBillRequestAction
  | UpdateBillResponseAction
  | UpdateBillErrorAction
  | DeleteBillRequestAction
  | DeleteBillResponseAction
  | DeleteBillErrorAction

export class CreateBillRequestAction {
  readonly type = ActionType.CREATE_BILL
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: BillParams) {}
}
export class CreateBillResponseAction {
  readonly type = ActionType.CREATE_BILL
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateBillRequestAction,
    public data: BillDetails,
  ) {}
}
export class CreateBillErrorAction {
  readonly type = ActionType.CREATE_BILL
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateBillRequestAction,
    public error: BillError,
  ) {}
}

export class GetBillRequestAction {
  readonly type = ActionType.GET_BILL
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetBillResponseAction {
  readonly type = ActionType.GET_BILL
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: GetBillRequestAction, public data: BillDetails) {}
}
export class GetBillErrorAction {
  readonly type = ActionType.GET_BILL
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GetBillRequestAction, public error: BillError) {}
}

export class GetBillsRequestAction {
  readonly type = ActionType.GET_BILLS
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetBillsResponseAction {
  readonly type = ActionType.GET_BILLS
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetBillsRequestAction,
    public data: BillDetails[],
  ) {}
}
export class GetBillsErrorAction {
  readonly type = ActionType.GET_BILLS
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GetBillsRequestAction, public error: BillError) {}
}

export class UpdateBillRequestAction {
  readonly type = ActionType.UPDATE_BILL
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: BillParams) {}
}
export class UpdateBillResponseAction {
  readonly type = ActionType.UPDATE_BILL
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateBillRequestAction,
    public data: BillDetails,
  ) {}
}
export class UpdateBillErrorAction {
  readonly type = ActionType.UPDATE_BILL
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateBillRequestAction,
    public error: BillError,
  ) {}
}

export class DeleteBillRequestAction {
  readonly type = ActionType.DELETE_BILL
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class DeleteBillResponseAction {
  readonly type = ActionType.DELETE_BILL
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteBillRequestAction,
    public data: BillDetails,
  ) {}
}
export class DeleteBillErrorAction {
  readonly type = ActionType.DELETE_BILL
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteBillRequestAction,
    public error: BillError,
  ) {}
}
