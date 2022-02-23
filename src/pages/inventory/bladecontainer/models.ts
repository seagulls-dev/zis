import { InventoryDetails } from '../inventory/models'
import { PhysicalServerDetails } from '../physicalserver/models'

export interface BladeContainerState {
  isSaving?: boolean
  isLoading?: boolean
  bladecontainer?: BladeContainerDetails
  bladecontainers?: BladeContainerDetails[]
  error?: BladeContainerError
}

export interface BladeContainerDetails extends CreateBladeContainerParams {
  id: number
}

export interface CreateBladeContainerParams {
  name: string
  case?: InventoryDetails
  case_id: number //Inventory Item
  location_id: number
  count: number //Count of slots
  u_size: number
  rack_id?: number
  rack_pos?: number //Position in rack
  physicalServers?: PhysicalServerDetails[]
}

export interface UpdateBladeContainerParams {
  id: number
  name: string
  case_id: number //Inventory Item
  location_id: number
  count: number //Count of slots
  u_size: number
  rack_id?: number
  rack_pos?: number //Position in rack
}

export interface DeleteBladeContainerParams {
  id: number
}

export interface ReallocateBladeContainerParams {
  container_id: number
  new_location_id: number
}

export interface BladeContainerError {
  message: string
}

export interface InsertBladeParams {
  container_id: number
  position_index: number //Slot
  case_id: number //Inventory Item
  ident: string //physical serves ident
  server_conf?: string //Server configuration
}

export interface MoveBladeParams {
  container_id: number
  position_index: number //Slot
  new_position_index: number
}

export interface ReallocateBladeParams {
  container_id: number
  position_index: number //Slot
  new_location_id: number
}
