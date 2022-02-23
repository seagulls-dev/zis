export interface CustomerServiceState {
	isSaving?: boolean
	isLoading?: boolean
	customerservice?: CustomerServiceDetails
	customerservices?: CustomerServiceDetails[]
	error?: CustomerServiceError
}

export interface CustomerServiceDetails {
	id: number
	key?: string | number
	parent_id?: number
	previous_id?: number
	customer_id: number
	product_id: number
	children?: CustomerServiceDetails[]
	name: string
	title?: string
	description?: string
	internal_note?: string
	unit_count: number
	unit_price: number
	date_from: string
	date_to?: string
	price?: ServicePrice
	deleted_at?: string
  invoiced_by?: string
}

interface ServicePrice {
	without_vat: number
	with_vat: number
	tax_rate: number
	currency: string
	price_per_unit: number
	vat: number
}

export interface CreateCustomerServiceParams {
	parent_id?: number
	customer_id: number
	previous_id?: number
	product_id: number
	name: string
	description?: string
	internal_note?: string
	unit_count: number
	date_from: string
	date_to?: string
  billable?: number | boolean
}

export interface UpdateCustomerServiceParams {
	id: number
	name: string
	customer_id: number
	parent_id?: number
	product_id: number
	previous_id?: number
	description?: string
	internal_note?: string
	date_from: string
	date_to?: string
	unit_count: number
	unit_price: number
	children?: CustomerServiceDetails[]
  billable?: boolean | number
}

export interface CreateOneTimeProductParams {
	customer_id: number
	product_id: number
	name: string
	unit_count: number
	unit_price: number
	date_from: string
	description?: string
	internal_note?: string
  parent_id?: number
}
export interface DeleteCustomerServiceParams {
	id: number
}

export interface CustomerServiceError {
	message: string
}
