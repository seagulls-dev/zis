export interface CostAllocationState {
  isLoading: boolean
  isSaving: boolean
  costallocation?: CostAllocationDetails
  costallocations?: CostAllocationDetails[]
  error?: any
}
export interface CostAllocationDetails {
  id: number
  name: string
}
export interface CreateCostAllocationParams {
  name: string
}
export interface UpdateCostAllocationParams {
  id: number
  name: string
}
export interface CostAllocationError {
  message: string
}
