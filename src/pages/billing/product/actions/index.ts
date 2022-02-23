import { AsyncActionMode } from 'common/models'
import {
  CreateProductParams,
  ProductDetails,
  ProductError,
  UpdateProductParams,
} from '../models'

export enum ActionType {
  CREATE_PRODUCT = 'CREATE_PRODUCT',
  GET_PRODUCTS = 'GET_PRODUCTS',
  GET_PRODUCT = 'GET_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
}

export type ProductActions =
  | CreateProductRequestAction
  | CreateProductResponseAction
  | CreateProductErrorAction
  | GetProductsRequestAction
  | GetProductsResponseAction
  | GetProductsErrorAction
  | GetProductRequestAction
  | GetProductResponseAction
  | GetProductErrorAction
  | UpdateProductRequestAction
  | UpdateProductResponseAction
  | UpdateProductErrorAction
  | DeleteProductRequestAction
  | DeleteProductResponseAction
  | DeleteProductErrorAction

export class CreateProductRequestAction {
  readonly type = ActionType.CREATE_PRODUCT
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CreateProductParams) {}
}
export class CreateProductResponseAction {
  readonly type = ActionType.CREATE_PRODUCT
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateProductRequestAction,
    public data: ProductDetails,
  ) {}
}
export class CreateProductErrorAction {
  readonly type = ActionType.CREATE_PRODUCT
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateProductRequestAction,
    public error: ProductError,
  ) {}
}

export class GetProductRequestAction {
  readonly type = ActionType.GET_PRODUCT
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetProductResponseAction {
  readonly type = ActionType.GET_PRODUCT
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetProductRequestAction,
    public data: ProductDetails,
  ) {}
}
export class GetProductErrorAction {
  readonly type = ActionType.GET_PRODUCT
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetProductRequestAction,
    public error: ProductError,
  ) {}
}

export class GetProductsRequestAction {
  readonly type = ActionType.GET_PRODUCTS
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetProductsResponseAction {
  readonly type = ActionType.GET_PRODUCTS
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetProductsRequestAction,
    public data: ProductDetails[],
  ) {}
}
export class GetProductsErrorAction {
  readonly type = ActionType.GET_PRODUCTS
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetProductsRequestAction,
    public error: ProductError,
  ) {}
}

export class UpdateProductRequestAction {
  readonly type = ActionType.UPDATE_PRODUCT
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: UpdateProductParams) {}
}
export class UpdateProductResponseAction {
  readonly type = ActionType.UPDATE_PRODUCT
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateProductRequestAction,
    public data: ProductDetails,
  ) {}
}
export class UpdateProductErrorAction {
  readonly type = ActionType.UPDATE_PRODUCT
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateProductRequestAction,
    public error: ProductError,
  ) {}
}

export class DeleteProductRequestAction {
  readonly type = ActionType.DELETE_PRODUCT
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class DeleteProductResponseAction {
  readonly type = ActionType.DELETE_PRODUCT
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteProductRequestAction,
    public data: ProductDetails,
  ) {}
}
export class DeleteProductErrorAction {
  readonly type = ActionType.DELETE_PRODUCT
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteProductRequestAction,
    public error: ProductError,
  ) {}
}
