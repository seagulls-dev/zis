import {CreateAsyncJobRequestAction, CreateAsyncJobResponseAction, CreateAsyncJobErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {AsyncJobParams, AsyncJobDetails} from '../models'

export default (params: AsyncJobParams, cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (arg: CreateAsyncJobRequestAction | CreateAsyncJobResponseAction | CreateAsyncJobErrorAction) => void,
	) => {
		const request = new CreateAsyncJobRequestAction(params)
		dispatch(request)
		protectedApiClient
			.post<AsyncJobDetails>('/asyncjob/job/create', params)
			.then((response) => {
				dispatch(new CreateAsyncJobResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new CreateAsyncJobErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
