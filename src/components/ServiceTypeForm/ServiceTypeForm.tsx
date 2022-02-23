import React, {useEffect, useState} from 'react'
import {Button, Form, Input, Switch} from 'antd'
import {useForm} from 'antd/lib/form/Form'
import {AppState} from 'common/models'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {UpdateServiceTypeParams} from 'pages/billing/servicetype/model'
import {CheckOutlined, CloseOutlined} from '@ant-design/icons'
import {CreateServiceTypeParams} from 'pages/billing/servicetype/model'

interface Props {
	dataToUpdate?: UpdateServiceTypeParams
	setModalVisible?: (param: boolean) => void
	isSaving: boolean
	onFinish: (values: CreateServiceTypeParams) => void
}

const ServiceTypeForm = ({dataToUpdate, setModalVisible, isSaving, onFinish}: Props) => {
	const [form] = useForm()
	const {t} = useTranslation()
	const [checked, setChecked] = useState(true)
	const {fontSize} = useSelector((state: AppState) => state.font)

	const onFormSubmit = (values: CreateServiceTypeParams) => {
		onFinish({...values, is_dynamic: +checked})
	}

	useEffect(() => {
		dataToUpdate ? setChecked(dataToUpdate.is_dynamic === 1) : setChecked(false)
		//eslint-disable-next-line
	}, [])

	return (
		<Form {...formItemLayout} onFinish={onFormSubmit} form={form}>
			<Form.Item
				name='name'
				rules={[{required: true, message: t('billing.servicetype.error.name')}]}
				label={t('billing.servicetype.name')}
				hasFeedback
				initialValue={dataToUpdate ? dataToUpdate.name : ''}>
				<Input />
			</Form.Item>
			<Form.Item
				name='is_dynamic'
				label={t('billing.servicetype.is_dynamic')}
				valuePropName='checked'
				initialValue={dataToUpdate && dataToUpdate.is_dynamic === 1}>
				<Switch
					checkedChildren={<CheckOutlined />}
					unCheckedChildren={<CloseOutlined />}
					checked={checked}
					onChange={() => setChecked(!checked)}
				/>
			</Form.Item>
			<Form.Item
				name='service_link'
				label={t('billing.servicetype.service_link')}
				hasFeedback
				initialValue={dataToUpdate ? dataToUpdate.service_link : ''}>
				<Input />
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button type='primary' loading={isSaving} htmlType='submit' className='login-form-button' size={fontSize}>
					{dataToUpdate ? t('billing.servicetype.update') : t('billing.servicetype.create')}
				</Button>
			</Form.Item>
		</Form>
	)
}

export default ServiceTypeForm
