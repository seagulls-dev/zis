import React, {useEffect, useState} from 'react'
import {Col, DatePicker, Form, Input, message, Row, Select, Space, Tooltip, TreeSelect} from 'antd'
import {useForm} from 'antd/lib/form/Form'
import {labelTopLayout} from 'helpers/layoutHelpers'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {Store} from 'antd/lib/form/interface'
import createCustomerService from 'pages/billing/customerservice/actions/createCustomerService'
import updateCustomerService from 'pages/billing/customerservice/actions/updateCustomerService'
import localeCS from 'antd/es/date-picker/locale/cs_CZ'
import localeEN from 'antd/es/date-picker/locale/en_US'
import TextArea from 'antd/lib/input/TextArea'
import {CustomerServiceDetails, CreateOneTimeProductParams, UpdateCustomerServiceParams} from 'pages/billing/customerservice/models'
import {convertToTree} from 'helpers/arrayHelpers'
import {getLanguage} from 'helpers/langHelpers'
import {ProductDetails} from 'pages/billing/product/models'
import './CustomerServiceForm.scss'
import {InfoCircleOutlined} from '@ant-design/icons'
import CustomerServiceChildrensTree from 'components/CustomerServiceProductsTree/CustomerServiceChildrensTree'
import Button from 'antd-button-color'
import {AppState} from 'common/models'
import getCurrentPricelist from 'pages/billing/pricelist/actions/getCurrentPricelist'
import getProductPricesByPricelist from 'pages/billing/productprice/actions/getProductPricesByPricelist'
import {PricelistDetails} from 'pages/billing/pricelist/models'
import {ProductPriceDetails} from 'pages/billing/productprice/models'
import moment from 'moment'
import createOneTimeProduct from '../actions/createOneTimeProduct'
import deleteCustomerService from "../actions/deleteCustomerService";

interface Props {
	setModalVisible?: (param: boolean) => void
	dataToUpdate?: CustomerServiceDetails
}

const {Option} = Select
const {Item} = Form

