import {CreateAsyncJobGroupRequestAction, CreateAsyncJobGroupResponseAction, CreateAsyncJobGroupErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {AsyncJobGroupParams, AsyncJobGroupDetails} from '../models'

export default (params: AsyncJobGroupParams, cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (
			arg: CreateAsyncJobGroupRequestAction | CreateAsyncJobGroupResponseAction | CreateAsyncJobGroupErrorAction,
		) => void,
	) => {
		const request = new CreateAsyncJobGroupRequestAction(params)
		dispatch(request)
		protectedApiClient
			.post<AsyncJobGroupDetails>('/asyncjob/group/create', params)
			.then((response) => {
				dispatch(new CreateAsyncJobGroupResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new CreateAsyncJobGroupErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
