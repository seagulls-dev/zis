import React from 'react'
import {useTranslation} from 'react-i18next'
import {Table, Space} from 'antd'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import Button from 'antd-button-color'
import {DeleteTwoTone, EditTwoTone} from '@ant-design/icons'
import {AsyncJobGroupDetails} from 'pages/asyncjob/group/models'

interface Props {
	onAsyncJobGroupDelete: (id: number) => void
	asyncjobgroups?: AsyncJobGroupDetails[]
	onAsyncJobGroupUpdate: (values: AsyncJobGroupDetails) => void
}

const AsyncJobGroupTable = ({onAsyncJobGroupDelete, asyncjobgroups, onAsyncJobGroupUpdate}: Props) => {
	const {t} = useTranslation()

	return (
		<Table<AsyncJobGroupDetails>
			rowKey='id'
			dataSource={asyncjobgroups}
			columns={[
				{
					title: 'ID',
					dataIndex: 'id',
					key: 'id',
					width: 30,
				},
				{
					title: t('asyncJobGroupPage.name'),
					dataIndex: 'name',
					key: 'name',
				},
				{
					title: 'Actions',
					key: 'actions',
					width: 90,
					align: 'center',
					render: (_, record) => (
						<Space>
							<PopConfirmZis onConfirm={() => onAsyncJobGroupDelete(record.id)}>
								<Button type='text' icon={<DeleteTwoTone twoToneColor='red' />} />
							</PopConfirmZis>

							<Button
								type='text'
								icon={<EditTwoTone twoToneColor='green' />}
								onClick={() => onAsyncJobGroupUpdate(record)}
							/>
						</Space>
					),
				},
			]}
			pagination={false}
		/>
	)
}

export default AsyncJobGroupTable
