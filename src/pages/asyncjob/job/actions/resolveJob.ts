import {ResolveJobRequestAction, ResolveJobResponseAction, ResolveJobErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {AsyncJobDetails} from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
	return (dispatch: (arg: ResolveJobRequestAction | ResolveJobResponseAction | ResolveJobErrorAction) => void) => {
		const request = new ResolveJobRequestAction(id)
		dispatch(request)

		protectedApiClient
			.put<AsyncJobDetails>(`/asyncjob/job/resolve`, {id})
			.then((response) => {
				dispatch(new ResolveJobResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new ResolveJobErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
