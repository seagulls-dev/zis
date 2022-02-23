import {ActionType, HistoryActions} from './actions'
import {AsyncActionMode} from 'common/models'
import {HistoryState, HistoryError} from './models'

const HISTORY_INITIAL_STATE: HistoryState = {
	historyByName: {},
	isLoading: false,
}

export default (state = HISTORY_INITIAL_STATE, action: HistoryActions): HistoryState => {
	switch (action.type) {
		case ActionType.GET_HISTORY:
			if (action.mode === AsyncActionMode.REQUEST) {
				return {...state, isLoading: true}
			}
			if (action.mode === AsyncActionMode.RESPONSE) {
				return {
					...state,
					historyByName: {
						[`${action.name}-${action.id}`]: action.data,
					},
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
	}
	return state
}
