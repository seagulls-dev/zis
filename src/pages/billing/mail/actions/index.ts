import { AsyncActionMode } from 'common/models'
import { MailDetails, MailError } from '../models'

export enum ActionType {
  GET_MAIL = 'GET_MAIL'
}

export type MailActions =
  | GetMailRequestAction
  | GetMailResponseAction
  | GetMailErrorAction

export class GetMailRequestAction {
  readonly type = ActionType.GET_MAIL
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}

export class GetMailResponseAction {
  readonly type = ActionType.GET_MAIL
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: GetMailRequestAction, public data: MailDetails[]) {
  }
}

export class GetMailErrorAction {
  readonly type = ActionType.GET_MAIL
  readonly mode = AsyncActionMode.ERROR
  constructor(public request: GetMailRequestAction, public error: MailError) {
  }
}
