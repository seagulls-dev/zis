import {AuthState} from '../pages/login/models'
import {ThemeSwitcherState} from '../components/ThemeSwitcher/models'
import {FontSwitcherState} from '../components/FontSwitcher/models'
import {UserState} from 'pages/user/models'
import {CompanyState} from 'pages/company/models'
import {GroupState} from 'pages/group/models'
import {CustomerState} from 'pages/billing/customer/models'
import {IpState} from 'pages/ip/ip-address/models'
import {IpSubnetState} from 'pages/ip/ip-subnet/models'
import {RoleState} from 'pages/role/models'
import {CountriesState} from '../components/SelectCountries/models'
import {TaxState} from 'pages/billing/tax/models'
import {ProductState} from 'pages/billing/product/models'
import {PricelistState} from 'pages/billing/pricelist/models'
import {ProductPriceState} from 'pages/billing/productprice/models'
import {ProductPriceRangeState} from 'pages/billing/productpricerange/models'
import {CustomerServiceState} from 'pages/billing/customerservice/models'
import {RightSiderState} from 'components/RightSider/models'
import {InvoiceState} from 'pages/billing/invoice/models'
import {InvoiceDocumentState} from 'pages/billing/invoicedocument/models'
import {InvoiceCostAllocationState} from 'pages/billing/invoicecostallocation/models'
import {CostAllocationState} from 'pages/billing/costallocation/models'
import {BillState} from 'pages/billing/bill/models'
import {BillCostAllocationState} from 'pages/billing/billcostallocation/models'
import {BillVatSummaryState} from 'pages/billing/billvatsummary/models'
import {CurrenciesState} from 'components/SelectCurrencies/models'
import {InvoiceAttachmentState} from 'components/Invoice/InvoiceAttachment/models'
import {InventoryState} from 'pages/inventory/inventory/models'
import {ServerState} from 'pages/server/models'
import {InventoryLocationState} from 'pages/inventory/location/models'
import {InventoryTypeState} from 'pages/inventory/type/models'
import {PhysicalServerState} from 'pages/inventory/physicalserver/models'
import {BladeContainerState} from 'pages/inventory/bladecontainer/models'
import {DataCenterState} from 'pages/datacenter/datacenter/models'
import {RackState} from 'pages/datacenter/rack/models'
import {BlockState} from 'pages/datacenter/block/models'
import {HistoryState} from 'components/History/models'
import {DnsServiceState} from 'pages/dns/service/models'
import {DnsZoneState} from 'pages/dns/zone/models'
import {AsyncJobGroupState} from 'pages/asyncjob/group/models'
import {AsyncJobState} from 'pages/asyncjob/job/models'
import {CertificateState} from 'pages/certificate/models'
import {WebService} from 'pages/webservice/reducers'
import {ServiceTypeState} from 'pages/billing/servicetype/model'
import {SettingsState} from 'pages/settings/models'
import {MailState} from 'pages/billing/mail/models'

export interface AppState {
	auth: AuthState
	theme: ThemeSwitcherState
	font: FontSwitcherState
	user: UserState
	role: RoleState
	group: GroupState
	company: CompanyState
	customer: CustomerState
	ip: IpState
	ipSubnet: IpSubnetState
	countries: CountriesState
	product: ProductState
	pricelist: PricelistState
	productprice: ProductPriceState
	productpricerange: ProductPriceRangeState
	customerservice: CustomerServiceState
	rightsider: RightSiderState
	bill: BillState
	tax: TaxState
	billcostallocation: BillCostAllocationState
	billvatsummary: BillVatSummaryState
	currencies: CurrenciesState
	invoice: InvoiceState
	invoicedocument: InvoiceDocumentState
	invoicecostallocation: InvoiceCostAllocationState
	costallocation: CostAllocationState
	invoiceattachment: InvoiceAttachmentState
	inventory: InventoryState
	inventorylocation: InventoryLocationState
	inventorytype: InventoryTypeState
	inventoryphysicalserver: PhysicalServerState
	server: ServerState
	bladecontainer: BladeContainerState
	datacenter: DataCenterState
	rack: RackState
	block: BlockState
	historylog: HistoryState
	dnsservice: DnsServiceState
	dnszone: DnsZoneState
	asyncjobgroup: AsyncJobGroupState
	asyncjob: AsyncJobState
	certificate: CertificateState
	webservice: WebService
  servicetype: ServiceTypeState
  setting: SettingsState
  mail: MailState
}

export enum AsyncActionMode {
	REQUEST = 'REQUEST',
	RESPONSE = 'RESPONSE',
	ERROR = 'ERROR',
}

export interface AppUser {
	id: number
	username: string
	token: string
}

export interface TableQuery {
	skip: number
	limit: number
}

export interface TableResult<T> {
	items: T[]
	skip: number
	limit: number
	totalCount: number
}

export interface TablePagination {
	current: number
	pageSize: number
	totalCount: number
}
