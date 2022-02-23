import { GetMailRequestAction, GetMailResponseAction, GetMailErrorAction } from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { MailDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (dispatch: (args: GetMailRequestAction | GetMailResponseAction | GetMailErrorAction) => void) => {
    const request = new GetMailRequestAction()
    dispatch(request)

    protectedApiClient.get<MailDetails[]>('/user/mail/get-all')
      .then(response => {
        dispatch(new GetMailResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch(error => {
        dispatch(new GetMailErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}
