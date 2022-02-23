export interface DbUserState {
	isSaving?: boolean
	isLoading?: boolean
	dbuser?: DbUserDetails
	dbusers?: DbUserDetails[]
	error?: DbUserError
}

export interface DbUserDetails {
	id: number
	name: string
	rate: number
	valid_from: Date
	valid_to: Date
	country: string
	deleted_at?: string
}

export interface CreateDbUserParams {
	name: string
	rate: number
	valid_from: Date
	valid_to?: Date
	country: string
}

export interface UpdateDbUserParams {
	id: number
	name: string
	rate: number
	valid_from: Date
	valid_to?: Date
	country: string
}
export interface DeleteDbUserParams {
	id: number
}

export interface DbUserError {
	message: string
}
