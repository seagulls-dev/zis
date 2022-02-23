import {AsyncActionMode} from 'common/models'
import {CreateDbServiceParams, DbServiceDetails, DbServiceError, UpdateDbServiceParams} from '../models'

export enum ActionType {
	CREATE_DBSERVICE = 'CREATE_DBSERVICE',
	GET_DBSERVICES = 'GET_DBSERVICES',
	GET_DBSERVICE = 'GET_DBSERVICE',
	UPDATE_DBSERVICE = 'UPDATE_DBSERVICE',
	DELETE_DBSERVICE = 'DELETE_DBSERVICE',
}

export type DbServiceActions =
	| CreateDbServiceRequestAction
	| CreateDbServiceResponseAction
	| CreateDbServiceErrorAction
	| GetDbServicesRequestAction
	| GetDbServicesResponseAction
	| GetDbServicesErrorAction
	| GetDbServiceRequestAction
	| GetDbServiceResponseAction
	| GetDbServiceErrorAction
	| UpdateDbServiceRequestAction
	| UpdateDbServiceResponseAction
	| UpdateDbServiceErrorAction
	| DeleteDbServiceRequestAction
	| DeleteDbServiceResponseAction
	| DeleteDbServiceErrorAction

export class CreateDbServiceRequestAction {
	readonly type = ActionType.CREATE_DBSERVICE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: CreateDbServiceParams) {}
}
export class CreateDbServiceResponseAction {
	readonly type = ActionType.CREATE_DBSERVICE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: CreateDbServiceRequestAction, public data: DbServiceDetails) {}
}
export class CreateDbServiceErrorAction {
	readonly type = ActionType.CREATE_DBSERVICE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: CreateDbServiceRequestAction, public error: DbServiceError) {}
}

export class GetDbServiceRequestAction {
	readonly type = ActionType.GET_DBSERVICE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: number) {
		''
	}
}
export class GetDbServiceResponseAction {
	readonly type = ActionType.GET_DBSERVICE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetDbServiceRequestAction, public data: DbServiceDetails) {}
}
export class GetDbServiceErrorAction {
	readonly type = ActionType.GET_DBSERVICE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetDbServiceRequestAction, public error: DbServiceError) {}
}

export class GetDbServicesRequestAction {
	readonly type = ActionType.GET_DBSERVICES
	readonly mode = AsyncActionMode.REQUEST
	constructor() {
		''
	}
}
export class GetDbServicesResponseAction {
	readonly type = ActionType.GET_DBSERVICES
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetDbServicesRequestAction, public data: DbServiceDetails[]) {}
}
export class GetDbServicesErrorAction {
	readonly type = ActionType.GET_DBSERVICES
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetDbServicesRequestAction, public error: DbServiceError) {}
}

export class UpdateDbServiceRequestAction {
	readonly type = ActionType.UPDATE_DBSERVICE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: UpdateDbServiceParams) {}
}
export class UpdateDbServiceResponseAction {
	readonly type = ActionType.UPDATE_DBSERVICE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: UpdateDbServiceRequestAction, public data: DbServiceDetails) {}
}
export class UpdateDbServiceErrorAction {
	readonly type = ActionType.UPDATE_DBSERVICE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: UpdateDbServiceRequestAction, public error: DbServiceError) {}
}

export class DeleteDbServiceRequestAction {
	readonly type = ActionType.DELETE_DBSERVICE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: number) {
		''
	}
}
export class DeleteDbServiceResponseAction {
	readonly type = ActionType.DELETE_DBSERVICE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: DeleteDbServiceRequestAction, public data: DbServiceDetails) {}
}
export class DeleteDbServiceErrorAction {
	readonly type = ActionType.DELETE_DBSERVICE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: DeleteDbServiceRequestAction, public error: DbServiceError) {}
}
