import React, {useState, useEffect} from 'react'
import {Card, Button, Modal, message} from 'antd'
import {PlusCircleOutlined} from '@ant-design/icons/lib/icons'
import {useDispatch} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {TemplateDetails, CreateTemplateParams, UpdateTemplateParams} from './models'
import {TemplatesPageForm} from 'components/WebServices/template/TemplateForm'
import {TemplatesPageTable} from 'components/WebServices/template/TemplateTable'
import updateTemplate from './actions/updateTemplate'
import createTemplate from './actions/createTemplate'
import deleteTemplate from './actions/deleteTemplate'
import getTemplates from './actions/getTemplates'

const TemplatesPage = () => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [dataToUpdate, setDataToUpdate] = useState<TemplateDetails>()
	const [isModalVisible, setModalVisible] = useState<boolean>(false)

	useEffect(() => {
		dispatch(getTemplates())
		//eslint-disable-next-line
	}, [])

	const hideModal = () => setModalVisible(false)
	const showModal = () => setModalVisible(true)

	const onFinish = (values: CreateTemplateParams | UpdateTemplateParams) => {
		dataToUpdate
			? 'web_server' in values &&
			  dispatch(
					updateTemplate({...values, id: dataToUpdate.id}, (isOk) => {
						isOk && message.success(t('webservice.template.updated'))
						hideModal()
					}),
			  )
			: 'web_server' in values &&
			  dispatch(
					createTemplate({...values}, (isOk) => {
						isOk && message.success(t('webservice.template.created'))
						hideModal()
					}),
			  )
	}

	const onDelete = (id: number) => {
		dispatch(deleteTemplate(id, (isOk) => isOk && message.success(t('webservice.template.deleted'))))
	}

	return (
		<>
			<Card
				title={dataToUpdate ? t('webservice.template.update-title') : t('webservice.template.create-title')}
				extra={
					<Button
						type='primary'
						onClick={() => {
							setDataToUpdate(undefined)
							setModalVisible(true)
						}}>
						<PlusCircleOutlined /> {t('webservice.template.create')}
					</Button>
				}
				className='TemplatesPage'>
				<TemplatesPageTable setDataToUpdate={setDataToUpdate} showModal={showModal} onDelete={onDelete} />
			</Card>
			<Modal
				destroyOnClose
				style={{top: 20}}
				width={600}
				title={dataToUpdate ? t('webservice.template.update-title') : t('webservice.template.create-title')}
				visible={isModalVisible}
				onCancel={hideModal}
				footer={null}
				confirmLoading={true}>
				<TemplatesPageForm dataToUpdate={dataToUpdate} onFinish={onFinish} />
			</Modal>
		</>
	)
}

export default TemplatesPage
