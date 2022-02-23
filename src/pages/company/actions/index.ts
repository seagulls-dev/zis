import { AsyncActionMode } from 'common/models'
import {
  CompanyParams,
  UpdateCompanyParams,
  ErrorCompany,
  CompanyDetails,
} from '../models'

export enum ActionType {
  GET_COMPANY = 'GET_COMPANY',
  CREATE_COMPANY = 'CREATE_COMPANY',
  GET_COMPANIES = 'GET_COMPANIES',
  UPDATE_COMPANY = 'UPDATE_COMPANY',
  DELETE_COMPANY = 'DELETE_COMPANY',
}

export type CompanyActions =
  | GetCompanyRequestAction
  | GetCompanyResponseAction
  | GetCompanyErrorAction
  | CreateCompanyRequestAction
  | CreateCompanyResponseAction
  | CreateCompanyErrorAction
  | UpdateCompanyRequestAction
  | UpdateCompanyResponseAction
  | UpdateCompanyErrorAction
  | GetCompaniesRequestAction
  | GetCompaniesResponseAction
  | GetCompaniesErrorAction
  | DeleteCompanyRequestAction
  | DeleteCompanyResponseAction
  | DeleteCompanyErrorAction

export class GetCompanyRequestAction {
  readonly type = ActionType.GET_COMPANY
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: number) {
    ''
  }
}
export class GetCompanyResponseAction {
  readonly type = ActionType.GET_COMPANY
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetCompanyRequestAction,
    public data: CompanyDetails,
  ) {}
}
export class GetCompanyErrorAction {
  readonly type = ActionType.GET_COMPANY
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetCompanyRequestAction,
    public error: ErrorCompany,
  ) {}
}

export class CreateCompanyRequestAction {
  readonly type = ActionType.CREATE_COMPANY
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: CompanyParams) {}
}
export class CreateCompanyResponseAction {
  readonly type = ActionType.CREATE_COMPANY
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: CreateCompanyRequestAction,
    public data: CompanyDetails,
  ) {}
}
export class CreateCompanyErrorAction {
  readonly type = ActionType.CREATE_COMPANY
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: CreateCompanyRequestAction,
    public error: ErrorCompany,
  ) {}
}

export class GetCompaniesRequestAction {
  readonly type = ActionType.GET_COMPANIES
  readonly mode = AsyncActionMode.REQUEST
  constructor() {
    ''
  }
}
export class GetCompaniesResponseAction {
  readonly type = ActionType.GET_COMPANIES
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: GetCompaniesRequestAction,
    public data: CompanyDetails[],
  ) {}
}
export class GetCompaniesErrorAction {
  readonly type = ActionType.GET_COMPANIES
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: GetCompaniesRequestAction,
    public error: ErrorCompany,
  ) {}
}

export class UpdateCompanyRequestAction {
  readonly type = ActionType.UPDATE_COMPANY
  readonly mode = AsyncActionMode.REQUEST
  constructor(public payload: UpdateCompanyParams) {}
}
export class UpdateCompanyResponseAction {
  readonly type = ActionType.UPDATE_COMPANY
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: UpdateCompanyRequestAction,
    public data: CompanyDetails,
  ) {}
}
export class UpdateCompanyErrorAction {
  readonly type = ActionType.UPDATE_COMPANY
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: UpdateCompanyRequestAction,
    public error: ErrorCompany,
  ) {}
}

export class DeleteCompanyRequestAction {
  readonly type = ActionType.DELETE_COMPANY
  readonly mode = AsyncActionMode.REQUEST
  constructor(public id: number) {
    ''
  }
}
export class DeleteCompanyResponseAction {
  readonly type = ActionType.DELETE_COMPANY
  readonly mode = AsyncActionMode.RESPONSE
  constructor(
    public request: DeleteCompanyRequestAction,
    public data: CompanyDetails,
  ) {}
}
export class DeleteCompanyErrorAction {
  readonly type = ActionType.DELETE_COMPANY
  readonly mode = AsyncActionMode.ERROR
  constructor(
    public request: DeleteCompanyRequestAction,
    public error: ErrorCompany,
  ) {}
}
