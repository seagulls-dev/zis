import { AsyncActionMode } from 'common/models'

export enum ActionType {
  GET_CURRENCIES = 'GET_CURRENCIES',
}

export type CurrenciesActions =
  | GetCurrenciesRequestAction
  | GetCurrenciesResponseAction
  | GetCurrenciesErrorAction

export class GetCurrenciesRequestAction {
  readonly type = ActionType.GET_CURRENCIES
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetCurrenciesResponseAction {
  readonly type = ActionType.GET_CURRENCIES
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: GetCurrenciesRequestAction, public data: []) {}
}
export class GetCurrenciesErrorAction {
  readonly type = ActionType.GET_CURRENCIES
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetCurrenciesRequestAction,
    public error: string,
  ) {}
}
