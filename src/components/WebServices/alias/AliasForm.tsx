import React, {useState} from 'react'
import {Button, Form, Input} from 'antd'
import {useTranslation} from 'react-i18next'
import {AppState} from 'common/models'
import {useForm} from 'antd/lib/form/Form'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import {AliasDetails, CreateAliasParams, UpdateAliasParams} from 'pages/webservice/alias/models'

const {Item} = Form

interface Props {
	dataToUpdate?: AliasDetails
	onFinish: (values: CreateAliasParams | UpdateAliasParams) => void
}
export const AliasesPageForm = (props: Props) => {
	const [form] = useForm()
	const {t} = useTranslation()

	return (
		<Form {...formItemLayout} form={form} onFinish={props.onFinish} initialValues={{...props.dataToUpdate}}>
			<Item name='name' label={t('webservice.alias.name')} rules={[{required: true}]}>
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
