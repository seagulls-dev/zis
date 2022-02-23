import React, {useEffect} from 'react'
import {Button, Form, Input, Select} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {AppState} from 'common/models'
import {VhostDetails, CreateVhostParams} from 'pages/webservice/vhost/models'
import {useForm} from 'antd/lib/form/Form'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import getServers from 'pages/server/actions/getServers'
import getCustomers from 'pages/billing/customer/actions/getCustomers'
import {PROTOCOL_ENUM, WEBSERVER_ENUM, BACKEND_ENUM} from 'common/enums'

const {Item} = Form

interface Props {
	dataToUpdate?: VhostDetails
	onFinish: (values: CreateVhostParams) => void
}

const VhostsForm = (props: Props) => {
	const [form] = useForm()
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const {servers} = useSelector((state: AppState) => state.server)
	const {customers} = useSelector((state: AppState) => state.customer)

	useEffect(() => {
		dispatch(getServers())
		dispatch(getCustomers('company'))
		//eslint-disable-next-line
	}, [])

	return (
		<Form {...formItemLayout} form={form} onFinish={props.onFinish} initialValues={{...props.dataToUpdate}}>
			<Item name='hostname' label={t('VhostsPage.form.hostname')} rules={[{required: true}]}>
				<Input autoComplete='off' />
			</Item>
			<Item name='server_id' label={t('VhostsPage.form.server_id')} rules={[{required: true}]}>
				<Select options={servers?.map((server) => ({label: server.hostname, value: server.id}))} virtual={false} />
			</Item>
			<Item name='customer_id' label={t('VhostsPage.form.customer_id')} rules={[{required: true}]}>
				<Select
					options={customers?.map((customer) => ({label: customer.company?.name, value: customer.id}))}
					virtual={false}
				/>
			</Item>
			<Item name='protocol' label={t('VhostsPage.form.protocol')} rules={[{required: true}]}>
				<Select options={Object.values(PROTOCOL_ENUM).map((object) => ({label: object, value: object}))} />
			</Item>
			<Item name='web_server' label={t('VhostsPage.form.web_server')} rules={[{required: true}]}>
				<Select options={Object.values(WEBSERVER_ENUM).map((object) => ({label: object, value: object}))} />
			</Item>
			<Item name='backend' label={t('VhostsPage.form.backend')} rules={[{required: true}]}>
				<Select
					options={Object.values(BACKEND_ENUM).map((object) => ({label: object, value: object}))}
					virtual={false}
				/>
			</Item>
			// TODO
			<Item name='database_id' label={t('VhostsPage.form.database_id')}>
				<Input />
			</Item>
			// TODO
			<Item name='mail_server_id' label={t('VhostsPage.form.mail_server_id')}>
				<Input />
			</Item>
			<Item {...tailLayout}>
				<Button type='primary' htmlType='submit'>
					{props.dataToUpdate ? t('billing.tax.update') : t('billing.tax.create')}
				</Button>
			</Item>
		</Form>
	)
}

export default VhostsForm
