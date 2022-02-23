import {AppState} from 'common/models'
import {combineReducers} from 'redux'
import authReducer from 'pages/login/reducer'
import themeReducer from 'components/ThemeSwitcher/reducer'
import fontReducer from 'components/FontSwitcher/reducer'
import userReducer from 'pages/user/reducer'
import companyReducer from 'pages/company/reducer'
import groupReducer from 'pages/group/reducer'
import customerReducer from 'pages/billing/customer/reducer'
import ipReducer from 'pages/ip/ip-address/reducer'
import ipSubnetReducer from 'pages/ip/ip-subnet/reducer'
import roleReducer from 'pages/role/reducer'
import countriesReducer from 'components/SelectCountries/reducer'
import taxReducer from 'pages/billing/tax/reducer'
import productReducer from 'pages/billing/product/reducer'
import pricelistReducer from 'pages/billing/pricelist/reducer'
import productPriceReducer from 'pages/billing/productprice/reducer'
import productPriceRangeReducer from 'pages/billing/productpricerange/reducer'
import customerServiceReducer from 'pages/billing/customerservice/reducer'
import rightSiderReducer from 'components/RightSider/reducer'
import invoiceReducer from 'pages/billing/invoice/reducer'
import invoiceDocumentReducer from 'pages/billing/invoicedocument/reducer'
import invoiceCostAllocationReducer from 'pages/billing/invoicecostallocation/reducer'
import costAllocationReducer from 'pages/billing/costallocation/reducer'
import billReducer from 'pages/billing/bill/reducer'
import billCostAllocationReducer from 'pages/billing/billcostallocation/reducer'
import billVatSummaryReducer from 'pages/billing/billvatsummary/reducer'
import currenciesReducer from 'components/SelectCurrencies/reducer'
import invoiceattachmentReducer from 'components/Invoice/InvoiceAttachment/reducer'
import inventoryReducer from 'pages/inventory/inventory/reducer'
import serverReducer from 'pages/server/reducer'
import inventoryLocationReducer from 'pages/inventory/location/reducer'
import inventoryTypeReducer from 'pages/inventory/type/reducer'
import inventoryPhysicalServerReducer from 'pages/inventory/physicalserver/reducer'
import bladeContainerReducer from 'pages/inventory/bladecontainer/reducer'
import datacenterReducer from 'pages/datacenter/datacenter/reducer'
import rackReducer from 'pages/datacenter/rack/reducer'
import blockReducer from 'pages/datacenter/block/reducer'
import historyReducer from 'components/History/reducer'
import dnsServiceReducer from 'pages/dns/service/reducer'
import dnsZoneReducer from 'pages/dns/zone/reducer'
import asyncJobGroupReducer from 'pages/asyncjob/group/reducer'
import asyncJobReducer from 'pages/asyncjob/job/reducer'
import certificatesResducer from 'pages/certificate/reducer'
import webserviceReducer from 'pages/webservice/reducers'
import serviceTypeReducer from 'pages/billing/servicetype/reducer'
import settingReducer from 'pages/settings/reducer'
import mailReducer from 'pages/billing/mail/reducer'

const rootReducer = combineReducers<AppState>({
	auth: authReducer,
	theme: themeReducer,
	font: fontReducer,
	user: userReducer,
	company: companyReducer,
	group: groupReducer,
	customer: customerReducer,
	ip: ipReducer,
	ipSubnet: ipSubnetReducer,
	role: roleReducer,
	countries: countriesReducer,
	tax: taxReducer,
	product: productReducer,
	pricelist: pricelistReducer,
	productprice: productPriceReducer,
	productpricerange: productPriceRangeReducer,
	customerservice: customerServiceReducer,
	rightsider: rightSiderReducer,
	invoice: invoiceReducer,
	invoicedocument: invoiceDocumentReducer,
	invoicecostallocation: invoiceCostAllocationReducer,
	costallocation: costAllocationReducer,
	bill: billReducer,
	billcostallocation: billCostAllocationReducer,
	billvatsummary: billVatSummaryReducer,
	currencies: currenciesReducer,
	invoiceattachment: invoiceattachmentReducer,
	inventory: inventoryReducer,
	server: serverReducer,
	inventorylocation: inventoryLocationReducer,
	inventorytype: inventoryTypeReducer,
	inventoryphysicalserver: inventoryPhysicalServerReducer,
	bladecontainer: bladeContainerReducer,
	datacenter: datacenterReducer,
	rack: rackReducer,
	block: blockReducer,
	historylog: historyReducer,
	dnsservice: dnsServiceReducer,
	dnszone: dnsZoneReducer,
	asyncjobgroup: asyncJobGroupReducer,
	asyncjob: asyncJobReducer,
	certificate: certificatesResducer,
	webservice: webserviceReducer,
  servicetype: serviceTypeReducer,
  setting: settingReducer,
  mail: mailReducer
})

export default rootReducer
