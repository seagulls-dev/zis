import React, {useState, useEffect} from 'react'
import {Card, Button, Modal} from 'antd'
import {FormOutlined, PlusSquareOutlined} from '@ant-design/icons/lib/icons'
import AsyncJobGroupTable from 'components/AsyncJob/group/AsyncJobGroupTable'
import AsyncJobGroupForm from 'components/AsyncJob/group/AsyncJobGroupForm'
import {AsyncJobGroupDetails, AsyncJobGroupParams} from './models'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import updateAsyncJobGroup from 'pages/asyncjob/group/actions/updateAsyncJobGroup'
import createAsyncJobGroup from 'pages/asyncjob/group/actions/createAsyncJobGroup'
import deleteAsyncJobGroup from './actions/deleteAsyncJobGroup'
import {AppState} from 'common/models'
import getAsyncJobGroups from './actions/getAsyncJobGroups'

interface Props {}

const AsyncJobGroupPage = (props: Props) => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [isModalVisible, setModalVisible] = useState<boolean>(false)
	const [dataToUpdate, setDataToUpdate] = useState<AsyncJobGroupDetails>()
	const {asyncjobgroups, isLoading} = useSelector((state: AppState) => state.asyncjobgroup)

	const hideModal = () => setModalVisible(false)
	const showModal = () => setModalVisible(true)

	useEffect(() => {
		dispatch(getAsyncJobGroups())
	}, [dispatch])

	const onFinish = (values: AsyncJobGroupParams) => {
		dataToUpdate
			? dispatch(
					updateAsyncJobGroup({id: values.id, name: values.name}, (isOk) => {
						isOk && hideModal()
						setDataToUpdate(undefined)
					}),
			  )
			: dispatch(createAsyncJobGroup({name: values.name}, (isOk) => isOk && hideModal()))
	}

	const onAsyncJobGroupDelete = (id: number) => dispatch(deleteAsyncJobGroup(id))

	const onAsyncJobGroupUpdate = (values: AsyncJobGroupDetails) => {
		setDataToUpdate(values)
		showModal()
	}

	return (
		<>
			<Card
				title={t('asyncJobGroupPage.title')}
				loading={isLoading}
				extra={
					<Button type='text' size='small' icon={<PlusSquareOutlined style={{fontSize: 22}} />} onClick={showModal} />
				}
				className='AsyncJobGroupPage'>
				<AsyncJobGroupTable
					onAsyncJobGroupDelete={onAsyncJobGroupDelete}
					asyncjobgroups={asyncjobgroups}
					onAsyncJobGroupUpdate={onAsyncJobGroupUpdate}
				/>
			</Card>
			<Modal
				destroyOnClose
				width={600}
				title={
					<>
						<FormOutlined /> &nbsp;
						{dataToUpdate ? t('asyncJobGroupPage.update-title') : t('asyncJobGroupPage.create-title')}
					</>
				}
				visible={isModalVisible}
				onCancel={hideModal}
				footer={null}
				confirmLoading={true}>
				<AsyncJobGroupForm dataToUpdate={dataToUpdate} onFinish={onFinish} />
			</Modal>
		</>
	)
}

export default AsyncJobGroupPage
