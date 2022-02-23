import React, {useEffect, useState} from 'react'
import {Button, DatePicker, Form, Input, message, Select} from 'antd'
import {useForm} from 'antd/lib/form/Form'
import {getLanguage} from 'helpers/langHelpers'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import createPricelist from 'pages/billing/pricelist/actions/createPricelist'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {Store} from 'antd/lib/form/interface'
import localeCS from 'antd/es/date-picker/locale/cs_CZ'
import localeEN from 'antd/es/date-picker/locale/en_US'
import {UpdatePricelistParams, PricelistDetails} from 'pages/billing/pricelist/models'
import moment from 'moment'
import updatePricelist from 'pages/billing/pricelist/actions/updatePricelist'
import {CustomerDetails} from 'pages/billing/customer/models'
import {AppState} from 'common/models'
import getCurrencies from 'components/SelectCurrencies/actions/getCurrencies'
import {SelectValue} from 'antd/lib/select'

interface Props {
	dataToUpdate?: UpdatePricelistParams
	setModalVisible?: (param: boolean) => void
	customers?: CustomerDetails[]
	pricelists?: PricelistDetails[]
}

const {Option} = Select
const {Item} = Form

const PricelistForm = ({dataToUpdate, setModalVisible, customers, pricelists}: Props) => {
	const [form] = useForm()
	const [, forceUpdate] = useState()
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [selectedCustomer, setSelectedCustomer] = useState<SelectValue>()
	const [disabledDate, setDisabledDate] = useState<moment.Moment>()

	const {currencies} = useSelector((state: AppState) => state.currencies)

	const customerPrices = pricelists?.filter((price) => price.customer_id === selectedCustomer)
	const rootPrices = pricelists?.filter((price) => price.parent_id === null)

	useEffect(() => {
		forceUpdate({})
	}, [])

	useEffect(() => {
		!currencies && dispatch(getCurrencies())
		//eslint-disable-next-line
	}, [])

	useEffect(() => {
		const customer = customers?.find((customer) => customer.id === selectedCustomer)
		const hasActivePrice = customerPrices?.find((price) => price.valid_to === null)
		const inactivePriceDates = customerPrices?.map((price) =>
			price.valid_to !== null ? moment(price.valid_to) : moment(),
		)
		const maxDate = inactivePriceDates && moment.max(inactivePriceDates).subtract(1, 'day')
		setDisabledDate(maxDate)

		if (hasActivePrice) {
			form.setFields([{name: 'customer_id', errors: [t('billing.pricelist.error.hasActivePrice')]}])
		} else {
			customer &&
				form.setFieldsValue({
					currency: customer.billing_currency,
					name: `${customer.company?.name} ${customer.billing_currency}`,
					valid_from: moment(maxDate).add(1, 'day'),
					parent_id: customer.billing_currency === 'CZK' ? 1 : 2,
				})
		}
		//eslint-disable-next-line
	}, [selectedCustomer])

	const onFormSubmit = (values: Store) => {
		dataToUpdate
			? dispatch(
					updatePricelist(
						{
							id: dataToUpdate.id,
							name: values.name,
							description: values.description,
							valid_from: values.valid_from.format('YYYY-MM-DD'),
							valid_to: values.valid_to ? values.valid_to.format('YYYY-MM-DD') : '',
							customer_id: values.customer_id,
							currency: values.currency,
							parent_id: values.parent_id,
						},
						(isSuccess: boolean) => {
							if (isSuccess) {
								setModalVisible && setModalVisible(false)
								message.info(t('billing.pricelist.updated'))
							}
						},
					),
			  )
			: dispatch(
					createPricelist(
						{
							name: values.name,
							description: values.description,
							valid_from: values.valid_from.format('YYYY-MM-DD'),
							valid_to: values.valid_to ? values.valid_to.format('YYYY-MM-DD') : '',
							customer_id: values.customer_id,
							currency: values.currency,
							parent_id: values.parent_id,
						},
						(isSuccess: boolean) => {
							if (isSuccess) {
								setModalVisible && setModalVisible(false)
								message.info(t('billing.pricelist.created'))
							}
						},
					),
			  )
	}

	return (
		<Form
			{...formItemLayout}
			onFinish={onFormSubmit}
			form={form}
			initialValues={{
				...dataToUpdate,
				valid_from: dataToUpdate?.valid_from ? moment(dataToUpdate?.valid_from) : '',
				valid_to: dataToUpdate?.valid_to ? moment(dataToUpdate?.valid_to) : '',
			}}>
			<Item
				name='customer_id'
				rules={[{required: true, message: t('billing.pricelist.error.customer_id')}]}
				label={t('billing.pricelist.customer_id')}
				hasFeedback>
				<Select
					showSearch
					allowClear
					optionFilterProp='label'
					disabled={!!dataToUpdate}
					onChange={(value) => setSelectedCustomer(value)}
					filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
					{customers &&
						customers.map((i) => (
							<Option key={i.id} value={i.id}>
								{i.company?.name}
							</Option>
						))}
				</Select>
			</Item>

			<Item
				name='parent_id'
				rules={[{required: true, message: t('billing.pricelist.error.parent_id')}]}
				label={t('billing.pricelist.parent_id')}
				hasFeedback>
				<Select disabled>
					{rootPrices &&
						rootPrices.map((i) => (
							<Option key={i.id} value={i.id}>
								{i.name}
							</Option>
						))}
				</Select>
			</Item>

			<Item
				name='name'
				rules={[{required: true, message: t('billing.pricelist.error.name')}]}
				label={t('billing.pricelist.name')}
				hasFeedback>
				<Input />
			</Item>

			<Item
				name='currency'
				rules={[{required: true, message: t('billing.pricelist.error.currency')}]}
				label={t('billing.pricelist.currency')}
				hasFeedback>
				<Select
					showSearch
					allowClear
					optionFilterProp='label'
					disabled
					options={currencies?.map((currency) => ({label: currency, value: currency}))}
				/>
			</Item>

			<Item name='description' label={t('billing.pricelist.description')} hasFeedback>
				<Input />
			</Item>

			<Item
				name='valid_from'
				rules={[{required: true, message: t('billing.pricelist.error.valid_from')}]}
				label={t('billing.pricelist.valid_from')}
				hasFeedback>
				<DatePicker
					disabled={!!dataToUpdate}
					disabledDate={(current: moment.Moment) => current && current < moment(disabledDate).endOf('day')}
					style={{width: '100%'}}
					locale={getLanguage() === 'cs' ? localeCS : localeEN}
					format='DD.MM.YYYY'
				/>
			</Item>

			<Item name='valid_to' label={t('billing.pricelist.valid_to')}>
				<DatePicker style={{width: '100%'}} locale={getLanguage() === 'cs' ? localeCS : localeEN} format='DD.MM.YYYY' />
			</Item>

			<Item {...tailLayout} shouldUpdate>
				{() => (
					<Button
						type='primary'
						htmlType='submit'
						className='login-form-button'
						disabled={!form.isFieldsTouched() || !!form.getFieldsError().filter(({errors}) => errors.length).length}>
						{dataToUpdate ? t('billing.pricelist.update') : t('billing.pricelist.create')}
					</Button>
				)}
			</Item>
		</Form>
	)
}

export default PricelistForm
