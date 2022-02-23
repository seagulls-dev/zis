import React, {useEffect} from 'react'
import {Avatar, Card, Col, Row, Form, message} from 'antd'
import {PieChartOutlined, UserOutlined} from '@ant-design/icons'
import {useTranslation} from 'react-i18next'
import './DashboardPage.scss'
import {useSelector, useDispatch} from 'react-redux'
import {AppState} from 'common/models'
import getCustomerSelf from 'pages/billing/customer/actions/getCustomerSelf'
import {isAllowedHelper, removeCurrentUser} from 'helpers/authHelpers'
import userLogout from 'pages/login/actions/logout'

const DashboardPage = () => {
	const {t} = useTranslation()
	const dispatch = useDispatch()

	const {self, authenticated} = useSelector((state: AppState) => state.auth)
	const {customer} = useSelector((state: AppState) => state.customer)

	useEffect(() => {
    isAllowedHelper(['zcom-root','zcom-admin'], self) && dispatch(getCustomerSelf('company'))
    authenticated && self?.roles && self?.roles.length === 0 && dispatch(
      userLogout((isSuccess) => {
        if (isSuccess) {
          removeCurrentUser()
          message.success(t('logoutPage.force'))
        }
      }),
    )
		//eslint-disable-next-line
	}, [self])

	return (
		<>
			<Card
				title={
					<>
						<PieChartOutlined /> {t('dashboardPage.title')}
					</>
				}
				className='DashboardPage'>
				<Row>
					<Col span='12'>
						<Form>
							<Form.Item>
								{self?.avatar && <Avatar src={self.avatar} alt='Avatar' />}
								{!self?.avatar && <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined />} />}
							</Form.Item>
							<Form.Item label='Name' className='label'>
								<span>{self?.name}</span>
							</Form.Item>
							<Form.Item label='Surname' className='label'>
								<span>{self?.surname}</span>
							</Form.Item>
							<Form.Item label='Email' className='label'>
								<span>{self?.email}</span>
							</Form.Item>
							<Form.Item label='Ident' className='label'>
								<span>{customer?.ident}</span>
							</Form.Item>
							<Form.Item label='Roles' className='label role-list'>
								{self?.roles?.sort().map((role, idx) => (
									<p key={idx}>{role}</p>
								))}
							</Form.Item>
						</Form>
					</Col>
					<Col span='12'>
						<Form>
							<Form.Item label='Company Name' className='label'>
								<span>{customer?.company?.name}</span>
							</Form.Item>
							<Form.Item label='Email' className='label'>
								<span>{customer?.company?.email}</span>
							</Form.Item>
							<Form.Item label='Street' className='label'>
								<span>{customer?.company?.street}</span>
							</Form.Item>
							<Form.Item label='City' className='label'>
								<span>{customer?.company?.city}</span>
							</Form.Item>
							<Form.Item label='Country' className='label'>
								<span>{customer?.company?.country}</span>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Card>
		</>
	)
}

export default DashboardPage
