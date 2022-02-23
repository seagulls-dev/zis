import React, {useState, useEffect} from 'react'
import {Card, Button, Modal, message} from 'antd'
import {PlusSquareOutlined} from '@ant-design/icons/lib/icons'
import {useDispatch} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {VhostDetails, CreateVhostParams, UpdateVhostParams} from './models'
import getVhosts from './actions/getVhosts'
import updateVhost from './actions/updateVhost'
import createVhost from './actions/createVhost'
import deleteVhost from './actions/deleteVhost'
import VhostsTable from 'components/WebServices/VhostsTable'
import VhostsForm from 'components/WebServices/VhostForm'

const VhostsPage = () => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [dataToUpdate, setDataToUpdate] = useState<VhostDetails>()
	const [isModalVisible, setModalVisible] = useState<boolean>(false)

	useEffect(() => {
		dispatch(getVhosts())
		//eslint-disable-next-line
	}, [])

	const hideModal = () => setModalVisible(false)
	const showModal = () => setModalVisible(true)

	const onFinish = (values: CreateVhostParams | UpdateVhostParams) => {
		dataToUpdate
			? 'id' in values &&
			  dispatch(
					updateVhost({...values, id: dataToUpdate?.id}, (isOk) => {
						isOk && message.success(t('webservice.vhost.updated'))
						hideModal()
					}),
			  )
			: dispatch(
					createVhost({...values}, (isOk) => {
						isOk && message.success(t('webservice.vhost.created'))
						hideModal()
					}),
			  )
	}

	const onDelete = (id: number) => {
		dispatch(deleteVhost(id, (isDone) => isDone && message.success(t('webservice.vhost.deleted'))))
	}

	return (
		<>
			<Card
				title={t('webservis.vhost.card-title')}
				extra={
					<Button
						type='text'
						size='small'
						className='VhostsPage'
						icon={<PlusSquareOutlined style={{fontSize: 22}} />}
						onClick={() => {
							setDataToUpdate(undefined)
							setModalVisible(true)
						}}
					/>
				}>
				<VhostsTable setDataToUpdate={setDataToUpdate} showModal={showModal} onDelete={onDelete} />
			</Card>
			<Modal
				destroyOnClose
				style={{top: 20}}
				width={600}
				title={dataToUpdate ? t('webservice.vhost.update-title') : t('webservice.vhost.create-title')}
				visible={isModalVisible}
				onCancel={hideModal}
				footer={null}
				confirmLoading={true}>
				<VhostsForm dataToUpdate={dataToUpdate} onFinish={onFinish} />
			</Modal>
		</>
	)
}

export default VhostsPage
