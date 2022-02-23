import {ActionType, CustomerServiceActions} from './actions'
import {AsyncActionMode} from 'common/models'
import {CustomerServiceState} from './models'
import moment from 'moment'

const CUSTOMERSERVICE_INITIAL_STATE: CustomerServiceState = {
	isLoading: false,
	isSaving: false,
	error: undefined,
}

export default (state = CUSTOMERSERVICE_INITIAL_STATE, action: CustomerServiceActions): CustomerServiceState => {
	switch (action.type) {
		case ActionType.CREATE_ONE_TIME_PRODUCT:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					customerservices: state.customerservices?.concat(action.data),
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
		case ActionType.GET_CUSTOMERSERVICE:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isLoading: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					isLoading: false,
					customerservice: action.data,
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
		case ActionType.CREATE_CUSTOMERSERVICE:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				const prevId = action.request.payload.previous_id
				return {
					...state,
					customerservices: prevId
						? state.customerservices
								?.map((cs) => (cs.id === prevId ? {...cs, date_to: moment(action.data.date_from).subtract(1,'d').format('YYYY-MM-DD')} : {...cs}))
								.concat(action.data)
						: state.customerservices?.concat(action.data),
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
		case ActionType.GET_CUSTOMERSERVICES:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isLoading: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					isLoading: false,
					customerservices: action.data,
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
		case ActionType.DELETE_CUSTOMERSERVICE:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					customerservices: state.customerservices!.filter(
						(customerservice) => customerservice.id !== action.request.id,
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

		case ActionType.UPDATE_CUSTOMERSERVICE:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isSaving: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				const dateTo = action.request.payload.date_to
				return {
					...state,
					customerservices: state.customerservices!.map((customerservice) =>
						customerservice.id === action.data.id
							? dateTo
								? {...action.data, date_to: dateTo}
								: {...action.data}
							: customerservice,
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
