import React from 'react'
import {Form, Input} from 'antd'
import {useTranslation} from 'react-i18next'
import {useForm} from 'antd/lib/form/Form'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import {AsyncJobGroupParams} from 'pages/asyncjob/group/models'
import Button from 'antd-button-color'
const {Item} = Form

interface Props {
	dataToUpdate?: AsyncJobGroupParams
	onFinish: (values: AsyncJobGroupParams) => void
}

const AsyncJobGroupForm = ({dataToUpdate, onFinish}: Props) => {
	const [form] = useForm()
	const {t} = useTranslation()

	return (
		<Form
			className='CompanyCreateForm'
			onFinish={onFinish}
			{...formItemLayout}
			form={form}
			initialValues={{...dataToUpdate}}
			autoComplete='off'>
			<Item
				name='name'
				rules={[{required: true, message: t('asyncJobGroupPage.error.name')}]}
				label={t('asyncJobGroupPage.name')}
				hasFeedback>
				<Input />
			</Item>

			<Item {...tailLayout}>
				<Button type='primary' htmlType='submit' className='login-form-button'>
					{dataToUpdate ? t('companiesPage.update') : t('companiesPage.create')}
				</Button>
			</Item>
		</Form>
	)
}

export default AsyncJobGroupForm
