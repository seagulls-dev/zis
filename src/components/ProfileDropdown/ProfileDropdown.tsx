import React, {useEffect, useState} from 'react'
import {Link, NavLink, useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {Menu, Avatar, Dropdown, message} from 'antd'
import {AppState} from 'common/models'
import {
	LoginOutlined,
	UnlockOutlined,
	SyncOutlined,
	UserOutlined,
	DownOutlined,
	LogoutOutlined,
} from '@ant-design/icons'
import {getInitial} from 'helpers/stringHelpers'
import getCustomerSelf from 'pages/billing/customer/actions/getCustomerSelf'
import {isAllowedHelper, removeCurrentUser} from 'helpers/authHelpers'
import userLogout from 'pages/login/actions/logout'
import getMenuRoles from 'pages/login/actions/getMenuRoles'
import getSettingsSelf from 'pages/settings/actions/getSettingsSelf'

const {Item} = Menu

const ProfileDropdown = () => {
	const {t} = useTranslation()
	const location = useLocation()
	const dispatch = useDispatch()
	const [initials, setInitials] = useState<RegExpMatchArray | null>()
	const {authenticated, self, token} = useSelector((state: AppState) => state.auth)
	const {self_customer} = useSelector((state: AppState) => state.customer)

  const {settings} = useSelector((state: AppState) => state.setting)

	useEffect(() => {
		if (authenticated) {
			// dispatch(getCustomers('company'))
      isAllowedHelper(['zcom-root','zcom-admin'], self) && dispatch(getCustomerSelf())
      dispatch(getMenuRoles())
      dispatch(getSettingsSelf())
      authenticated && self?.roles && self?.roles.length === 0 && dispatch(
        userLogout((isSuccess) => {
          if (isSuccess) {
            removeCurrentUser()
            message.success(t('logoutPage.force'))
          }
        }),
      )
		}
		//eslint-disable-next-line
	}, [authenticated])

	useEffect(() => {
		if (authenticated && self && token) {
			self.name && setInitials(getInitial(self.name))
		}
		//eslint-disable-next-line
	}, [self, token])

  useEffect(() => {
    const debug = settings?.find(item => item.name === 'debug')
    const value = debug?.value
    value && localStorage.setItem('debug',value)
  },[settings])

	const profileDropdown = (
		<Menu>
			{(authenticated && self) ? (
				<Menu>
					<Item key='/user-info'>{self && self.email}</Item>
					<hr />
					<Item key='/profile' icon={<UserOutlined />}>
						<NavLink to={`/user/profile`} className='nav-text'>
							{t('updateUserPage.title')}
						</NavLink>
					</Item>
					<Item key='/change-password' icon={<SyncOutlined />}>
						<NavLink to='/change-password' className='nav-text'>
							{t('changePasswordPage.change_password')}
						</NavLink>
					</Item>
					<Item key='/logout' icon={<LogoutOutlined />}>
						<NavLink to='/logout' className='nav-text'>
							Log out
						</NavLink>
					</Item>
				</Menu>
			) : (
				<Menu selectedKeys={[location.pathname]}>
					<Item key='/login' icon={<LoginOutlined />}>
						<NavLink to='/login'> {t('loginPage.sign_in')}</NavLink>
					</Item>
					<Item key='/password-request' icon={<UnlockOutlined />}>
						<Link to='/password-request'>{t('resetPasswordPage.reset_password_request')}</Link>
					</Item>
				</Menu>
			)}
		</Menu>
	)

	return (
		<Dropdown overlay={profileDropdown} placement='bottomCenter'>
			<div className='ant-dropdown-link'>
				{authenticated && self_customer?.company?.name} &nbsp;
				<Avatar style={{backgroundColor: '#2d9259'}} icon={!authenticated ? <UserOutlined /> : initials} />
				<DownOutlined />
			</div>
		</Dropdown>
	)
}

export default ProfileDropdown
