export interface BillVatSummaryState {
  isSaving?: boolean
  isLoading?: boolean
  billvatsummary?: BillVatSummaryDetails[]
  error?: BillVatSummaryError
}

export interface BillVatSummaryDetails extends BillVatSummaryParams {
  id: number
}

export interface BillVatSummaryParams {
  bill_id: number
  tax_id: number
  total_without_vat: number
  total_vat: number
  total_with_vat: number
  rounding_difference: number
}

export interface BillVatSummaryError {
  message: string
}
