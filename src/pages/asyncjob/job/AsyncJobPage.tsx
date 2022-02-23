import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Card, Button, Modal, message} from 'antd'
import {PlusSquareOutlined, EditOutlined} from '@ant-design/icons/lib/icons'
import {useTranslation} from 'react-i18next'

import getAsyncJobs from './actions/getAsyncJobs'
import getAsyncJobGroups from '../group/actions/getAsyncJobGroups'
import getServers from 'pages/server/actions/getServers'
import getAllUsers from 'pages/user/actions/getAllUsers'

import {AsyncJobDetails} from './models'
import AsyncJobTable from 'components/AsyncJob/job/AsyncJobTable'
import AsyncJobForm from 'components/AsyncJob/job/AsyncJobForm'

interface Props {}

const AsyncJobPage = (props: Props) => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [isModalVisible, setModalVisible] = useState<boolean>(false)
	const [dataToUpdate, setDataToUpdate] = useState<AsyncJobDetails>()

	const hideModal = () => setModalVisible(false)
	const showModal = () => setModalVisible(true)

	useEffect(() => {
		dispatch(getAsyncJobs())
		dispatch(getAsyncJobGroups())
		dispatch(getServers())
		dispatch(getAllUsers())
	}, [dispatch])

	const handleAsyncJobDelete = (id: number) => {
		message.info(t('asyncJobPage.can_not_delete'))
	}

	const handleAsyncJobUpdate = (values: AsyncJobDetails) => {
		setDataToUpdate(values)
		showModal()
	}

	const handleFormSubmit = (values: AsyncJobDetails) => {}

	return (
		<>
			<Card
				title={t('asyncJobPage.title')}
				extra={
					<Button type='text' size='small' icon={<PlusSquareOutlined style={{fontSize: 22}} />} onClick={showModal} />
				}
				className='AsyncJobPage'>
				<AsyncJobTable handleAsyncJobDelete={handleAsyncJobDelete} handleAsyncJobUpdate={handleAsyncJobUpdate} />
			</Card>
			<Modal
				destroyOnClose
				width={800}
				title={
					<>
						<EditOutlined /> &nbsp;
						{dataToUpdate ? t('asyncJobPage.update-title') : t('asyncJobPage.create-title')}
					</>
				}
				visible={isModalVisible}
				onCancel={hideModal}
				footer={null}
				confirmLoading={true}>
				<AsyncJobForm handleFormSubmit={handleFormSubmit} dataToUpdate={dataToUpdate} />
			</Modal>
		</>
	)
}

export default AsyncJobPage
