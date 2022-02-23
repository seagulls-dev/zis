import {UpdateVhostRequestAction, UpdateVhostResponseAction, UpdateVhostErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {VhostDetails, UpdateVhostParams} from '../models'

export default (params: UpdateVhostParams, cb?: (isSuccess: boolean) => void) => {
	return (dispatch: (arg: UpdateVhostRequestAction | UpdateVhostResponseAction | UpdateVhostErrorAction) => void) => {
		const request = new UpdateVhostRequestAction(params)
		dispatch(request)

		protectedApiClient
			.put<VhostDetails>(`/web/vhost/update`, params)
			.then((response) => {
				dispatch(new UpdateVhostResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new UpdateVhostErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