const CustomerServiceOneTimeForm = ({setModalVisible, dataToUpdate}: Props) => {
	const inputRef = React.useRef<any>(null)
	const [form] = useForm()
	const {t} = useTranslation()
	const dispatch = useDispatch()

	const [selectedProduct, setSelectedProduct] = useState<ProductDetails>()
	const [selectedParentService, setSelectedParentService] = useState<CustomerServiceDetails[]>()

	const pricelist = useSelector((state: AppState) => state.pricelist)

	const productprice = useSelector((state: AppState) => state.productprice)
	const {customer} = useSelector((state: AppState) => state.customer)
	const {products} = useSelector((state: AppState) => state.product)
	const {customerservices} = useSelector((state: AppState) => state.customerservice)
  const { settings } = useSelector((state : AppState) => state.setting)

  const [priceRound, setPriceRound] = useState<string>()

	const [customerPrice, setCustomerPrice] = useState<PricelistDetails>()
	const [customerPriceId, setCustomerPriceId] = useState<number>()
	const [parentPriceId, setParentPriceId] = useState<number>()

	const [filteredProducts, setFilteredProducts] = useState<ProductPriceDetails[]>()

	useEffect(() => {
		if (customer && pricelist) {
			const customerPriceList = pricelist[customer.id]

			setCustomerPrice(customerPriceList)
			setCustomerPriceId(customerPriceList.id)

			// setParentPriceId(pricelist[customerPriceList.parent_id]?.id)
      setParentPriceId(customerPriceList.parent_id)
      const format = settings?.find(item => item.name === 'price_rounding')
      setPriceRound(format?.value)
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
			const currentPriceProducts = productprice[customerPriceId]
			const parentPriceProducts = productprice[parentPriceId]

			if (parentPriceProducts) {
				// const filtered = parentPriceProducts
				// 	.filter((parentProd) =>
				// 		currentPriceProducts.every((currProd) => parentProd.product_id !== currProd.product_id),
				// 	)
				// 	.concat(currentPriceProducts)
        //
				// filtered && setFilteredProducts(filtered)
        const filtered = parentPriceProducts.filter(item => products?.some(product => (product.id === item.product_id && product.parent_id === null)))
        setFilteredProducts(filtered)
			}
		}
	}, [productprice, parentPriceId, customerPriceId])

  useEffect(() => {
    setSelectedProduct(products?.find((i) => i.id === dataToUpdate?.product_id))
  },[products, dataToUpdate])

	useEffect(() => {
		form.getFieldValue('parent_id') &&
			setSelectedParentService(customerservices?.filter((v) => v.id === form.getFieldValue('parent_id')))
	}, [customerservices, form])

    const [dateFormat, setDateFormat] = useState<string>()

    useEffect(() => {
        const format = settings?.find(item => item.name === 'date_format')
        setDateFormat(format?.value)
    },[settings])


    const regex = /[0-9]-unit_count/

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
							date_from: moment(values.date_from).format(dateFormat),
							date_to: values.date_to ? moment(values.date_to).format(dateFormat) : '',
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
              date_from: moment(values.date_from).format(dateFormat),
              date_to: values.date_to ? moment(values.date_to).format(dateFormat) : '',
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
        createOneTimeProduct({
          parent_id : dataToUpdate?.id,
          customer_id: values.customer_id,
          product_id: prodIds[index],
          unit_count: unitValues[index],
          name: `${values.name} - ${products?.find((v) => v.id === prodIds[index])?.name}`,
          description: values.description,
          internal_note: values.internal_note,
          date_from: moment(values.date_from).format(dateFormat),
          unit_price: values.unit_price*100,
        }, isSuccess => {
          if (isSuccess) {
            message.success(t('billing.customer-services.child.updated'))
          }
        })
      )
    })
    setModalVisible && setModalVisible(false)
  }

	const onFormSubmit = (values: Store) => {
	  if (dataToUpdate) {
      message.info(t('billing.customer-services.disable_billed_from'))
      dispatch(updateCustomerService(
        {
          id: dataToUpdate.id,
          customer_id: values.customer_id,
          name: values.name,
          parent_id: selectedProduct?.parent_id,
          previous_id: values.previous_id,
          product_id: values.product_id,
          unit_count: values.unit_count,
          unit_price: values.unit_price*100,
          description: values.description,
          internal_note: values.internal_note,
          date_from: moment(values.date_from).format(dateFormat),
        },
        (isSuccess: boolean) => {
          if (isSuccess) {
            message.success(t('billing.customer-services.updated'))
            dispatchChildrensUpdate(values)
          }
        }
      ))
    }
	  else {
      dispatch(
        createOneTimeProduct(
          {
            customer_id: values.customer_id,
            product_id: values.product_id,
            name: values.name,
            unit_count: values.unit_count,
            unit_price: values.unit_price*100,
              date_from: moment(values.date_from).format(dateFormat),
            description: values.description,
            internal_note: values.internal_note
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

  useEffect(() => {
    form.getFieldValue('parent_id') &&
    setSelectedParentService(customerservices?.filter((v) => v.id === form.getFieldValue('parent_id')))
  }, [customerservices, form])

  const handleFormatter = e => {
    const value = priceRound && parseFloat(e.target.value).toFixed(parseInt(priceRound))
    form.setFieldsValue({unit_price: value})
  }

	return (
		<>
      {
        priceRound &&
        <Form
          {...labelTopLayout}
          className='CustomerServiceForm'
          onFinish={onFormSubmit}
          initialValues={
            dataToUpdate
              ? {...dataToUpdate, date_from: moment(dataToUpdate.date_from), unit_price: (dataToUpdate.unit_price / 100).toFixed(parseInt(priceRound)) }
              : {date_from: moment(), customer_id: customer?.id, unit_count: 1}
          }
          form={form}
          autoComplete='off'>
            <Item
                style={{display: 'none'}}
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

            <Col span={12} style={{display: 'none'}}>
                <Item name='parent_id' label={t('billing.customer-services.parent_id')}>
                    <TreeSelect
                        allowClear
                        treeData={convertToTree(customerservices)}
                        treeDefaultExpandAll
                        onChange={(v) => v === undefined && setSelectedParentService(undefined)}
                        onSelect={(value) => setSelectedParentService(customerservices?.filter((v) => v.id === value))}
                    />
                </Item>
            </Col>

            <Row gutter={16}>
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
                              label: item?.name,
                              value: item.id,
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
                        <Input autoComplete='new-password' />
                    </Item>
                </Col>

                <Col span={12}>
                    <Item
                        name='unit_count'
                        label={t('billing.customer-services.unit_count')}
                        rules={[{required: true, message: t('billing.customer-services.error.unit_count')}]}>
                        <Input type='number' min={0} style={{width: '100%'}} suffix={selectedProduct?.unit} />
                    </Item>
                </Col>

                <Col span={12}>
                    <Item
                        name='date_from'
                        label={t('billing.customer-services.date')}
                        rules={[{required: true, message: t('billing.customer-services.error.date_from')}]}>
                        <DatePicker
                            style={{width: '100%'}}
                            locale={getLanguage() === 'cs' ? localeCS : localeEN}
                            format='DD.MM.YYYY'
                        />
                    </Item>
                </Col>

                <Col span={12}>
                    <Item name='unit_price' label={t('billing.customer-services.price')} rules={[{required: true}]} hasFeedback>
                        <Input type='number' ref={inputRef} suffix={customer?.billing_currency} min={0} onBlur={handleFormatter} />
                    </Item>
                </Col>

              {selectedProduct?.parent_id === null && (
                <Col span={24}>
                  <CustomerServiceChildrensTree products={products} selectedProduct={selectedProduct} form={form} dataToUpdate={dataToUpdate} />
                </Col>
              )}
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
                </Space>
            </Item>
        </Form>
      }
    </>
	)
}

export default CustomerServiceOneTimeForm
