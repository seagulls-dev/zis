import {AsyncActionMode} from 'common/models'
import {AsyncJobGroupDetails, AsyncJobGroupError, AsyncJobGroupParams} from '../models'

export enum ActionType {
	CREATE_ASYNCJOBGROUP = 'CREATE_ASYNCJOBGROUP',
	GET_ASYNCJOBGROUPS = 'GET_ASYNCJOBGROUPS',
	GET_ASYNCJOBGROUP = 'GET_ASYNCJOBGROUP',
	UPDATE_ASYNCJOBGROUP = 'UPDATE_ASYNCJOBGROUP',
	DELETE_ASYNCJOBGROUP = 'DELETE_ASYNCJOBGROUP',
}

export type AsyncJobGroupActions =
	| CreateAsyncJobGroupRequestAction
	| CreateAsyncJobGroupResponseAction
	| CreateAsyncJobGroupErrorAction
	| GetAsyncJobGroupsRequestAction
	| GetAsyncJobGroupsResponseAction
	| GetAsyncJobGroupsErrorAction
	| GetAsyncJobGroupRequestAction
	| GetAsyncJobGroupResponseAction
	| GetAsyncJobGroupErrorAction
	| UpdateAsyncJobGroupRequestAction
	| UpdateAsyncJobGroupResponseAction
	| UpdateAsyncJobGroupErrorAction
	| DeleteAsyncJobGroupRequestAction
	| DeleteAsyncJobGroupResponseAction
	| DeleteAsyncJobGroupErrorAction

export class CreateAsyncJobGroupRequestAction {
	readonly type = ActionType.CREATE_ASYNCJOBGROUP
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: AsyncJobGroupParams) {}
}
export class CreateAsyncJobGroupResponseAction {
	readonly type = ActionType.CREATE_ASYNCJOBGROUP
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: CreateAsyncJobGroupRequestAction, public data: AsyncJobGroupDetails) {}
}
export class CreateAsyncJobGroupErrorAction {
	readonly type = ActionType.CREATE_ASYNCJOBGROUP
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: CreateAsyncJobGroupRequestAction, public error: AsyncJobGroupError) {}
}

export class GetAsyncJobGroupRequestAction {
	readonly type = ActionType.GET_ASYNCJOBGROUP
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: number) {
		''
	}
}
export class GetAsyncJobGroupResponseAction {
	readonly type = ActionType.GET_ASYNCJOBGROUP
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetAsyncJobGroupRequestAction, public data: AsyncJobGroupDetails) {}
}
export class GetAsyncJobGroupErrorAction {
	readonly type = ActionType.GET_ASYNCJOBGROUP
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetAsyncJobGroupRequestAction, public error: AsyncJobGroupError) {}
}

export class GetAsyncJobGroupsRequestAction {
	readonly type = ActionType.GET_ASYNCJOBGROUPS
	readonly mode = AsyncActionMode.REQUEST
	constructor() {
		''
	}
}
export class GetAsyncJobGroupsResponseAction {
	readonly type = ActionType.GET_ASYNCJOBGROUPS
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetAsyncJobGroupsRequestAction, public data: AsyncJobGroupDetails[]) {}
}
export class GetAsyncJobGroupsErrorAction {
	readonly type = ActionType.GET_ASYNCJOBGROUPS
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetAsyncJobGroupsRequestAction, public error: AsyncJobGroupError) {}
}

export class UpdateAsyncJobGroupRequestAction {
	readonly type = ActionType.UPDATE_ASYNCJOBGROUP
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: AsyncJobGroupParams) {}
}
export class UpdateAsyncJobGroupResponseAction {
	readonly type = ActionType.UPDATE_ASYNCJOBGROUP
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: UpdateAsyncJobGroupRequestAction, public data: AsyncJobGroupDetails) {}
}
export class UpdateAsyncJobGroupErrorAction {
	readonly type = ActionType.UPDATE_ASYNCJOBGROUP
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: UpdateAsyncJobGroupRequestAction, public error: AsyncJobGroupError) {}
}

export class DeleteAsyncJobGroupRequestAction {
	readonly type = ActionType.DELETE_ASYNCJOBGROUP
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: number) {
		''
	}
}
export class DeleteAsyncJobGroupResponseAction {
	readonly type = ActionType.DELETE_ASYNCJOBGROUP
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: DeleteAsyncJobGroupRequestAction, public data: AsyncJobGroupDetails) {}
}
export class DeleteAsyncJobGroupErrorAction {
	readonly type = ActionType.DELETE_ASYNCJOBGROUP
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: DeleteAsyncJobGroupRequestAction, public error: AsyncJobGroupError) {}
}
