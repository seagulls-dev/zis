import {ProductPriceRangeDetails} from '../productpricerange/models'

export interface ProductPriceState {
	isSaving?: boolean
	isLoading?: boolean
	productprice?: ProductPriceDetails
	productprices?: ProductPriceDetails[]
	error?: ProductPriceError
	[key: number]: ProductPriceDetails[]
}

export interface ProductPriceDetails {
	id: number
	name: string
	product_id: number
	pricelist_id: number
	calculation_type: 'fix' | 'unit' | 'range'
	price: number
	productPriceRanges?: ProductPriceRangeDetails[]
}

export interface CreateProductPriceParams {
	name: string
	product_id: number
	pricelist_id: number
	calculation_type: 'fix' | 'unit' | 'range'
	price: number
}

export interface UpdateProductPriceParams {
	id: number
	name: string
	product_id?: number
	pricelist_id?: number
	calculation_type: 'fix' | 'unit' | 'range'
	price: number
}
export interface DeleteProductPriceParams {
	id: number
}

export interface ProductPriceError {
	message: string
}
