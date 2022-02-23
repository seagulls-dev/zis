import {ActionType, MailActions} from './actions'
import {AsyncActionMode} from 'common/models'
import {MailState} from './models'

const MAIL_INITIAL_STATE: MailState = {
  isLoading: false,
  mails: undefined
}

export default (state = MAIL_INITIAL_STATE, action: MailActions): MailState => {
  switch (action.type) {
    case ActionType.GET_MAIL:
      if (action.mode === AsyncActionMode.REQUEST) {
        return {...state, isLoading: true}
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {...state, isLoading: false, mails: action.data}
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {...state, isLoading: false, error: action.error}
      }
      break
  }
  return state
}
