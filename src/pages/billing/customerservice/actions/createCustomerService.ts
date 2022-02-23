import {
	CreateCustomerServiceRequestAction,
	CreateCustomerServiceResponseAction,
	CreateCustomerServiceErrorAction,
} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {CreateCustomerServiceParams, CustomerServiceDetails} from '../models'

export default (params: CreateCustomerServiceParams, cb?: (isSuccess: boolean, responseId?: number) => void) => {
	return (
		dispatch: (
			arg: CreateCustomerServiceRequestAction | CreateCustomerServiceResponseAction | CreateCustomerServiceErrorAction,
		) => void,
	) => {
		const request = new CreateCustomerServiceRequestAction(params)
		dispatch(request)
		protectedApiClient
			.post<CustomerServiceDetails>('/billing/customer-service/create-service', params)
			.then((response) => {
				dispatch(new CreateCustomerServiceResponseAction(request, response.data))
				cb && cb(true, response.data.id)
			})
			.catch((error) => {
				dispatch(new CreateCustomerServiceErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
