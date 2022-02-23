import {GetCertificatesRequestAction, GetCertificatesResponseAction, GetCertificatesErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {CertificateDetails} from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (arg: GetCertificatesRequestAction | GetCertificatesResponseAction | GetCertificatesErrorAction) => void,
	) => {
		const request = new GetCertificatesRequestAction()
		dispatch(request)

		protectedApiClient
			.get<CertificateDetails[]>('/certificate/get-all')
			.then((response) => {
				dispatch(new GetCertificatesResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new GetCertificatesErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
