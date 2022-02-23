import React, {useEffect, useState} from 'react'
import {Modal, Space, message, Divider, Spin} from 'antd'
import {
	CustomerServiceOutlined,
	DeleteOutlined,
	EditOutlined,
	ExpandOutlined,
	IssuesCloseOutlined,
	StopOutlined,
} from '@ant-design/icons/lib/icons'
import {useTranslation} from 'react-i18next'
import CustomerServiceForm from 'pages/billing/customerservice/components/CustomerServiceForm'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from 'common/models'
import getCustomerSericesByCustomer from './actions/getCustomerServiceByCustomer'
import deleteCustomerService from './actions/deleteCustomerService'
import moment, {Moment} from 'moment'
import getProducts from '../product/actions/getProducts'
import {convertToTree} from 'helpers/arrayHelpers'
import PageHeader from 'antd/lib/page-header'
import {Link, RouteComponentProps, useParams} from 'react-router-dom'
import getCustomer from 'pages/billing/customer/actions/getCustomer'
import {PrependedParentIdCreateParams} from '../product/models'
import Button from 'antd-button-color'
import {CustomerServiceDetails, UpdateCustomerServiceParams} from './models'
import updateCustomerService from './actions/updateCustomerService'
import createCustomerService from './actions/createCustomerService'
import RangeFilter from 'components/RangeFilter/RangeFilter'
import {setSider} from 'components/RightSider/actions/setRightSider'
import {useLocation} from 'react-router-dom'
import './CustomerServicePage.scss'
import CustomerServiceOneTimeForm from './components/CustomerServiceOneTimeForm'
import CustomerServiceTable from './components/CustomerServiceTable'
import {filterPeriods} from './utils'
import CustomerInfo from './components/CustomerInfo'
import getCurrentPricelist from '../pricelist/actions/getCurrentPricelist'

interface ParamTypes {
	customer_id: string
}

