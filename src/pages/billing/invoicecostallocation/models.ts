export interface InvoiceCostAllocationState {
  isLoading: boolean
  isSaving: boolean
  invoiceallocation?: InvoiceCostAllocationDetails
  invoiceallocations?: InvoiceCostAllocationDetails[]
  error?: any
}
export interface InvoiceCostAllocationDetails
  extends InvoiceCostAllocationParams {
  id: number
}
export interface InvoiceCostAllocationParams {
  invoice_id: number
  cost_allocation_category_id: number
  price: number
  note?: string
}
export interface InvoiceCostAllocationError {
  message: string
}
