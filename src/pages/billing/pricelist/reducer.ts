import {ActionType, PricelistActions} from './actions'
import {AsyncActionMode} from 'common/models'
import {PricelistState} from './models'

const PRICELIST_INITIAL_STATE: PricelistState = {
	isLoading: false,
	isSaving: false,
	error: undefined,
}

export default (state = PRICELIST_INITIAL_STATE, action: PricelistActions): PricelistState => {
	switch (action.type) {
		case ActionType.GET_PRICELIST_BY_CUTOMER:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isLoading: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					isLoading: false,
					[action.request.customer_id]: action.data,
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

		case ActionType.GET_PRICELIST:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isLoading: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					isLoading: false,
					pricelist: action.data,
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
		case ActionType.CREATE_PRICELIST:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					pricelists: state.pricelists?.concat(action.data),
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
		case ActionType.GET_PRICELISTS:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isLoading: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					isLoading: false,
					pricelists: action.data,
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
		case ActionType.DELETE_PRICELIST:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					pricelists: state.pricelists!.filter((pricelist) => pricelist.id !== action.request.id),
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

		case ActionType.UPDATE_PRICELIST:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					pricelists: state.pricelists!.map((pricelist) =>
						pricelist.id === action.data.id ? {...action.data} : pricelist,
					),
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
