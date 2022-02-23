import {UpdateCertificateRequestAction, UpdateCertificateResponseAction, UpdateCertificateErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {CertificateDetails, UpdateCertificateParams} from '../models'

export default (params: UpdateCertificateParams, cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (
			arg: UpdateCertificateRequestAction | UpdateCertificateResponseAction | UpdateCertificateErrorAction,
		) => void,
	) => {
		const request = new UpdateCertificateRequestAction(params)
		dispatch(request)

		protectedApiClient
			.put<CertificateDetails>(`/certificate/update`, params)
			.then((response) => {
				dispatch(new UpdateCertificateResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new UpdateCertificateErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
