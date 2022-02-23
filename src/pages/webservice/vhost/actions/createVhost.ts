import {CreateVhostRequestAction, CreateVhostResponseAction, CreateVhostErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {CreateVhostParams, VhostDetails} from '../models'

export default (params: CreateVhostParams, cb?: (isSuccess: boolean) => void) => {
	return (dispatch: (arg: CreateVhostRequestAction | CreateVhostResponseAction | CreateVhostErrorAction) => void) => {
		const request = new CreateVhostRequestAction(params)
		dispatch(request)
		protectedApiClient
			.post<VhostDetails>('/web/vhost/create', params)
			.then((response) => {
				dispatch(new CreateVhostResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new CreateVhostErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
