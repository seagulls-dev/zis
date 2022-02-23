import {AsyncActionMode} from './models'
import {LoginActions} from '../pages/login/actions'
import {ThemeActions} from '../components/ThemeSwitcher/actions'
import {FontActions} from '../components/FontSwitcher/actions'
import {UserActions} from 'pages/user/actions'
import {CompanyActions} from 'pages/company/actions'
import {GroupActions} from 'pages/group/actions'
import {CustomerActions} from 'pages/billing/customer/actions'
import {IpActions} from 'pages/ip/ip-address/actions'
import {IpSubnetActions} from 'pages/ip/ip-subnet/actions'
import {RoleActions} from 'pages/role/actions'
import {CountriesActions} from 'components/SelectCountries/actions'
import {TaxActions} from 'pages/billing/tax/actions'
import {ProductActions} from 'pages/billing/product/actions'
import {PricelistActions} from 'pages/billing/pricelist/actions'
import {ProductPriceActions} from 'pages/billing/productprice/actions'
import {ProductPriceRangeActions} from 'pages/billing/productpricerange/actions'
import {CustomerServiceActions} from 'pages/billing/customerservice/actions'
import {RightSiderActions} from 'components/RightSider/actions'
import {InvoiceActions} from 'pages/billing/invoice/actions'
import {InvoiceDocumentActions} from 'pages/billing/invoicedocument/actions'
import {InvoiceCostAllocationActions} from 'pages/billing/invoicecostallocation/actions'
import {CostAllocationActions} from 'pages/billing/costallocation/actions'
import {BillActions} from 'pages/billing/bill/actions'
import {BillCostAllocationActions} from 'pages/billing/billcostallocation/actions'
import {BillVatSummaryActions} from 'pages/billing/billvatsummary/actions'
import {CurrenciesActions} from 'components/SelectCurrencies/actions'
import {InvoiceAttachmentActions} from 'components/Invoice/InvoiceAttachment/actions'
import {InventoryActions} from 'pages/inventory/inventory/actions'
import {ServerActions} from 'pages/server/actions'
import {InventoryLocationActions} from 'pages/inventory/location/actions'
import {InventoryTypeActions} from 'pages/inventory/type/actions'
import {PhysicalServerActions} from 'pages/inventory/physicalserver/actions'
import {BladeContainerActions} from 'pages/inventory/bladecontainer/actions'
import {DataCenterActions} from 'pages/datacenter/datacenter/actions'
import {RackActions} from 'pages/datacenter/rack/actions'
import {BlockActions} from 'pages/datacenter/block/actions'
import {HistoryActions} from 'components/History/actions'
import {DnsServiceActions} from 'pages/dns/service/actions'
import {DnsZoneActions} from 'pages/dns/zone/actions'
import {AsyncJobGroupActions} from 'pages/asyncjob/group/actions'
import {AsyncJobActions} from 'pages/asyncjob/job/actions'
import {CertificateActions} from 'pages/certificate/actions'
import {VhostActions} from 'pages/webservice/vhost/actions'
import {AliasActions} from 'pages/webservice/alias/actions'
import {SettingActions} from 'pages/webservice/setting/actions'
import {TemplateActions} from 'pages/webservice/template/actions'
import {ServiceTypeActions} from 'pages/billing/servicetype/actions'
import {MailActions} from 'pages/billing/mail/actions'

export type DispatchFunc = (action: ReduxAction | ApiAction | ((dispatch: DispatchFunc) => void)) => void

export type ReduxAction =
	| LoginActions
	| ThemeActions
	| UserActions
	| FontActions
	| CompanyActions
	| GroupActions
	| CustomerActions
	| IpActions
	| IpSubnetActions
	| RoleActions
	| CountriesActions
	| TaxActions
	| ProductActions
	| PricelistActions
	| ProductPriceActions
	| ProductPriceRangeActions
	| CustomerServiceActions
	| RightSiderActions
	| InvoiceActions
	| InvoiceDocumentActions
	| InvoiceCostAllocationActions
	| CostAllocationActions
	| BillActions
	| BillCostAllocationActions
	| BillVatSummaryActions
	| CurrenciesActions
	| InvoiceAttachmentActions
	| InventoryActions
	| ServerActions
	| InventoryLocationActions
	| InventoryTypeActions
	| PhysicalServerActions
	| BladeContainerActions
	| DataCenterActions
	| RackActions
	| BlockActions
	| HistoryActions
	| DnsServiceActions
	| DnsZoneActions
	| AsyncJobGroupActions
	| AsyncJobActions
	| CertificateActions
	| VhostActions
	| AliasActions
	| SettingActions
	| TemplateActions
  | ServiceTypeActions
  | MailActions

export enum ApiMethod {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	PATCH = 'patch',
	DELETE = 'delete',
}

export class ApiAction {
	constructor(
		public type: string,
		public method: ApiMethod,
		public url: string,
		public params?: object,
		public cb?: (success: boolean) => void,
	) {}
}

export interface RequestAction<TType extends string> {
	mode: typeof AsyncActionMode.REQUEST
	type: TType
}

export interface ResponseAction<TType extends string, T> {
	mode: typeof AsyncActionMode.RESPONSE
	type: TType
	payload: T
}

export interface ErrorAction<TType extends string> {
	mode: typeof AsyncActionMode.ERROR
	type: TType
	error: string
}
