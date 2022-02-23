import { AsyncActionMode } from 'common/models'
import {
  BillVatSummaryParams,
  BillVatSummaryDetails,
  BillVatSummaryError,
} from '../models'

export enum ActionType {
  GET_BILLVATSUMMARY_BY_BILL = 'GET_BILLVATSUMMARY_BY_BILL',
  CREATE_BILLVATSUMMARY = 'CREATE_BILLVATSUMMARY',
  GET_BILLVATSUMMARY = 'GET_BILLVATSUMMARY',
  UPDATE_BILLVATSUMMARY = 'UPDATE_BILLVATSUMMARY',
  DELETE_BILLVATSUMMARY = 'DELETE_BILLVATSUMMARY',
}

export type BillVatSummaryActions =
  | GetBillVatSummaryByBillRequestAction
  | GetBillVatSummaryByBillResponseAction
  | GetBillVatSummaryByBillErrorAction
  | CreateBillVatSummaryRequestAction
  | CreateBillVatSummaryResponseAction
  | CreateBillVatSummaryErrorAction
  | GetBillVatSummaryRequestAction
  | GetBillVatSummaryResponseAction
  | GetBillVatSummaryErrorAction
  | UpdateBillVatSummaryRequestAction
  | UpdateBillVatSummaryResponseAction
  | UpdateBillVatSummaryErrorAction
  | DeleteBillVatSummaryRequestAction
  | DeleteBillVatSummaryResponseAction
  | DeleteBillVatSummaryErrorAction

export class GetBillVatSummaryByBillRequestAction {
  readonly type = ActionType.GET_BILLVATSUMMARY
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetBillVatSummaryByBillResponseAction {
  readonly type = ActionType.GET_BILLVATSUMMARY
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetBillVatSummaryByBillRequestAction,
    public data: BillVatSummaryDetails[],
  ) {}
}
export class GetBillVatSummaryByBillErrorAction {
  readonly type = ActionType.GET_BILLVATSUMMARY
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetBillVatSummaryByBillRequestAction,
    public error: BillVatSummaryError,
  ) {}
}

export class CreateBillVatSummaryRequestAction {
  readonly type = ActionType.CREATE_BILLVATSUMMARY
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: BillVatSummaryParams) {}
}
export class CreateBillVatSummaryResponseAction {
  readonly type = ActionType.CREATE_BILLVATSUMMARY
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateBillVatSummaryRequestAction,
    public data: BillVatSummaryDetails[],
  ) {}
}
export class CreateBillVatSummaryErrorAction {
  readonly type = ActionType.CREATE_BILLVATSUMMARY
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateBillVatSummaryRequestAction,
    public error: BillVatSummaryError,
  ) {}
}

export class GetBillVatSummaryRequestAction {
  readonly type = ActionType.GET_BILLVATSUMMARY
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetBillVatSummaryResponseAction {
  readonly type = ActionType.GET_BILLVATSUMMARY
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetBillVatSummaryRequestAction,
    public data: BillVatSummaryDetails[],
  ) {}
}
export class GetBillVatSummaryErrorAction {
  readonly type = ActionType.GET_BILLVATSUMMARY
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetBillVatSummaryRequestAction,
    public error: BillVatSummaryError,
  ) {}
}

export class UpdateBillVatSummaryRequestAction {
  readonly type = ActionType.UPDATE_BILLVATSUMMARY
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: BillVatSummaryParams) {}
}
export class UpdateBillVatSummaryResponseAction {
  readonly type = ActionType.UPDATE_BILLVATSUMMARY
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateBillVatSummaryRequestAction,
    public data: BillVatSummaryDetails,
  ) {}
}
export class UpdateBillVatSummaryErrorAction {
  readonly type = ActionType.UPDATE_BILLVATSUMMARY
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateBillVatSummaryRequestAction,
    public error: BillVatSummaryError,
  ) {}
}

export class DeleteBillVatSummaryRequestAction {
  readonly type = ActionType.DELETE_BILLVATSUMMARY
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class DeleteBillVatSummaryResponseAction {
  readonly type = ActionType.DELETE_BILLVATSUMMARY
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteBillVatSummaryRequestAction,
    public data: BillVatSummaryDetails[],
  ) {}
}
export class DeleteBillVatSummaryErrorAction {
  readonly type = ActionType.DELETE_BILLVATSUMMARY
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteBillVatSummaryRequestAction,
    public error: BillVatSummaryError,
  ) {}
}
