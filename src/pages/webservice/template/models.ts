import {WEBSERVER_ENUM, BACKEND_ENUM} from 'common/enums'

export interface TemplateState {
	isSaving?: boolean
	isLoading?: boolean
	template?: TemplateDetails
	templates?: TemplateDetails[]
	error?: TemplateError
}

export interface TemplateDetails {
	id: number
	web_server: WEBSERVER_ENUM
	backend: BACKEND_ENUM
	description: string
	code: string
}

export interface CreateTemplateParams {
	web_server: WEBSERVER_ENUM
	backend: BACKEND_ENUM
	description: string
	code: string
}

export interface UpdateTemplateParams {
	id: number
	description: string
	code: string
}

export interface TemplateError {
	message: string
}
