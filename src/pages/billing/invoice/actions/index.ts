import { AsyncActionMode } from 'common/models'
import {
  CreateInvoiceParams,
  InvoiceDetails,
  InvoiceError,
  UpdateInvoiceParams,
  CreateInvoiceItemParams,
  InvoiceItemDetails,
  InvoiceItemError,
  UpdateInvoiceItemParams,
  GenerateInvoiceParams,
  CreateInvoiceMailParams,
  InvoiceMailDetail,
  InvoiceSentMailDetail,
  SendInvoiceMailParams
} from '../models'

export enum ActionType {
  CREATE_INVOICE = 'CREATE_INVOICE',
  GET_INVOICES = 'GET_INVOICES',
  GET_INVOICE = 'GET_INVOICE',
  UPDATE_INVOICE = 'UPDATE_INVOICE',
  DELETE_INVOICE = 'DELETE_INVOICE',
  CREATE_INVOICE_ITEM = 'CREATE_INVOICE_ITEM',
  GET_INVOICE_ITEMS = 'GET_INVOICE_ITEMS',
  UPDATE_INVOICE_ITEM = 'UPDATE_INVOICE_ITEM',
  DELETE_INVOICE_ITEM = 'DELETE_INVOICE_ITEM',
  GENERATE_INVOICE = 'GENERATE_INVOICE',
  CREATE_INVOICE_MAIL  = 'CREATE_INVOICE_MAIL',
  SEND_INVOICE_MAIL = 'SEND_INVOICE_MAIL'
}

export type InvoiceActions =
  | CreateInvoiceRequestAction
  | CreateInvoiceResponseAction
  | CreateInvoiceErrorAction
  | GetInvoicesRequestAction
  | GetInvoicesResponseAction
  | GetInvoicesErrorAction
  | GetInvoiceRequestAction
  | GetInvoiceResponseAction
  | GetInvoiceErrorAction
  | UpdateInvoiceRequestAction
  | UpdateInvoiceResponseAction
  | UpdateInvoiceErrorAction
  | DeleteInvoiceRequestAction
  | DeleteInvoiceResponseAction
  | DeleteInvoiceErrorAction
  | CreateInvoiceItemRequestAction
  | CreateInvoiceItemResponseAction
  | CreateInvoiceItemErrorAction
  | GetInvoiceItemsRequestAction
  | GetInvoiceItemsResponseAction
  | GetInvoiceItemsErrorAction
  | UpdateInvoiceItemRequestAction
  | UpdateInvoiceItemResponseAction
  | UpdateInvoiceItemErrorAction
  | DeleteInvoiceItemRequestAction
  | DeleteInvoiceItemResponseAction
  | DeleteInvoiceItemErrorAction
  | GenerateInvoiceRequestAction
  | GenerateInvoiceResponseAction
  | GenerateInvoiceErrorAction
  | CreateInvoiceMailRequestAction
  | CreateInvoiceMailResponseAction
  | CreateInvoiceMailErrorAction
  | SendInvoiceMailRequestAction
  | SendInvoiceMailResponseAction
  | SendInvoiceMailErrorAction

export class GetInvoicesRequestAction {
  readonly type = ActionType.GET_INVOICES
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetInvoicesResponseAction {
  readonly type = ActionType.GET_INVOICES
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetInvoicesRequestAction,
    public data: InvoiceDetails[],
  ) {}
}
export class GetInvoicesErrorAction {
  readonly type = ActionType.GET_INVOICES
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetInvoicesRequestAction,
    public error: InvoiceError,
  ) {}
}

export class CreateInvoiceRequestAction {
  readonly type = ActionType.CREATE_INVOICE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CreateInvoiceParams) {}
}
export class CreateInvoiceResponseAction {
  readonly type = ActionType.CREATE_INVOICE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateInvoiceRequestAction,
    public data: InvoiceDetails,
  ) {}
}
export class CreateInvoiceErrorAction {
  readonly type = ActionType.CREATE_INVOICE
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateInvoiceRequestAction,
    public error: InvoiceError,
  ) {}
}

export class CreateInvoiceMailRequestAction {
  readonly type = ActionType.CREATE_INVOICE_MAIL
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CreateInvoiceMailParams) {
    ''
  }
}

export class CreateInvoiceMailResponseAction {
  readonly type = ActionType.CREATE_INVOICE_MAIL
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: CreateInvoiceMailRequestAction, public data: InvoiceMailDetail) {
  }
}

export class CreateInvoiceMailErrorAction {
  readonly type = ActionType.CREATE_INVOICE_MAIL
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: CreateInvoiceMailRequestAction, public error: InvoiceError) {
  }
}

export class SendInvoiceMailRequestAction {
  readonly type = ActionType.SEND_INVOICE_MAIL
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: SendInvoiceMailParams) {
  }
}

