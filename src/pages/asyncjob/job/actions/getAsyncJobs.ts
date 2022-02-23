import {GetAsyncJobsRequestAction, GetAsyncJobsResponseAction, GetAsyncJobsErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {AsyncJobDetails} from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (arg: GetAsyncJobsRequestAction | GetAsyncJobsResponseAction | GetAsyncJobsErrorAction) => void,
	) => {
		const request = new GetAsyncJobsRequestAction()
		dispatch(request)

		protectedApiClient
			.get<AsyncJobDetails[]>('/asyncjob/job/all')
			.then((response) => {
				dispatch(new GetAsyncJobsResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new GetAsyncJobsErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
