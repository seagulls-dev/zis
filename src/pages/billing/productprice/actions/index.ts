import {AsyncActionMode} from 'common/models'
import {CreateProductPriceParams, ProductPriceDetails, ProductPriceError, UpdateProductPriceParams} from '../models'

export enum ActionType {
	CREATE_PRODUCTPRICE = 'CREATE_PRODUCTPRICE',
	GET_PRODUCTPRICES = 'GET_PRODUCTPRICES',
	GET_PRODUCTPRICE = 'GET_PRODUCTPRICE',
	UPDATE_PRODUCTPRICE = 'UPDATE_PRODUCTPRICE',
	DELETE_PRODUCTPRICE = 'DELETE_PRODUCTPRICE',
	GET_PRODUCTPRICES_BY_PRICELIST = 'GET_PRODUCTPRICES_BY_PRICELIST',
}

export type ProductPriceActions =
	| CreateProductPriceRequestAction
	| CreateProductPriceResponseAction
	| CreateProductPriceErrorAction
	| GetProductPricesRequestAction
	| GetProductPricesResponseAction
	| GetProductPricesErrorAction
	| GetProductPriceRequestAction
	| GetProductPriceResponseAction
	| GetProductPriceErrorAction
	| UpdateProductPriceRequestAction
	| UpdateProductPriceResponseAction
	| UpdateProductPriceErrorAction
	| DeleteProductPriceRequestAction
	| DeleteProductPriceResponseAction
	| DeleteProductPriceErrorAction
	| GetProductPricesByPricelistRequestAction
	| GetProductPricesByPricelistResponseAction
	| GetProductPricesByPricelistErrorAction

export class GetProductPricesByPricelistRequestAction {
	readonly type = ActionType.GET_PRODUCTPRICES_BY_PRICELIST
	readonly mode = AsyncActionMode.REQUEST
	constructor(public pricelist_id: number) {
		''
	}
}
export class GetProductPricesByPricelistResponseAction {
	readonly type = ActionType.GET_PRODUCTPRICES_BY_PRICELIST
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetProductPricesByPricelistRequestAction, public data: ProductPriceDetails[]) {}
}
export class GetProductPricesByPricelistErrorAction {
	readonly type = ActionType.GET_PRODUCTPRICES_BY_PRICELIST
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetProductPricesByPricelistRequestAction, public error: ProductPriceError) {}
}

export class CreateProductPriceRequestAction {
	readonly type = ActionType.CREATE_PRODUCTPRICE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: CreateProductPriceParams) {}
}
export class CreateProductPriceResponseAction {
	readonly type = ActionType.CREATE_PRODUCTPRICE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: CreateProductPriceRequestAction, public data: ProductPriceDetails) {}
}
export class CreateProductPriceErrorAction {
	readonly type = ActionType.CREATE_PRODUCTPRICE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: CreateProductPriceRequestAction, public error: ProductPriceError) {}
}

export class GetProductPriceRequestAction {
	readonly type = ActionType.GET_PRODUCTPRICE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public payload: number) {
		''
	}
}
export class GetProductPriceResponseAction {
	readonly type = ActionType.GET_PRODUCTPRICE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetProductPriceRequestAction, public data: ProductPriceDetails) {}
}
export class GetProductPriceErrorAction {
	readonly type = ActionType.GET_PRODUCTPRICE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetProductPriceRequestAction, public error: ProductPriceError) {}
}

export class GetProductPricesRequestAction {
	readonly type = ActionType.GET_PRODUCTPRICES
	readonly mode = AsyncActionMode.REQUEST
	constructor() {
		''
	}
}
export class GetProductPricesResponseAction {
	readonly type = ActionType.GET_PRODUCTPRICES
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: GetProductPricesRequestAction, public data: ProductPriceDetails[]) {}
}
export class GetProductPricesErrorAction {
	readonly type = ActionType.GET_PRODUCTPRICES
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: GetProductPricesRequestAction, public error: ProductPriceError) {}
}

export class UpdateProductPriceRequestAction {
	readonly type = ActionType.UPDATE_PRODUCTPRICE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: UpdateProductPriceParams) {}
}
export class UpdateProductPriceResponseAction {
	readonly type = ActionType.UPDATE_PRODUCTPRICE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: UpdateProductPriceRequestAction, public data: ProductPriceDetails) {}
}
export class UpdateProductPriceErrorAction {
	readonly type = ActionType.UPDATE_PRODUCTPRICE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: UpdateProductPriceRequestAction, public error: ProductPriceError) {}
}

export class DeleteProductPriceRequestAction {
	readonly type = ActionType.DELETE_PRODUCTPRICE
	readonly mode = AsyncActionMode.REQUEST
	constructor(public id: number) {
		''
	}
}
export class DeleteProductPriceResponseAction {
	readonly type = ActionType.DELETE_PRODUCTPRICE
	readonly mode = AsyncActionMode.RESPONSE
	constructor(public request: DeleteProductPriceRequestAction, public data: ProductPriceDetails) {}
}
export class DeleteProductPriceErrorAction {
	readonly type = ActionType.DELETE_PRODUCTPRICE
	readonly mode = AsyncActionMode.ERROR
	constructor(public request: DeleteProductPriceRequestAction, public error: ProductPriceError) {}
}
