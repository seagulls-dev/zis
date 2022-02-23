import {
	AddCertificatesToVhostRequestAction,
	AddCertificatesToVhostResponseAction,
	AddCertificatesToVhostErrorAction,
} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {ToggleCertificatesParams} from '../models'

export default (params: ToggleCertificatesParams, cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (
			arg:
				| AddCertificatesToVhostRequestAction
				| AddCertificatesToVhostResponseAction
				| AddCertificatesToVhostErrorAction,
		) => void,
	) => {
		const request = new AddCertificatesToVhostRequestAction(params)
		dispatch(request)

		protectedApiClient
			.post<any>(`/certificate/add-to-vhost`, params)
			.then((response) => {
				dispatch(new AddCertificatesToVhostResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new AddCertificatesToVhostErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
