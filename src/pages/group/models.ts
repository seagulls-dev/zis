import { UserDetails } from 'pages/user/models'
import { CustomerDetails } from 'pages/billing/customer/models'

export interface GroupState {
  isLoading: boolean
  error?: any
  data?: GroupDetails
}

export interface GroupDetails {
  id: number
  key: string
  title: string
  parent_id?: number
  customer_id?: number
  customer?: CustomerDetails
  users: [] | UserDetails[]
  children: [] | GroupDetails[]
  roles: [] | string[]
}
export interface CreateGroupParams {
  title: string
  parent_id: string
  customer_id: number
}

export interface GetGroupParams {
  id: string
}

export interface UpdateGroupParams {
  id: string
  title: string
}

export interface DeleteGroupParams {
  id: number
}

export interface AddDeleteUserToGroupParams {
  id: number
  users_id: number[]
}

export interface AddDeleteRoleToGroupParams {
  id: number
  roles: string[]
}
