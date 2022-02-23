export interface BillState {
  isSaving?: boolean
  isLoading?: boolean
  bill?: BillDetails
  bills?: BillDetails[]
  error?: BillError
}

export interface BillDetails extends BillParams {
  id: number
}

export interface BillParams {
  company_id: number
  number?: string
  date_of_maturity: string
  date_of_taxing: string
  total_without_vat: number
  total_vat: number
  total_with_vat: number
  rounding_difference: number
  currency: 'CZK' | 'EUR' | 'USD' | 'BAM' | 'HRK' | 'HUF'
  internal_note?: string
}

export interface BillError {
  message: string
}
