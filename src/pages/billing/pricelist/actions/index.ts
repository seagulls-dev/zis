import {AsyncActionMode} from 'common/models'
import {CreatePricelistParams, PricelistDetails, PricelistError, UpdatePricelistParams} from '../models'

export enum ActionType {
	CREATE_PRICELIST = 'CREATE_PRICELIST',
	GET_PRICELISTS = 'GET_PRICELISTS',
	GET_PRICELIST_BY_CUTOMER = 'GET_PRICELIST_BY_CUTOMER',
	GET_PRICELIST = 'GET_PRICELIST',
	UPDATE_PRICELIST = 'UPDATE_PRICELIST',
	DELETE_PRICELIST = 'DELETE_PRICELIST',
}

export type PricelistActions =
	| CreatePricelistRequestAction
	| CreatePricelistResponseAction
	| CreatePricelistErrorAction
	| GetPricelistsRequestAction
	| GetPricelistsResponseAction
	| GetPricelistsErrorAction
	| GetPricelistRequestAction
	| GetPricelistResponseAction
	| GetPricelistErrorAction
	| UpdatePricelistRequestAction
	| UpdatePricelistResponseAction
	| UpdatePricelistErrorAction
	| DeletePricelistRequestAction
	| DeletePricelistResponseAction
	| DeletePricelistErrorAction
	| GetPricelistsByCustomerRequestAction
	| GetPricelistsByCustomerResponseAction
	| GetPricelistsByCustomerErrorAction

export class GetPricelistsByCustomerRequestAction {
	readonly type = ActionType.GET_PRICELIST_BY_CUTOMER
	readonly mode = AsyncActionMode.REQUEST
	constructor(public customer_id: number) {}
}
export class GetPricelistsByCustomerResponseAction {
	readonly type = ActionType.GET_PRICELIST_BY_CUTOMER
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetPricelistsByCustomerRequestAction, public data: PricelistDetails) {}
}
export class GetPricelistsByCustomerErrorAction {
	readonly type = ActionType.GET_PRICELIST_BY_CUTOMER
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetPricelistsByCustomerRequestAction, public error: PricelistError) {}
}

export class CreatePricelistRequestAction {
	readonly type = ActionType.CREATE_PRICELIST
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: CreatePricelistParams) {}
}
export class CreatePricelistResponseAction {
	readonly type = ActionType.CREATE_PRICELIST
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: CreatePricelistRequestAction, public data: PricelistDetails) {}
}
export class CreatePricelistErrorAction {
	readonly type = ActionType.CREATE_PRICELIST
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: CreatePricelistRequestAction, public error: PricelistError) {}
}

export class GetPricelistRequestAction {
	readonly type = ActionType.GET_PRICELIST
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: number) {
		''
	}
}
export class GetPricelistResponseAction {
	readonly type = ActionType.GET_PRICELIST
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetPricelistRequestAction, public data: PricelistDetails) {}
}
export class GetPricelistErrorAction {
	readonly type = ActionType.GET_PRICELIST
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetPricelistRequestAction, public error: PricelistError) {}
}

export class GetPricelistsRequestAction {
	readonly type = ActionType.GET_PRICELISTS
	readonly mode = AsyncActionMode.REQUEST
	constructor() {
		''
	}
}
export class GetPricelistsResponseAction {
	readonly type = ActionType.GET_PRICELISTS
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetPricelistsRequestAction, public data: PricelistDetails[]) {}
}
export class GetPricelistsErrorAction {
	readonly type = ActionType.GET_PRICELISTS
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetPricelistsRequestAction, public error: PricelistError) {}
}

export class UpdatePricelistRequestAction {
	readonly type = ActionType.UPDATE_PRICELIST
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: UpdatePricelistParams) {}
}
export class UpdatePricelistResponseAction {
	readonly type = ActionType.UPDATE_PRICELIST
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: UpdatePricelistRequestAction, public data: PricelistDetails) {}
}
export class UpdatePricelistErrorAction {
	readonly type = ActionType.UPDATE_PRICELIST
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: UpdatePricelistRequestAction, public error: PricelistError) {}
}

export class DeletePricelistRequestAction {
	readonly type = ActionType.DELETE_PRICELIST
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: number) {
		''
	}
}
export class DeletePricelistResponseAction {
	readonly type = ActionType.DELETE_PRICELIST
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: DeletePricelistRequestAction, public data: PricelistDetails) {}
}
export class DeletePricelistErrorAction {
	readonly type = ActionType.DELETE_PRICELIST
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: DeletePricelistRequestAction, public error: PricelistError) {}
}
