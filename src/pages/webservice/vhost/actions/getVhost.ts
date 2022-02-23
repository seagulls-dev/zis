import {GetVhostRequestAction, GetVhostResponseAction, GetVhostErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {VhostDetails} from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
	return (dispatch: (arg: GetVhostRequestAction | GetVhostResponseAction | GetVhostErrorAction) => void) => {
		const request = new GetVhostRequestAction(id)
		dispatch(request)

		protectedApiClient
			.get<VhostDetails>(`/web/vhost/get?id=${id}`)
			.then((response) => {
				dispatch(new GetVhostResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new GetVhostErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
