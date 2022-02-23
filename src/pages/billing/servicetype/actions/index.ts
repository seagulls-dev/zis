import {AsyncActionMode} from 'common/models'
import {ServiceTypeDetails, CreateServiceTypeParams, UpdateServiceTypeParams, ServiceTypeError} from '../model'

export enum ActionType {
	CREATE_SERVICE_TYPE = 'CREATE_SERVICE_TYPE',
	GET_SERVICE_TYPES = 'GET_SERVICE_TYPES',
	GET_SERVICE_TYPE = 'GET_SERVICE_TYPE',
	UPDATE_SERVICE_TYPE = 'UPDATE_SERVICE_TYPE',
	DELETE_SERVICE_TYPE = 'DELETE_SERVICE_TYPE',
}

export type ServiceTypeActions =
	| CreateServiceTypeRequestAction
	| CreateServiceTypeResponseAction
	| CreateServiceTypeErrorAction
	| GetServiceTypeRequestAction
	| GetServiceTypeResponseAction
	| GetServiceTypeErrorAction
	| GetServiceTypesRequestAction
	| GetServiceTypesResponseAction
	| GetServiceTypesErrorAction
	| UpdateServiceTypeRequestAction
	| UpdateServiceTypeResponseAction
	| UpdateServiceTypeErrorAction
	| DeleteServiceTypeRequestAction
	| DeleteServiceTypeResponseAction
	| DeleteServiceTypeErrorAction

export class CreateServiceTypeRequestAction {
	readonly type = ActionType.CREATE_SERVICE_TYPE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: CreateServiceTypeParams) {}
}

export class CreateServiceTypeResponseAction {
	readonly type = ActionType.CREATE_SERVICE_TYPE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public payload: CreateServiceTypeRequestAction, public data: ServiceTypeDetails) {}
}

export class CreateServiceTypeErrorAction {
	readonly type = ActionType.CREATE_SERVICE_TYPE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: CreateServiceTypeRequestAction, public error: ServiceTypeError) {}
}

export class GetServiceTypeRequestAction {
	readonly type = ActionType.GET_SERVICE_TYPE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: number) {
		''
	}
}

export class GetServiceTypeResponseAction {
	readonly type = ActionType.GET_SERVICE_TYPE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetServiceTypeRequestAction, public data: ServiceTypeDetails) {}
}

export class GetServiceTypeErrorAction {
	readonly type = ActionType.GET_SERVICE_TYPE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetServiceTypeRequestAction, public error: ServiceTypeError) {}
}

export class GetServiceTypesRequestAction {
	readonly type = ActionType.GET_SERVICE_TYPES
	readonly mode = AsyncActionMode.REQUEST
	constructor() {
		''
	}
}

export class GetServiceTypesResponseAction {
	readonly type = ActionType.GET_SERVICE_TYPES
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetServiceTypesRequestAction, public data: ServiceTypeDetails[]) {}
}

export class GetServiceTypesErrorAction {
	readonly type = ActionType.GET_SERVICE_TYPES
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetServiceTypesRequestAction, public error: ServiceTypeError) {}
}

export class UpdateServiceTypeRequestAction {
	readonly type = ActionType.UPDATE_SERVICE_TYPE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: UpdateServiceTypeParams) {}
}

export class UpdateServiceTypeResponseAction {
	readonly type = ActionType.UPDATE_SERVICE_TYPE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: UpdateServiceTypeRequestAction, public data: ServiceTypeDetails) {}
}

export class UpdateServiceTypeErrorAction {
	readonly type = ActionType.UPDATE_SERVICE_TYPE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: UpdateServiceTypeRequestAction, public error: ServiceTypeError) {}
}

export class DeleteServiceTypeRequestAction {
	readonly type = ActionType.DELETE_SERVICE_TYPE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: number) {
		''
	}
}

export class DeleteServiceTypeResponseAction {
	readonly type = ActionType.DELETE_SERVICE_TYPE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: DeleteServiceTypeRequestAction, public data: ServiceTypeDetails) {}
}

export class DeleteServiceTypeErrorAction {
	readonly type = ActionType.DELETE_SERVICE_TYPE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: DeleteServiceTypeRequestAction, public error: ServiceTypeError) {}
}
