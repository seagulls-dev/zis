import {
	RemoveCertificatesFromVhostRequestAction,
	RemoveCertificatesFromVhostResponseAction,
	RemoveCertificatesFromVhostErrorAction,
} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {ToggleCertificatesParams} from '../models'

export default (params: ToggleCertificatesParams, cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (
			arg:
				| RemoveCertificatesFromVhostRequestAction
				| RemoveCertificatesFromVhostResponseAction
				| RemoveCertificatesFromVhostErrorAction,
		) => void,
	) => {
		const request = new RemoveCertificatesFromVhostRequestAction(params)
		dispatch(request)

		protectedApiClient
			.put<any>(`/certificate/remove-from-vhost`, params)
			.then((response) => {
				dispatch(new RemoveCertificatesFromVhostResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new RemoveCertificatesFromVhostErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
