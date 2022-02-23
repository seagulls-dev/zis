export interface BillCostAllocationState {
  isLoading: boolean
  isSaving: boolean
  billallocation?: BillCostAllocationDetails
  billallocations?: BillCostAllocationDetails[]
  error?: any
}
export interface BillCostAllocationDetails extends BillCostAllocationParams {
  id: number
}
export interface BillCostAllocationParams {
  bill_id: number
  cost_allocation_category_id: number
  price: number
  note?: string
}
export interface BillCostAllocationError {
  message: string
}
