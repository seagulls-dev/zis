import {GetServerServiceTypeRequestAction, GetServerServiceTypeResponseAction, GetServerServiceTypeErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {ServerServiceTypeDetails} from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (
			arg: GetServerServiceTypeRequestAction | GetServerServiceTypeResponseAction | GetServerServiceTypeErrorAction,
		) => void,
	) => {
		const request = new GetServerServiceTypeRequestAction()
		dispatch(request)

		protectedApiClient
			.get<ServerServiceTypeDetails[]>(`/server/service-type/get-all`)
			.then((response) => {
				dispatch(new GetServerServiceTypeResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new GetServerServiceTypeErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
