import { AsyncActionMode } from 'common/models'
import {
  CreateInvoiceAttachmentParams,
  InvoiceAttachmentDetails,
  InvoiceAttachmentError,
} from '../models'

export enum ActionType {
  CREATE_INVOICEATTACHMENT = 'CREATE_INVOICEATTACHMENT',
  GET_INVOICEATTACHMENTS = 'GET_INVOICEATTACHMENTS',
  GET_INVOICEATTACHMENT = 'GET_INVOICEATTACHMENT',
  DELETE_INVOICEATTACHMENT = 'DELETE_INVOICEATTACHMENT',
}

export type InvoiceAttachmentActions =
  | CreateInvoiceAttachmentRequestAction
  | CreateInvoiceAttachmentResponseAction
  | CreateInvoiceAttachmentErrorAction
  | GetInvoiceAttachmentsRequestAction
  | GetInvoiceAttachmentsResponseAction
  | GetInvoiceAttachmentsErrorAction
  | GetInvoiceAttachmentRequestAction
  | GetInvoiceAttachmentResponseAction
  | GetInvoiceAttachmentErrorAction
  | DeleteInvoiceAttachmentRequestAction
  | DeleteInvoiceAttachmentResponseAction
  | DeleteInvoiceAttachmentErrorAction

export class CreateInvoiceAttachmentRequestAction {
  readonly type = ActionType.CREATE_INVOICEATTACHMENT
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CreateInvoiceAttachmentParams) {}
}
export class CreateInvoiceAttachmentResponseAction {
  readonly type = ActionType.CREATE_INVOICEATTACHMENT
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateInvoiceAttachmentRequestAction,
    public data: InvoiceAttachmentDetails,
  ) {}
}
export class CreateInvoiceAttachmentErrorAction {
  readonly type = ActionType.CREATE_INVOICEATTACHMENT
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateInvoiceAttachmentRequestAction,
    public error: InvoiceAttachmentError,
  ) {}
}

export class GetInvoiceAttachmentRequestAction {
  readonly type = ActionType.GET_INVOICEATTACHMENT
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetInvoiceAttachmentResponseAction {
  readonly type = ActionType.GET_INVOICEATTACHMENT
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetInvoiceAttachmentRequestAction,
    public data: InvoiceAttachmentDetails,
  ) {}
}
export class GetInvoiceAttachmentErrorAction {
  readonly type = ActionType.GET_INVOICEATTACHMENT
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetInvoiceAttachmentRequestAction,
    public error: InvoiceAttachmentError,
  ) {}
}

export class GetInvoiceAttachmentsRequestAction {
  readonly type = ActionType.GET_INVOICEATTACHMENTS
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetInvoiceAttachmentsResponseAction {
  readonly type = ActionType.GET_INVOICEATTACHMENTS
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetInvoiceAttachmentsRequestAction,
    public data: InvoiceAttachmentDetails[],
  ) {}
}
export class GetInvoiceAttachmentsErrorAction {
  readonly type = ActionType.GET_INVOICEATTACHMENTS
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetInvoiceAttachmentsRequestAction,
    public error: InvoiceAttachmentError,
  ) {}
}

export class DeleteInvoiceAttachmentRequestAction {
  readonly type = ActionType.DELETE_INVOICEATTACHMENT
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class DeleteInvoiceAttachmentResponseAction {
  readonly type = ActionType.DELETE_INVOICEATTACHMENT
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteInvoiceAttachmentRequestAction,
    public data: InvoiceAttachmentDetails,
  ) {}
}
export class DeleteInvoiceAttachmentErrorAction {
  readonly type = ActionType.DELETE_INVOICEATTACHMENT
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteInvoiceAttachmentRequestAction,
    public error: InvoiceAttachmentError,
  ) {}
}
