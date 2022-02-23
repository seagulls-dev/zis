import {ActionType, TemplateActions} from './actions'
import {AsyncActionMode} from 'common/models'
import {TemplateState} from './models'

const TEMPLATE_INITIAL_STATE: TemplateState = {
	isLoading: false,
	isSaving: false,
	error: undefined,
}

export default (state = TEMPLATE_INITIAL_STATE, action: TemplateActions): TemplateState => {
	switch (action.type) {
		case ActionType.GET_TEMPLATE:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isLoading: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					template: action.data,
					isLoading: false,
				}
			}
			if (action.mode === AsyncActionMode.ERROR) {
				return {
					...state,
					isLoading: false,
					error: action.error,
				}
			}
			break
		case ActionType.CREATE_TEMPLATE:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					templates: state.templates?.concat(action.data),
					isSaving: false,
				}
			}
			if (action.mode === AsyncActionMode.ERROR) {
				return {
					...state,
					error: action.error,
					isSaving: false,
				}
			}
			break
		case ActionType.GET_TEMPLATES:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isLoading: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					isLoading: false,
					templates: action.data,
				}
			}
			if (action.mode === AsyncActionMode.ERROR) {
				return {
					...state,
					isLoading: false,
					error: action.error,
				}
			}
			break
		case ActionType.DELETE_TEMPLATE:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					templates: state.templates!.filter((template) => template.id !== action.request.id),
					isSaving: false,
				}
			}
			if (action.mode === AsyncActionMode.ERROR) {
				return {
					...state,
					isSaving: false,
					error: action.error,
				}
			}
			break

		case ActionType.UPDATE_TEMPLATE:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					templates: state.templates!.map((template) => (template.id === action.data.id ? {...action.data} : template)),
					isSaving: false,
				}
			}
			if (action.mode === AsyncActionMode.ERROR) {
				return {
					...state,
					isSaving: false,
					error: action.error,
				}
			}
			break
	}
	return state
}
