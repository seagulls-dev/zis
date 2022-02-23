import {
	GetProductPricesByPricelistRequestAction,
	GetProductPricesByPricelistResponseAction,
	GetProductPricesByPricelistErrorAction,
} from '.'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {ProductPriceDetails} from '../models'

export default (pricelist_id: number, cb?: (isSuccess: boolean) => void) => {
	return (
		dispatch: (
			arg:
				| GetProductPricesByPricelistRequestAction
				| GetProductPricesByPricelistResponseAction
				| GetProductPricesByPricelistErrorAction,
		) => void,
	) => {
		const request = new GetProductPricesByPricelistRequestAction(pricelist_id)
		dispatch(request)

		protectedApiClient
			.get<ProductPriceDetails[]>(`/billing/product-price/get-by-pricelist?pricelist_id=${pricelist_id}`)
			.then((response) => {
				dispatch(new GetProductPricesByPricelistResponseAction(request, response.data))
				cb && cb(true)
			})
			.catch((error) => {
				dispatch(new GetProductPricesByPricelistErrorAction(request, error))
				handleApiErrorWithNotification(error)
				cb && cb(false)
			})
	}
}
