import './ProductPriceForm.scss'
import React, {useEffect} from 'react'
import {Button, Form, Input, message, Radio, Select, Space, TreeSelect} from 'antd'
import {useForm} from 'antd/lib/form/Form'
import {AppState} from 'common/models'
import {formItemLayout, fullWidthLayout, tailLayout} from 'helpers/layoutHelpers'
import createProductPrice from 'pages/billing/productprice/actions/createProductPrice'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {Store} from 'antd/lib/form/interface'
import {ProductPriceDetails, UpdateProductPriceParams} from 'pages/billing/productprice/models'
import updateProductPrice from 'pages/billing/productprice/actions/updateProductPrice'
import {PricelistDetails} from 'pages/billing/pricelist/models'
import {ProductDetails} from 'pages/billing/product/models'
import {MinusCircleOutlined, PlusCircleOutlined} from '@ant-design/icons'
import {useState} from 'react'
import deleteProductPriceRange from 'pages/billing/productpricerange/actions/deleteProductPriceRange'
import createProductPriceRange from 'pages/billing/productpricerange/actions/createProductPriceRange'
import updateProductPriceRange from 'pages/billing/productpricerange/actions/updateProductPriceRange'
import {convertToTree, disableExistedValues} from 'helpers/arrayHelpers'
import InputNumber from 'antd/lib/input-number'

interface Props {
	dataToUpdate?: UpdateProductPriceParams
	setModalVisible: (param: boolean) => void
	pricelists?: PricelistDetails[]
	pricelist?: PricelistDetails
	products?: ProductDetails[]
	selectedPricelistData?: ProductPriceDetails[]
}

const {Option} = Select
const {Item} = Form

