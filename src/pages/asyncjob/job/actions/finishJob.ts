import {FinishJobRequestAction, FinishJobResponseAction, FinishJobErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {AsyncJobDetails} from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
	return (dispatch: (arg: FinishJobRequestAction | FinishJobResponseAction | FinishJobErrorAction) => void) => {
		const request = new FinishJobRequestAction(id)
		dispatch(request)

		protectedApiClient
			.put<AsyncJobDetails>(`/asyncjob/job/finish`, {id})
			.then((response) => {
				dispatch(new FinishJobResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new FinishJobErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
