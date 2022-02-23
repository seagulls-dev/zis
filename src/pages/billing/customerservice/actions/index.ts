import {AsyncActionMode} from 'common/models'
import {
	CreateCustomerServiceParams,
	CustomerServiceDetails,
	CustomerServiceError,
	UpdateCustomerServiceParams,
	CreateOneTimeProductParams,
} from '../models'

export enum ActionType {
	CREATE_CUSTOMERSERVICE = 'CREATE_CUSTOMERSERVICE',
	GET_CUSTOMERSERVICES = 'GET_CUSTOMERSERVICES',
	GET_CUSTOMERSERVICE = 'GET_CUSTOMERSERVICE',
	UPDATE_CUSTOMERSERVICE = 'UPDATE_CUSTOMERSERVICE',
	DELETE_CUSTOMERSERVICE = 'DELETE_CUSTOMERSERVICE',
	CREATE_ONE_TIME_PRODUCT = 'CREATE_ONE_TIME_PRODUCT',
}

export type CustomerServiceActions =
	| CreateCustomerServiceRequestAction
	| CreateCustomerServiceResponseAction
	| CreateCustomerServiceErrorAction
	| GetCustomerServicesRequestAction
	| GetCustomerServicesResponseAction
	| GetCustomerServicesErrorAction
	| GetCustomerServiceRequestAction
	| GetCustomerServiceResponseAction
	| GetCustomerServiceErrorAction
	| UpdateCustomerServiceRequestAction
	| UpdateCustomerServiceResponseAction
	| UpdateCustomerServiceErrorAction
	| DeleteCustomerServiceRequestAction
	| DeleteCustomerServiceResponseAction
	| DeleteCustomerServiceErrorAction
	| CreateOneTimeProductRequestAction
	| CreateOneTimeProductResponseAction
	| CreateOneTimeProductErrorAction

export class CreateOneTimeProductRequestAction {
	readonly type = ActionType.CREATE_ONE_TIME_PRODUCT
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: CreateOneTimeProductParams) {}
}
export class CreateOneTimeProductResponseAction {
	readonly type = ActionType.CREATE_ONE_TIME_PRODUCT
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: CreateOneTimeProductRequestAction, public data: CustomerServiceDetails) {}
}
export class CreateOneTimeProductErrorAction {
	readonly type = ActionType.CREATE_ONE_TIME_PRODUCT
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: CreateOneTimeProductRequestAction, public error: CustomerServiceError) {}
}

export class CreateCustomerServiceRequestAction {
	readonly type = ActionType.CREATE_CUSTOMERSERVICE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: CreateCustomerServiceParams) {}
}
export class CreateCustomerServiceResponseAction {
	readonly type = ActionType.CREATE_CUSTOMERSERVICE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: CreateCustomerServiceRequestAction, public data: CustomerServiceDetails) {}
}
export class CreateCustomerServiceErrorAction {
	readonly type = ActionType.CREATE_CUSTOMERSERVICE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: CreateCustomerServiceRequestAction, public error: CustomerServiceError) {}
}

export class GetCustomerServiceRequestAction {
	readonly type = ActionType.GET_CUSTOMERSERVICE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: number) {
		''
	}
}
export class GetCustomerServiceResponseAction {
	readonly type = ActionType.GET_CUSTOMERSERVICE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetCustomerServiceRequestAction, public data: CustomerServiceDetails) {}
}
export class GetCustomerServiceErrorAction {
	readonly type = ActionType.GET_CUSTOMERSERVICE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetCustomerServiceRequestAction, public error: CustomerServiceError) {}
}

export class GetCustomerServicesRequestAction {
	readonly type = ActionType.GET_CUSTOMERSERVICES
	readonly mode = AsyncActionMode.REQUEST
	constructor() {
		''
	}
}
export class GetCustomerServicesResponseAction {
	readonly type = ActionType.GET_CUSTOMERSERVICES
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetCustomerServicesRequestAction, public data: CustomerServiceDetails[]) {}
}
export class GetCustomerServicesErrorAction {
	readonly type = ActionType.GET_CUSTOMERSERVICES
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetCustomerServicesRequestAction, public error: CustomerServiceError) {}
}

export class UpdateCustomerServiceRequestAction {
	readonly type = ActionType.UPDATE_CUSTOMERSERVICE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: UpdateCustomerServiceParams) {}
}
export class UpdateCustomerServiceResponseAction {
	readonly type = ActionType.UPDATE_CUSTOMERSERVICE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: UpdateCustomerServiceRequestAction, public data: CustomerServiceDetails) {}
}
export class UpdateCustomerServiceErrorAction {
	readonly type = ActionType.UPDATE_CUSTOMERSERVICE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: UpdateCustomerServiceRequestAction, public error: CustomerServiceError) {}
}

export class DeleteCustomerServiceRequestAction {
	readonly type = ActionType.DELETE_CUSTOMERSERVICE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: number) {
		''
	}
}
export class DeleteCustomerServiceResponseAction {
	readonly type = ActionType.DELETE_CUSTOMERSERVICE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: DeleteCustomerServiceRequestAction, public data: CustomerServiceDetails) {}
}
export class DeleteCustomerServiceErrorAction {
	readonly type = ActionType.DELETE_CUSTOMERSERVICE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: DeleteCustomerServiceRequestAction, public error: CustomerServiceError) {}
}
