import React, {useState, useEffect} from 'react'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import Form, {useForm} from 'antd/lib/form/Form'
import Item from 'antd/lib/form/FormItem'
import {Input, Button, Row, Col, Divider} from 'antd'
import {AiOutlineMail} from 'react-icons/ai'
import {BsFillPersonFill} from 'react-icons/bs'
import {FiPhone} from 'react-icons/fi'
import {RiStickyNoteLine} from 'react-icons/ri'
import {useTranslation} from 'react-i18next'
import {Store} from 'antd/lib/form/interface'
import {useSelector} from 'react-redux'
import {AppState} from 'common/models'
import AvatarUpload from 'components/AvatarUpload/AvatarUpload'
import {CustomerDetails} from 'pages/billing/customer/models'
import {UserDetails} from 'pages/user/models'

interface Props {
	customers?: CustomerDetails[]
	user?: UserDetails
	handleFinish: (values: Store) => void
}

const UserUpdateForm = ({handleFinish, user, customers}: Props) => {
	const { self } = useSelector((state: AppState) => state.auth)
	const [form] = useForm()
	const [avatarUrl, setAvatarUrl] = useState('')
	const {t} = useTranslation()

	const {fontSize} = useSelector((state: AppState) => state.font)

	const avatarImageCb = (url: string) => setAvatarUrl(url)

	useEffect(() => {
		form.setFieldsValue({
			avatarImage: avatarUrl,
		})
		// eslint-disable-next-line
	}, [avatarUrl])

	useEffect(
		() => form.resetFields(),
		// eslint-disable-next-line
		[user],
	)

	return (
		<Row>
			<Col flex={1}>
				<AvatarUpload passImage={avatarImageCb} />
				<h2>{user && user.username}</h2>
			</Col>
			<Col>
				<Divider type='vertical' style={{height: '100%'}} />
			</Col>
			<Col flex={4}>
				<Form
					className='UserUpdateForm'
					onFinish={handleFinish}
					initialValues={{...user}}
					{...formItemLayout}
					form={form}>
					<Item name='id' style={{display: 'none'}}>
						<Input type='hidden' />
					</Item>

					<Item name='username' style={{display: 'none'}}>
						<Input type='hidden' />
					</Item>

					<Item name='avatarImage' style={{display: 'none'}}>
						<Input type='hidden' />
					</Item>

					{/*<Item*/}
					{/*  name='customer_id'*/}
					{/*  label={t('createUserPage.customer_id')}*/}
					{/*>*/}
					{/*  <Select*/}
					{/*    showSearch*/}
					{/*    optionFilterProp='children'*/}
					{/*    allowClear*/}
					{/*    size={fontSize}*/}
					{/*  >*/}
					{/*    {*/}
					{/*      customers?.map((customer, i) => (<Option key={i} value={customer.id} >{customer?.company?.name}</Option>))*/}
					{/*    }*/}
					{/*  </Select>*/}
					{/*</Item>*/}

					<Item name='name' label={t('createUserPage.name')}>
						<Input size={fontSize} prefix={<BsFillPersonFill className='site-form-item-icon' />} />
					</Item>
					<Item
						name='surname'
						rules={[{required: true, message: t('loginPage.err_password')}]}
						label={t('createUserPage.surname')}>
						<Input size={fontSize} prefix={<BsFillPersonFill className='site-form-item-icon' />} />
					</Item>
					<Item
						name='email'
						rules={[{required: true, message: t('loginPage.err_username')}]}
						label={t('createUserPage.email')}>
						<Input size={fontSize} prefix={<AiOutlineMail className='site-form-item-icon' />} type='email' />
					</Item>
					<Item name='phone' label={t('createUserPage.phone')}>
						<Input size={fontSize} prefix={<FiPhone className='site-form-item-icon' />} />
					</Item>

					<Item name='note' label={t('createUserPage.note')}>
						<Input size={fontSize} prefix={<RiStickyNoteLine className='site-form-item-icon' />} />
					</Item>

					<Item {...tailLayout}>
						<Button type='primary' htmlType='submit' className='login-form-button' size={fontSize}>
							{t('updateUserPage.update')}
						</Button>
					</Item>
				</Form>
			</Col>
		</Row>
	)
}

export default UserUpdateForm
