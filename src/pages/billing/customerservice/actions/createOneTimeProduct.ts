import {CreateOneTimeProductRequestAction, CreateOneTimeProductResponseAction, CreateOneTimeProductErrorAction} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {CreateOneTimeProductParams, CustomerServiceDetails} from '../models'

export default (params: CreateOneTimeProductParams, cb?: (isSuccess: boolean, responseId?: number) => void) => {
	return (
		dispatch: (
			arg: CreateOneTimeProductRequestAction | CreateOneTimeProductResponseAction | CreateOneTimeProductErrorAction,
		) => void,
	) => {
		const request = new CreateOneTimeProductRequestAction(params)
		dispatch(request)
		protectedApiClient
			.post<CustomerServiceDetails>('/billing/customer-service/create-one-time-product', params)
			.then((response) => {
				dispatch(new CreateOneTimeProductResponseAction(request, response.data))
				cb && cb(true, response.data.id)
			})
			.catch((error) => {
				dispatch(new CreateOneTimeProductErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
