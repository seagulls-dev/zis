import { SetSiderAction } from '.'
import { RightSiderState } from '../models'

export const setSider = (params: RightSiderState) => {
  return new SetSiderAction(params)
}
