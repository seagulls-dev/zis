import { GetAttachmentContentRequestAction, GetAttachmentContentResponseAction, GetAttachmentContentErrorAction } from '.'
import { protectedApiClient } from 'helpers/api'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (dispatch: (args: GetAttachmentContentRequestAction | GetAttachmentContentResponseAction | GetAttachmentContentErrorAction) => void) => {
    const request = new GetAttachmentContentRequestAction(id)
    dispatch(request)

    protectedApiClient.get<string>(`/billing/invoice-attachment/get-content?id=${id}`)
      .then(response => {
        dispatch(new GetAttachmentContentResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch(error => {
        dispatch(new GetAttachmentContentErrorAction(request, error))
        cb && cb(false)
      })
  }
}
