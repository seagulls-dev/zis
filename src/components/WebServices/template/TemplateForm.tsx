import React from 'react'
import {Button, Form, Input, Select} from 'antd'
import {useTranslation} from 'react-i18next'
import {useForm} from 'antd/lib/form/Form'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import {TemplateDetails, CreateTemplateParams, UpdateTemplateParams} from 'pages/webservice/template/models'
import {WEBSERVER_ENUM, BACKEND_ENUM} from 'common/enums'
import TextArea from 'antd/lib/input/TextArea'

const {Item} = Form

interface Props {
	dataToUpdate?: TemplateDetails
	onFinish: (values: CreateTemplateParams | UpdateTemplateParams) => void
}
export const TemplatesPageForm = (props: Props) => {
	const [form] = useForm()
	const {t} = useTranslation()

	return (
		<Form {...formItemLayout} form={form} onFinish={props.onFinish} initialValues={{...props.dataToUpdate}}>
			<Item name='web_server' label={t('webservice.template.web_server')} rules={[{required: true}]}>
				<Select options={Object.values(WEBSERVER_ENUM).map((object) => ({label: object, value: object}))} />
			</Item>
			<Item name='backend' label={t('webservice.template.backend')} rules={[{required: true}]}>
				<Select
					options={Object.values(BACKEND_ENUM).map((object) => ({label: object, value: object}))}
					virtual={false}
				/>
			</Item>
			<Item name='description' label={t('webservice.template.description')} rules={[{required: true}]}>
				<Input autoComplete='off' />
			</Item>
			<Item name='code' label={t('webservice.template.code')} rules={[{required: true}]}>
				<TextArea showCount />
			</Item>
			<Item {...tailLayout}>
				<Button type='primary' htmlType='submit'>
					{props.dataToUpdate ? t('billing.tax.update') : t('billing.tax.create')}
				</Button>
			</Item>
		</Form>
	)
}
