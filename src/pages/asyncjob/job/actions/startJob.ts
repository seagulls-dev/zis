import {StartJobRequestAction, StartJobResponseAction, StartJobErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {AsyncJobDetails} from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
	return (dispatch: (arg: StartJobRequestAction | StartJobResponseAction | StartJobErrorAction) => void) => {
		const request = new StartJobRequestAction(id)
		dispatch(request)

		protectedApiClient
			.put<AsyncJobDetails>(`/asyncjob/job/start`, {id})
			.then((response) => {
				dispatch(new StartJobResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new StartJobErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
