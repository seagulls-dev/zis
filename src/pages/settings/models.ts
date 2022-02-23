

export interface SettingsState {
  isLoading: boolean
  setting?: SettingsDetails
  settings?: SettingsDetails[]
  error?: ErrorSetting
}

export interface SettingsDetails {
  id?: number
  name: string
  scope: string
  object_id?: number
  value: string
  frozen?: number
  hidden?: number
}

export interface UpdateSettingParams {
  id?: number
  name: string
  scope: string
  object_id?: number
  value: string
  frozen?: number
  hidden?: number
}

export interface ErrorSetting {
  message: string
}
