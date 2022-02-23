import React, {useState, useEffect} from 'react'
import {Card, Button, Modal} from 'antd'
import {PlusSquareOutlined, SafetyCertificateOutlined} from '@ant-design/icons/lib/icons'
import {useTranslation} from 'react-i18next'
import {CertificateDetails, CreateCertificateParams, UpdateCertificateParams} from './models'
import {useDispatch} from 'react-redux'
import updateCertificate from './actions/updateCertificate'
import createCertificate from './actions/createCertificate'
import CertificateTable from 'components/Certificate/CertificateTable'
import CertificateForm from 'components/Certificate/CertificateForm'
import deleteCertificate from './actions/deleteCertificate'
import getCertificates from './actions/getCertificates'
import getServers from 'pages/server/actions/getServers'

const CertificatesPage = () => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [isModalVisible, setModalVisible] = useState<boolean>(false)
	const [dataToUpdate, setDataToUpdate] = useState<CertificateDetails>()

	const hideModal = () => setModalVisible(false)
	const showModal = () => setModalVisible(true)

	useEffect(() => {
		dispatch(getCertificates())
		dispatch(getServers())
	}, [dispatch])

	const onFinish = (values: CreateCertificateParams | UpdateCertificateParams) => {
		dataToUpdate
			? 'id' in values &&
			  dispatch(
					updateCertificate({...values, auto_prolong: values.auto_prolong ? 1 : 0}, (isOk) => isOk && hideModal()),
			  )
			: 'name' in values &&
			  dispatch(
					createCertificate({...values, auto_prolong: values.auto_prolong ? 1 : 0}, (isOk) => isOk && hideModal()),
			  )
	}

	const onDelete = (id: number) => {
		dispatch(deleteCertificate(id, (isOk) => isOk && hideModal()))
	}

	return (
		<>
			<Card
				title={t('certificatesPage.title')}
				className='certificatesPage'
				extra={
					<Button type='text' size='small' icon={<PlusSquareOutlined style={{fontSize: 22}} />} onClick={showModal} />
				}>
				<CertificateTable setDataToUpdate={setDataToUpdate} onDelete={onDelete} showModal={showModal} />
			</Card>
			<Modal
				destroyOnClose
				style={{top: 20}}
				width={600}
				title={
					<>
						<SafetyCertificateOutlined /> &nbsp;
						{dataToUpdate ? t('certificatesPage.update_cetrificate') : t('certificatesPage.create_cetrificate')}
					</>
				}
				visible={isModalVisible}
				onCancel={hideModal}
				footer={null}
				confirmLoading={true}>
				<CertificateForm onFinish={onFinish} dataToUpdate={dataToUpdate} />
			</Modal>
		</>
	)
}

export default CertificatesPage
