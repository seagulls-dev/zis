import React from 'react'
import {useTranslation} from 'react-i18next'
import {Table, Space} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'
import {AsyncJobDetails} from 'pages/asyncjob/job/models'
import {useSelector} from 'react-redux'
import {AppState} from 'common/models'
import moment from 'moment'
import {convertToTree} from 'helpers/arrayHelpers'
import StartButton from './StartButton'
import FinishButton from './FinishButton'
import CancelButton from './CancelButton'
import ResolvButton from './ResolveButton'

interface Props {
	handleAsyncJobDelete: (id: number) => void
	handleAsyncJobUpdate: (values: AsyncJobDetails) => void
}

const AsyncJobTable = ({handleAsyncJobDelete, handleAsyncJobUpdate}: Props) => {
	const {t} = useTranslation()
	const {asyncjobs, isLoading, isSaving, actionedId} = useSelector((state: AppState) => state.asyncjob)
	const {users} = useSelector((state: AppState) => state.user)
	const {servers} = useSelector((state: AppState) => state.server)

	return (
		<Table<AsyncJobDetails>
			rowKey='id'
			loading={isLoading}
			dataSource={convertToTree(asyncjobs)}
			scroll={{x: 'max-content'}}
			columns={[
				{
					title: 'ID',
					dataIndex: 'id',
					key: 'id',
					width: 70,
				},
				// {
				// 	title: t('asyncJobPage.parent_id'),
				// 	dataIndex: 'parent_id',
				// 	key: 'parent_id',
				// },
				{
					title: t('asyncJobPage.group_id'),
					dataIndex: 'group_id',
					key: 'group_id',
				},
				{
					title: t('asyncJobPage.server_id'),
					dataIndex: 'server_id',
					key: 'server_id',
					render: (text) => servers?.find((server) => server.id === text)?.hostname || text,
				},
				{
					title: t('asyncJobPage.service_id'),
					dataIndex: 'service_id',
					key: 'service_id',
				},
				{
					title: t('asyncJobPage.user_id'),
					dataIndex: 'user_id',
					key: 'user_id',
					render: (text) => users?.find((user) => user.id === text)?.name || text,
				},
				{
					title: t('asyncJobPage.object_id'),
					dataIndex: 'object_id',
					key: 'object_id',
				},
				// {
				// 	title: t('asyncJobPage.group'),
				// 	dataIndex: 'group',
				// 	key: 'group',
				// },
				{
					title: t('asyncJobPage.name'),
					dataIndex: 'name',
					key: 'name',
					width: 200,
				},
				{
					title: t('asyncJobPage.description'),
					dataIndex: 'desc',
					key: 'desc',
				},
				{
					title: t('asyncJobPage.args'),
					dataIndex: 'args',
					key: 'args',
					width: 130,
					ellipsis: true,
				},
				{
					title: t('asyncJobPage.result'),
					dataIndex: 'result',
					key: 'result',
				},
				{
					title: t('asyncJobPage.state'),
					dataIndex: 'state',
					key: 'state',
					render: (text, record) => (record.id === actionedId && isSaving ? <LoadingOutlined /> : text),
				},
				{
					title: t('asyncJobPage.max_running_time'),
					dataIndex: 'max_running_time',
					key: 'max_running_time',
				},
				{
					title: t('asyncJobPage.start_after'),
					dataIndex: 'start_after',
					key: 'start_after',
				},
				{
					title: t('asyncJobPage.runtime'),
					dataIndex: 'runtime',
					key: 'runtime',
				},
				{
					title: t('asyncJobPage.totaltime'),
					dataIndex: 'totaltime',
					key: 'totaltime',
				},
				{
					title: t('asyncJobPage.running_at'),
					dataIndex: 'running_at',
					key: 'running_at',
					render: (text) => (text ? moment(text).format('D.M.YY LT') : text),
				},
				{
					title: t('asyncJobPage.finished_at'),
					dataIndex: 'finished_at',
					key: 'finished_at',
					render: (text) => (text ? moment(text).format('D.M.YY LT') : text),
				},
				{
					title: t('asyncJobPage.actions'),
					key: 'actions',
					width: 190,
					align: 'center',
					render: (_, record) => (
						<Space>
							<StartButton id={record.id} />

							<FinishButton id={record.id} />

							<CancelButton id={record.id} />

							<ResolvButton id={record.id} />

							{/* <Button
								disabled
								type='text'
								icon={<EditTwoTone twoToneColor='green' />}
								onClick={() => handleAsyncJobUpdate(record)}
							/> */}
						</Space>
					),
				},
			]}
			pagination={false}
		/>
	)
}

export default AsyncJobTable
