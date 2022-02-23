import React, {useEffect, useState} from 'react'
import {Col, DatePicker, Form, Input, message, Row, Select, Space, Switch, Tooltip, TreeSelect} from 'antd'
import {useForm} from 'antd/lib/form/Form'
import {labelTopLayout} from 'helpers/layoutHelpers'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {Store} from 'antd/lib/form/interface'
import createCustomerService from 'pages/billing/customerservice/actions/createCustomerService'
import localeCS from 'antd/es/date-picker/locale/cs_CZ'
import localeEN from 'antd/es/date-picker/locale/en_US'
import TextArea from 'antd/lib/input/TextArea'
import {CustomerServiceDetails, UpdateCustomerServiceParams} from 'pages/billing/customerservice/models'
import {convertToTree} from 'helpers/arrayHelpers'
import {getLanguage} from 'helpers/langHelpers'
import updateCustomerService from 'pages/billing/customerservice/actions/updateCustomerService'
import deleteCustomerService from 'pages/billing/customerservice/actions/deleteCustomerService'
import {CustomerDetails} from 'pages/billing/customer/models'
import {PrependedParentIdCreateParams, ProductDetails} from 'pages/billing/product/models'
import moment from 'moment'
import './CustomerServiceForm.scss'
import {CheckOutlined, CloseOutlined, InfoCircleOutlined, IssuesCloseOutlined} from '@ant-design/icons'
import CustomerServiceChildrensTree from 'components/CustomerServiceProductsTree/CustomerServiceChildrensTree'
import Button from 'antd-button-color'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import {AppState} from 'common/models'
import getProductPricesByPricelist from 'pages/billing/productprice/actions/getProductPricesByPricelist'
import {PricelistDetails} from 'pages/billing/pricelist/models'
import {ProductPriceDetails} from 'pages/billing/productprice/models'
import getPricelist from '../../pricelist/actions/getPricelist'
import getCurrentPricelist from 'pages/billing/pricelist/actions/getCurrentPricelist'
import {SettingsDetails} from "../../../settings/models";

interface Props {
	dataToUpdate?: UpdateCustomerServiceParams
	dataToCreate?: PrependedParentIdCreateParams
	setModalVisible?: (param: boolean) => void
	products?: ProductDetails[]
	customer?: CustomerDetails
	customerservices?: CustomerServiceDetails[]
	actionType?: 'UPDATE' | 'CREATE'
	onUpgrade?: (record: UpdateCustomerServiceParams) => void
	settings?: SettingsDetails[]
}

const {Option} = Select
const {Item} = Form

