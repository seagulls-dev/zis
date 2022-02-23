import React from 'react'
import {useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {Layout, Menu} from 'antd'
import {Theme} from '../ThemeSwitcher/models'
import {AppState} from 'common/models'
import {LanguageSwitcher, ThemeSwitcher, ProfileDropdown} from 'components'
import FontSwitcher from 'components/FontSwitcher/FontSwitcher'
import './AppBar.scss'

const {SubMenu} = Menu
const {Header} = Layout

const AppBar = () => {
	const {theme} = useSelector((state: AppState) => state.theme)
	const {self} = useSelector((state: AppState) => state.auth)
	const {self_customer} = useSelector((state: AppState) => state.customer)

	return (
		<Header className={`AppBar ${theme === Theme.DEFAULT ? 'light' : 'dark'}`}>
			<Menu theme={theme === Theme.DEFAULT ? 'light' : 'dark'} mode='horizontal'>
				{self_customer?.ident && self?.name && (
					<SubMenu style={{float: 'left'}} title={self_customer?.ident + ' / ' + self?.name} />
				)}
        {!self_customer?.ident && self?.name && (
          <SubMenu style={{float: 'left'}} title={self?.name} />
        )}
				<SubMenu style={{float: 'right'}} title={<LanguageSwitcher />} />
				<SubMenu style={{float: 'right'}} title={<ProfileDropdown />} />
				<SubMenu style={{float: 'right'}} title={<ThemeSwitcher />} />
				<SubMenu style={{float: 'right'}} title={<FontSwitcher />} />
			</Menu>
		</Header>
	)
}

export default withRouter(AppBar)
