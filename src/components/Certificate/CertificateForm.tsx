import React from 'react'
import {Button, Form, Input, InputNumber, Switch, Select} from 'antd'
import {useTranslation} from 'react-i18next'
import {useForm} from 'antd/lib/form/Form'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import {
	CertificateDetails,
	CreateCertificateParams,
	UpdateCertificateParams,
	CHALLENGE_ENUM,
} from 'pages/certificate/models'
import {CheckOutlined, CloseOutlined} from '@ant-design/icons'

const {Item} = Form
const {TextArea} = Input

interface Props {
	dataToUpdate?: CertificateDetails
	onFinish: (values: CreateCertificateParams | UpdateCertificateParams) => void
}
export const CertificateForm = ({dataToUpdate, onFinish}: Props) => {
	const [form] = useForm()
	const {t} = useTranslation()

	return (
		<Form {...formItemLayout} form={form} onFinish={onFinish} initialValues={{...dataToUpdate}}>
			{dataToUpdate ? (
				<Item name='id' style={{display: 'none'}}>
					<InputNumber type='hidden' />
				</Item>
			) : (
				<Item
					name='name'
					rules={[{required: true, message: t('certificatesPage.error.name')}]}
					label={t('certificatesPage.name')}>
					<Input />
				</Item>
			)}

			<Item
				name='challenge'
				rules={[{required: !dataToUpdate, message: t('certificatesPage.error.challenge')}]}
				label={t('certificatesPage.challenge')}>
				<Select options={Object.values(CHALLENGE_ENUM).map((val) => ({label: val, value: val}))} />
			</Item>

			<Item
				name='key'
				rules={[{required: !dataToUpdate, message: t('certificatesPage.error.key')}]}
				label={t('certificatesPage.key')}>
				<Input />
			</Item>

			<Item
				name='crt'
				rules={[{required: !dataToUpdate, message: t('certificatesPage.error.crt')}]}
				label={t('certificatesPage.crt')}>
				<TextArea />
			</Item>

			<Item
				name='ca_crt'
				rules={[{required: !dataToUpdate, message: t('certificatesPage.error.ca_crt')}]}
				label={t('certificatesPage.ca_crt')}>
				<TextArea />
			</Item>

			<Item name='auto_prolong' valuePropName='checked' label={t('certificatesPage.auto_prolong')}>
				<Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
			</Item>

			<Item name='comment' label={t('certificatesPage.comment')}>
				<TextArea />
			</Item>

			<Item {...tailLayout}>
				<Button type='primary' htmlType='submit'>
					{dataToUpdate ? t('certificatesPage.update') : t('certificatesPage.create')}
				</Button>
			</Item>
		</Form>
	)
}

export default CertificateForm
