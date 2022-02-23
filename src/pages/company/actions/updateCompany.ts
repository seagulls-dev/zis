import {
  UpdateCompanyRequestAction,
  UpdateCompanyResponseAction,
  UpdateCompanyErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CompanyDetails, CompanyParams } from '../models'

export default (params: CompanyParams, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | UpdateCompanyRequestAction
        | UpdateCompanyResponseAction
        | UpdateCompanyErrorAction,
    ) => void,
  ) => {
    const request = new UpdateCompanyRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<CompanyDetails>(`/company/update`, params)
      .then((response) => {
        dispatch(new UpdateCompanyResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateCompanyErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}
