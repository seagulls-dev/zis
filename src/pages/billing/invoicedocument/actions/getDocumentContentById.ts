import { GetDocumentContentRequestAction, GetDocumentContentResponseAction, GetDocumentContentErrorAction } from '.'
import { protectedApiClient } from 'helpers/api'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (dispatch: (args: GetDocumentContentRequestAction | GetDocumentContentResponseAction | GetDocumentContentErrorAction) => void) => {
    const request = new GetDocumentContentRequestAction(id)
    dispatch(request)

    protectedApiClient.get<string>(`/billing/invoice-document/get-content?id=${id}`)
      .then(response => {
        dispatch(new GetDocumentContentResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch(error => {
        dispatch(new GetDocumentContentErrorAction(request, error))
        cb && cb(false)
      })
  }
}
