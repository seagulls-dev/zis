import './App.scss'
import {
    // PlainRoute,
    PrivateRoute,
    PublicRoute,
} from './components/routeComponents'
import LoginPage from './pages/login/LoginPage'
import React from 'react'
import {Switch} from 'react-router'
import PasswordResetPage from './pages/password/passwordReset/PasswordResetPage'
import PasswordRequestPage from './pages/password/passwordRequest/PasswordRequestPage'
import ChangePasswordPage from './pages/password/passwordChange/PasswordChangePage'
import Logout from 'pages/login/LogoutPage'
import CreateUserPage from 'pages/user/CreateUserPage'
import UpdateUserPage from 'pages/user/UpdateUserPage'
import UsersPage from 'pages/user/UsersPage'
import UserGroupPage from 'pages/group/GroupPage'
import CreateGroupPage from 'pages/group/CreateGroupPage'
import GroupPage from 'pages/group/UpdateGroupPage'
import IpAddressPage from 'pages/ip/ip-address/IpAddressPage'
import CustomerPage from 'pages/billing/customer/CustomerPage'
import IpSubnetPage from 'pages/ip/ip-subnet/IpSubnetPage'
import BillingTaxesPage from 'pages/billing/tax/BillingTaxesPage'
import BillingProductsPage from 'pages/billing/product/BillingProductsPage'
import BillingPricelistPage from 'pages/billing/pricelist/BillingPricelistPage'
import CustomerServicePage from 'pages/billing/customerservice/CustomerServicePage'
import ProductPricePage from 'pages/billing/productprice/ProductPricePage'
import InvoicePage from 'pages/billing/invoice/InvoicePage'
import CreateInvoicePage from 'pages/billing/invoice/CreateInvoicePage'
import {useTranslation} from 'react-i18next'
import enUS from 'antd/lib/locale/en_US'
import csCZ from 'antd/lib/locale/cs_CZ'
import {ConfigProvider} from 'antd'
import EditInvoicePage from 'pages/billing/invoice/EditInvoicePage'
import InvoiceDocumentPage from 'pages/billing/invoice/InvoiceDocumentPage'
import InvoiceAttachmentPage from 'pages/billing/invoice/InvoiceAttachmentPage'
import CreateBillPage from 'pages/billing/bill/CreateBillPage'
import UpdateBillPage from 'pages/billing/bill/UpdateBillPage'
import BillsPage from 'pages/billing/bill/BillsPage'
import ServersPage from 'pages/server/ServersPage'
import InventoryPage from 'pages/inventory/inventory/InventoryPage'
import PhysicalServersPage from 'pages/inventory/physicalserver/PhysicalServersPage'
import BladeContainersPage from 'pages/inventory/bladecontainer/BladeContainersPage'
import DashboardPage from 'pages/dashboard/DashboardPage'
import CompaniesPage from 'pages/company/CompaniesPage'
import DatacenterPage from 'pages/datacenter/datacenter/DatacenterPage'
import RackPage from 'pages/datacenter/rack/RackPage'
import BlockPage from 'pages/datacenter/block/BlockPage'
import DnsServicePage from 'pages/dns/service/DnsServicePage'
import DnsZonePage from 'pages/dns/zone/DnsZonePage'
import AsyncJobGroupPage from 'pages/asyncjob/group/AsyncJobGroupPage'
import AsyncJobPage from 'pages/asyncjob/job/AsyncJobPage'
import CertificatesPage from 'pages/certificate/CertificatesPage'
import VhostsPage from 'pages/webservice/vhost/VhostsPage'
import TemplatesPage from 'pages/webservice/template/TemplatesPage'
import StatusPage from './pages/status/StatusPage'
import BillingServiceTypePage from './pages/billing/servicetype/BillingServiceTypePage'
import SettingsPage from './pages/settings/SettingsPage'
import MailPage from './pages/billing/mail/MailPage'
import {useSelector} from 'react-redux'
import {AppState} from './common/models'

