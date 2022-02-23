import { AsyncActionMode } from 'common/models'
import {
  InvoiceCostAllocationParams,
  InvoiceCostAllocationDetails,
  InvoiceCostAllocationError,
} from '../models'

export enum ActionType {
  CREATE_INVOICE_COSTALLOCATION = 'CREATE_INVOICE_COSTALLOCATION',
  GET_INVOICE_COSTALLOCATIONS = 'GET_INVOICE_COSTALLOCATIONS',
  GET_INVOICE_COSTALLOCATIONS_BY_INVOICE = 'GET_INVOICE_COSTALLOCATIONS_BY_INVOICE',
  GET_INVOICE_COSTALLOCATIONS_BY_CATEGORY = 'GET_INVOICE_COSTALLOCATIONS_BY_CATEGORY',
  GET_INVOICE_COSTALLOCATION = 'GET_INVOICE_COSTALLOCATION',
  UPDATE_INVOICE_COSTALLOCATION = 'UPDATE_INVOICE_COSTALLOCATION',
  DELETE_INVOICE_COSTALLOCATION = 'DELETE_INVOICE_COSTALLOCATION',
}

export type InvoiceCostAllocationActions =
  | CreateInvoiceCostAllocationRequestAction
  | CreateInvoiceCostAllocationResponseAction
  | CreateInvoiceCostAllocationErrorAction
  | GetInvoiceCostAllocationsRequestAction
  | GetInvoiceCostAllocationsResponseAction
  | GetInvoiceCostAllocationsErrorAction
  | GetInvoiceCostAllocationRequestAction
  | GetInvoiceCostAllocationResponseAction
  | GetInvoiceCostAllocationErrorAction
  | GetInvoiceCostAllocationByInvoiceRequestAction
  | GetInvoiceCostAllocationByInvoiceResponseAction
  | GetInvoiceCostAllocationByInvoiceErrorAction
  | GetInvoiceCostAllocationByCategoryRequestAction
  | GetInvoiceCostAllocationByCategoryResponseAction
  | GetInvoiceCostAllocationByCategoryErrorAction
  | UpdateInvoiceCostAllocationRequestAction
  | UpdateInvoiceCostAllocationResponseAction
  | UpdateInvoiceCostAllocationErrorAction
  | DeleteInvoiceCostAllocationRequestAction
  | DeleteInvoiceCostAllocationResponseAction
  | DeleteInvoiceCostAllocationErrorAction

export class GetInvoiceCostAllocationByCategoryRequestAction {
  readonly type = ActionType.GET_INVOICE_COSTALLOCATIONS_BY_CATEGORY
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetInvoiceCostAllocationByCategoryResponseAction {
  readonly type = ActionType.GET_INVOICE_COSTALLOCATIONS_BY_CATEGORY
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetInvoiceCostAllocationByCategoryRequestAction,
    public data: InvoiceCostAllocationDetails[],
  ) {}
}
export class GetInvoiceCostAllocationByCategoryErrorAction {
  readonly type = ActionType.GET_INVOICE_COSTALLOCATIONS_BY_CATEGORY
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetInvoiceCostAllocationByCategoryRequestAction,
    public error: InvoiceCostAllocationError,
  ) {}
}

export class GetInvoiceCostAllocationByInvoiceRequestAction {
  readonly type = ActionType.GET_INVOICE_COSTALLOCATIONS_BY_INVOICE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetInvoiceCostAllocationByInvoiceResponseAction {
  readonly type = ActionType.GET_INVOICE_COSTALLOCATIONS_BY_INVOICE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetInvoiceCostAllocationByInvoiceRequestAction,
    public data: InvoiceCostAllocationDetails[],
  ) {}
}
export class GetInvoiceCostAllocationByInvoiceErrorAction {
  readonly type = ActionType.GET_INVOICE_COSTALLOCATIONS_BY_INVOICE
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetInvoiceCostAllocationByInvoiceRequestAction,
    public error: InvoiceCostAllocationError,
  ) {}
}

export class CreateInvoiceCostAllocationRequestAction {
  readonly type = ActionType.CREATE_INVOICE_COSTALLOCATION
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: InvoiceCostAllocationParams) {}
}
export class CreateInvoiceCostAllocationResponseAction {
  readonly type = ActionType.CREATE_INVOICE_COSTALLOCATION
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateInvoiceCostAllocationRequestAction,
    public data: InvoiceCostAllocationDetails,
  ) {}
}
export class CreateInvoiceCostAllocationErrorAction {
  readonly type = ActionType.CREATE_INVOICE_COSTALLOCATION
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateInvoiceCostAllocationRequestAction,
    public error: InvoiceCostAllocationError,
  ) {}
}

export class GetInvoiceCostAllocationRequestAction {
  readonly type = ActionType.GET_INVOICE_COSTALLOCATION
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetInvoiceCostAllocationResponseAction {
  readonly type = ActionType.GET_INVOICE_COSTALLOCATION
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetInvoiceCostAllocationRequestAction,
    public data: InvoiceCostAllocationDetails,
  ) {}
}
export class GetInvoiceCostAllocationErrorAction {
  readonly type = ActionType.GET_INVOICE_COSTALLOCATION
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetInvoiceCostAllocationRequestAction,
    public error: InvoiceCostAllocationError,
  ) {}
}

export class GetInvoiceCostAllocationsRequestAction {
  readonly type = ActionType.GET_INVOICE_COSTALLOCATIONS
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetInvoiceCostAllocationsResponseAction {
  readonly type = ActionType.GET_INVOICE_COSTALLOCATIONS
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetInvoiceCostAllocationsRequestAction,
    public data: InvoiceCostAllocationDetails[],
  ) {}
}
export class GetInvoiceCostAllocationsErrorAction {
  readonly type = ActionType.GET_INVOICE_COSTALLOCATIONS
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetInvoiceCostAllocationsRequestAction,
    public error: InvoiceCostAllocationError,
  ) {}
}

export class UpdateInvoiceCostAllocationRequestAction {
  readonly type = ActionType.UPDATE_INVOICE_COSTALLOCATION
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: InvoiceCostAllocationParams) {}
}
export class UpdateInvoiceCostAllocationResponseAction {
  readonly type = ActionType.UPDATE_INVOICE_COSTALLOCATION
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateInvoiceCostAllocationRequestAction,
    public data: InvoiceCostAllocationDetails,
  ) {}
}
export class UpdateInvoiceCostAllocationErrorAction {
  readonly type = ActionType.UPDATE_INVOICE_COSTALLOCATION
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateInvoiceCostAllocationRequestAction,
    public error: InvoiceCostAllocationError,
  ) {}
}

export class DeleteInvoiceCostAllocationRequestAction {
  readonly type = ActionType.DELETE_INVOICE_COSTALLOCATION
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class DeleteInvoiceCostAllocationResponseAction {
  readonly type = ActionType.DELETE_INVOICE_COSTALLOCATION
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteInvoiceCostAllocationRequestAction,
    public data: InvoiceCostAllocationDetails,
  ) {}
}
export class DeleteInvoiceCostAllocationErrorAction {
  readonly type = ActionType.DELETE_INVOICE_COSTALLOCATION
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteInvoiceCostAllocationRequestAction,
    public error: InvoiceCostAllocationError,
  ) {}
}
