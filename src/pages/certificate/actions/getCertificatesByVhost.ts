import {
	GetCertificatesByVhostRequestAction,
	GetCertificatesByVhostResponseAction,
	GetCertificatesByVhostErrorAction,
} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {CertificateDetails} from '../models'

export default (vhost_id: number, cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (
			arg:
				| GetCertificatesByVhostRequestAction
				| GetCertificatesByVhostResponseAction
				| GetCertificatesByVhostErrorAction,
		) => void,
	) => {
		const request = new GetCertificatesByVhostRequestAction(vhost_id)
		dispatch(request)

		protectedApiClient
			.get<CertificateDetails[]>(`/certificate/get-by-vhost/vhost_id=${vhost_id}`)
			.then((response) => {
				dispatch(new GetCertificatesByVhostResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new GetCertificatesByVhostErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