const App = () => {
    const {i18n} = useTranslation()

    const {menu_roles} = useSelector((state: AppState) => state.auth)

    return (
        <div className='App'>
            <div className='App_inner'>
                <ConfigProvider locale={i18n.language === 'en' ? enUS : csCZ}>
                    <Switch>
                        <PublicRoute path='/login' component={LoginPage}/>
                        <PublicRoute path='/password-request' component={PasswordRequestPage}/>
                        <PublicRoute path='/user/password-reset' component={PasswordResetPage}/>
                        <PrivateRoute
                            exact
                            path='/'
                            canAccess={menu_roles ? ['left_menu_dashboard'] : ['*']}
                            component={DashboardPage}
                        />
                        <PrivateRoute path='/logout' component={Logout}/>
                        <PrivateRoute path='/change-password' component={ChangePasswordPage}/>
                        <PrivateRoute
                            path='/users'
                            exact
                            canAccess={menu_roles ? ['left_menu_users'] : ['*']}
                            component={UsersPage}
                        />
                        <PrivateRoute path='/users/create-user' canAccess={menu_roles ? ['left_menu_users'] : ['*']}
                                      component={CreateUserPage}/>
                        <PrivateRoute path='/users/update/:id' canAccess={menu_roles ? ['left_menu_users'] : ['*']}
                                      component={UpdateUserPage}/>
                        <PrivateRoute path='/user/profile' component={UpdateUserPage}/>
                        <PrivateRoute
                            path='/user-group'
                            exact
                            canAccess={menu_roles ? ['left_menu_usergroups'] : ['*']}
                            component={UserGroupPage}
                        />
                        <PrivateRoute
                            path='/user-group/create/:parent_id?'
                            exact
                            canAccess={menu_roles ? ['left_menu_usergroups'] : ['*']}
                            component={CreateGroupPage}
                        />
                        <PrivateRoute
                            path='/user-group/edit/:id'
                            exact
                            canAccess={menu_roles ? ['left_menu_usergroups'] : ['*']}
                            component={GroupPage}
                        />
                        <PrivateRoute
                            path='/user-group/remove/:id'
                            exact
                            canAccess={menu_roles ? ['left_menu_usergroups'] : ['*']}
                            component={UserGroupPage}
                        />
                        <PrivateRoute path='/ip-addresses' canAccess={menu_roles ? ['left_menu_ip'] : ['*']}
                                      component={IpAddressPage}/>
                        <PrivateRoute path='/ip-subnets' canAccess={menu_roles ? ['left_menu_ip_subnet'] : ['*']}
                                      component={IpSubnetPage}/>
                        {/*<PrivateRoute path='/billing' exact canAccess={['*']} component={BillingTaxesPage} />*/}
                        <PrivateRoute
                            path='/billing/customer'
                            exact
                            canAccess={menu_roles ? ['left_menu_billing_customer'] : ['*']}
                            component={CustomerPage}
                        />
                        <PrivateRoute
                            path='/billing/companies'
                            canAccess={menu_roles ? ['left_menu_billing_company'] : ['*']}
                            component={CompaniesPage}
                        />
                        <PrivateRoute path='/billing/taxes' canAccess={menu_roles ? ['left_menu_billing_tax'] : ['*']}
                                      component={BillingTaxesPage}/>
                        <PrivateRoute path='/billing/servicetypes'
                                      canAccess={menu_roles ? ['left_menu_billing_service_type'] : ['*']}
                                      component={BillingServiceTypePage}/>
                        <PrivateRoute path='/billing/products'
                                      canAccess={menu_roles ? ['left_menu_billing_product'] : ['*']}
                                      component={BillingProductsPage}/>
                        <PrivateRoute path='/billing/pricelist'
                                      canAccess={menu_roles ? ['left_menu_billing_pricelist'] : ['*']}
                                      component={BillingPricelistPage}/>
                        <PrivateRoute path='/billing/pricelist-products/:id'
                                      canAccess={menu_roles ? ['left_menu_billing'] : ['*']}
                                      component={ProductPricePage}/>
                        <PrivateRoute path='/billing/customer-services' exact
                                      canAccess={menu_roles ? ['left_menu_billing'] : ['*']}
                                      component={CustomerServicePage}/>
                        <PrivateRoute
                            path='/billing/customer-services/:customer_id'
                            canAccess={menu_roles ? ['left_menu_billing'] : ['*']}
                            component={CustomerServicePage}
                        />
                        <PrivateRoute path='/billing/invoice' exact
                                      canAccess={menu_roles ? ['left_menu_billing'] : ['*']} component={InvoicePage}/>
                        <PrivateRoute path='/billing/invoice/pdf/:id'
                                      canAccess={menu_roles ? ['left_menu_billing'] : ['*']}
                                      component={InvoiceDocumentPage}/>
                        <PrivateRoute path='/billing/invoice/attach/:id/:mime_type'
                                      canAccess={menu_roles ? ['left_menu_billing'] : ['*']}
                                      component={InvoiceAttachmentPage}/>
                        <PrivateRoute path='/billing/invoice/create'
                                      canAccess={menu_roles ? ['left_menu_billing'] : ['*']}
                                      component={CreateInvoicePage}/>
                        <PrivateRoute path='/billing/invoice/edit/:id'
                                      canAccess={menu_roles ? ['left_menu_billing'] : ['*']}
                                      component={EditInvoicePage}/>
                        <PrivateRoute path='/billing/bill' exact canAccess={menu_roles ? ['left_menu_billing'] : ['*']}
                                      component={BillsPage}/>
                        <PrivateRoute path='/billing/bill/create' canAccess={menu_roles ? ['left_menu_billing'] : ['*']}
                                      component={CreateBillPage}/>
                        <PrivateRoute path='/billing/bill/edit/:id'
                                      canAccess={menu_roles ? ['left_menu_billing'] : ['*']}
                                      component={UpdateBillPage}/>
                        <PrivateRoute path='/billing/mail' exact canAccess={menu_roles ? ['page_billing_mails'] : ['*']}
                                      component={MailPage}/>
                        <PrivateRoute path='/servers' exact canAccess={menu_roles ? ['left_menu_servers'] : ['*']}
                                      component={ServersPage}/>
                        <PrivateRoute path='/inventory' exact canAccess={menu_roles ? ['left_menu_inventory'] : ['*']}
                                      component={InventoryPage}/>
                        <PrivateRoute path='/inventory/physicalservers'
                                      canAccess={menu_roles ? ['left_menu_inventory_physical'] : ['*']}
                                      component={PhysicalServersPage}/>
                        <PrivateRoute path='/inventory/bladecontainers'
                                      canAccess={menu_roles ? ['left_menu_inventory_blade'] : ['*']}
                                      component={BladeContainersPage}/>
                        <PrivateRoute path='/datacenter' exact canAccess={menu_roles ? ['left_menu_datacenter'] : ['*']}
                                      component={DatacenterPage}/>
                        <PrivateRoute path='/datacenter/rack'
                                      canAccess={menu_roles ? ['left_menu_datacenter_rack'] : ['*']}
                                      component={RackPage}/>
                        <PrivateRoute path='/datacenter/block'
                                      canAccess={menu_roles ? ['left_menu_datacenter_block'] : ['*']}
                                      component={BlockPage}/>


                        <PrivateRoute path='/dns/service' exact canAccess={['*']} component={DnsServicePage}/>
                        <PrivateRoute path='/dns/zone' exact canAccess={['*']} component={DnsZonePage}/>
                        <PrivateRoute path='/asyncjob/group' exact canAccess={['*']} component={AsyncJobGroupPage}/>
                        <PrivateRoute path='/asyncjob/job' exact canAccess={['*']} component={AsyncJobPage}/>
                        <PrivateRoute path='/certificates' exact canAccess={['*']} component={CertificatesPage}/>
                        <PrivateRoute path='/webservices/vhosts' exact canAccess={['*']} component={VhostsPage}/>
                        <PrivateRoute path='/webservices/templates' exact canAccess={['*']} component={TemplatesPage}/>
                        <PublicRoute exact path='/status' canAccess={['*']} component={StatusPage}/>
                        <PrivateRoute exact path='/settings' canAccess={menu_roles ? ['left_menu_app_settings'] : ['*']}
                                      component={SettingsPage}/>
                    </Switch>
                </ConfigProvider>
            </div>
        </div>
    )
}

