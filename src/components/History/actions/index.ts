import {AsyncActionMode} from 'common/models'
import {HistoryDetails, HistoryError} from '../models'

export enum ActionType {
	GET_HISTORY = 'GET_HISTORY',
}

export type HistoryActions = GetHistoryRequestAction | GetHistoryResponseAction | GetHistoryErrorAction

export class GetHistoryRequestAction {
	readonly type = ActionType.GET_HISTORY
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: number) {
		''
	}
}
export class GetHistoryResponseAction {
	readonly type = ActionType.GET_HISTORY
	readonly mode = AsyncActionMode.RESPONSE
	constructor(
		public request: GetHistoryRequestAction,
		public data: HistoryDetails[],
		public id: number,
		public name: string,
	) {}
}
export class GetHistoryErrorAction {
	readonly type = ActionType.GET_HISTORY
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetHistoryRequestAction, public error: HistoryError) {}
}