export class SendInvoiceMailResponseAction {
  readonly type = ActionType.SEND_INVOICE_MAIL
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: SendInvoiceMailRequestAction, public data: InvoiceSentMailDetail) {
  }
}

export class SendInvoiceMailErrorAction {
  readonly type = ActionType.SEND_INVOICE_MAIL
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: SendInvoiceMailRequestAction, public error: InvoiceError) {
  }
}

export class CreateInvoiceItemRequestAction {
  readonly type = ActionType.CREATE_INVOICE_ITEM
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CreateInvoiceItemParams) {}
}
export class CreateInvoiceItemResponseAction {
  readonly type = ActionType.CREATE_INVOICE_ITEM
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateInvoiceItemRequestAction,
    public data: InvoiceItemDetails,
  ) {}
}
export class CreateInvoiceItemErrorAction {
  readonly type = ActionType.CREATE_INVOICE_ITEM
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateInvoiceItemRequestAction,
    public error: InvoiceItemError,
  ) {}
}

export class GenerateInvoiceRequestAction {
  readonly type = ActionType.GENERATE_INVOICE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: GenerateInvoiceParams) {
  }
}

export class GenerateInvoiceResponseAction {
  readonly type = ActionType.GENERATE_INVOICE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: GenerateInvoiceRequestAction, public data: InvoiceDetails) {
  }
}

export class GenerateInvoiceErrorAction {
  readonly type = ActionType.GENERATE_INVOICE
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GenerateInvoiceRequestAction, public error: InvoiceError) {
  }
}

export class GetInvoiceRequestAction {
  readonly type = ActionType.GET_INVOICE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetInvoiceResponseAction {
  readonly type = ActionType.GET_INVOICE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetInvoiceRequestAction,
    public data: InvoiceDetails,
  ) {}
}
export class GetInvoiceErrorAction {
  readonly type = ActionType.GET_INVOICE
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetInvoiceRequestAction,
    public error: InvoiceError,
  ) {}
}

export class GetInvoiceItemsRequestAction {
  readonly type = ActionType.GET_INVOICE_ITEMS
  readonly mode = AsyncActionMode.REQUEST
  constructor(public invoice_id: number) {
    ''
  }
}
export class GetInvoiceItemsResponseAction {
  readonly type = ActionType.GET_INVOICE_ITEMS
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetInvoiceItemsRequestAction,
    public data: InvoiceItemDetails[],
  ) {}
}
export class GetInvoiceItemsErrorAction {
  readonly type = ActionType.GET_INVOICE_ITEMS
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetInvoiceItemsRequestAction,
    public error: InvoiceItemError,
  ) {}
}

export class UpdateInvoiceRequestAction {
  readonly type = ActionType.UPDATE_INVOICE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: UpdateInvoiceParams) {}
}
export class UpdateInvoiceResponseAction {
  readonly type = ActionType.UPDATE_INVOICE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateInvoiceRequestAction,
    public data: InvoiceDetails,
  ) {}
}
export class UpdateInvoiceErrorAction {
  readonly type = ActionType.UPDATE_INVOICE
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateInvoiceRequestAction,
    public error: InvoiceError,
  ) {}
}
export class UpdateInvoiceItemRequestAction {
  readonly type = ActionType.UPDATE_INVOICE_ITEM
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: UpdateInvoiceItemParams) {}
}
export class UpdateInvoiceItemResponseAction {
  readonly type = ActionType.UPDATE_INVOICE_ITEM
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateInvoiceItemRequestAction,
    public data: InvoiceItemDetails,
  ) {}
}
export class UpdateInvoiceItemErrorAction {
  readonly type = ActionType.UPDATE_INVOICE_ITEM
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateInvoiceItemRequestAction,
    public error: InvoiceItemError,
  ) {}
}

export class DeleteInvoiceRequestAction {
  readonly type = ActionType.DELETE_INVOICE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class DeleteInvoiceResponseAction {
  readonly type = ActionType.DELETE_INVOICE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteInvoiceRequestAction,
    public data: InvoiceDetails,
  ) {}
}
export class DeleteInvoiceErrorAction {
  readonly type = ActionType.DELETE_INVOICE
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteInvoiceRequestAction,
    public error: InvoiceError,
  ) {}
}

export class DeleteInvoiceItemRequestAction {
  readonly type = ActionType.DELETE_INVOICE_ITEM
  readonly mode = AsyncActionMode.REQUEST
  constructor(public item_id: number) {
    ''
  }
}
export class DeleteInvoiceItemResponseAction {
  readonly type = ActionType.DELETE_INVOICE_ITEM
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteInvoiceItemRequestAction,
    public data: InvoiceItemDetails,
  ) {}
}
export class DeleteInvoiceItemErrorAction {
  readonly type = ActionType.DELETE_INVOICE_ITEM
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteInvoiceItemRequestAction,
    public error: InvoiceItemError,
  ) {}
}
