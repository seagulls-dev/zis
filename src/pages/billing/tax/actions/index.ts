import { AsyncActionMode } from 'common/models'
import {
  CreateTaxParams,
  TaxDetails,
  TaxError,
  UpdateTaxParams,
} from '../models'

export enum ActionType {
  CREATE_TAX = 'CREATE_TAX',
  GET_TAXES = 'GET_TAXES',
  GET_TAX = 'GET_TAX',
  UPDATE_TAX = 'UPDATE_TAX',
  DELETE_TAX = 'DELETE_TAX',
}

export type TaxActions =
  | CreateTaxRequestAction
  | CreateTaxResponseAction
  | CreateTaxErrorAction
  | GetTaxesRequestAction
  | GetTaxesResponseAction
  | GetTaxesErrorAction
  | GetTaxRequestAction
  | GetTaxResponseAction
  | GetTaxErrorAction
  | UpdateTaxRequestAction
  | UpdateTaxResponseAction
  | UpdateTaxErrorAction
  | DeleteTaxRequestAction
  | DeleteTaxResponseAction
  | DeleteTaxErrorAction

export class CreateTaxRequestAction {
  readonly type = ActionType.CREATE_TAX
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CreateTaxParams) {}
}
export class CreateTaxResponseAction {
  readonly type = ActionType.CREATE_TAX
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateTaxRequestAction,
    public data: TaxDetails,
  ) {}
}
export class CreateTaxErrorAction {
  readonly type = ActionType.CREATE_TAX
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: CreateTaxRequestAction, public error: TaxError) {}
}

export class GetTaxRequestAction {
  readonly type = ActionType.GET_TAX
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetTaxResponseAction {
  readonly type = ActionType.GET_TAX
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: GetTaxRequestAction, public data: TaxDetails) {}
}
export class GetTaxErrorAction {
  readonly type = ActionType.GET_TAX
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GetTaxRequestAction, public error: TaxError) {}
}

export class GetTaxesRequestAction {
  readonly type = ActionType.GET_TAXES
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetTaxesResponseAction {
  readonly type = ActionType.GET_TAXES
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetTaxesRequestAction,
    public data: TaxDetails[],
  ) {}
}
export class GetTaxesErrorAction {
  readonly type = ActionType.GET_TAXES
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GetTaxesRequestAction, public error: TaxError) {}
}

export class UpdateTaxRequestAction {
  readonly type = ActionType.UPDATE_TAX
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: UpdateTaxParams) {}
}
export class UpdateTaxResponseAction {
  readonly type = ActionType.UPDATE_TAX
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateTaxRequestAction,
    public data: TaxDetails,
  ) {}
}
export class UpdateTaxErrorAction {
  readonly type = ActionType.UPDATE_TAX
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: UpdateTaxRequestAction, public error: TaxError) {}
}

export class DeleteTaxRequestAction {
  readonly type = ActionType.DELETE_TAX
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class DeleteTaxResponseAction {
  readonly type = ActionType.DELETE_TAX
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteTaxRequestAction,
    public data: TaxDetails,
  ) {}
}
export class DeleteTaxErrorAction {
  readonly type = ActionType.DELETE_TAX
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: DeleteTaxRequestAction, public error: TaxError) {}
}
