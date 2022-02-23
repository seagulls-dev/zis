import React, {useEffect} from 'react'
import {Card, Table, Space, message} from 'antd'
import {PlusCircleOutlined, ShopOutlined} from '@ant-design/icons/lib/icons'
import {AppState} from 'common/models'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import Modal from 'antd/lib/modal/Modal'
import {useState} from 'react'
import deleteServiceType from './actions/deleteServiceType'
import {ServiceTypeDetails} from './model'
import Button from 'antd-button-color'
import {DeleteTwoTone, EditTwoTone} from '@ant-design/icons'
import getServiceTypes from './actions/getServiceTypes'
import ServiceTypeForm from 'components/ServiceTypeForm/ServiceTypeForm'
import createServiceType from './actions/createServiceType'
import updateServiceType from './actions/updateServiceType'

const BillingServiceTypePage = () => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [serviceTypeDataSource, setServiceTypeDataSource] = useState<ServiceTypeDetails[]>()

	const {servicetypes, isLoading: isServiceTypesLoading, isSaving} = useSelector((state: AppState) => state.servicetype)

  const { settings } = useSelector((state : AppState) => state.setting)
  const [pageSize, setPageSize] = useState<string>()

	const [isModalVisible, setModalVisible] = useState(false)
	const [dataToUpdate, setDataToUpdate] = useState<ServiceTypeDetails>()

	useEffect(() => {
		dispatch(getServiceTypes())
	}, [dispatch])

	useEffect(() => {
		setServiceTypeDataSource(servicetypes)
    const size = settings?.find(item => item.name === 'grid_page_size')
    setPageSize(size?.value)
	}, [servicetypes])

	const onFinish = (values: any) => {
		dataToUpdate
			? dispatch(
					updateServiceType({...values, id: dataToUpdate.id}, (isSuccess: boolean) => {
						if (isSuccess) {
							message.success(t('billing.servicetype.edit_done'))
							setModalVisible(false)
						} else {
							message.error(t('billing.servicetype.error.update'))
							setModalVisible(false)
						}
					}),
			  )
			: dispatch(
					createServiceType(values, (isSuccess: boolean) => {
						if (isSuccess) {
							message.success(t('billing.servicetype.create_done'))
							setModalVisible(false)
						} else {
							message.error(t('billing.servicetype.error.create'))
							setModalVisible(false)
						}
					}),
			  )
	}

	const onDelete = (id: number) => {
		dispatch(
			deleteServiceType(id, (isSuccess: boolean) => {
				isSuccess && message.success(t('billing.servicetype.delete_done'))
			}),
		)
	}

	const columns = [
		{
			title: 'ID',
			key: 'id',
			dataIndex: 'id',
		},
		{
			title: t('billing.servicetype.name'),
			key: 'name',
			dataIndex: 'name',
		},
		{
			title: t('billing.servicetype.is_dynamic'),
			key: 'is_dynamic',
			dataIndex: 'is_dynamic',
		},
		{
			title: t('billing.servicetype.service_link'),
			key: 'service_link',
			dataIndex: 'service_link',
		},
		{
			title: t('billing.servicetype.action'),
			key: 'action',
			dataIndex: 'action',
			render: (text: string, record: ServiceTypeDetails) => (
				<Space>
					<Button
						type='text'
						size='small'
						onClick={() => {
							setModalVisible(true)
							setDataToUpdate(record)
						}}
						icon={<EditTwoTone twoToneColor='green' />}
					/>
					<PopConfirmZis onConfirm={() => onDelete(record.id)}>
						<Button type='text' danger size='small' icon={<DeleteTwoTone twoToneColor='red' />} />
					</PopConfirmZis>
				</Space>
			),
		},
	]

	return (
		<>
			<Card
				title={t('billing.servicetypes.title')}
				extra={
					<Button
						type='primary'
						onClick={() => {
							setDataToUpdate(undefined)
							setModalVisible(true)
						}}>
						<PlusCircleOutlined /> {t('billing.servicetype.create')}
					</Button>
				}
				className='BillingTaxesPage'
				loading={isServiceTypesLoading}>
        {
          pageSize &&
          <Table<ServiceTypeDetails>
              rowClassName={() => 'highlight'}
              columns={columns}
              dataSource={serviceTypeDataSource}
              rowKey='id'
              pagination={{defaultPageSize: parseInt(pageSize), showSizeChanger: false}}
          />
        }

			</Card>
			<Modal
				destroyOnClose={true}
				style={{top: 20}}
				title={
					<>
						<ShopOutlined />{' '}
						{dataToUpdate ? t('billing.servicetype.update_title') : t('billing.servicetype.create_title')}
					</>
				}
				visible={isModalVisible}
				onCancel={() => setModalVisible(false)}
				footer={null}>
				<ServiceTypeForm
					dataToUpdate={dataToUpdate}
					setModalVisible={setModalVisible}
					isSaving={isSaving}
					onFinish={onFinish}
				/>
			</Modal>
		</>
	)
}

export default BillingServiceTypePage
