import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {AppState} from 'common/models'
import {Modal, Select, Form} from 'antd'
import Button from 'antd-button-color'
import {SplitCellsOutlined} from '@ant-design/icons/lib/icons'
import {useTranslation} from 'react-i18next'
import {useForm} from 'antd/lib/form/Form'
import {CertificateVhost} from 'pages/certificate/models'
import getVhosts from 'pages/webservice/vhost/actions/getVhosts'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'

const {Item} = Form

interface Props {
	usedOnVhosts: CertificateVhost[]
	certificateId: number
}

const ToggleCertificates = ({usedOnVhosts, certificateId}: Props) => {
	const [form] = useForm()
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [isModalVisible, setModalVisible] = useState<boolean>(false)
	const {
		vhost: {vhosts},
	} = useSelector((state: AppState) => state.webservice)

	useEffect(() => {
		dispatch(getVhosts())
		//eslint-disable-next-line
	}, [])

	const hideModal = () => setModalVisible(false)
	const showModal = () => setModalVisible(true)

	// const onSelect = (serverId: number) => {
	// 	dispatch(addCertificate({vhost_id: serverId, certificate_id: certificateId}))
	// }
	// const onDeselect = (serverId: number) => {
	// 	dispatch(removeCertificate({vhost_id: serverId, certificate_id: certificateId}))
	// }

	const onFinish = (values) => {
		console.log('values', values)
	}

	return (
		<>
			<>
				<Button type='link' icon={<SplitCellsOutlined />} onClick={showModal} />
				{usedOnVhosts.length
					? vhosts?.filter((vhost) => usedOnVhosts.some((t) => t.vhost_id === vhost.id))?.map((s) => s.hostname)
					: ''}
			</>
			<Modal
				destroyOnClose
				width={600}
				title={t('serversPage.togglrCertificates')}
				visible={isModalVisible}
				onCancel={hideModal}
				footer={null}
				confirmLoading={true}>
				<Form
					{...formItemLayout}
					form={form}
					onFinish={onFinish}
					initialValues={{vhosts: usedOnVhosts.map((vhost) => vhost.vhost_id)}}>
					<Item name='vhosts' label={t('serversPage.vhosts')}>
						<Select
							showSearch
							showArrow
							filterOption
							virtual={false}
							mode='multiple'
							optionFilterProp='label'
							options={vhosts?.map((vhost) => ({label: vhost.hostname, value: vhost.id}))}
							style={{width: '100%'}}
						/>
					</Item>
					<Item {...tailLayout}>
						<Button type='primary' htmlType='submit'>
							{t('serversPage.apply')}
						</Button>
					</Item>
				</Form>
			</Modal>
		</>
	)
}

export default ToggleCertificates
