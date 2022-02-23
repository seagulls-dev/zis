export interface ProductPriceRangeState {
  isSaving?: boolean
  isLoading?: boolean
  productpricerange?: ProductPriceRangeDetails
  productpriceranges?: ProductPriceRangeDetails[]
  error?: ProductPriceRangeError
}

export interface CreateProductPriceRangeParams {
  product_price_id: number
  volume_from: number
  price: number
}

export interface UpdateProductPriceRangeParams {
  id: number
  product_price_id: number
  volume_from: number
  price: number
}
export interface DeleteProductPriceRangeParams {
  id: number
}

export interface ProductPriceRangeDetails {
  id: number
  product_price_id: number
  volume_from: number
  price: number
}

export interface ProductPriceRangeError {
  message: string
}
