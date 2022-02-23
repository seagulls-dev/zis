import {CancelJobRequestAction, CancelJobResponseAction, CancelJobErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {AsyncJobDetails} from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
	return (dispatch: (arg: CancelJobRequestAction | CancelJobResponseAction | CancelJobErrorAction) => void) => {
		const request = new CancelJobRequestAction(id)
		dispatch(request)

		protectedApiClient
			.put<AsyncJobDetails>(`/asyncjob/job/cancel`, {id})
			.then((response) => {
				dispatch(new CancelJobResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new CancelJobErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
