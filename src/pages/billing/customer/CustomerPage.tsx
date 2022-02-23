import React, {useEffect, useState} from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {Card, message, Modal} from 'antd'
import {PlusCircleOutlined, ShoppingCartOutlined} from '@ant-design/icons/lib/icons'
import {useTranslation} from 'react-i18next'
import {useSelector, useDispatch} from 'react-redux'
import getCustomers from './actions/getCustomers'
import {AppState} from 'common/models'
import {CustomerParams, CustomerDetails} from './models'
import getAllUsers from 'pages/user/actions/getAllUsers'
import deleteCustomer from './actions/deleteCustomer'
import createCustomer from './actions/createCustomer'
import updateCustomer from './actions/updateCustomer'
import getCompanies from 'pages/company/actions/getCompanies'
import CustomerTable from 'components/Customer/CustomerTable'
import CustomerForm from 'components/Customer/CustomerForm'
import History from 'components/History/History'
import Button from 'antd-button-color'

const CustomerPage = (props: RouteComponentProps) => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [dataToUpdate, setDataToUpdate] = useState<CustomerDetails>()
	const [isModalVisible, setModalVisible] = useState<boolean>(false)
	const [isHistoryModalVisible, setHistoryModalVisible] = useState(false)
	const {isLoading} = useSelector((state: AppState) => state.customer)

	const hideModal = () => setModalVisible(false)
	const showModal = () => setModalVisible(true)

	useEffect(() => {
		dispatch(getCustomers('company,nextInvoice'))
		dispatch(getAllUsers())
		dispatch(getCompanies())
		// eslint-disable-next-line
	}, [])

	const onFinish = (values: CustomerParams): void => {
		dataToUpdate
			? dispatch(
					updateCustomer(
						{
							...values,
							id: dataToUpdate.id,
						},
						(isSuccess) => {
							isSuccess && message.success(t('customerPage.updated'))
							hideModal()
						},
					),
			  )
			: dispatch(
					createCustomer({...values, is_unix: values.is_unix ? 1 : 0}, (isSuccess) => {
						isSuccess && message.success(t('customerPage.created'))
						hideModal()
					}),
			  )
	}
	const onDelete = (id: number) => {
		dispatch(
			deleteCustomer(id, (isSuccess) => {
				isSuccess && message.success(t('customerPage.deleted'))
			}),
		)
	}

	return (
		<>
			<Card
				title={
					<>
						<ShoppingCartOutlined /> &nbsp; {t('customerPage.title')}
					</>
				}
				className='CustomerPage'
				extra={
					<Button
						type='primary'
						onClick={() => {
							setDataToUpdate(undefined)
							showModal()
						}}>
						<PlusCircleOutlined /> {t('customerPage.create-customer')}{' '}
					</Button>
				}
				loading={isLoading}>
				<CustomerTable
					onDelete={onDelete}
					setDataToUpdate={setDataToUpdate}
					showModal={showModal}
					setHistoryModalVisible={setHistoryModalVisible}
				/>
			</Card>
			<Modal
				destroyOnClose
				style={{top: 20}}
				width={900}
				title={
					dataToUpdate
						? t('billing.customer.modal-update-title', dataToUpdate.company?.name)
						: t('billing.customer.modal-create-title')
				}
				visible={isModalVisible}
				onCancel={hideModal}
				footer={null}
				confirmLoading={true}>
				<CustomerForm dataToUpdate={dataToUpdate} onFinish={onFinish} />
			</Modal>

			<Modal
				destroyOnClose
				width='100%'
				style={{maxHeight: '100vh'}}
				title={t('billing.tax.history-title')}
				visible={isHistoryModalVisible}
				onCancel={() => setHistoryModalVisible(false)}
				footer={null}>
				<History
					url={`/helper/get-model-history?service=customer&model=Customer&id=${Number(
						dataToUpdate?.id,
					)}&days_before=365&limit=10`}
					id={Number(dataToUpdate?.id)}
					historyName='customer-service'
				/>
			</Modal>
		</>
	)
}

export default CustomerPage
