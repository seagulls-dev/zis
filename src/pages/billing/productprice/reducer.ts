import {ActionType, ProductPriceActions} from './actions'
import {AsyncActionMode} from 'common/models'
import {ProductPriceState} from './models'

const PRODUCTPRICE_INITIAL_STATE: ProductPriceState = {
	isLoading: false,
	isSaving: false,
	error: undefined,
}

export default (state = PRODUCTPRICE_INITIAL_STATE, action: ProductPriceActions): ProductPriceState => {
	switch (action.type) {
		case ActionType.GET_PRODUCTPRICES_BY_PRICELIST:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isLoading: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					isLoading: false,
					[action.request.pricelist_id]: action.data,
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

		case ActionType.GET_PRODUCTPRICE:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isLoading: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					isLoading: false,
					productprice: action.data,
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
		case ActionType.CREATE_PRODUCTPRICE:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					productprices: state.productprices?.concat(action.data),
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
		case ActionType.GET_PRODUCTPRICES:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isLoading: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					isLoading: false,
					productprices: action.data,
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
		case ActionType.DELETE_PRODUCTPRICE:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					productprices: state.productprices!.filter((productprice) => productprice.id !== action.request.id),
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

		case ActionType.UPDATE_PRODUCTPRICE:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					productprices: state.productprices?.map((productprice) =>
						productprice.id === action.data.id ? {...action.data} : productprice,
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
