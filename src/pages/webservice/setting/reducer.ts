import {ActionType, SettingActions} from './actions'
import {AsyncActionMode} from 'common/models'
import {SettingState} from './models'

const SETTING_INITIAL_STATE: SettingState = {
	isLoading: false,
	isSaving: false,
	error: undefined,
}

export default (state = SETTING_INITIAL_STATE, action: SettingActions): SettingState => {
	switch (action.type) {
		case ActionType.GET_SETTING:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isLoading: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					setting: action.data,
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
		case ActionType.CREATE_SETTING:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					settings: state.settings?.concat(action.data),
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
		case ActionType.GET_SETTINGS:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isLoading: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					isLoading: false,
					settings: action.data,
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
		case ActionType.DELETE_SETTING:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					settings: state.settings!.filter((setting) => setting.id !== action.request.id),
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

		case ActionType.UPDATE_SETTING:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					settings: state.settings!.map((setting) => (setting.id === action.data.id ? {...action.data} : setting)),
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
