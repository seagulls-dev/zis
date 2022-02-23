import {
  CreatePricelistRequestAction,
  CreatePricelistResponseAction,
  CreatePricelistErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CreatePricelistParams, PricelistDetails } from '../models'

export default (
  params: CreatePricelistParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreatePricelistRequestAction
        | CreatePricelistResponseAction
        | CreatePricelistErrorAction,
    ) => void,
  ) => {
    const request = new CreatePricelistRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<PricelistDetails>('/billing/pricelist/create', params)
      .then((response) => {
        dispatch(new CreatePricelistResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreatePricelistErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}
