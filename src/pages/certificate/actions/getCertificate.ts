import {GetCertificateRequestAction, GetCertificateResponseAction, GetCertificateErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {CertificateDetails} from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (arg: GetCertificateRequestAction | GetCertificateResponseAction | GetCertificateErrorAction) => void,
	) => {
		const request = new GetCertificateRequestAction(id)
		dispatch(request)

		protectedApiClient
			.get<CertificateDetails>(`/certificate/get?id=${id}`)
			.then((response) => {
				dispatch(new GetCertificateResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new GetCertificateErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
