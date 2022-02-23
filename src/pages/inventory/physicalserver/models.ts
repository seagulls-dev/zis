import { InventoryDetails } from '../inventory/models'

export interface PhysicalServerState {
  isLoading: boolean
  isSaving: boolean
  physicalserver?: PhysicalServerDetails
  physicalservers?: PhysicalServerDetails[]
  error?: PhysicalServerError
}
export interface PhysicalServerDetails extends CreatePhysicalServerParams {
  id: number
  serverComponents?: InventoryDetails[]
}
export interface CreatePhysicalServerParams {
  ident: string
  location_id: number
  position_index?: number
  container_id?: number
  case_id?: number
  rack_id?: number
  rack_pos?: number
  server_conf?: string
  power?: number
  u_size?: number
}
export interface UpdatePhysicalServerParams {
  id: number
  ident?: string
  location_id?: number
  server_conf?: string
  power?: number
  u_size?: number
}
export interface PhysicalServerError {
  message: string
}
export interface MovePhysicalServerParams {
  physical_server_id: number
  new_location_id: number //return back??
}
export interface PhysicalServerAddComponentParams {
  physical_server_id: number
  server_component_ids: number[] //Inventory Item
}
export interface PhysicalServerRemoveComponentParams {
  physical_server_id: number
  server_component_id: number //Inventory Item
  new_location_id: number //return back??
}
export interface PhysicalServerSwapComponentParams {
  physical_server_id: number
  old_component_id: number //Inventory Item
  new_component_id: number //Inventory Item
  new_location_id: number //return back??
}
export interface PhysicalServerSwapComponentResponse {
  id: number
  physical_server_id: number
  server_component_id: number
}
export interface PhysicalServerRemoveFromRackParams {
  server_id: number //physical_server_id
}
export interface PhysicalServerSetRackParams {
  server_id: number
  rack_id: number
  rack_pos: number
}
