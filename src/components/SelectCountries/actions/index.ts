import { AsyncActionMode } from 'common/models'

export enum ActionType {
  GET_COUNTRIES = 'GET_COUNTRIES',
}

export type CountriesActions =
  | GetCountriesRequestAction
  | GetCountriesResponseAction
  | GetCountriesErrorAction

export class GetCountriesRequestAction {
  readonly type = ActionType.GET_COUNTRIES
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetCountriesResponseAction {
  readonly type = ActionType.GET_COUNTRIES
  readonly mode = AsyncActionMode.RESPONSE
  constructor(public request: GetCountriesRequestAction, public data: {}) {}
}
export class GetCountriesErrorAction {
  readonly type = ActionType.GET_COUNTRIES
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetCountriesRequestAction,
    public error: string,
  ) {}
}
