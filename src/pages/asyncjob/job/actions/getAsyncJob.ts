import {GetAsyncJobRequestAction, GetAsyncJobResponseAction, GetAsyncJobErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {AsyncJobDetails} from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
	return (dispatch: (arg: GetAsyncJobRequestAction | GetAsyncJobResponseAction | GetAsyncJobErrorAction) => void) => {
		const request = new GetAsyncJobRequestAction(id)
		dispatch(request)

		protectedApiClient
			.get<AsyncJobDetails>(`/asyncjob/job/get?id=${id}`)
			.then((response) => {
				dispatch(new GetAsyncJobResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new GetAsyncJobErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