export default App

export const breadcrumbNameMap = {
    '/': 'Dashboard',
    '/servers': 'Servers',
    '/domains': 'Domains',
    '/login': 'Login',
    '/logout': 'Logout',
    '/reset-password': 'Reset password',
    '/change-password': 'Change password',
    '/password-request': 'Password request',
    '/companies': 'Companies',
    '/profile': 'Profile',
    '/users': 'Users',
    '/users/create-user': 'Create user',
    '/users/update': 'Update user',
    '/user-group': 'User Group',
    '/user-group/create': 'Create User Group',
    '/user-group/edit': 'Update User Group',
    '/user-group/remove': 'Remove User Group',
    '/ip-addresses': 'IP addresses',
    '/ip-subnets': 'IP subnets',
    '/customer/edit': 'Edit customer',
    '/role-group': 'Role groups',
    '/billing': 'Billing',
    '/billing/customer': 'Customers',
    '/billing/customer/create': 'Create customer',
    '/billing/taxes': 'Taxes',
    '/billing/servicetypes': 'Service Types',
    '/billing/products': 'Products',
    '/billing/pricelist': 'Pricelists',
    '/billing/pricelist-products': 'Pricelist Products',
    '/billing/customer-services': 'Customer Services',
    '/billing/invoice': 'Invoices',
    '/billing/invoice/create': 'Create invoice',
    '/billing/invoice/edit': 'Edit invoice',
    '/billing/bill': 'Bills',
    '/billing/bill/create': 'Enter incoming document',
    '/billing/bill/edit': 'Edit incoming document',
    '/billing/mail': 'Mails',
    '/inventory': 'Inventory',
    '/inventory/physicalservers': 'Physical servers',
    '/inventory/bladecontainers': 'Blade containers',
    '/datacenter': 'Datacenter',
    '/datacenter/rack': 'Rack',
    '/datacenter/block': 'Rack Block',
    '/dns': 'DNS ',
    '/dns/service': 'Services',
    '/dns/zone': 'Zones',
    '/asyncjob': 'Async Job',
    '/asyncjob/group': 'Job Groups',
    '/asyncjob/job': 'Jobs',
    '/certificates': 'Certificates',
    '/webservices': 'Web services',
    '/webservices/vhosts': 'Vhosts',
    '/webservices/templates': 'Templates',
    '/status': 'Status',
    '/settings': 'Settings'
}
