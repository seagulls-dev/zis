import {AsyncActionMode} from 'common/models'
import {CreateVhostParams, VhostDetails, VhostError, UpdateVhostParams} from '../models'

export enum ActionType {
	CREATE_VHOST = 'CREATE_VHOST',
	GET_VHOSTS = 'GET_VHOSTS',
	GET_VHOST = 'GET_VHOST',
	UPDATE_VHOST = 'UPDATE_VHOST',
	DELETE_VHOST = 'DELETE_VHOST',

	GET_VHOST_VERSION = 'GET_VHOST_VERSION',
	GET_VHOST_APLICATIONS = 'GET_VHOST_APLICATIONS',
	GET_VHOST_APLICATIONS_BY_SERVER = 'GET_VHOST_APLICATIONS_BY_SERVER',
	ACTIVATE_VHOST = 'ACTIVATE_VHOST',
	UPDATE_CUSTOM_VHOST_CONFIG = 'UPDATE_CUSTOM_VHOST_CONFIG',
	APPLY_VHOST_CHANGES = 'APPLY_VHOST_CHANGES',
}

export type VhostActions =
	| CreateVhostRequestAction
	| CreateVhostResponseAction
	| CreateVhostErrorAction
	| GetVhostsRequestAction
	| GetVhostsResponseAction
	| GetVhostsErrorAction
	| GetVhostRequestAction
	| GetVhostResponseAction
	| GetVhostErrorAction
	| UpdateVhostRequestAction
	| UpdateVhostResponseAction
	| UpdateVhostErrorAction
	| DeleteVhostRequestAction
	| DeleteVhostResponseAction
	| DeleteVhostErrorAction

export class CreateVhostRequestAction {
	readonly type = ActionType.CREATE_VHOST
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: CreateVhostParams) {}
}
export class CreateVhostResponseAction {
	readonly type = ActionType.CREATE_VHOST
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: CreateVhostRequestAction, public data: VhostDetails) {}
}
export class CreateVhostErrorAction {
	readonly type = ActionType.CREATE_VHOST
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: CreateVhostRequestAction, public error: VhostError) {}
}

export class GetVhostRequestAction {
	readonly type = ActionType.GET_VHOST
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: number) {
		''
	}
}
export class GetVhostResponseAction {
	readonly type = ActionType.GET_VHOST
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetVhostRequestAction, public data: VhostDetails) {}
}
export class GetVhostErrorAction {
	readonly type = ActionType.GET_VHOST
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetVhostRequestAction, public error: VhostError) {}
}

export class GetVhostsRequestAction {
	readonly type = ActionType.GET_VHOSTS
	readonly mode = AsyncActionMode.REQUEST
	constructor() {
		''
	}
}
export class GetVhostsResponseAction {
	readonly type = ActionType.GET_VHOSTS
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetVhostsRequestAction, public data: VhostDetails[]) {}
}
export class GetVhostsErrorAction {
	readonly type = ActionType.GET_VHOSTS
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetVhostsRequestAction, public error: VhostError) {}
}

export class UpdateVhostRequestAction {
	readonly type = ActionType.UPDATE_VHOST
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: UpdateVhostParams) {}
}
export class UpdateVhostResponseAction {
	readonly type = ActionType.UPDATE_VHOST
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: UpdateVhostRequestAction, public data: VhostDetails) {}
}
export class UpdateVhostErrorAction {
	readonly type = ActionType.UPDATE_VHOST
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: UpdateVhostRequestAction, public error: VhostError) {}
}

export class DeleteVhostRequestAction {
	readonly type = ActionType.DELETE_VHOST
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: number) {
		''
	}
}
export class DeleteVhostResponseAction {
	readonly type = ActionType.DELETE_VHOST
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: DeleteVhostRequestAction, public data: VhostDetails) {}
}
export class DeleteVhostErrorAction {
	readonly type = ActionType.DELETE_VHOST
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: DeleteVhostRequestAction, public error: VhostError) {}
}
