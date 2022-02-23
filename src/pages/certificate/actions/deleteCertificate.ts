import {DeleteCertificateRequestAction, DeleteCertificateResponseAction, DeleteCertificateErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (
			arg: DeleteCertificateRequestAction | DeleteCertificateResponseAction | DeleteCertificateErrorAction,
		) => void,
	) => {
		const request = new DeleteCertificateRequestAction(id)
		dispatch(request)

		protectedApiClient
			.delete(`/certificate/delete?id=${id}`)
			.then((response) => {
				dispatch(new DeleteCertificateResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new DeleteCertificateErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
