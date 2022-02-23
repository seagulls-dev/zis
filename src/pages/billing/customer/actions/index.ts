import { AsyncActionMode } from 'common/models'
import { CustomerDetails, CustomerParams } from '../models'

export enum ActionType {
  GET_CUSTOMERS = 'GET_CUSTOMERS',
  CREATE_CUSTOMER = 'CREATE_CUSTOMER',
  GET_CUSTOMER = 'GET_CUSTOMER',
  UPDATE_CUSTOMER = 'UPDATE_CUSTOMER',
  DELETE_CUSTOMER = 'DELETE_CUSTOMER',
  GET_CUSTOMER_SELF = 'GET_CUSTOMER_SELF'
}

export type CustomerActions =
  | GetCustomersRequestAction
  | GetCustomersResponseAction
  | GetCustomersErrorAction
  | CreateCustomerRequestAction
  | CreateCustomerResponseAction
  | CreateCustomerErrorAction
  | GetCustomerRequestAction
  | GetCustomerResponseAction
  | GetCustomerErrorAction
  | UpdateCustomerRequestAction
  | UpdateCustomerResponseAction
  | UpdateCustomerErrorAction
  | DeleteCustomerRequestAction
  | DeleteCustomerResponseAction
  | DeleteCustomerErrorAction
  | GetCustomerSelfRequestAction
  | GetCustomerSelfResponseAction
  | GetCustomerSelfErrorAction

export class DeleteCustomerRequestAction {
  readonly type = ActionType.DELETE_CUSTOMER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class DeleteCustomerResponseAction {
  readonly type = ActionType.DELETE_CUSTOMER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteCustomerRequestAction,
    public data: CustomerDetails,
  ) {}
}
export class DeleteCustomerErrorAction {
  readonly type = ActionType.DELETE_CUSTOMER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteCustomerRequestAction,
    public error: string,
  ) {}
}

export class UpdateCustomerRequestAction {
  readonly type = ActionType.UPDATE_CUSTOMER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CustomerParams) {}
}
export class UpdateCustomerResponseAction {
  readonly type = ActionType.UPDATE_CUSTOMER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateCustomerRequestAction,
    public data: CustomerDetails,
  ) {}
}
export class UpdateCustomerErrorAction {
  readonly type = ActionType.UPDATE_CUSTOMER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateCustomerRequestAction,
    public error: string,
  ) {}
}

export class GetCustomerRequestAction {
  readonly type = ActionType.GET_CUSTOMER
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetCustomerResponseAction {
  readonly type = ActionType.GET_CUSTOMER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetCustomerRequestAction,
    public data: CustomerDetails,
  ) {}
}
export class GetCustomerErrorAction {
  readonly type = ActionType.GET_CUSTOMER
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GetCustomerRequestAction, public error: string) {}
}

export class GetCustomerSelfRequestAction {
  readonly type = ActionType.GET_CUSTOMER_SELF
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}

export class GetCustomerSelfResponseAction {
  readonly type = ActionType.GET_CUSTOMER_SELF
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: GetCustomerSelfRequestAction, public data: CustomerDetails) {
  }
}

export class GetCustomerSelfErrorAction {
  readonly type = ActionType.GET_CUSTOMER_SELF
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GetCustomerSelfRequestAction, public error: string) {
  }
}

export class GetCustomersRequestAction {
  readonly type = ActionType.GET_CUSTOMERS
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetCustomersResponseAction {
  readonly type = ActionType.GET_CUSTOMERS
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetCustomersRequestAction,
    public data: CustomerDetails[],
  ) {}
}
export class GetCustomersErrorAction {
  readonly type = ActionType.GET_CUSTOMERS
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetCustomersRequestAction,
    public error: string,
  ) {}
}

export class CreateCustomerRequestAction {
  readonly type = ActionType.CREATE_CUSTOMER
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CustomerParams) {}
}
export class CreateCustomerResponseAction {
  readonly type = ActionType.CREATE_CUSTOMER
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateCustomerRequestAction,
    public data: CustomerDetails,
  ) {}
}
export class CreateCustomerErrorAction {
  readonly type = ActionType.CREATE_CUSTOMER
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateCustomerRequestAction,
    public error: string,
  ) {}
}