const ProductPriceForm = ({
	dataToUpdate,
	setModalVisible,
	pricelist,
	pricelists,
	products,
	selectedPricelistData,
}: Props) => {
	const [isRangeVisible, setRangeVisible] = useState<boolean>()
	const [form] = useForm()
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [selectedProduct, setSelectedProduct] = useState<ProductDetails>()
	const {productpriceranges, isSaving} = useSelector((state: AppState) => state.productpricerange)
  const { settings } = useSelector((state : AppState) => state.setting)

  const [priceRound, setPriceRound] = useState<string>()

	useEffect(() => {
		setRangeVisible(dataToUpdate?.calculation_type === 'range')
    const format = settings?.find(item => item.name === 'price_rounding')
    setPriceRound(format?.value)
		//eslint-disable-next-line
	}, [])

	useEffect(() => {
		dataToUpdate && setSelectedProduct(products?.find((i) => i.id === dataToUpdate.product_id))
	}, [dataToUpdate, products])

	const onFormSubmit = (values: Store) => {
		const rangeObjectsToDelete =
			values.ranges && productpriceranges?.filter((e) => !values.ranges.find((a) => e.id === a.id))
		const rangeObjectsToUpdate =
			values.ranges &&
			values.ranges.filter((x) => !productpriceranges?.includes(x) && x.id).map((v) => ({...v, price: v.price * 100}))
		const rangeObjectsToCreate =
			values.ranges &&
			values.ranges.filter((x) => !productpriceranges?.includes(x) && !x.id).map((v) => ({...v, price: v.price * 100}))

		dataToUpdate
			? dispatch(
					updateProductPrice(
						{
							id: dataToUpdate.id,
							name: values.name,
							// product_id: values.product_id,
							// pricelist_id: values.pricelist_id,
							calculation_type: values.calculation_type,
							price: values.price * 100,
						},
						(isSuccess: boolean) => {
							if (isSuccess) {
								if (values.calculation_type === 'range') {
									rangeObjectsToDelete?.length &&
										rangeObjectsToDelete.map((i) => dispatch(deleteProductPriceRange(i.id)))
									rangeObjectsToUpdate?.length && rangeObjectsToUpdate.map((i) => dispatch(updateProductPriceRange(i)))
									rangeObjectsToCreate?.length && rangeObjectsToCreate.map((i) => dispatch(createProductPriceRange(i)))
									setModalVisible(false)
									message.info(t('billing.productprice.updated'))
								} else {
									setModalVisible(false)
								}
							}
						},
					),
			  )
			: dispatch(
					createProductPrice(
						{
							name: values.name,
							product_id: values.product_id,
							pricelist_id: values.pricelist_id,
							calculation_type: values.calculation_type,
							price: values.price * 100,
						},
						(isSuccess: boolean, responseId?: number) => {
							if (isSuccess) {
								rangeObjectsToCreate?.length &&
									rangeObjectsToCreate.map((i) =>
										dispatch(createProductPriceRange({...i, product_price_id: responseId})),
									)
								setModalVisible(false)
								message.info(t('billing.productprice.created'))
							}
						},
					),
			  )
	}

  const handleFormatter = e => {
    const value = priceRound && parseFloat(e.target.value).toFixed(parseInt(priceRound))
    form.setFieldsValue({price: value})
  }

	return (
		<>
      {
        priceRound &&
        <Form
          {...formItemLayout}
          onFinish={onFormSubmit}
          form={form}
          className='ProductPriceForm'
          id='ProductPriceFormId'
          initialValues={{
            pricelist_id: pricelist && pricelist.id,
            ...dataToUpdate,
            price: (dataToUpdate && (dataToUpdate.price / 100).toFixed(parseInt(priceRound))),
            ranges:
              productpriceranges?.length && dataToUpdate
                ? productpriceranges
                  .map((v) => ({...v, price: v.price / 100}))
                  .sort((a, b) => a.volume_from - b.volume_from)
                : [{product_price_id: dataToUpdate?.id}],
          }}>
            <Item
                name='pricelist_id'
                rules={[{required: true, message: t('billing.productprice.error.pricelist_id')}]}
                label={t('billing.productprice.pricelist_id')}
                hasFeedback>
                <Select
                    showSearch
                    optionFilterProp='children'
                    filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    disabled={true}>
                  {pricelists &&
                  pricelists.map((i: PricelistDetails) => (
                    <Option key={i.id} value={i.id}>
                      {i.name}
                    </Option>
                  ))}
                </Select>
            </Item>

            <Item
                name='product_id'
                rules={[{required: true, message: t('billing.productprice.error.product_id')}]}
                label={t('billing.productprice.product_id')}
                hasFeedback>
                <TreeSelect
                    showSearch
                    allowClear
                    filterTreeNode={(search, item) => {
                      return item?.name?.toLowerCase().indexOf(search.toLowerCase()) >= 0
                    }}
                    virtual={false}
                    disabled={!!dataToUpdate}
                    treeData={convertToTree(disableExistedValues(products, selectedPricelistData))}
                    onChange={(v) => {
                      let prod = products?.find((i) => i.id === v)
                      setSelectedProduct(prod)
                      form.setFieldsValue({name: prod?.name})
                    }}
                    treeDefaultExpandAll
                />
            </Item>

            <Item
                name='name'
                rules={[{required: true, message: t('billing.productprice.error.name')}]}
                label={t('billing.productprice.name')}
                hasFeedback>
                <Input />
            </Item>

            <Item
                name='calculation_type'
                label={t('billing.productprice.calculation_type')}
                rules={[{required: true, message: t('billing.productprice.error.calculation_type')}]}
                hasFeedback>
                <Radio.Group
                    options={[
                      {label: 'fix', value: 'fix'},
                      {label: 'unit', value: 'unit'},
                      {label: 'range', value: 'range'},
                    ]}
                    disabled={dataToUpdate?.calculation_type === 'range'}
                    onChange={(e) => (e.target.value === 'range' ? setRangeVisible(true) : setRangeVisible(false))}
                    optionType='button'
                    buttonStyle='solid'
                    className='ProductPriceForm_buttongroup'
                />
            </Item>

          {isRangeVisible && (
            <Form.List name='ranges'>
              {(fields, {add, remove}) => (
                <>
                  <Item className='RangeWrapper' {...fullWidthLayout}>
                    {fields.map((field, index) => (
                      <Space key={field.key} align='baseline'>
                        <Item
                          {...field}
                          name={[field.name, 'id']}
                          fieldKey={[field.fieldKey, 'id']}
                          style={{display: 'none'}}>
                          <InputNumber type='hidden' />
                        </Item>

                        <Item
                          {...field}
                          name={[field.name, 'product_price_id']}
                          fieldKey={[field.fieldKey, 'product_price_id']}
                          style={{display: 'none'}}>
                          <InputNumber type='hidden' />
                        </Item>

                        <Item
                          {...field}
                          label={t('billing.productprice.from')}
                          name={[field.name, 'volume_from']}
                          fieldKey={[field.fieldKey, 'volume_from']}
                          rules={[{required: true, message: 'From'}]}>
                          <InputNumber
                            min={0}
                            max={index === 0 ? 0 : undefined}
                            placeholder='From'
                            style={{width: 'auto'}}
                          />
                        </Item>
                        <Button className='btnPrefix' disabled>
                          {selectedProduct ? selectedProduct.unit : ' '}
                        </Button>

                        <Item
                          {...field}
                          label={t('billing.productprice.price')}
                          name={[field.name, 'price']}
                          fieldKey={[field.fieldKey, 'price']}
                          rules={[{required: true, message: 'Price'}]}>
                          <InputNumber
                            type='number'
                            min={0}
                            step={0.1}
                            placeholder={t('billing.productprice.price')}
                            style={{width: 'auto'}}
                          />
                        </Item>
                        <Button className='btnPrefix' disabled>
                          {pricelist ? pricelist.currency : ''}
                        </Button>

                        <Item key={`button-${field.name}`} {...fullWidthLayout}>
                          <Button
                            type='primary'
                            disabled={index === 0}
                            onClick={() => {
                              remove(field.name)
                            }}>
                            <MinusCircleOutlined />
                          </Button>
                        </Item>
                      </Space>
                    ))}
                  </Item>

                  <Item className='ProductPriceForm_space_button-add'>
                    <Button
                      type='primary'
                      style={{background: '#2d9259', border: '#2d9259'}}
                      onClick={() => {
                        add({product_price_id: dataToUpdate?.id})
                      }}
                      block>
                      <PlusCircleOutlined /> Add range
                    </Button>
                  </Item>
                </>
              )}
            </Form.List>
          )}

            <Item
                name='price'
                rules={[{required: true, message: t('billing.productprice.error.price')}]}
                label={t('billing.productprice.price')}
                className='totalPrice'>
                <Input type='number' min={0} step={0.1} addonAfter={pricelist ? pricelist.currency : ''} onBlur={handleFormatter}/>
            </Item>
          {/* <Button className='btnPrefix' disabled>{pricelist ? pricelist.currency : ''}</Button> */}

            <Item {...tailLayout}>
                <Button loading={isSaving} type='primary' htmlType='submit' className='login-form-button'>
                  {dataToUpdate ? t('billing.productprice.update') : t('billing.productprice.add')}
                </Button>
            </Item>
        </Form>
      }
    </>
	)
}

export default ProductPriceForm
