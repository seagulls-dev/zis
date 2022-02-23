export interface TaxState {
  isSaving?: boolean
  isLoading?: boolean
  tax?: TaxDetails
  taxes?: TaxDetails[]
  error?: TaxError
}

export interface TaxDetails {
  id: number
  name: string
  rate: number
  valid_from: Date
  valid_to: Date
  country: string
  deleted_at?: string
}

export interface CreateTaxParams {
  name: string
  rate: number
  valid_from: Date
  valid_to?: Date
  country: string
}

export interface UpdateTaxParams {
  id: number
  name: string
  rate: number
  valid_from: Date
  valid_to?: Date
  country: string
}
export interface DeleteTaxParams {
  id: number
}

export interface TaxError {
  message: string
}
