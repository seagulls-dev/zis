import React from 'react'
import {Button, Table, Space} from 'antd'
import {ColumnsType} from 'antd/es/table'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import {useTranslation} from 'react-i18next'
import {TemplateDetails} from 'pages/webservice/template/models'
import {useSelector} from 'react-redux'
import {AppState} from 'common/models'
import {BACKEND_ENUM, WEBSERVER_ENUM} from 'common/enums'
import {DeleteTwoTone, EditTwoTone} from '@ant-design/icons'

interface Props {
	setDataToUpdate: (values: TemplateDetails) => void
	showModal: () => void
	onDelete: (id: number) => void
}

export const TemplatesPageTable = (props: Props) => {
	const {t} = useTranslation()
	const {
		template: {templates, isLoading},
	} = useSelector((state: AppState) => state.webservice)

	const columns: ColumnsType<TemplateDetails> = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 50,
			sorter: (a, b) => a.id - b.id,
		},
		{
			title: t('webservice.template.web_server'),
			dataIndex: 'web_server',
			key: 'web_server',
			width: 250,
			sorter: (a, b) => a.web_server.length - b.web_server.length,
			filters: Object.values(WEBSERVER_ENUM).map((object) => ({text: object, value: object})),
			onFilter: (value, record) => {
				return record.backend === value
			},
		},
		{
			title: t('webservice.template.backend'),
			dataIndex: 'backend',
			key: 'backend',
			width: 200,
			sorter: (a, b) => a.backend.length - b.backend.length,
			filters: Object.values(BACKEND_ENUM).map((object) => ({text: object, value: object})),
			onFilter: (value, record) => {
				return record.backend === value
			},
		},
		{
			title: t('webservice.template.description'),
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: t('webservice.template.code'),
			dataIndex: 'code',
			key: 'code',
			ellipsis: true,
		},
		{
			title: t('webservice.template.action'),
			key: 'action',
			width: 100,
			render: (_text, record) => (
				<Space>
					<PopConfirmZis onConfirm={() => props.onDelete(record.id)}>
						<Button type='text' icon={<DeleteTwoTone twoToneColor='red' />} />
					</PopConfirmZis>

					<Button
						type='text'
						icon={<EditTwoTone twoToneColor='green' />}
						onClick={() => {
							props.setDataToUpdate && props.setDataToUpdate(record)
							props.showModal()
						}}
					/>
				</Space>
			),
		},
	]

	return <Table<TemplateDetails> columns={columns} dataSource={templates} loading={isLoading} rowKey='id' />
}
