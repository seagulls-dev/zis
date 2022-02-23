import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {Layout, Menu, Divider} from 'antd'
import {
    PieChartOutlined,
    TeamOutlined,
    ApartmentOutlined,
    GroupOutlined,
    ShoppingCartOutlined,
    DollarOutlined,
    PercentageOutlined,
    ShoppingOutlined,
    AccountBookOutlined,
    MoneyCollectOutlined,
    EnterOutlined,
    OneToOneOutlined,
    PartitionOutlined,
    UserOutlined,
    CloudServerOutlined,
    DatabaseOutlined,
    PicCenterOutlined,
    PicLeftOutlined,
    ContainerOutlined,
    GlobalOutlined,
    SettingOutlined,
    FormatPainterOutlined,
    EditOutlined,
    FormOutlined,
    SafetyCertificateOutlined,
    DatabaseFilled,
    SolutionOutlined,
    BarsOutlined,
    RadarChartOutlined,
    ProfileOutlined,
    InfoCircleOutlined,
    ShopOutlined,
    MailOutlined
} from '@ant-design/icons'
import {SiGhostery} from 'react-icons/si'
import {IoIosBusiness} from 'react-icons/io'
import {Theme} from '../ThemeSwitcher/models'
import {AppState} from 'common/models'
import {useTranslation} from 'react-i18next'
import './SideNav.scss'
import {isZcomNavHelper, isNavAllowHelper} from 'helpers/authHelpers'

const {Sider} = Layout

const {SubMenu} = Menu

