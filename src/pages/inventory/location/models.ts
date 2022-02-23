export interface InventoryLocationState {
  isLoading?: boolean
  inventorylocation?: InventoryLocationDetails[]
  error?: InventoryLocationError
}

export interface InventoryLocationDetails {
  id: number
  name: string
}
export interface InventoryLocationError {
  message: string
}
