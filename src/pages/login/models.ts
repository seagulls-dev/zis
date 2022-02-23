import { UserDetails } from 'pages/user/models'

export interface AuthState {
  authenticated: boolean
  isLoading: boolean
  error?: string | {}
  token?: string | null
  message?: string
  data?: AuthResponseData
  self?: UserDetails
  menu_roles?: {}
}

export interface LoginParams {
  username: string
  password: string
}
export interface AuthResponseData {
  token?: string
  message?: string
  username?: {}
  password?: {}
}
