export interface ProductState {
	isSaving?: boolean
	isLoading?: boolean
	product?: ProductDetails
	products?: ProductDetails[]
	error?: ProductError
}

export interface ProductDetails {
	id: number
	parent_id?: number
	name: string
	service_type?: string
	service_type_id?: number
	unit?: string
	tax_id: number
	expired?: 0 | 1
	children: ProductDetails[]
	key?: number | string
}

export interface UpdatedProductDetails {
	id: number
	parent_id?: number
	name: string
	service_type?: string
	unit?: string
	tax_id: number
	expired?: 0 | 1
	children: UpdatedProductDetails[]
	key: number | string
}

export interface CreateProductParams {
	name: string
	parent_id?: number
	service_type?: string
	service_type_id?: number
	unit?: string
	tax_id: number
	expired?: 0 | 1
}

export interface PrependedParentIdCreateParams {
	parent_id?: number
}

export interface UpdateProductParams {
	id: number
	parent_id?: number
	name: string
	service_type?: string
	service_type_id?: number
	unit?: string
	tax_id: number
	expired?: 0 | 1
	children: ProductDetails[]
}

export interface DeleteProductParams {
	id: number
}

export interface ProductError {
	message: string
}
