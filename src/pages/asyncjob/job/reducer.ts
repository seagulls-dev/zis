import {ActionType, AsyncJobActions} from './actions'
import {AsyncActionMode} from 'common/models'
import {AsyncJobState} from './models'

const ASYNCJOB_INITIAL_STATE: AsyncJobState = {
	isLoading: false,
	isSaving: false,
	error: undefined,
}

export default (state = ASYNCJOB_INITIAL_STATE, action: AsyncJobActions): AsyncJobState => {
	switch (action.type) {
		case ActionType.START_JOB:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, actionedId: action.id, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					asyncjobs: state.asyncjobs!.map((asyncjob) => (asyncjob.id === action.data.id ? {...action.data} : asyncjob)),
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
		case ActionType.FINISH_JOB:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, actionedId: action.id, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					asyncjobs: state.asyncjobs!.map((asyncjob) => (asyncjob.id === action.data.id ? {...action.data} : asyncjob)),
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
		case ActionType.RESOLVE_JOB:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, actionedId: action.id, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					asyncjobs: state.asyncjobs!.map((asyncjob) => (asyncjob.id === action.data.id ? {...action.data} : asyncjob)),
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
		case ActionType.CANCEL_JOB:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, actionedId: action.id, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					asyncjobs: state.asyncjobs!.map((asyncjob) => (asyncjob.id === action.data.id ? {...action.data} : asyncjob)),
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
		case ActionType.GET_ASYNCJOB:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isLoading: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					asyncjob: action.data,
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
		case ActionType.CREATE_ASYNCJOB:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					asyncjobs: state.asyncjobs?.concat(action.data),
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
		case ActionType.GET_ASYNCJOBS:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isLoading: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					isLoading: false,
					asyncjobs: action.data,
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
		case ActionType.DELETE_ASYNCJOB:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					asyncjobs: state.asyncjobs!.filter((asyncjob) => asyncjob.id !== action.request.id),
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

		case ActionType.UPDATE_ASYNCJOB:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					asyncjobs: state.asyncjobs!.map((asyncjob) => (asyncjob.id === action.data.id ? {...action.data} : asyncjob)),
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
