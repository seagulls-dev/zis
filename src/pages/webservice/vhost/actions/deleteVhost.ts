import {DeleteVhostRequestAction, DeleteVhostResponseAction, DeleteVhostErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
	return (dispatch: (arg: DeleteVhostRequestAction | DeleteVhostResponseAction | DeleteVhostErrorAction) => void) => {
		const request = new DeleteVhostRequestAction(id)
		dispatch(request)

		protectedApiClient
			.delete(`/web/vhost/delete?id=${id}`)
			.then((response) => {
				dispatch(new DeleteVhostResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new DeleteVhostErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
