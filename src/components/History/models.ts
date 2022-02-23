export interface HistoryState {
	historyByName: {
		[key: string]: HistoryDetails[]
	}
	error?: HistoryError
	isLoading: boolean
}

export interface HistoryDetails {
	context: string // Context
	id: number
	user_id: number
	model: string
	model_id: number
	operation: string
	operationName: string
	remote_ip: string
	table: string
	created_at: number
	updated_at: number
}

export type Context = {
	id: number
	parent_id: number
	previous_id: number
	customer_id: number
	product_id: number
	unit_count: number
	name: string
	description: string
	internal_note: string
	date_from: number
	date_to: number
}

export interface HistoryError {
	message: string
}
