export interface UrlParams {
  _token: string
  email: string
}

export interface PasswordResetParams {
  token: string | string[] | null | undefined
  password: string
  password_repeat: string
}
