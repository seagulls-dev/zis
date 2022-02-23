export interface SettingState {
	isSaving?: boolean
	isLoading?: boolean
	setting?: SettingDetails
	settings?: SettingDetails[]
	error?: SettingError
}

export interface SettingDetails {
	id: number
	vhost_id: number
	name: string
	value: string
}

export interface CreateSettingParams {
	vhost_id: number
	name: string
	value: string
}

export interface UpdateSettingParams {
	id: number
	value: string
}

export interface SettingError {
	message: string
}
