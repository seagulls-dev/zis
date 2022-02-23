import React, {useState, useEffect} from 'react'
import {Card, Button, Modal, message} from 'antd'
import {useParams} from 'react-router'
import {PlusCircleOutlined} from '@ant-design/icons/lib/icons'
import {useDispatch} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {AliasDetails, CreateAliasParams, UpdateAliasParams} from './models'
import {AliasesPageForm} from 'components/WebServices/alias/AliasForm'
import {AliasesPageTable} from 'components/WebServices/alias/AliasTable'
import updateAlias from './actions/updateAlias'
import createAlias from './actions/createAlias'
import deleteAlias from './actions/deleteAlias'
import getAliases from './actions/getAliases'

interface ParamTypes {
	vhost_id: string
}

const AliasesPage = () => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [dataToUpdate, setDataToUpdate] = useState<AliasDetails>()
	const [isModalVisible, setModalVisible] = useState<boolean>(false)
	const {vhost_id} = useParams<ParamTypes>()

	useEffect(() => {
		dispatch(getAliases(parseInt(vhost_id)))
		//eslint-disable-next-line
	}, [])

	const hideModal = () => setModalVisible(false)
	const showModal = () => setModalVisible(true)

	const onFinish = (values: CreateAliasParams | UpdateAliasParams) => {
		dataToUpdate
			? 'vhost_id' in values &&
			  dispatch(
					updateAlias({...values, vhost_id: dataToUpdate.vhost_id}, (isOk) => {
						isOk && message.success(t('webservice.alias.updated'))
						hideModal()
					}),
			  )
			: 'hostname' in values &&
			  dispatch(
					createAlias({...values}, (isOk) => {
						isOk && message.success(t('webservice.alias.created'))
						hideModal()
					}),
			  )
	}

	const onDelete = (id: number) => {
		dispatch(deleteAlias(id, (isOk) => isOk && message.success(t('webservice.alias.deleted'))))
	}

	return (
		<>
			<Card
				title={dataToUpdate ? t('webservice.alias.update-title') : t('webservice.alias.create-title')}
				extra={
					<Button
						type='primary'
						onClick={() => {
							setDataToUpdate(undefined)
							setModalVisible(true)
						}}>
						<PlusCircleOutlined /> {t('webservice.alias.create')}
					</Button>
				}
				className='AliasesPage'>
				<AliasesPageTable setDataToUpdate={setDataToUpdate} showModal={showModal} onDelete={onDelete} />
			</Card>
			<Modal
				destroyOnClose
				style={{top: 20}}
				width={600}
				title={dataToUpdate ? t('webservice.alias.update-title') : t('webservice.alias.create-title')}
				visible={isModalVisible}
				onCancel={hideModal}
				footer={null}
				confirmLoading={true}>
				<AliasesPageForm dataToUpdate={dataToUpdate} onFinish={onFinish} />
			</Modal>
		</>
	)
}

export default AliasesPage
