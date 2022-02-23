import {
	GetPricelistsByCustomerRequestAction,
	GetPricelistsByCustomerResponseAction,
	GetPricelistsByCustomerErrorAction,
} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {PricelistDetails} from '../models'

export default (customer_id: number, cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (
			arg:
				| GetPricelistsByCustomerRequestAction
				| GetPricelistsByCustomerResponseAction
				| GetPricelistsByCustomerErrorAction,
		) => void,
	) => {
		const request = new GetPricelistsByCustomerRequestAction(customer_id)
		dispatch(request)

		protectedApiClient
			.get<PricelistDetails>(`/billing/pricelist/get-current?customer_id=${customer_id}`)
			.then((response) => {
				dispatch(new GetPricelistsByCustomerResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new GetPricelistsByCustomerErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
