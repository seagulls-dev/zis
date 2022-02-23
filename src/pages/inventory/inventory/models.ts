export interface InventoryState {
  isLoading: boolean
  isSaving: boolean
  inventory?: InventoryDetails
  inventories?: InventoryDetails[]
  error?: InventoryError
}
export interface InventoryDetails extends UpdateInventoryParams {
  id: number
}
export interface UpdateInventoryParams extends CreateInventoryParams {
  is_active: 1 | 0
}
export interface CreateInventoryParams {
  name: string
  location_id: number
  type_id: number
  vendor_id?: number //company_id
  vendor?: string
  inv_no: string
  owner: string
  server_id?: number
  purchase_date?: Date
  serial?: string
  warranty?: number //  Number of monhts
  price?: number
  parameters?: string
  comment?: string
}
export interface InventoryError {
  message: string
}
