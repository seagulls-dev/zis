import { UpdateSettingRequestAction, UpdateSettingResponseAction, UpdateSettingErrorAction } from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { UpdateSettingParams, SettingsDetails } from '../models'


export default (params: UpdateSettingParams, cb?: (isSuccess: boolean) => void) => {
  return (dispatch: (args: UpdateSettingRequestAction | UpdateSettingResponseAction | UpdateSettingErrorAction) => void) => {
    const request = new UpdateSettingRequestAction(params)
    dispatch(request)

    protectedApiClient.put<SettingsDetails>('/user/setting/update',params)
      .then(response => {
        dispatch(new UpdateSettingResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch(error => {
        dispatch(new UpdateSettingErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}
