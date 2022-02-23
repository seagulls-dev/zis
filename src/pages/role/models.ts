export interface RoleState {
  isLoading: boolean
  roles?: string[]
  rolesPermissions?: RolePermissionDetails[]
  error?: string
}
export interface RolePermissionDetails {
  role: string
  services: string[]
}
