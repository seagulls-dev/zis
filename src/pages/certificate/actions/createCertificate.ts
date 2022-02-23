import {CreateCertificateRequestAction, CreateCertificateResponseAction, CreateCertificateErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {CreateCertificateParams, CertificateDetails} from '../models'

export default (params: CreateCertificateParams, cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (
			arg: CreateCertificateRequestAction | CreateCertificateResponseAction | CreateCertificateErrorAction,
		) => void,
	) => {
		const request = new CreateCertificateRequestAction(params)
		dispatch(request)
		protectedApiClient
			.post<CertificateDetails>('/certificate/create', params)
			.then((response) => {
				dispatch(new CreateCertificateResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new CreateCertificateErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
