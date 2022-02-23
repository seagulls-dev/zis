import React from 'react'
import {Form, Input, Row, Col, Select, InputNumber} from 'antd'
import {useForm} from 'antd/lib/form/Form'
import {AsyncJobDetails, AsyncJobServiceEnum, AsyncJobObjectEnum} from 'pages/asyncjob/job/models'
import {formItemLayout} from 'helpers/layoutHelpers'
import {useSelector} from 'react-redux'
import {AppState} from 'common/models'
import {useTranslation} from 'react-i18next'
import {IsJsonString} from 'helpers/stringHelpers'

const {Item} = Form
const {TextArea} = Input

interface Props {
	dataToUpdate?: AsyncJobDetails
	handleFormSubmit: (values: AsyncJobDetails) => void
}

const AsyncJobForm = ({dataToUpdate, handleFormSubmit}: Props) => {
	const {t} = useTranslation()
	const [form] = useForm()
	const {asyncjobs} = useSelector((state: AppState) => state.asyncjob)
	const {asyncjobgroups} = useSelector((state: AppState) => state.asyncjobgroup)
	const {servers} = useSelector((state: AppState) => state.server)
	const {users} = useSelector((state: AppState) => state.user)

	// id: number
	// parent_id?: number
	// group_id?: number
	// server_id: number
	// service_id?: number
	// user_id: number
	// object_id?: number
	// name: string
	// desc: string // description
	// args: string // base64
	// result: string
	// state: AsyncJobStateEnum
	// max_running_time?: number // seconds
	// start_after?: number // seconds
	// runtime: number
	// totaltime: number
	// running_at: number
	// finished_at: number
	// group: null

	return (
		<Form
			name='create-company'
			className='CompanyCreateForm'
			onFinish={handleFormSubmit}
			{...formItemLayout}
			form={form}
			initialValues={{...dataToUpdate}}
			autoComplete='off'>
			{dataToUpdate && (
				<Item name='id' style={{display: 'none'}}>
					<Input type='hidden' />
				</Item>
			)}

			<Row gutter={16}>
				<Col span={20}>
					<Item name='name' rules={[{required: true}]} label={t('asyncJobPage.name')}>
						<Input />
					</Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={12}>
					<Item name='parent_id' label={t('asyncJobPage.parent_id')}>
						<Select
							showSearch
							optionFilterProp='label'
							virtual={false}
							options={asyncjobs?.map((job) => ({label: job.name, value: job.id}))}
						/>
					</Item>
				</Col>

				<Col span={12}>
					<Item name='group_id' label={t('asyncJobPage.group_id')}>
						<Select
							showSearch
							optionFilterProp='label'
							options={asyncjobgroups?.map((group) => ({label: group.name, value: group.id}))}
						/>
					</Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={12}>
					<Item name='server_id' rules={[{required: true}]} label={t('asyncJobPage.server_id')}>
						<Select
							virtual={false}
							showSearch
							optionFilterProp='label'
							options={servers?.map((server) => ({label: server.hostname, value: server.id, key: server.id}))}
						/>
					</Item>
				</Col>

				<Col span={12}>
					<Item name='service_id' label={t('asyncJobPage.service_id')}>
						<Select options={Object.values(AsyncJobServiceEnum).map((service) => ({label: service, value: service}))} />
					</Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={12}>
					<Item name='user_id' rules={[{required: true}]} label={t('asyncJobPage.user_id')}>
						<Select
							virtual={false}
							showSearch
							optionFilterProp='label'
							options={users?.map((user) => ({
								label: `${user.name} ${user.name !== user.surname ? user.surname : ''}`,
								value: user.id,
								key: user.id,
							}))}
						/>
					</Item>
				</Col>

				<Col span={12}>
					<Item name='object_id' label={t('asyncJobPage.object_id')}>
						<Select options={Object.values(AsyncJobObjectEnum).map((object) => ({label: object, value: object}))} />
					</Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={12}>
					<Item name='max_running_time' label={t('asyncJobPage.max_running_time')}>
						<InputNumber prefix='sec' />
					</Item>
				</Col>

				<Col span={12}>
					<Item name='start_after' label={t('asyncJobPage.start_after')}>
						<InputNumber
							formatter={(value) => `${value}sec`}
							parser={(value) => (value ? value.replace('%', '') : 'sec')}
						/>
					</Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={20}>
					<Item
						name='args'
						hasFeedback
						rules={[
							{
								required: true,
								message: t('asyncJobPage.validate_error_required_args'),
							},
							() => ({
								validator(_, value) {
									if (IsJsonString(value)) {
										return Promise.resolve()
									}
									return Promise.reject(new Error(t('asyncJobPage.validate_error_correct_args')))
								},
							}),
						]}
						label={t('asyncJobPage.args')}>
						<TextArea allowClear value='{}' placeholder='{"key": "value"}' autoSize={{minRows: 3}} />
					</Item>
				</Col>
			</Row>
		</Form>
	)
}

export default AsyncJobForm
