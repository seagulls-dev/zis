import {AsyncActionMode} from 'common/models'
import {CreateTemplateParams, TemplateDetails, TemplateError, UpdateTemplateParams} from '../models'

export enum ActionType {
	CREATE_TEMPLATE = 'CREATE_TEMPLATE',
	GET_TEMPLATES = 'GET_TEMPLATES',
	GET_TEMPLATE = 'GET_TEMPLATE',
	UPDATE_TEMPLATE = 'UPDATE_TEMPLATE',
	DELETE_TEMPLATE = 'DELETE_TEMPLATE',
}

export type TemplateActions =
	| CreateTemplateRequestAction
	| CreateTemplateResponseAction
	| CreateTemplateErrorAction
	| GetTemplatesRequestAction
	| GetTemplatesResponseAction
	| GetTemplatesErrorAction
	| GetTemplateRequestAction
	| GetTemplateResponseAction
	| GetTemplateErrorAction
	| UpdateTemplateRequestAction
	| UpdateTemplateResponseAction
	| UpdateTemplateErrorAction
	| DeleteTemplateRequestAction
	| DeleteTemplateResponseAction
	| DeleteTemplateErrorAction

export class CreateTemplateRequestAction {
	readonly type = ActionType.CREATE_TEMPLATE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: CreateTemplateParams) {}
}
export class CreateTemplateResponseAction {
	readonly type = ActionType.CREATE_TEMPLATE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: CreateTemplateRequestAction, public data: TemplateDetails) {}
}
export class CreateTemplateErrorAction {
	readonly type = ActionType.CREATE_TEMPLATE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: CreateTemplateRequestAction, public error: TemplateError) {}
}

export class GetTemplateRequestAction {
	readonly type = ActionType.GET_TEMPLATE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: number) {
		''
	}
}
export class GetTemplateResponseAction {
	readonly type = ActionType.GET_TEMPLATE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetTemplateRequestAction, public data: TemplateDetails) {}
}
export class GetTemplateErrorAction {
	readonly type = ActionType.GET_TEMPLATE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetTemplateRequestAction, public error: TemplateError) {}
}

export class GetTemplatesRequestAction {
	readonly type = ActionType.GET_TEMPLATES
	readonly mode = AsyncActionMode.REQUEST
	constructor() {
		''
	}
}
export class GetTemplatesResponseAction {
	readonly type = ActionType.GET_TEMPLATES
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetTemplatesRequestAction, public data: TemplateDetails[]) {}
}
export class GetTemplatesErrorAction {
	readonly type = ActionType.GET_TEMPLATES
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetTemplatesRequestAction, public error: TemplateError) {}
}

export class UpdateTemplateRequestAction {
	readonly type = ActionType.UPDATE_TEMPLATE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: UpdateTemplateParams) {}
}
export class UpdateTemplateResponseAction {
	readonly type = ActionType.UPDATE_TEMPLATE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: UpdateTemplateRequestAction, public data: TemplateDetails) {}
}
export class UpdateTemplateErrorAction {
	readonly type = ActionType.UPDATE_TEMPLATE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: UpdateTemplateRequestAction, public error: TemplateError) {}
}

export class DeleteTemplateRequestAction {
	readonly type = ActionType.DELETE_TEMPLATE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: number) {
		''
	}
}
export class DeleteTemplateResponseAction {
	readonly type = ActionType.DELETE_TEMPLATE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: DeleteTemplateRequestAction, public data: TemplateDetails) {}
}
export class DeleteTemplateErrorAction {
	readonly type = ActionType.DELETE_TEMPLATE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: DeleteTemplateRequestAction, public error: TemplateError) {}
}
