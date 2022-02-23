import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {GetHistoryRequestAction, GetHistoryResponseAction, GetHistoryErrorAction} from '.'
import {HistoryDetails} from '../models'

export default (url: string, id: number, name: string, cb?: (isSuccess: boolean) => void) => {
	return (dispatch: (arg: GetHistoryRequestAction | GetHistoryResponseAction | GetHistoryErrorAction) => void) => {
		const request = new GetHistoryRequestAction(id)
		dispatch(request)
		protectedApiClient
			.get<HistoryDetails[]>(`${url}&id=${id}`)
			.then((response) => {
				dispatch(new GetHistoryResponseAction(request, response.data, id, name))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new GetHistoryErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
