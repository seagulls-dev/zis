export interface PricelistState {
	isSaving?: boolean
	isLoading?: boolean
	pricelist?: PricelistDetails
	pricelists?: PricelistDetails[]
	error?: PricelistError
}

export interface PricelistDetails {
	id: number
	parent_id?: number
	name: string
	description?: string
	valid_from: Date
	valid_to?: Date
	customer_id?: number
	currency?: 'CZK' | 'EUR'
	deleted_at?: Date
  is_vat_payer?: number | boolean
}

export interface CreatePricelistParams {
	name: string
	parent_id?: number
	description?: string
	valid_from: Date
	valid_to?: Date
	customer_id?: number
	currency?: 'CZK' | 'EUR'
}

export interface UpdatePricelistParams {
	id: number
	name: string
	description?: string
	valid_from: Date
	valid_to?: Date
	customer_id?: number
	currency?: 'CZK' | 'EUR'
}

export interface DeletePricelistParams {
	id: number
}

export interface PricelistError {
	message: string
}
