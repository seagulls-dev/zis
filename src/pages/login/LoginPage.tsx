import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, Form, Input, Button} from 'antd'
import {UserOutlined, LockOutlined, LoginOutlined} from '@ant-design/icons'
import {Store} from 'antd/lib/form/interface'
import {useTranslation} from 'react-i18next'
import {AppState} from 'common/models'
import userLogin from 'pages/login/actions/login'
import {storeCurrentUser, currentUser} from 'helpers/authHelpers'
import getSelf from './actions/getSelf'
import {LoadingIndicator} from 'components'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import getRolesPermissions from 'pages/role/actions/getRolesPermissions'
import './LoginPage.scss'
import {StaticContext, RouteComponentProps} from 'react-router'
import tryToLoadUser from './actions/tryToLoadUser'

type Props = RouteComponentProps<{}, StaticContext, {from: string}>

const LoginPage = (props: Props) => {
	const [username, setUsername] = useState<string>()
	const [password, setPassword] = useState<string>()
	const {isLoading, token, authenticated} = useSelector((state: AppState) => state.auth)
	const {fontSize} = useSelector((state: AppState) => state.font)
	const dispatch = useDispatch()
	const {t} = useTranslation()
	const location = props.location.state

	const handleFinish = (values: Store): void => {
		dispatch(
			userLogin(
				{
					username: values.username,
					password: values.password,
				},
				(isSuccess) => {
					isSuccess
						? location && location['from'] !== '/logout'
							? props.history.replace(location['from'])
							: props.history.replace('/')
						: console.log('login API error')
				},
			),
		)
	}

	useEffect(() => {
		token && storeCurrentUser(token)
		token && authenticated && !isLoading && dispatch(getSelf('roles'))
		authenticated && dispatch(getRolesPermissions())

		const local = localStorage.getItem('currentUser')

		!token &&
			!authenticated &&
			currentUser() &&
			local && location['from'] !== '/logout' &&
			dispatch(
				tryToLoadUser((isSuccess) => {
					isSuccess
						? location && location['from'] !== '/logout'
							? props.history.replace(location['from'])
							: props.history.replace('/')
						: console.log('try to load user error')
				}),
			)
		//eslint-disable-next-line
	}, [token])

	return isLoading ? (
		<LoadingIndicator background />
	) : (
		<Card
			title={
				<>
					<LoginOutlined /> {t('loginPage.sign_in')}
				</>
			}
			className='LoginPage'>
			<Form
				name='login'
				className='login-form'
				initialValues={{remember: true}}
				onFinish={handleFinish}
				{...formItemLayout}
				noValidate>
				<div className='two-columns'>
					<Form.Item
						name='username'
						label={t('loginPage.username')}
						rules={[{required: true, message: t('loginPage.err_username')}]}>
						<Input
							prefix={<UserOutlined className='site-form-item-icon' />}
							placeholder={t('loginPage.username')}
							value={username}
							size={fontSize}
							onChange={(event: any) => {
								setUsername(event.currentTarget.value)
							}}
							autoComplete='off'
						/>
					</Form.Item>
					<Form.Item
						name='password'
						label={t('loginPage.pass')}
						rules={[{required: true, message: t('loginPage.err_password')}]}>
						<Input
							prefix={<LockOutlined className='site-form-item-icon' />}
							type='password'
							placeholder={t('loginPage.pass')}
							value={password}
							size={fontSize}
							onChange={(e) => {
								setPassword(e.currentTarget.value)
							}}
						/>
					</Form.Item>
					<Form.Item {...tailLayout}>
						<div className='LoginPage_action-line'>
							<Button
								type='primary'
								loading={isLoading}
								htmlType='submit'
								className='login-form-button'
								size={fontSize}>
								{t('loginPage.login')}
							</Button>
							<Link to='/password-request' style={{display: 'flex', alignItems: 'center'}}>
								{t('loginPage.forgot')}
							</Link>
						</div>
					</Form.Item>
				</div>
			</Form>
		</Card>
	)
}

export default LoginPage