const CustomerServicePage = (props: RouteComponentProps) => {
	const {customer_id} = useParams<ParamTypes>()
	const {t} = useTranslation()
	let location = useLocation()
	const dispatch = useDispatch()

	const [isModalVisible, setModalVisible] = useState(false)
	const [isOneTimeModalVisible, setOneTimeModalVisible] = useState(false)

	const [dataToUpdate, setDataToUpdate] = useState<UpdateCustomerServiceParams>()
	const [dataToCreate, setDataToCreate] = useState<PrependedParentIdCreateParams>()
	const [actionType, setActionType] = useState<'UPDATE' | 'CREATE' | undefined>()
	const [expandedTableRows, setExpandedTableRows] = useState<(string | number)[]>()
	const [range, setRange] = useState<[Moment, Moment]>()
	const {customerservices, isLoading: isCustomerServiceLoading} = useSelector((state: AppState) => state.customerservice)      //getCustomerSericesByCustomer
	const {products} = useSelector((state: AppState) => state.product)                      //getProducts
  const {customer, isLoading: isCustomerLoading} = useSelector((state: AppState) => state.customer)                       //getCustomer
	const pricelist = useSelector((state: AppState) => state.pricelist)                     //getCurrentPricelist
  const { settings } = useSelector((state : AppState) => state.setting)

	const helpBody = () => (
		<div className='helpBlock'>
			<h4>Color Legend</h4>
			<div>
				{' '}
				<span className='legend upgradedRow'> </span>&nbsp; - Upgraded items{' '}
			</div>
			<div>
				{' '}
				<span className='legend finishedRow'> </span>&nbsp; - Finished items{' '}
			</div>
			<div>
				{' '}
				<span className='legend childrenRow'> </span>&nbsp; - Child items{' '}
			</div>
			<Divider />
			<h4>Buttons</h4>
			<div>
				<Button type='warning' className='finish-form-button'>
					<StopOutlined />
				</Button>
				&nbsp; - finish item
			</div>
			<div>
				<Button type='primary'>
					<EditOutlined />
				</Button>
				&nbsp; - Edit item
			</div>
			<div>
				<Button type='primary' danger>
					<DeleteOutlined />
				</Button>
				&nbsp;- Soft delete item
			</div>
			<div>
				<Button type='success' className='upgrade-form-button gold'>
					<IssuesCloseOutlined />
				</Button>
				&nbsp;- Upgrade (finish & create new)
			</div>
		</div>
	)

	useEffect(() => {
		dispatch(getCustomerSericesByCustomer(Number(customer_id)))
		dispatch(getCurrentPricelist(Number(customer_id)))
		dispatch(getCustomer(Number(customer_id), 'company'))
		dispatch(getProducts())
	}, [dispatch, customer_id])

  const openServiceDlg = () => {
    customer_id && setDataToCreate({parent_id: Number(customer_id)})
    setDataToUpdate(undefined)
    setModalVisible(true)
  }

  const openOTPDlg = () => {
    customer_id && setDataToCreate({parent_id: Number(customer_id)})
    setDataToUpdate(undefined)
	  setOneTimeModalVisible(true)
  }

	useEffect(() => {
		dispatch(setSider({content: {title: 'Customer Services help', body: helpBody(), path: location.pathname}}))
	}, [dispatch, location.pathname])

	const onDelete = (id: number) => {
		dispatch(deleteCustomerService(id))
	}

	//terminate
	const onFinish = (record: UpdateCustomerServiceParams, cb?: (isOk: Boolean) => void) => {
		dispatch(
			updateCustomerService(
				{
					...record,
					date_to: moment().format('YYYY-MM-DD'),
				},
				(onSuccess) => {
					if (onSuccess) {
						cb && cb(onSuccess)
						message.success(t('billing.customer-services.finished'))
					}
				},
			),
		)
	}

  const regex = /\d+-unit_count/

	const dispatchUpgradeChildren = (values, parent_id) => {
    const unitKeys = Object.keys(values).filter((key) => regex.test(key))
    const serviceIds = unitKeys.map((key) => Number(key.split('-')[0]))
    const prodIds = unitKeys.map((key) => Number(key.split('-')[1]))
    const unitValues = unitKeys.map((key) => values[key])

    serviceIds.forEach((id, index) => {
      unitValues[index] && parseInt(unitValues[index]) > 0 &&
      dispatch(
        createCustomerService(
          {
            parent_id,
            customer_id: values.customer_id,
            product_id: prodIds[index],
            unit_count: unitValues[index],
            name: `${values.name} - ${products?.find((v) => v.id === prodIds[index])?.name}`,
            description: values.description,
            internal_note: values.internal_note,
            date_from: values.billable? moment(values.date_from).add(1,'days').format('YYYY-MM-DD') : '',
            date_to: values.date_to ? values.date_to.format('YYYY-MM-DD') : '',
            billable: values.billable ? 1 : 0
          },
          (isSuccess: boolean) => {
            if (isSuccess) {
              message.success(t('billing.customer-services.child.updated'))
            }
          },
        ),
      )
      //delete for zero child values
      unitValues[index] && !unitKeys[index].includes('undefined') && parseInt(unitValues[index]) === 0 &&
        dispatch(deleteCustomerService(id))
    })
    setModalVisible(false)
  }

	const upgrade = (record: UpdateCustomerServiceParams) => {
    if (record.children !== null) {
      dispatch(
        createCustomerService(
          {
            parent_id: record.parent_id,
            customer_id: record.customer_id,
            product_id: record.product_id,
            name: record.name,
            description: record.description,
            internal_note: record.internal_note,
            unit_count: Number(record.unit_count),
            previous_id: dataToUpdate?.id, // make UPGRADE
            date_from: moment(record.date_from).add(1, 'days').format('YYYY-MM-DD'),
            billable: record.billable ? 1 : 0
          },
          (isSuccess, responseId) => {
            if (isSuccess) {
              message.success(t('billing.customer-services.upgraded'))
              dispatchUpgradeChildren(record, responseId)
            }
          },
        ),
      )
    }
    else {
      dispatch(
        createCustomerService(
          {
            customer_id: record.customer_id,
            product_id: record.product_id,
            name: record.name,
            unit_count: Number(record.unit_count),
            previous_id: dataToUpdate?.id, // make UPGRADE
            parent_id: record.parent_id,
            date_from: moment(record.date_from).add(1, 'days').format('YYYY-MM-DD'),
          },
          (isSuccess) => {
            if (isSuccess) {
              message.success(t('billing.customer-services.upgraded'))
              setModalVisible && setModalVisible(false)
            }
          },
        ),
      )
    }

	}

	const onUpgrade = (record: UpdateCustomerServiceParams): void => {
		// if (dataToUpdate && !dataToUpdate?.date_to) {
		// 	onFinish(dataToUpdate, (isOk) => isOk && upgrade(record))
		// } else {
		// 	upgrade(record)
		// }
    upgrade(record)
	}

	const renderFilterExpand = (
		<Space>
			<RangeFilter onSelect={(v) => setRange(v)} periods={filterPeriods} />

			<Button
				loading={!customerservices}
				onClick={() => {
					expandedTableRows?.length
						? setExpandedTableRows([])
						: setExpandedTableRows(
								convertToTree(customerservices)
									.filter((service: CustomerServiceDetails) => service.children !== null)
									.map((service: CustomerServiceDetails) => service.id),
						  )
				}}>
				<ExpandOutlined />{' '}
				{expandedTableRows?.length ? t('billing.product.collapse_all') : t('billing.product.expand_all')}
			</Button>
		</Space>
	)

	return (
	  <>
      {
        (isCustomerServiceLoading || isCustomerLoading) && <Spin />
      }
      {
        !isCustomerServiceLoading && !isCustomerLoading && customer != undefined &&
        <div className='CustomerServicePage'>
            <PageHeader
                title={
                  <>
                    <CustomerServiceOutlined /> {customer?.company?.name}{' '}
                  </>
                }
                className='CustomerServicePageHeader'
                onBack={() => props.history.goBack()}
            />

          {customer && (
            <CustomerInfo
              setModalVisible={openServiceDlg}
              setOneTimeModalVisible={openOTPDlg}
              customer={customer}
              pricelist={pricelist[customer_id]}
              customer_id={customer_id}
              FilterComponent={renderFilterExpand}
              settings={settings}
            />
          )}
            <CustomerServiceTable
                onFinish={onFinish}
                onDelete={onDelete}
                onUpgrade={onUpgrade}
                range={range}
                setDataToCreate={setDataToCreate}
                setDataToUpdate={setDataToUpdate}
                setActionType={setActionType}
                setModalVisible={setModalVisible}
                setOneTimeModalVisible={setOneTimeModalVisible}
                setExpandedTableRows={setExpandedTableRows}
                expandedTableRows={expandedTableRows}
            />
            <Modal
                destroyOnClose={true}
                style={{top: 20, width: 'auto', minWidth: '700px'}}
                title={
                  <>
                    <CustomerServiceOutlined />{' '}
                    {dataToUpdate ? t('billing.customer-services.update_title') : t('billing.customer-services.create_title')}
                  </>
                }
                visible={isModalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}>
                <CustomerServiceForm
                    setModalVisible={setModalVisible}
                    products={products}
                    customer={customer}
                    dataToUpdate={dataToUpdate}
                    dataToCreate={dataToCreate}
                    customerservices={customerservices}
                    actionType={actionType}
                    onUpgrade={onUpgrade}
					settings={settings}
                />
            </Modal>
            <Modal
                destroyOnClose={true}
                style={{top: 20, width: 'auto', minWidth: '700px'}}
                title={
                  <>
                    <CustomerServiceOutlined />{' '}
                    {dataToUpdate
                      ? t('billing.customer-services.onetime_update_title')
                      : t('billing.customer-services.onetime_create_title')}
                  </>
                }
                visible={isOneTimeModalVisible}
                onCancel={() => setOneTimeModalVisible(false)}
                footer={null}>
                <CustomerServiceOneTimeForm setModalVisible={setOneTimeModalVisible} dataToUpdate={dataToUpdate} />
            </Modal>
        </div>
      }
      {
        !isCustomerServiceLoading && !isCustomerLoading && customer === undefined &&
        <Space style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{textAlign: 'center'}}>
                <h1 style={{color: '#ff4d4f'}}>{t('not_found')}</h1>
                <div>
                    <Link to='/billing/customer'>
                      {t('back')}
                    </Link>
                </div>
            </div>
        </Space>
      }
    </>
	)
}

export default CustomerServicePage
