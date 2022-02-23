import {
  GetRacksRequestAction,
  GetRacksResponseAction,
  GetRacksErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { RackDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg: GetRacksRequestAction | GetRacksResponseAction | GetRacksErrorAction,
    ) => void,
  ) => {
    const request = new GetRacksRequestAction()
    dispatch(request)

    protectedApiClient
      .get<RackDetails[]>('/datacenter/rack/get-all')
      .then((response) => {
        dispatch(new GetRacksResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetRacksErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}
