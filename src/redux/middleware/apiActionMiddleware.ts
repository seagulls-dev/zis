import { ApiAction, ApiMethod } from 'common/actions'
import { AsyncActionMode } from 'common/models'
import { protectedApiClient } from 'helpers/api'
import { getApiErrorCode, handleApiError } from 'helpers/errorHandling'
import { Action, Middleware, MiddlewareAPI } from 'redux'

const makeRequest = (method: ApiMethod, url: string, data?: object) => {
  switch (method) {
    case ApiMethod.GET:
      return protectedApiClient.get(url)
    case ApiMethod.POST:
      return protectedApiClient.post(url, data)
    case ApiMethod.PUT:
      return protectedApiClient.put(url, data)
    case ApiMethod.DELETE:
      return protectedApiClient.delete(url, data)
    case ApiMethod.PATCH:
      return protectedApiClient.patch(url, data)
    default:
      throw new Error(`Unsupported http method '${method}'`)
  }
}

const classActionMiddleware: Middleware = (store: MiddlewareAPI) => (
  next: (action: any) => void,
) => (action: Action) => {
  const apiAction = action as ApiAction
  if (apiAction != null && apiAction.url && apiAction.method) {
    return next((dispatch: any) => {
      const request = {
        type: apiAction.type,
        mode: AsyncActionMode.REQUEST,
        params: apiAction.params,
      }

      dispatch(request)

      makeRequest(apiAction.method, apiAction.url, apiAction.params)
        .then((response: any) => {
          dispatch({
            type: apiAction.type,
            mode: AsyncActionMode.RESPONSE,
            data: response.data,
          })
          if (apiAction.cb) {
            apiAction.cb(true)
          }
        })
        .catch((error: any) => {
          handleApiError(error)
          const errorCode = getApiErrorCode(error)
          dispatch({
            error: errorCode,
            type: apiAction.type,
            mode: AsyncActionMode.ERROR,
          })
          if (apiAction.cb) {
            apiAction.cb(false)
          }
        })
    })
  }
  return next(action)
}

export default classActionMiddleware
