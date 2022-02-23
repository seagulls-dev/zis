import {AsyncActionMode} from 'common/models'
import {CreateDbUserParams, DbUserDetails, DbUserError, UpdateDbUserParams} from '../models'

export enum ActionType {
	CREATE_DBUSER = 'CREATE_DBUSER',
	GET_DBUSERS = 'GET_DBUSERS',
	GET_DBUSER = 'GET_DBUSER',
	UPDATE_DBUSER = 'UPDATE_DBUSER',
	DELETE_DBUSER = 'DELETE_DBUSER',
}

export type DbUserActions =
	| CreateDbUserRequestAction
	| CreateDbUserResponseAction
	| CreateDbUserErrorAction
	| GetDbUsersRequestAction
	| GetDbUsersResponseAction
	| GetDbUsersErrorAction
	| GetDbUserRequestAction
	| GetDbUserResponseAction
	| GetDbUserErrorAction
	| UpdateDbUserRequestAction
	| UpdateDbUserResponseAction
	| UpdateDbUserErrorAction
	| DeleteDbUserRequestAction
	| DeleteDbUserResponseAction
	| DeleteDbUserErrorAction

export class CreateDbUserRequestAction {
	readonly type = ActionType.CREATE_DBUSER
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: CreateDbUserParams) {}
}
export class CreateDbUserResponseAction {
	readonly type = ActionType.CREATE_DBUSER
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: CreateDbUserRequestAction, public data: DbUserDetails) {}
}
export class CreateDbUserErrorAction {
	readonly type = ActionType.CREATE_DBUSER
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: CreateDbUserRequestAction, public error: DbUserError) {}
}

export class GetDbUserRequestAction {
	readonly type = ActionType.GET_DBUSER
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: number) {
		''
	}
}
export class GetDbUserResponseAction {
	readonly type = ActionType.GET_DBUSER
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetDbUserRequestAction, public data: DbUserDetails) {}
}
export class GetDbUserErrorAction {
	readonly type = ActionType.GET_DBUSER
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetDbUserRequestAction, public error: DbUserError) {}
}

export class GetDbUsersRequestAction {
	readonly type = ActionType.GET_DBUSERS
	readonly mode = AsyncActionMode.REQUEST
	constructor() {
		''
	}
}
export class GetDbUsersResponseAction {
	readonly type = ActionType.GET_DBUSERS
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetDbUsersRequestAction, public data: DbUserDetails[]) {}
}
export class GetDbUsersErrorAction {
	readonly type = ActionType.GET_DBUSERS
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetDbUsersRequestAction, public error: DbUserError) {}
}

export class UpdateDbUserRequestAction {
	readonly type = ActionType.UPDATE_DBUSER
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: UpdateDbUserParams) {}
}
export class UpdateDbUserResponseAction {
	readonly type = ActionType.UPDATE_DBUSER
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: UpdateDbUserRequestAction, public data: DbUserDetails) {}
}
export class UpdateDbUserErrorAction {
	readonly type = ActionType.UPDATE_DBUSER
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: UpdateDbUserRequestAction, public error: DbUserError) {}
}

export class DeleteDbUserRequestAction {
	readonly type = ActionType.DELETE_DBUSER
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: number) {
		''
	}
}
export class DeleteDbUserResponseAction {
	readonly type = ActionType.DELETE_DBUSER
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: DeleteDbUserRequestAction, public data: DbUserDetails) {}
}
export class DeleteDbUserErrorAction {
	readonly type = ActionType.DELETE_DBUSER
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: DeleteDbUserRequestAction, public error: DbUserError) {}
}
