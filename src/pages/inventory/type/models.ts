export interface InventoryTypeState {
  inventorytype?: InventoryTypeDetails[]
  error?: InventoryTypeError
}
export interface InventoryTypeDetails {
  id: number
  name: string
  is_server_component: number
  is_rack_equipment: number
  has_management_ip: number
  is_server_case: number
  is_blade_container: number
  is_blade_module: number
}
export interface InventoryTypeError {
  message: string
}
