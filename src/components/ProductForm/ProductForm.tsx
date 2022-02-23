import React, {useState, useEffect} from 'react'
import {Button, Form, Input, message, Select} from 'antd'
import {useForm} from 'antd/lib/form/Form'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import createProduct from 'pages/billing/product/actions/createProduct'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {Store} from 'antd/lib/form/interface'
import {UpdateProductParams, PrependedParentIdCreateParams, ProductDetails} from 'pages/billing/product/models'
import updateProduct from 'pages/billing/product/actions/updateProduct'
import {TaxDetails} from 'pages/billing/tax/models'
import {AppState} from 'common/models'
import {ServiceTypeDetails} from 'pages/billing/servicetype/model'
import getProducts from 'pages/billing/product/actions/getProducts'

interface Props {
	dataToUpdate?: UpdateProductParams
	dataToCreate?: PrependedParentIdCreateParams
	setModalVisible?: (param: boolean) => void
	taxes?: TaxDetails[]
	actionType?: 'UPDATE' | 'CREATE'
	servicetypes?: ServiceTypeDetails[]
}

const {Option} = Select
const {Item} = Form

const ProductForm = ({dataToUpdate, dataToCreate, setModalVisible, taxes, actionType, servicetypes}: Props) => {
	const [form] = useForm()
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [selectedParent, setSelectedParent] = useState<ProductDetails>()
	const {isLoading: isProductsLoading, products} = useSelector((state: AppState) => state.product)

	const cze_taxes = taxes?.filter((item: TaxDetails) => item.country === 'CZE')

	const onFormSubmit = (values: Store) => {
		actionType === 'UPDATE' && dataToUpdate
			? dispatch(
					updateProduct(
						{
							id: dataToUpdate.id,
							parent_id: values.parent_id,
							name: values.name,
							service_type_id: values.service_type_id,
							unit: values.unit,
							tax_id: values.tax_id,
							expired: values.expired,
							children: [],
						},
						(isSuccess: boolean) => {
							if (isSuccess) {
								setModalVisible && setModalVisible(false)
								dispatch(getProducts())
								message.info(t('billing.product.updated'))
							}
						},
					),
			  )
			: dispatch(
					createProduct(
						{
							name: values.name,
							parent_id: values.parent_id ? values.parent_id : null,
							service_type_id: values.service_type_id,
							unit: values.unit,
							tax_id: values.tax_id,
							expired: values.expired,
						},
						(isSuccess: boolean) => {
							if (isSuccess) {
								setModalVisible && setModalVisible(false)
								dispatch(getProducts())
								message.info(t('billing.product.created'))
							}
						},
					),
			  )
	}

	const hansleSelectParent = (value: number) => {
		setSelectedParent(products?.find((product) => product.id === value) || undefined)
	}

	useEffect(() => {
		if (selectedParent) {
			const {service_type_id, unit, tax_id, name} = selectedParent
			form.setFieldsValue({service_type_id, unit, tax_id, name: `${name} product`})
		}
		//eslint-disable-next-line
	}, [selectedParent])

	const handleClearParent = () => {
		form.resetFields()
		setSelectedParent(undefined)
	}

	return (
		<Form
			{...formItemLayout}
			onFinish={onFormSubmit}
			form={form}
			initialValues={dataToUpdate ? {...dataToUpdate} : dataToCreate ? {...dataToCreate, expired: 0} : {expired: 0}}>
			<Item name='parent_id' label={t('billing.product.parent_id')}>
				<Select
					showSearch
					allowClear
					onClear={handleClearParent}
					virtual={false}
					optionFilterProp='children'
					loading={isProductsLoading}
					onSelect={hansleSelectParent}>
					{products &&
						products.map((i) => (
							<Option key={i.id} value={i.id}>
								{i.name}
							</Option>
						))}
				</Select>
			</Item>

			<Item
				name='name'
				rules={[{required: true, message: t('billing.product.error.name')}]}
				label={t('billing.product.name')}
				hasFeedback>
				<Input />
			</Item>

			<Item
				name='service_type_id'
				label={t('billing.product.service_type')}
				hasFeedback
				rules={[{required: true, message: t('billing.product.error.service_type_id')}]}>
				<Select showSearch allowClear optionFilterProp='children' disabled={!!selectedParent} virtual={false}>
					{servicetypes &&
						servicetypes.map((i) => (
							<Option value={i.id} key={i.id}>
								{i.name}
							</Option>
						))}
				</Select>
			</Item>

			<Item name='unit' label={t('billing.product.unit')}>
				<Input disabled={!!selectedParent && !!selectedParent.unit} />
			</Item>

			<Item
				name='tax_id'
				label={t('billing.product.tax_id')}
				rules={[{required: true, message: t('billing.product.error.tax_id')}]}>
				<Select allowClear disabled={!!selectedParent}>
					{cze_taxes &&
						cze_taxes.map((i) => (
							<Option key={i.id} value={i.id}>
								{i.rate / 100}%
							</Option>
						))}
				</Select>
			</Item>

			<Item name='expired' hasFeedback label={t('billing.product.expired')}>
				<Select disabled={!dataToUpdate}>
					<Option key={0} value={0}>
						No
					</Option>
					<Option key={1} value={1}>
						Yes
					</Option>
				</Select>
			</Item>

			<Item {...tailLayout}>
				<Button type='primary' htmlType='submit' className='login-form-button'>
					{actionType === 'UPDATE' ? t('billing.tax.update') : t('billing.tax.create')}
				</Button>
			</Item>
		</Form>
	)
}

export default ProductForm
