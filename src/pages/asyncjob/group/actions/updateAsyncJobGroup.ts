import {UpdateAsyncJobGroupRequestAction, UpdateAsyncJobGroupResponseAction, UpdateAsyncJobGroupErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {AsyncJobGroupDetails, AsyncJobGroupParams} from '../models'

export default (params: AsyncJobGroupParams, cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (
			arg: UpdateAsyncJobGroupRequestAction | UpdateAsyncJobGroupResponseAction | UpdateAsyncJobGroupErrorAction,
		) => void,
	) => {
		const request = new UpdateAsyncJobGroupRequestAction(params)
		dispatch(request)

		protectedApiClient
			.put<AsyncJobGroupDetails>(`/asyncjob/group/update`, params)
			.then((response) => {
				dispatch(new UpdateAsyncJobGroupResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new UpdateAsyncJobGroupErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
