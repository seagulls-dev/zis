import { AsyncActionMode } from 'common/models'
import {
  CreateProductPriceRangeParams,
  ProductPriceRangeDetails,
  ProductPriceRangeError,
  UpdateProductPriceRangeParams,
} from '../models'

export enum ActionType {
  CREATE_PRODUCTPRICERANGE = 'CREATE_PRODUCTPRICERANGE',
  GET_PRODUCTPRICERANGES = 'GET_PRODUCTPRICERANGES',
  GET_PRODUCTPRICERANGE = 'GET_PRODUCTPRICERANGE',
  UPDATE_PRODUCTPRICERANGE = 'UPDATE_PRODUCTPRICERANGE',
  DELETE_PRODUCTPRICERANGE = 'DELETE_PRODUCTPRICERANGE',
}

export type ProductPriceRangeActions =
  | CreateProductPriceRangeRequestAction
  | CreateProductPriceRangeResponseAction
  | CreateProductPriceRangeErrorAction
  | GetProductPriceRangesRequestAction
  | GetProductPriceRangesResponseAction
  | GetProductPriceRangesErrorAction
  | GetProductPriceRangeRequestAction
  | GetProductPriceRangeResponseAction
  | GetProductPriceRangeErrorAction
  | UpdateProductPriceRangeRequestAction
  | UpdateProductPriceRangeResponseAction
  | UpdateProductPriceRangeErrorAction
  | DeleteProductPriceRangeRequestAction
  | DeleteProductPriceRangeResponseAction
  | DeleteProductPriceRangeErrorAction

export class CreateProductPriceRangeRequestAction {
  readonly type = ActionType.CREATE_PRODUCTPRICERANGE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CreateProductPriceRangeParams) {}
}
export class CreateProductPriceRangeResponseAction {
  readonly type = ActionType.CREATE_PRODUCTPRICERANGE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateProductPriceRangeRequestAction,
    public data: ProductPriceRangeDetails,
  ) {}
}
export class CreateProductPriceRangeErrorAction {
  readonly type = ActionType.CREATE_PRODUCTPRICERANGE
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateProductPriceRangeRequestAction,
    public error: ProductPriceRangeError,
  ) {}
}

export class GetProductPriceRangeRequestAction {
  readonly type = ActionType.GET_PRODUCTPRICERANGE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetProductPriceRangeResponseAction {
  readonly type = ActionType.GET_PRODUCTPRICERANGE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetProductPriceRangeRequestAction,
    public data: ProductPriceRangeDetails,
  ) {}
}
export class GetProductPriceRangeErrorAction {
  readonly type = ActionType.GET_PRODUCTPRICERANGE
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetProductPriceRangeRequestAction,
    public error: ProductPriceRangeError,
  ) {}
}

export class GetProductPriceRangesRequestAction {
  readonly type = ActionType.GET_PRODUCTPRICERANGES
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetProductPriceRangesResponseAction {
  readonly type = ActionType.GET_PRODUCTPRICERANGES
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetProductPriceRangesRequestAction,
    public data: ProductPriceRangeDetails[],
  ) {}
}
export class GetProductPriceRangesErrorAction {
  readonly type = ActionType.GET_PRODUCTPRICERANGES
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetProductPriceRangesRequestAction,
    public error: ProductPriceRangeError,
  ) {}
}

export class UpdateProductPriceRangeRequestAction {
  readonly type = ActionType.UPDATE_PRODUCTPRICERANGE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: UpdateProductPriceRangeParams) {}
}
export class UpdateProductPriceRangeResponseAction {
  readonly type = ActionType.UPDATE_PRODUCTPRICERANGE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateProductPriceRangeRequestAction,
    public data: ProductPriceRangeDetails,
  ) {}
}
export class UpdateProductPriceRangeErrorAction {
  readonly type = ActionType.UPDATE_PRODUCTPRICERANGE
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateProductPriceRangeRequestAction,
    public error: ProductPriceRangeError,
  ) {}
}

export class DeleteProductPriceRangeRequestAction {
  readonly type = ActionType.DELETE_PRODUCTPRICERANGE
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class DeleteProductPriceRangeResponseAction {
  readonly type = ActionType.DELETE_PRODUCTPRICERANGE
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteProductPriceRangeRequestAction,
    public data: ProductPriceRangeDetails,
  ) {}
}
export class DeleteProductPriceRangeErrorAction {
  readonly type = ActionType.DELETE_PRODUCTPRICERANGE
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteProductPriceRangeRequestAction,
    public error: ProductPriceRangeError,
  ) {}
}
