import {AsyncActionMode} from 'common/models'
import {AsyncJobParams, AsyncJobDetails, AsyncJobError} from '../models'

export enum ActionType {
	CREATE_ASYNCJOB = 'CREATE_ASYNCJOB',
	GET_ASYNCJOBS = 'GET_ASYNCJOBS',
	GET_ASYNCJOB = 'GET_ASYNCJOB',
	UPDATE_ASYNCJOB = 'UPDATE_ASYNCJOB',
	DELETE_ASYNCJOB = 'DELETE_ASYNCJOB',
	START_JOB = 'START_JOB',
	FINISH_JOB = 'FINISH_JOB',
	RESOLVE_JOB = 'RESOLVE_JOB',
	CANCEL_JOB = 'CANCEL_JOB',
}

export type AsyncJobActions =
	| CreateAsyncJobRequestAction
	| CreateAsyncJobResponseAction
	| CreateAsyncJobErrorAction
	| GetAsyncJobsRequestAction
	| GetAsyncJobsResponseAction
	| GetAsyncJobsErrorAction
	| GetAsyncJobRequestAction
	| GetAsyncJobResponseAction
	| GetAsyncJobErrorAction
	| UpdateAsyncJobRequestAction
	| UpdateAsyncJobResponseAction
	| UpdateAsyncJobErrorAction
	| DeleteAsyncJobRequestAction
	| DeleteAsyncJobResponseAction
	| DeleteAsyncJobErrorAction
	| StartJobRequestAction
	| StartJobResponseAction
	| StartJobErrorAction
	| FinishJobRequestAction
	| FinishJobResponseAction
	| FinishJobErrorAction
	| ResolveJobRequestAction
	| ResolveJobResponseAction
	| ResolveJobErrorAction
	| CancelJobRequestAction
	| CancelJobResponseAction
	| CancelJobErrorAction

export class StartJobRequestAction {
	readonly type = ActionType.START_JOB
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: number) {}
}
export class StartJobResponseAction {
	readonly type = ActionType.START_JOB
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: StartJobRequestAction, public data: AsyncJobDetails) {}
}
export class StartJobErrorAction {
	readonly type = ActionType.START_JOB
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: StartJobRequestAction, public error: AsyncJobError) {}
}
export class FinishJobRequestAction {
	readonly type = ActionType.FINISH_JOB
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: number) {}
}
export class FinishJobResponseAction {
	readonly type = ActionType.FINISH_JOB
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: FinishJobRequestAction, public data: AsyncJobDetails) {}
}
export class FinishJobErrorAction {
	readonly type = ActionType.FINISH_JOB
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: FinishJobRequestAction, public error: AsyncJobError) {}
}

export class ResolveJobRequestAction {
	readonly type = ActionType.RESOLVE_JOB
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: number) {}
}
export class ResolveJobResponseAction {
	readonly type = ActionType.RESOLVE_JOB
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: ResolveJobRequestAction, public data: AsyncJobDetails) {}
}
export class ResolveJobErrorAction {
	readonly type = ActionType.RESOLVE_JOB
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: ResolveJobRequestAction, public error: AsyncJobError) {}
}

export class CancelJobRequestAction {
	readonly type = ActionType.CANCEL_JOB
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: number) {}
}
export class CancelJobResponseAction {
	readonly type = ActionType.CANCEL_JOB
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: CancelJobRequestAction, public data: AsyncJobDetails) {}
}
export class CancelJobErrorAction {
	readonly type = ActionType.CANCEL_JOB
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: CancelJobRequestAction, public error: AsyncJobError) {}
}

export class CreateAsyncJobRequestAction {
	readonly type = ActionType.CREATE_ASYNCJOB
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: AsyncJobParams) {}
}
export class CreateAsyncJobResponseAction {
	readonly type = ActionType.CREATE_ASYNCJOB
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: CreateAsyncJobRequestAction, public data: AsyncJobDetails) {}
}
export class CreateAsyncJobErrorAction {
	readonly type = ActionType.CREATE_ASYNCJOB
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: CreateAsyncJobRequestAction, public error: AsyncJobError) {}
}

export class GetAsyncJobRequestAction {
	readonly type = ActionType.GET_ASYNCJOB
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: number) {
		''
	}
}
export class GetAsyncJobResponseAction {
	readonly type = ActionType.GET_ASYNCJOB
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetAsyncJobRequestAction, public data: AsyncJobDetails) {}
}
export class GetAsyncJobErrorAction {
	readonly type = ActionType.GET_ASYNCJOB
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetAsyncJobRequestAction, public error: AsyncJobError) {}
}

export class GetAsyncJobsRequestAction {
	readonly type = ActionType.GET_ASYNCJOBS
	readonly mode = AsyncActionMode.REQUEST
	constructor() {
		''
	}
}
export class GetAsyncJobsResponseAction {
	readonly type = ActionType.GET_ASYNCJOBS
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetAsyncJobsRequestAction, public data: AsyncJobDetails[]) {}
}
export class GetAsyncJobsErrorAction {
	readonly type = ActionType.GET_ASYNCJOBS
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetAsyncJobsRequestAction, public error: AsyncJobError) {}
}

export class UpdateAsyncJobRequestAction {
	readonly type = ActionType.UPDATE_ASYNCJOB
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: AsyncJobParams) {}
}
export class UpdateAsyncJobResponseAction {
	readonly type = ActionType.UPDATE_ASYNCJOB
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: UpdateAsyncJobRequestAction, public data: AsyncJobDetails) {}
}
export class UpdateAsyncJobErrorAction {
	readonly type = ActionType.UPDATE_ASYNCJOB
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: UpdateAsyncJobRequestAction, public error: AsyncJobError) {}
}

export class DeleteAsyncJobRequestAction {
	readonly type = ActionType.DELETE_ASYNCJOB
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: number) {
		''
	}
}
export class DeleteAsyncJobResponseAction {
	readonly type = ActionType.DELETE_ASYNCJOB
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: DeleteAsyncJobRequestAction, public data: AsyncJobDetails) {}
}
export class DeleteAsyncJobErrorAction {
	readonly type = ActionType.DELETE_ASYNCJOB
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: DeleteAsyncJobRequestAction, public error: AsyncJobError) {}
}