const CustomerServiceForm = ({
	dataToUpdate,
	dataToCreate,
	setModalVisible,
	products,
	customer,
	customerservices,
	actionType,
	onUpgrade,
								 settings
}: Props) => {
	const inputRef = React.useRef<any>(null)
	const [form] = useForm()
	const {t} = useTranslation()
	const dispatch = useDispatch()

	const [selectedProduct, setSelectedProduct] = useState<ProductDetails>()
	const [selectedParentService, setSelectedParentService] = useState<CustomerServiceDetails[]>()

	const pricelist = useSelector((state: AppState) => state.pricelist)

	const productprice = useSelector((state: AppState) => state.productprice)

	const [customerPrice, setCustomerPrice] = useState<PricelistDetails>()        //customer price list data
	const [customerPriceId, setCustomerPriceId] = useState<number>()              //price list's id
	const [parentPriceId, setParentPriceId] = useState<number>()                  //parent id

	const [filteredProducts, setFilteredProducts] = useState<ProductPriceDetails[]>()

  const [checked, setChecked] = useState(true)
	const [dateFormat, setDateFormat] = useState<string>()

  //get customer price lists, id, parent id
	useEffect(() => {
		if (customer && pricelist) {
			const customerPriceList = pricelist[customer.id]

			setCustomerPrice(customerPriceList)
			setCustomerPriceId(customerPriceList.id)

			setParentPriceId(customerPriceList.parent_id)
      // setParentPriceId(pricelist[customerPriceList.parent_id]?.id)
		}
		//eslint-disable-next-line
	}, [pricelist])

	useEffect(() => {
		customerPriceId && dispatch(getProductPricesByPricelist(customerPriceId))
		parentPriceId && dispatch(getProductPricesByPricelist(parentPriceId))
		//eslint-disable-next-line
	}, [customerPriceId, parentPriceId])

	useEffect(() => {
		if (customerPriceId && parentPriceId) {
      const currentPriceProducts = productprice[customerPriceId]        //not needed
			const parentPriceProducts = productprice[parentPriceId]

			if (parentPriceProducts && currentPriceProducts) {
				// const filtered = parentPriceProducts
				// 	.filter((parentProd) =>
				// 		currentPriceProducts.some((currProd) => parentProd.product_id !== currProd.product_id),
				// 	)
				// 	// .concat(currentPriceProducts)       // ?OTP
        //
				// filtered && setFilteredProducts(filtered)
        const filtered = parentPriceProducts.filter(item => products?.some(product => (product.id === item.product_id && product.parent_id === null)))
        setFilteredProducts(filtered)
			}
		}
	}, [productprice, parentPriceId, customerPriceId])

  useEffect(() => {
		setSelectedProduct(products?.find((i) => i.id === dataToUpdate?.product_id))
    setChecked(dataToUpdate?.billable === 1)
	}, [products, dataToUpdate])

	useEffect(() => {
		form.getFieldValue('parent_id') &&
			setSelectedParentService(customerservices?.filter((v) => v.id === form.getFieldValue('parent_id')))
	}, [customerservices, form])

	useEffect(() => {
		const format = settings?.find(item => item.name === 'date_format')
		setDateFormat(format?.value)
	},[settings])

	const regex = /\d+-unit_count/

	const dispatchChildrensUpdate = (values: Store): void => {
		const unitKeys = Object.keys(values).filter((key) => regex.test(key))
		const serviceIds = unitKeys.map((key) => Number(key.split('-')[0]))
		const prodIds = unitKeys.map((key) => Number(key.split('-')[1]))
		const unitValues = unitKeys.map((key) => values[key])

		serviceIds.forEach((id, index) => {
			let service = customerservices?.find((service) => service.id === id)
      //update for positive unit values
			unitValues[index] && !unitKeys[index].includes('undefined') && parseInt(unitValues[index]) > 0 &&
				dispatch(
					updateCustomerService(
						{
							id,
							name: service ? service.name : 'no-name',
							customer_id: values.customer_id,
							product_id: prodIds[index],
							unit_count: unitValues[index],
							unit_price: 0,
							parent_id: values.id,
              date_from: dataToUpdate?.date_from ? dataToUpdate.date_from : '',
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
      //delete for child items of values are 0
      unitValues[index] && !unitKeys[index].includes('undefined') && parseInt(unitValues[index]) === 0 &&
        dispatch(deleteCustomerService(id))
      //create for new inserted service items
      unitValues[index] && unitKeys[index].includes('undefined') && parseInt(unitValues[index]) > 0 &&
      dispatch(
        createCustomerService({
          parent_id : dataToUpdate?.id,
          customer_id: values.customer_id,
          product_id: prodIds[index],
          unit_count: unitValues[index],
          name: `${values.name} - ${products?.find((v) => v.id === prodIds[index])?.name}`,
          description: values.description,
          internal_note: values.internal_note,
          date_from: dataToUpdate?.date_from ? dataToUpdate.date_from : '',
          date_to: values.date_to ? moment(values.date_to).format(dateFormat) : '',
        }, isSuccess => {
          if (isSuccess) {
            message.success(t('billing.customer-services.child.updated'))
          }
        })
      )
		})
		setModalVisible && setModalVisible(false)
	}

	const dispatchChildrensCreate = (values: Store, parent_id: number): void => {
		const unitKeys = Object.keys(values).filter((key) => regex.test(key))
		const prodIds = unitKeys.map((key) => Number(key.split('-')[1]))
		const unitValues = unitKeys.map((key) => values[key])

		prodIds.forEach((id, index) => {
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
              date_from: values.billable? values.date_from.format('YYYY-MM-DD') : '',
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
		})
		setModalVisible && setModalVisible(false)
	}

	const onFormSubmit = (values: Store) => {
    let parent_id = selectedProduct?.parent_id
    if (parent_id != null) {
      //child product
      parent_id = customerservices?.find(item => item.product_id === selectedProduct?.id)?.parent_id
    }

    if (dataToUpdate && actionType === 'UPDATE') {
      message.info(t('billing.customer-services.disable_billed_from'))
      dispatch(
        updateCustomerService(
          {
            id: dataToUpdate.id,
            customer_id: values.customer_id,
            name: values.name,
            parent_id: selectedProduct?.parent_id,
            previous_id: values.previous_id,
            product_id: values.product_id,
            unit_count: values.unit_count,
            unit_price: 0,
            description: values.description,
            internal_note: values.internal_note,
            date_from: dataToUpdate?.date_from ? dataToUpdate.date_from : '',
            date_to: values.date_to ? values.date_to.format('YYYY-MM-DD') : '',
            billable: values.billable ? 1 : 0
          },
          (isSuccess: boolean) => {
            if (isSuccess) {
              message.success(t('billing.customer-services.updated'))
              dispatchChildrensUpdate(values)
            }
          },
        ),
      )
    }
    else {
      dispatch(
        createCustomerService(
          {
            parent_id: parent_id,
            customer_id: values.customer_id,
            product_id: values.product_id,
            name: values.name,
            description: values.description,
            internal_note: values.internal_note,
            unit_count: values.unit_count,
            date_from: values.billable? values.date_from.format('YYYY-MM-DD') : '',
            date_to: values.date_to ? values.date_to.format('YYYY-MM-DD') : '',
            billable: values.billable ? 1 : 0
          },
          (isSuccess, responseId) => {
            if (isSuccess) {
              message.success(t('billing.customer-services.created'))
              responseId && dispatchChildrensCreate(values, responseId)
            }
          },
        ),
      )
    }
	}

	const handleProductSelect = (v) => {
		setSelectedProduct(products?.find((i) => i.id === v))
		form.setFieldsValue({name: `${products?.find((i) => i.id === v)?.name}`})
		inputRef.current!.focus()
	}

	return (
		<Form
			{...labelTopLayout}
			className='CustomerServiceForm'
			onFinish={onFormSubmit}
			form={form}
			initialValues={{
				...dataToUpdate,
				...dataToCreate,
				date_from: dataToUpdate?.date_from ? moment(dataToUpdate?.date_from) : moment(),
				date_to: dataToUpdate?.date_to ? moment(dataToUpdate?.date_to) : '',
				customer_id: customer && customer.id,
        unit_count: dataToCreate ? 1 : dataToUpdate?.unit_count,
        billable: dataToUpdate?.billable === 1
			}}>
			<Row gutter={16}>
				<Col span={12} style={{display: 'none'}}>
					<Item
						name='customer_id'
						label={t('billing.customer-services.customer_id')}
						rules={[{required: true, message: t('billing.customer-services.error.customer_id')}]}
						hasFeedback>
						<Select disabled>
							{customer && (
								<Option key={customer.id} value={customer.id}>
									{customer.company?.name}
								</Option>
							)}
						</Select>
					</Item>
				</Col>

				<Col span={12} style={{display: 'none'}}>
					<Item name='parent_id' label={t('billing.customer-services.parent_id')}>
						<TreeSelect
							allowClear
							treeData={convertToTree(customerservices)}
							disabled={!!(dataToUpdate || dataToCreate)}
							treeDefaultExpandAll
							onChange={(v) => v === undefined && setSelectedParentService(undefined)}
							onSelect={(value, option) => setSelectedParentService(customerservices?.filter((v) => v.id === value))}
						/>
					</Item>
				</Col>

				<Col span={12} style={{display: 'none'}}>
					<Item
						name='previous_id'
						label={
							<>
								{t('billing.customer-services.previous_id')}
								&nbsp;
								<Tooltip title='Automatically filled when "Date to" is selected. Used for tying previous changes of service.'>
									<InfoCircleOutlined />
								</Tooltip>
							</>
						}>
						<Select disabled>
							{customerservices &&
								customerservices.map((i) => (
									<Option key={i.id} value={i.id}>
										{i.name}
									</Option>
								))}
						</Select>
					</Item>
				</Col>

				<Col span={24}>
					<Item
						name='product_id'
						label={t('billing.customer-services.product_id')}
						rules={[{required: true, message: t('billing.customer-services.error.product_id')}]}
						hasFeedback>
						<Select
							showSearch
							allowClear
							optionFilterProp='label'
							dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
							virtual={false}
							style={{width: '100%'}}
							loading={!filteredProducts}
							options={filteredProducts?.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map((item) => ({
								label: (
									<Row>
										<Col flex='4'>{item.name}</Col>
										<Col flex='1'>
											{item.price / 100} {customerPrice?.currency}
										</Col>
									</Row>
								),
								value: item.product_id,
								key: item.id,
							}))}
							onSelect={handleProductSelect}
						/>
					</Item>
				</Col>

				<Col span={12}>
					<Item
						name='name'
						label={t('billing.customer-services.name')}
						rules={[{required: true, message: t('billing.customer-services.error.name')}]}
						hasFeedback>
						<Input ref={inputRef} autoComplete='new-password' />
					</Item>
				</Col>

				<Col span={12}>
					<Item
						name='unit_count'
						label={t('billing.customer-services.unit_count')}
						rules={[{required: true, message: t('billing.customer-services.error.unit_count')}]}>
						<Input
							type='number'
							min={1}
							style={{width: '100%'}}
							suffix={selectedProduct?.unit}
							disabled={(!!filteredProducts?.find((p) => p.calculation_type === 'fix' && p.product_id === selectedProduct?.id))}
						/>
					</Item>
				</Col>

				{selectedProduct?.parent_id === null && (
					<Col span={24}>
						<CustomerServiceChildrensTree
							products={products}
							dataToUpdate={dataToUpdate}
							selectedProduct={selectedProduct}
							form={form}
						/>
					</Col>
				)}

        <Col span={24}>
          <Item
            name='billable'
            label={t('createUserPage.billable')}
            // initialValue={checked}
            valuePropName='checked'
          >
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
          </Item>
        </Col>

				<Col span={12}>
					<Item
						name='date_from'
						label={t('billing.customer-services.date_from')}
						rules={[{required: checked, message: t('billing.customer-services.error.date_from')}]}
          >
						<DatePicker
							style={{width: '100%'}}
							locale={getLanguage() === 'cs' ? localeCS : localeEN}
							format='DD.MM.YYYY'
              disabled={!checked}
						/>
					</Item>
				</Col>

				<Col span={12}>
					<Item name='date_to' label={t('billing.customer-services.date_to')}>
						<DatePicker
							style={{width: '100%'}}
							locale={getLanguage() === 'cs' ? localeCS : localeEN}
							format='DD.MM.YYYY'
							onChange={() => {
								form.setFieldsValue({previous_id: dataToUpdate?.id})
							}}
              disabled={!checked}
						/>
					</Item>
				</Col>
			</Row>

			<Item name='description' label={t('billing.customer-services.description')}>
				<TextArea />
			</Item>

			<Item name='internal_note' label={t('billing.customer-services.internal_note')}>
				<TextArea />
			</Item>

			<Item>
				<Space size='large'>
					<Button type='primary' htmlType='submit' className='login-form-button'>
						{dataToUpdate ? t('billing.tax.update') : t('billing.tax.create')}
					</Button>

          {
            !dataToCreate &&
            <PopConfirmZis
                onConfirm={() => onUpgrade && dataToUpdate && onUpgrade({...dataToUpdate, ...form.getFieldsValue()})}>
                <Button type='success' className='upgrade-form-button gold'>
                    <IssuesCloseOutlined /> Upgrade
                </Button>
            </PopConfirmZis>
          }

				</Space>
			</Item>
		</Form>
	)
}

export default CustomerServiceForm
