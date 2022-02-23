import {AsyncActionMode} from 'common/models'
import {CreateSettingParams, SettingDetails, SettingError, UpdateSettingParams} from '../models'

export enum ActionType {
	CREATE_SETTING = 'CREATE_SETTING',
	GET_SETTINGS = 'GET_SETTINGS',
	GET_SETTING = 'GET_SETTING',
	UPDATE_SETTING = 'UPDATE_SETTING',
	DELETE_SETTING = 'DELETE_SETTING',
}

export type SettingActions =
	| CreateSettingRequestAction
	| CreateSettingResponseAction
	| CreateSettingErrorAction
	| GetSettingsRequestAction
	| GetSettingsResponseAction
	| GetSettingsErrorAction
	| GetSettingRequestAction
	| GetSettingResponseAction
	| GetSettingErrorAction
	| UpdateSettingRequestAction
	| UpdateSettingResponseAction
	| UpdateSettingErrorAction
	| DeleteSettingRequestAction
	| DeleteSettingResponseAction
	| DeleteSettingErrorAction

export class CreateSettingRequestAction {
	readonly type = ActionType.CREATE_SETTING
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: CreateSettingParams) {}
}
export class CreateSettingResponseAction {
	readonly type = ActionType.CREATE_SETTING
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: CreateSettingRequestAction, public data: SettingDetails) {}
}
export class CreateSettingErrorAction {
	readonly type = ActionType.CREATE_SETTING
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: CreateSettingRequestAction, public error: SettingError) {}
}

export class GetSettingRequestAction {
	readonly type = ActionType.GET_SETTING
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: number) {
		''
	}
}
export class GetSettingResponseAction {
	readonly type = ActionType.GET_SETTING
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetSettingRequestAction, public data: SettingDetails) {}
}
export class GetSettingErrorAction {
	readonly type = ActionType.GET_SETTING
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetSettingRequestAction, public error: SettingError) {}
}

export class GetSettingsRequestAction {
	readonly type = ActionType.GET_SETTINGS
	readonly mode = AsyncActionMode.REQUEST
	constructor() {
		''
	}
}
export class GetSettingsResponseAction {
	readonly type = ActionType.GET_SETTINGS
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetSettingsRequestAction, public data: SettingDetails[]) {}
}
export class GetSettingsErrorAction {
	readonly type = ActionType.GET_SETTINGS
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetSettingsRequestAction, public error: SettingError) {}
}

export class UpdateSettingRequestAction {
	readonly type = ActionType.UPDATE_SETTING
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: UpdateSettingParams) {}
}
export class UpdateSettingResponseAction {
	readonly type = ActionType.UPDATE_SETTING
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: UpdateSettingRequestAction, public data: SettingDetails) {}
}
export class UpdateSettingErrorAction {
	readonly type = ActionType.UPDATE_SETTING
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: UpdateSettingRequestAction, public error: SettingError) {}
}

export class DeleteSettingRequestAction {
	readonly type = ActionType.DELETE_SETTING
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: number) {
		''
	}
}
export class DeleteSettingResponseAction {
	readonly type = ActionType.DELETE_SETTING
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: DeleteSettingRequestAction, public data: SettingDetails) {}
}
export class DeleteSettingErrorAction {
	readonly type = ActionType.DELETE_SETTING
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: DeleteSettingRequestAction, public error: SettingError) {}
}
