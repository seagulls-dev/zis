import {AsyncActionMode} from 'common/models'
import {
	AddRemoveIpResponse,
	CreateUpdateServerParams,
	ServerAddRemoveIpParams,
	ServerDetails,
	ServerError,
	ServerServiceTypeDetails,
} from '../models'

export enum ActionType {
	CREATE_SERVER = 'CREATE_SERVER',
	GET_SERVERS = 'GET_SERVERS',
	GET_SERVER = 'GET_SERVER',
	UPDATE_SERVER = 'UPDATE_SERVER',
	DELETE_SERVER = 'DELETE_SERVER',
	ADD_IP_TO_SERVER = 'ADD_IP_TO_SERVER',
	REMOVE_IP_FROM_SERVER = 'REMOVE_IP_FROM_SERVER',
	GET_SERVER_SERVICE_TYPE = 'GET_SERVER_SERVICE_TYPE',
}

export type ServerActions =
	| AddIpToServerRequestAction
	| AddIpToServerResponseAction
	| AddIpToServerErrorAction
	| RemoveIpFromServerRequestAction
	| RemoveIpFromServerResponseAction
	| RemoveIpFromServerErrorAction
	| CreateServerRequestAction
	| CreateServerResponseAction
	| CreateServerErrorAction
	| GetServersRequestAction
	| GetServersResponseAction
	| GetServersErrorAction
	| GetServerRequestAction
	| GetServerResponseAction
	| GetServerErrorAction
	| UpdateServerRequestAction
	| UpdateServerResponseAction
	| UpdateServerErrorAction
	| DeleteServerRequestAction
	| DeleteServerResponseAction
	| DeleteServerErrorAction
	| GetServerServiceTypeRequestAction
	| GetServerServiceTypeResponseAction
	| GetServerServiceTypeErrorAction

export class GetServerServiceTypeRequestAction {
	readonly type = ActionType.GET_SERVER_SERVICE_TYPE
	readonly mode = AsyncActionMode.REQUEST
	constructor() {
		''
	}
}
export class GetServerServiceTypeResponseAction {
	readonly type = ActionType.GET_SERVER_SERVICE_TYPE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetServerServiceTypeRequestAction, public data: ServerServiceTypeDetails[]) {}
}
export class GetServerServiceTypeErrorAction {
	readonly type = ActionType.GET_SERVER_SERVICE_TYPE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetServerServiceTypeRequestAction, public error: ServerError) {}
}
export class RemoveIpFromServerRequestAction {
	readonly type = ActionType.REMOVE_IP_FROM_SERVER
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: ServerAddRemoveIpParams) {}
}
export class RemoveIpFromServerResponseAction {
	readonly type = ActionType.REMOVE_IP_FROM_SERVER
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: RemoveIpFromServerRequestAction, public data: ServerDetails) {}
}
export class RemoveIpFromServerErrorAction {
	readonly type = ActionType.REMOVE_IP_FROM_SERVER
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: RemoveIpFromServerRequestAction, public error: ServerError) {}
}

export class AddIpToServerRequestAction {
	readonly type = ActionType.ADD_IP_TO_SERVER
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: ServerAddRemoveIpParams) {}
}
export class AddIpToServerResponseAction {
	readonly type = ActionType.ADD_IP_TO_SERVER
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: AddIpToServerRequestAction, public data: AddRemoveIpResponse) {}
}
export class AddIpToServerErrorAction {
	readonly type = ActionType.ADD_IP_TO_SERVER
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: AddIpToServerRequestAction, public error: ServerError) {}
}

export class CreateServerRequestAction {
	readonly type = ActionType.CREATE_SERVER
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: CreateUpdateServerParams) {}
}
export class CreateServerResponseAction {
	readonly type = ActionType.CREATE_SERVER
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: CreateServerRequestAction, public data: ServerDetails) {}
}
export class CreateServerErrorAction {
	readonly type = ActionType.CREATE_SERVER
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: CreateServerRequestAction, public error: ServerError) {}
}

export class GetServerRequestAction {
	readonly type = ActionType.GET_SERVER
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: number) {
		''
	}
}
export class GetServerResponseAction {
	readonly type = ActionType.GET_SERVER
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetServerRequestAction, public data: ServerDetails) {}
}
export class GetServerErrorAction {
	readonly type = ActionType.GET_SERVER
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetServerRequestAction, public error: ServerError) {}
}

export class GetServersRequestAction {
	readonly type = ActionType.GET_SERVERS
	readonly mode = AsyncActionMode.REQUEST
	constructor() {
		''
	}
}
export class GetServersResponseAction {
	readonly type = ActionType.GET_SERVERS
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetServersRequestAction, public data: ServerDetails[]) {}
}
export class GetServersErrorAction {
	readonly type = ActionType.GET_SERVERS
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetServersRequestAction, public error: ServerError) {}
}

export class UpdateServerRequestAction {
	readonly type = ActionType.UPDATE_SERVER
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: CreateUpdateServerParams) {}
}
export class UpdateServerResponseAction {
	readonly type = ActionType.UPDATE_SERVER
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: UpdateServerRequestAction, public data: ServerDetails) {}
}
export class UpdateServerErrorAction {
	readonly type = ActionType.UPDATE_SERVER
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: UpdateServerRequestAction, public error: ServerError) {}
}

export class DeleteServerRequestAction {
	readonly type = ActionType.DELETE_SERVER
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: number) {
		''
	}
}
export class DeleteServerResponseAction {
	readonly type = ActionType.DELETE_SERVER
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: DeleteServerRequestAction, public data: ServerDetails) {}
}
export class DeleteServerErrorAction {
	readonly type = ActionType.DELETE_SERVER
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: DeleteServerRequestAction, public error: ServerError) {}
}