const SideNav = () => {
    let location = useLocation()
    const {t} = useTranslation()
    const {theme} = useSelector((state: AppState) => state.theme)
    const [collapsed, setCollapsed] = useState(false)
    const [openKeys, setOpenKeys] = useState<string[]>()
    const PathName = location.pathname.split('/')
    const SplitedSubPagePath = PathName[2] && PathName[2].split('-')
    const local = localStorage.getItem('currentUser')
    const {self, menu_roles} = useSelector((state: AppState) => state.auth)

    const onCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed)
    }

    // submenu keys of first level
    const rootSubmenuKeys = ['ip/', 'billing/', 'inventory/', 'datacenter/', 'asyncjob/', 'databases/', 'webservices/']

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys?.indexOf(key) === -1)
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys)
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
        }
    }
    /**
     *  Opened menu keys
     */
    useEffect(() => {
        PathName[1] === 'ip-subnets' && setOpenKeys(['ip/'])
        PathName[1] === 'ip-addresses' && setOpenKeys(['ip/'])
        PathName[1] === 'billing' && setOpenKeys(['billing/'])
        PathName[1] === 'inventory' && setOpenKeys(['inventory/'])
        PathName[1] === 'datacenter' && setOpenKeys(['datacenter/'])
        PathName[1] === 'dns' && setOpenKeys(['dns/'])
        PathName[1] === 'asyncjob' && setOpenKeys(['asyncjob/'])
        PathName[1] === 'databases' && setOpenKeys(['databases/'])
        PathName[1] === 'webservices' && setOpenKeys(['webservices/'])
        //eslint-disable-next-line
    }, [])

    return (
        <Sider
            collapsible
            width={220}
            collapsed={collapsed}
            onCollapse={onCollapse}
            className='SideNav'
            theme={theme === Theme.DEFAULT ? 'light' : 'dark'}>
            <Link to='/' className='iconLink'>
                <div className={`logo ${theme === Theme.DEFAULT ? 'light' : 'dark'}`}/>
            </Link>
            <Divider/>
            <Menu
                theme={theme === Theme.DEFAULT ? 'light' : 'dark'}
                mode='inline'
                selectedKeys={PathName[2] ? [`${PathName[1]}/${SplitedSubPagePath[0]}`] : [`${PathName[1]}/`]}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                className='sideMenu'>
                {(isZcomNavHelper(self) || isNavAllowHelper(self, menu_roles ? menu_roles['left_menu_users'] : [])) && (
                    <Menu.Item
                        key='/'
                        icon={
                            <Link to='/' className='iconLink'>
                                <PieChartOutlined/>
                            </Link>
                        }>
                        <Link to='/' className='link'>
                            {t('dashboardPage.title')}
                        </Link>
                    </Menu.Item>
                )}
                {(isZcomNavHelper(self) || isNavAllowHelper(self, menu_roles ? menu_roles['left_menu_users'] : [])) && (
                    <Menu.Item
                        key='users/'
                        icon={
                            <Link to='/users' className='iconLink'>
                                <UserOutlined/>
                            </Link>
                        }>
                        <Link to='/users' className='link'>
                            {t('usersPage.title')}
                        </Link>
                    </Menu.Item>
                )}
                {(isZcomNavHelper(self) || isNavAllowHelper(self, menu_roles ? menu_roles['left_menu_usergroups'] : [])) && (
                    <Menu.Item
                        key='user-group/'
                        icon={
                            <Link to='/user-group' className='iconLink'>
                                <TeamOutlined/>
                            </Link>
                        }>
                        <Link to='/user-group' className='link'>
                            {t('userGroupPage.title')}
                        </Link>
                    </Menu.Item>
                )}
                {(isZcomNavHelper(self) || self?.roles?.some((item) => item.includes('billing'))) && (
                    <SubMenu key='billing/' icon={<DollarOutlined/>} title={t('billing.title')}>
                        {(!(self?.roles && self.roles[0] === 'billing-customer') ||
                            isNavAllowHelper(self, menu_roles ? menu_roles['left_menu_billing'] : [])) && (
                            <>
                                <Menu.Item
                                    key='billing/companies'
                                    icon={
                                        <Link to='/billing/companies' className='iconLink'>
                                            <IoIosBusiness/>{' '}
                                        </Link>
                                    }>
                                    <Link to='/billing/companies' className='link'>
                                        {t('companiesPage.title')}
                                    </Link>
                                </Menu.Item>
                                <Menu.Item
                                    key='billing/customer'
                                    icon={
                                        <Link to='/billing/customer' className='iconLink'>
                                            <ShoppingCartOutlined/>{' '}
                                        </Link>
                                    }>
                                    <Link to='/billing/customer' className='link'>
                                        {t('customerPage.title')}
                                    </Link>
                                </Menu.Item>
                                <Menu.Item
                                    key='billing/products'
                                    icon={
                                        <Link to='/billing/products' className='iconLink'>
                                            <ShoppingOutlined/>
                                        </Link>
                                    }>
                                    <Link to='/billing/products' className='link'>
                                        {t('billing.products.title')}
                                    </Link>
                                </Menu.Item>
                                <Menu.Item
                                    key='billing/servicetypes'
                                    icon={
                                        <Link to='/billing/servicetypes' className='iconLink'>
                                            <ShopOutlined/>
                                        </Link>
                                    }>
                                    <Link to='/billing/servicetypes' className='link'>
                                        {t('billing.servicetypes.title')}
                                    </Link>
                                </Menu.Item>
                                <Menu.Item
                                    key='billing/pricelist'
                                    icon={
                                        <Link to='/billing/pricelist' className='iconLink'>
                                            <AccountBookOutlined/>
                                        </Link>
                                    }>
                                    <Link to='/billing/pricelist' className='link'>
                                        {t('billing.pricelist.title')}
                                    </Link>
                                </Menu.Item>
                            </>
                        )}
                        {/*show invoice only when billing-customer*/}
                        {(isZcomNavHelper(self) || isNavAllowHelper(self, menu_roles ? menu_roles['left_menu_billing'] : [])) && (
                            <Menu.Item
                                key='billing/invoice'
                                icon={
                                    <Link to='/billing/invoice' className='iconLink'>
                                        <MoneyCollectOutlined/>
                                    </Link>
                                }>
                                <Link to='/billing/invoice' className='link'>
                                    {t('billing.invoice.title')}
                                </Link>
                            </Menu.Item>
                        )}
                        {(!(self?.roles && self.roles[0] === 'billing-customer') ||
                            isNavAllowHelper(self, menu_roles ? menu_roles['left_menu_billing'] : [])) && (
                            <>
                                <Menu.Item
                                    key='billing/taxes'
                                    icon={
                                        <Link to='/billing/taxes' className='iconLink'>
                                            <PercentageOutlined/>
                                        </Link>
                                    }>
                                    <Link to='/billing/taxes' className='link'>
                                        {t('billing.taxes.title')}
                                    </Link>
                                </Menu.Item>
                                <Menu.Item
                                    key='billing/bill'
                                    icon={
                                        <Link to='/billing/bill' className='iconLink'>
                                            <EnterOutlined/>
                                        </Link>
                                    }>
                                    <Link to='/billing/bill' className='link'>
                                        {t('billing.bill.title')}
                                    </Link>
                                </Menu.Item>
                                <Menu.Item
                                    key='billing/mail'
                                    icon={
                                        <Link to='/billing/mail' className='iconLink'>
                                            <MailOutlined/>
                                        </Link>
                                    }>
                                    <Link to='/billing/mail' className='link'>
                                        {t('billing.mail.title')}
                                    </Link>
                                </Menu.Item>
                            </>
                        )}
                    </SubMenu>
                )}
                {(isZcomNavHelper(self) || self?.roles?.some((item) => item.includes('inventory'))) && (
                    <SubMenu key='inventory/' icon={<OneToOneOutlined/>} title={t('inventory.menu.title')}>
                        <Menu.Item
                            key='inventory/'
                            icon={
                                <Link to='/inventory' className='iconLink'>
                                    <OneToOneOutlined/>
                                </Link>
                            }>
                            <Link to='/inventory' className='link'>
                                {t('inventoryPage.menu.inventory')}
                            </Link>
                        </Menu.Item>
                        <Menu.Item
                            key='inventory/physicalservers'
                            icon={
                                <Link to='/inventory/physicalservers' className='iconLink'>
                                    <GroupOutlined/>
                                </Link>
                            }>
                            <Link to='/inventory/physicalservers' className='link'>
                                {t('physicalServersPage.menu.title')}
                            </Link>
                        </Menu.Item>
                        <Menu.Item
                            key='inventory/bladecontainers'
                            icon={
                                <Link to='/inventory/bladecontainers' className='iconLink'>
                                    <ContainerOutlined/>
                                </Link>
                            }>
                            <Link to='/inventory/bladecontainers' className='link'>
                                {t('physicalServersPage.menu.blade-containers')}
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                )}
                {(isZcomNavHelper(self) || self?.roles?.some((item) => item.includes('ip'))) && (
                    <SubMenu key='ip/' icon={<ApartmentOutlined/>} title={t('ip.menu.title')}>
                        <Menu.Item
                            key='ip-subnets/'
                            icon={
                                <Link to='/ip-addresses' className='iconLink'>
                                    <PartitionOutlined/>
                                </Link>
                            }>
                            <Link to='/ip-subnets' className='link'>
                                {t('ipSubnetPage.title')}
                            </Link>
                        </Menu.Item>
                        <Menu.Item
                            key='ip-addresses/'
                            icon={
                                <Link to='/ip-addresses' className='iconLink'>
                                    <ApartmentOutlined/>
                                </Link>
                            }>
                            <Link to='/ip-addresses' className='link'>
                                {t('ipAddressPage.title')}
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                )}
                {(isZcomNavHelper(self) || self?.roles?.some((item) => item.includes('server'))) && (
                    <Menu.Item
                        key='servers/'
                        icon={
                            <Link to='/servers' className='iconLink'>
                                <CloudServerOutlined/>
                            </Link>
                        }>
                        <Link to='/servers' className='link'>
                            {t('serversPage.title')}
                        </Link>
                    </Menu.Item>
                )}
                {(isZcomNavHelper(self) || self?.roles?.some((item) => item.includes('datacenter'))) && (
                    <SubMenu key='datacenter/' icon={<DatabaseOutlined/>} title={t('datacenterPage.menu.title')}>
                        <Menu.Item
                            key='datacenter/'
                            icon={
                                <Link to='/datacenter' className='iconLink'>
                                    <DatabaseOutlined/>
                                </Link>
                            }>
                            <Link to='/datacenter' className='link'>
                                {t('datacenterPage.menu.title')}
                            </Link>
                        </Menu.Item>
                        <Menu.Item
                            key='datacenter/rack'
                            icon={
                                <Link to='/datacenter/rack' className='iconLink'>
                                    <PicCenterOutlined/>
                                </Link>
                            }>
                            <Link to='/datacenter/rack' className='link'>
                                {t('datacenterPage.menu.rack')}
                            </Link>
                        </Menu.Item>
                        <Menu.Item
                            key='datacenter/block'
                            icon={
                                <Link to='/datacenter/block' className='iconLink'>
                                    <PicLeftOutlined/>
                                </Link>
                            }>
                            <Link to='/datacenter/block' className='link'>
                                {t('datacenterPage.menu.block')}
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                )}
                {(isZcomNavHelper(self) || self?.roles?.some((item) => item.includes('dns'))) && (
                    <SubMenu key='dns/' icon={<RadarChartOutlined/>} title={t('dnsPage.menu_title')}>
                        <Menu.Item
                            key='dns/zone'
                            icon={
                                <Link to='/dns/zone' className='iconLink'>
                                    <GlobalOutlined/>
                                </Link>
                            }>
                            <Link to='/dns/zone' className='link'>
                                {t('dnsPage.menu_zone_title')}
                            </Link>
                        </Menu.Item>
                        <Menu.Item
                            key='dns/service'
                            icon={
                                <Link to='/dns/service' className='iconLink'>
                                    <SettingOutlined/>
                                </Link>
                            }>
                            <Link to='/dns/service' className='link'>
                                {t('dnsPage.menu_services_title')}
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                )}
                {(isZcomNavHelper(self) || self?.roles?.some((item) => item.includes('asyncjob'))) && (
                    <SubMenu key='asyncjob/' icon={<FormatPainterOutlined/>}
                             title={t('asyncjobPage.menu_asyncjob_title')}>
                        <Menu.Item
                            key='asyncjob/group'
                            icon={
                                <Link to='/asyncjob/group' className='iconLink'>
                                    <FormOutlined/>
                                </Link>
                            }>
                            <Link to='/asyncjob/group' className='link'>
                                {t('asyncjobPage.menu_asyncjob_groups')}
                            </Link>
                        </Menu.Item>
                        <Menu.Item
                            key='asyncjob/job'
                            icon={
                                <Link to='/asyncjob/job' className='iconLink'>
                                    <EditOutlined/>
                                </Link>
                            }>
                            <Link to='/asyncjob/job' className='link'>
                                {t('dnsPage.menu_asyncjob_jobs')}
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                )}
                {(isZcomNavHelper(self) || self?.roles?.some((item) => item.includes('certificate'))) && (
                    <Menu.Item
                        key='certificates/'
                        icon={
                            <Link to='/certificates' className='iconLink'>
                                <SafetyCertificateOutlined/>
                            </Link>
                        }>
                        <Link to='/certificates' className='link'>
                            {t('certificatesPage.title')}
                        </Link>
                    </Menu.Item>
                )}
                {(isZcomNavHelper(self) || self?.roles?.some((item) => item.includes('db'))) && (
                    <SubMenu key='databases/' icon={<DatabaseFilled/>} title={t('databasesPage.menu_title')}>
                        <Menu.Item
                            key='databases/users'
                            icon={
                                <Link to='/databases/users' className='iconLink'>
                                    <SolutionOutlined/>
                                </Link>
                            }>
                            <Link to='/databases/users' className='link'>
                                {t('databasesPage.menu_users')}
                            </Link>
                        </Menu.Item>
                        <Menu.Item
                            key='databases/services'
                            icon={
                                <Link to='/databases/services' className='iconLink'>
                                    <BarsOutlined/>
                                </Link>
                            }>
                            <Link to='/databases/services' className='link'>
                                {t('databasesPage.menu_services')}
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                )}
                {(isZcomNavHelper(self) || self?.roles?.some((item) => item.includes('web'))) && (
                    <SubMenu key='webservices/' icon={<GlobalOutlined/>} title={t('webservice.menu_title')}>
                        <Menu.Item
                            key='webservices/vhosts'
                            icon={
                                <Link to='/webservices/vhosts' className='iconLink'>
                                    <SiGhostery/>
                                </Link>
                            }>
                            <Link to='/webservices/vhosts' className='link'>
                                {t('webservice.menu_vhosts')}
                            </Link>
                        </Menu.Item>
                        <Menu.Item
                            key='webservices/templates'
                            icon={
                                <Link to='/webservices/templates' className='iconLink'>
                                    <ProfileOutlined/>
                                </Link>
                            }>
                            <Link to='/webservices/templates' className='link'>
                                {t('webservice.templates')}
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                )}
                {local ? '' : <Menu.Item key='login/' title={t('loginPage.login')} icon={<UserOutlined/>}>
                    <Link to='/login' className='link'>
                        {t('loginPage.login')}
                    </Link>
                </Menu.Item>
                }
                <Menu.Item key='status/' title={t('statusPage.title')} icon={<InfoCircleOutlined/>}>
                    <Link to='/status' className='link'>
                        {t('statusPage.title')}
                    </Link>
                </Menu.Item>
                {
                    (isZcomNavHelper(self) || isNavAllowHelper(self, menu_roles ? menu_roles['left_menu_app_settings'] : [])) &&
                    <Menu.Item key='setting/' title={t('settingsPage.1title')} icon={<SettingOutlined/>}>
                        <Link to='/settings' className='link'>
                            {t('settingsPage.title')}
                        </Link>
                    </Menu.Item>
                }
            </Menu>
        </Sider>
    )
}

export default SideNav
