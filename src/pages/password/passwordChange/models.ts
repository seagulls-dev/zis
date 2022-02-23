export interface ChangePasswordState {
  isLoading: boolean
  error?: string
  data?: {}
}

export interface ChangePasswordParams {
  password_old: string
  password: string
  password_repeat: string
}
