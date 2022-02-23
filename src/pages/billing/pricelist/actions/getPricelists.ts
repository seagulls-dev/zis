import {
  GetPricelistsRequestAction,
  GetPricelistsResponseAction,
  GetPricelistsErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { PricelistDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetPricelistsRequestAction
        | GetPricelistsResponseAction
        | GetPricelistsErrorAction,
    ) => void,
  ) => {
    const request = new GetPricelistsRequestAction()
    dispatch(request)

    protectedApiClient
      .get<PricelistDetails[]>('/billing/pricelist/get-all')
      .then((response) => {
        dispatch(new GetPricelistsResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetPricelistsErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}
