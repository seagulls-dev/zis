import React, {useEffect, useState} from 'react'
import {Card, Button, message, Modal} from 'antd'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from 'common/models'
import companiesList from './actions/getCompanies'
import {RouteComponentProps} from 'react-router-dom'
import {PlusCircleOutlined} from '@ant-design/icons'
import CompaniesTable from 'components/CompaniesTable/CompaniesTable'
import deleteCompany from './actions/deleteCompany'
import createCompany from './actions/createCompany'
import updateCompany from './actions/updateCompany'
import {CompanyDetails, CompanyParams} from './models'
import CompanyForm from 'components/CompanyForm/CompanyForm'
import {IoIosBusiness} from 'react-icons/io'
import CustomerForm from 'components/Customer/CustomerForm'
import {CustomerParams} from '../billing/customer/models'
import createCustomer from '../billing/customer/actions/createCustomer'

const CompaniesPage = (props: RouteComponentProps) => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [isCustomerModalVisible, setIsCustomerModalVisible] = useState<boolean>(false)
	const [dataToUpdate, setDataToUpdate] = useState<CompanyDetails>()
	const {isLoading, companies} = useSelector((state: AppState) => state.company)

	const hideModal = () => {setModalVisible(false);setIsCustomerModalVisible(false)}
	const showModal = () => setModalVisible(true)

	useEffect(() => {
		dispatch(companiesList())
		// eslint-disable-next-line
	}, [])
	const onFinish = (values: CompanyParams): void => {
		dataToUpdate
			? dispatch(
					updateCompany(
						{
							...values,
							vat_payer: Number(values.vat_payer),
						},
						(isSuccess: boolean) => {
							if (isSuccess) {
								message.success(
									<span dangerouslySetInnerHTML={{__html: t('companiesPage.updated', {name: values.name})}}></span>,
								)
								hideModal()
							}
						},
					),
			  )
			: dispatch(
					createCompany(
						{
							...values,
							vat_payer: values.vat_payer ? 1 : 0,
						},
						(isSuccess: boolean) => {
							if (isSuccess) {
								message.success(
									<span dangerouslySetInnerHTML={{__html: t('companiesPage.created', {name: values.name})}}></span>,
								)
								hideModal()
                if (values.is_new_customer) setIsCustomerModalVisible(true)
							}
						},
					),
			  )
	}
	const onDelete = (id: number) => {
		dispatch(
			deleteCompany(
				id,
				(isSuccess) =>
					isSuccess &&
					message.success(<span dangerouslySetInnerHTML={{__html: t('companiesPage.deleted', {id})}}></span>),
			),
		)
	}

	const onFromCompanyFinish = (values: CustomerParams) => {
	  const lastCompany = companies && companies[companies?.length - 1].id
    const is_unix = values.is_unix ? 1 : 0;
    lastCompany && dispatch(
      createCustomer({...values, company_id: lastCompany, is_unix: is_unix}, (isSuccess) => {
        isSuccess && message.success(t('customerPage.created'))
        hideModal()
        props.history.push('/billing/customer')
      }),
    )
  }

	return (
		<>
			<Card
				className='CompanyPage'
				title={
					<>
						<IoIosBusiness /> &nbsp; {t('companiesPage.title')}
					</>
				}
				extra={
					<Button
						type='primary'
						onClick={() => {
							setDataToUpdate(undefined)
							showModal()
						}}>
						<PlusCircleOutlined /> {t('companiesPage.create_title')}{' '}
					</Button>
				}
				loading={isLoading}>
				<CompaniesTable
					data={companies}
					setDataToUpdate={setDataToUpdate}
					isLoading={isLoading}
					onDelete={onDelete}
					showModal={showModal}
				/>
			</Card>
			<Modal
				destroyOnClose
				style={{top: 20}}
				width={600}
				title={
					<>
						<IoIosBusiness /> &nbsp;
						{dataToUpdate ? t('companiesPage.update-title') : t('companiesPage.create-title')}
					</>
				}
				visible={isModalVisible}
				onCancel={hideModal}
				footer={null}
				confirmLoading={true}>
				<CompanyForm dataToUpdate={dataToUpdate} onFinish={onFinish} />
			</Modal>

      <Modal
        destroyOnClose
        style={{top: 20}}
        width={900}
        title={
          t('billing.customer.modal-create-title')
        }
        visible={isCustomerModalVisible}
        onCancel={hideModal}
        footer={null}
        confirmLoading={true}>
        <CustomerForm dataToUpdateFromNew={true} onFinish={onFromCompanyFinish} />
      </Modal>
		</>
	)
}

export default CompaniesPage
