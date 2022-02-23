import {GetVhostsRequestAction, GetVhostsResponseAction, GetVhostsErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {VhostDetails} from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
	return (dispatch: (arg: GetVhostsRequestAction | GetVhostsResponseAction | GetVhostsErrorAction) => void) => {
		const request = new GetVhostsRequestAction()
		dispatch(request)

		protectedApiClient
			.get<VhostDetails[]>('/web/vhost/get-all')
			.then((response) => {
				dispatch(new GetVhostsResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new GetVhostsErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
