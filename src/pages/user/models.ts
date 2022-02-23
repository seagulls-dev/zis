import { CompanyDetails } from 'pages/company/models'

export interface UserState {
  isSaving: boolean
  isLoading: boolean
  user?: UserDetails
  users?: UserDetails[]
  error?: ErrorUser
  user_roles?: string[]
}
export interface UserDetails {
  id: number
  username: string
  avatar?: string
  note?: string
  is_unix: boolean
  is_deleted: boolean
  name?: string
  surname: string
  email: string
  phone?: string
  password_reset_token?: string
  roles: string[]
  company?: CompanyDetails
  ident? : string
  created_at: number
  updated_at?: number
  deleted_at?: number
  customer_id?: number
  title?: string
  is_zcom?: boolean
}
export interface CreateUserParams {
  username: string
  email: string
  password: string
  password_repeat: string
  name?: string
  surname: string
  is_unix: boolean | number
  phone?: string
  avatar?: string | []
  note?: string
  customer_id?: number
}

export interface UpdateUserParams {
  id: number
  email: string
  username?: string
  name?: string
  surname: string
  phone?: string
  avatar?: string | []
  note?: string
  customer_id?: number
}

export interface ProfileUserParams {
  email: string
  name?: string
  surname: string
  phone?: string
  avatar?: string | []
  note?: string
}

export interface ErrorUser {
  message: string
}
