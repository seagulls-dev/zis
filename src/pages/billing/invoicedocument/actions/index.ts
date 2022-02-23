import { AsyncActionMode } from 'common/models'
import {
  CreateInvoiceDocumentParams, FinalizeDocumentParams,
  InvoiceDocumentDetails,
  InvoiceDocumentError,
} from '../models'
import {InvoiceDetails} from "../../invoice/models";

export enum ActionType {
  CREATE_INVOICEDOCUMENT = 'CREATE_INVOICEDOCUMENT',
  GET_INVOICEDOCUMENT_BY_INVOICE = 'GET_INVOICEDOCUMENT_BY_INVOICE',
  GET_INVOICEDOCUMENT = 'GET_INVOICEDOCUMENT',
  DELETE_INVOICEDOCUMENT = 'DELETE_INVOICEDOCUMENT',
  FINALIZE_DOCUMENT = 'FINALIZE DOCUMENT',
  GET_DOCUMENTCONTENT_BY_ID = 'GET_DOCUMENTCONTENT_BY_ID',
  GET_ATTACHMENTCONTENT_BY_ID = 'GET_ATTACHMENTCONTENT_BY_ID'
}

export type InvoiceDocumentActions =
  | CreateInvoiceDocumentRequestAction
  | CreateInvoiceDocumentResponseAction
  | CreateInvoiceDocumentErrorAction
  | FinalizeDocumentRequestAction
  | FinalizeDocumentResponseAction
  | FinalizeDocumentErrorAction
  | GetInvoiceDocumentByInvoiceRequestAction
  | GetInvoiceDocumentByInvoiceResponseAction
  | GetInvoiceDocumentByInvoiceErrorAction
  | GetInvoiceDocumentRequestAction
  | GetInvoiceDocumentResponseAction
  | GetInvoiceDocumentErrorAction
  | DeleteInvoiceDocumentRequestAction
  | DeleteInvoiceDocumentResponseAction
  | DeleteInvoiceDocumentErrorAction
  | GetDocumentContentRequestAction
  | GetDocumentContentResponseAction
  | GetDocumentContentErrorAction
  | GetAttachmentContentRequestAction
  | GetAttachmentContentResponseAction
  | GetAttachmentContentErrorAction

export class CreateInvoiceDocumentRequestAction {
  readonly type = ActionType.CREATE_INVOICEDOCUMENT
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CreateInvoiceDocumentParams) {}
}
export class CreateInvoiceDocumentResponseAction {
  readonly type = ActionType.CREATE_INVOICEDOCUMENT
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateInvoiceDocumentRequestAction,
    public data: InvoiceDocumentDetails,
  ) {}
}
export class CreateInvoiceDocumentErrorAction {
  readonly type = ActionType.CREATE_INVOICEDOCUMENT
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateInvoiceDocumentRequestAction,
    public error: InvoiceDocumentError,
  ) {}
}

export class FinalizeDocumentRequestAction {
  readonly type = ActionType.FINALIZE_DOCUMENT
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: FinalizeDocumentParams) {
  }
}

export class FinalizeDocumentResponseAction {
  readonly type = ActionType.FINALIZE_DOCUMENT
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: FinalizeDocumentRequestAction, public data: InvoiceDetails) {
  }
}

export class FinalizeDocumentErrorAction {
  readonly type = ActionType.FINALIZE_DOCUMENT
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: FinalizeDocumentRequestAction, public error: InvoiceDocumentError) {
  }
}

export class GetInvoiceDocumentRequestAction {
  readonly type = ActionType.GET_INVOICEDOCUMENT
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetInvoiceDocumentResponseAction {
  readonly type = ActionType.GET_INVOICEDOCUMENT
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetInvoiceDocumentRequestAction,
    public data: InvoiceDocumentDetails,
  ) {}
}
export class GetInvoiceDocumentErrorAction {
  readonly type = ActionType.GET_INVOICEDOCUMENT
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetInvoiceDocumentRequestAction,
    public error: InvoiceDocumentError,
  ) {}
}

export class GetDocumentContentRequestAction {
  readonly type = ActionType.GET_DOCUMENTCONTENT_BY_ID
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}

export class GetDocumentContentResponseAction {
  readonly type = ActionType.GET_DOCUMENTCONTENT_BY_ID
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: GetDocumentContentRequestAction, public data: string) {
  }
}

export class GetDocumentContentErrorAction {
  readonly type = ActionType.GET_DOCUMENTCONTENT_BY_ID
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GetDocumentContentRequestAction, public error: InvoiceDocumentError) {
  }
}

export class GetAttachmentContentRequestAction {
  readonly type = ActionType.GET_ATTACHMENTCONTENT_BY_ID
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}

export class GetAttachmentContentResponseAction {
  readonly type = ActionType.GET_ATTACHMENTCONTENT_BY_ID
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: GetAttachmentContentRequestAction, public data: string) {
  }
}

export class GetAttachmentContentErrorAction {
  readonly type = ActionType.GET_ATTACHMENTCONTENT_BY_ID
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GetAttachmentContentRequestAction, public error: InvoiceDocumentError) {
  }
}

export class GetInvoiceDocumentByInvoiceRequestAction {
  readonly type = ActionType.GET_INVOICEDOCUMENT_BY_INVOICE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetInvoiceDocumentByInvoiceResponseAction {
  readonly type = ActionType.GET_INVOICEDOCUMENT_BY_INVOICE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetInvoiceDocumentByInvoiceRequestAction,
    public data: InvoiceDocumentDetails,
  ) {}
}
export class GetInvoiceDocumentByInvoiceErrorAction {
  readonly type = ActionType.GET_INVOICEDOCUMENT_BY_INVOICE
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetInvoiceDocumentByInvoiceRequestAction,
    public error: InvoiceDocumentError,
  ) {}
}

export class DeleteInvoiceDocumentRequestAction {
  readonly type = ActionType.DELETE_INVOICEDOCUMENT
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class DeleteInvoiceDocumentResponseAction {
  readonly type = ActionType.DELETE_INVOICEDOCUMENT
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteInvoiceDocumentRequestAction,
    public data: InvoiceDocumentDetails,
  ) {}
}
export class DeleteInvoiceDocumentErrorAction {
  readonly type = ActionType.DELETE_INVOICEDOCUMENT
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteInvoiceDocumentRequestAction,
    public error: InvoiceDocumentError,
  ) {}
}
