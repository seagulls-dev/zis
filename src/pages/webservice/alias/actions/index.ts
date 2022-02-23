import {AsyncActionMode} from 'common/models'
import {CreateAliasParams, AliasDetails, AliasError, UpdateAliasParams} from '../models'

export enum ActionType {
	CREATE_ALIAS = 'CREATE_ALIAS',
	GET_ALIASES = 'GET_ALIASES',
	GET_ALIAS = 'GET_ALIAS',
	UPDATE_ALIAS = 'UPDATE_ALIAS',
	DELETE_ALIAS = 'DELETE_ALIAS',
}

export type AliasActions =
	| CreateAliasRequestAction
	| CreateAliasResponseAction
	| CreateAliasErrorAction
	| GetAliasesRequestAction
	| GetAliasesResponseAction
	| GetAliasesErrorAction
	| GetAliasRequestAction
	| GetAliasResponseAction
	| GetAliasErrorAction
	| UpdateAliasRequestAction
	| UpdateAliasResponseAction
	| UpdateAliasErrorAction
	| DeleteAliasRequestAction
	| DeleteAliasResponseAction
	| DeleteAliasErrorAction

export class CreateAliasRequestAction {
	readonly type = ActionType.CREATE_ALIAS
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: CreateAliasParams) {}
}
export class CreateAliasResponseAction {
	readonly type = ActionType.CREATE_ALIAS
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: CreateAliasRequestAction, public data: AliasDetails) {}
}
export class CreateAliasErrorAction {
	readonly type = ActionType.CREATE_ALIAS
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: CreateAliasRequestAction, public error: AliasError) {}
}

export class GetAliasRequestAction {
	readonly type = ActionType.GET_ALIAS
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: number) {
		''
	}
}
export class GetAliasResponseAction {
	readonly type = ActionType.GET_ALIAS
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetAliasRequestAction, public data: AliasDetails) {}
}
export class GetAliasErrorAction {
	readonly type = ActionType.GET_ALIAS
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetAliasRequestAction, public error: AliasError) {}
}

export class GetAliasesRequestAction {
	readonly type = ActionType.GET_ALIASES
	readonly mode = AsyncActionMode.REQUEST
	constructor() {
		''
	}
}
export class GetAliasesResponseAction {
	readonly type = ActionType.GET_ALIASES
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetAliasesRequestAction, public data: AliasDetails[]) {}
}
export class GetAliasesErrorAction {
	readonly type = ActionType.GET_ALIASES
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetAliasesRequestAction, public error: AliasError) {}
}

export class UpdateAliasRequestAction {
	readonly type = ActionType.UPDATE_ALIAS
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: UpdateAliasParams) {}
}
export class UpdateAliasResponseAction {
	readonly type = ActionType.UPDATE_ALIAS
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: UpdateAliasRequestAction, public data: AliasDetails) {}
}
export class UpdateAliasErrorAction {
	readonly type = ActionType.UPDATE_ALIAS
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: UpdateAliasRequestAction, public error: AliasError) {}
}

export class DeleteAliasRequestAction {
	readonly type = ActionType.DELETE_ALIAS
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: number) {
		''
	}
}
export class DeleteAliasResponseAction {
	readonly type = ActionType.DELETE_ALIAS
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: DeleteAliasRequestAction, public data: AliasDetails) {}
}
export class DeleteAliasErrorAction {
	readonly type = ActionType.DELETE_ALIAS
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: DeleteAliasRequestAction, public error: AliasError) {}
}
