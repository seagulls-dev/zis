import './Bill.scss'
import React, {Dispatch, SetStateAction, useState} from 'react'
import {Form, Card, InputNumber, DatePicker, Divider, Skeleton} from 'antd'
import {Select} from 'antd'
import {useTranslation} from 'react-i18next'
import {CompanyDetails} from 'pages/company/models'
import Highlighter from 'react-highlight-words'
import {Input} from 'antd'
import {BillDetails} from 'pages/billing/bill/models'
import {CURRENCY_ENUM} from 'common/enums'
import TextArea from "antd/es/input/TextArea";

interface Props {
	companies?: CompanyDetails[]
	isCompaniesLoading: boolean
	setSelectedCompany?: Dispatch<SetStateAction<CompanyDetails | undefined>>
	selectedCompany?: CompanyDetails
	bill?: BillDetails
}

const {Item} = Form
const {Option} = Select

const BillVat = (props: Props) => {
	const {t} = useTranslation()
	const [searchedValue, setSearchedValue] = useState<string>('')

	return (
		<Card title='Bill' className='Bill'>
			{props.isCompaniesLoading ? (
				<Skeleton active loading />
			) : (
				<>
					<Item name='company_id' rules={[{required: true}]} label={t('billing.bill.company_id')}>
						<Select
							showSearch
							onSearch={(value: string) => setSearchedValue(value)}
							filterOption={true}
							className='Bill_Form_CompanySelect'
							optionFilterProp='label'
							placeholder={t('billing.bill.select-company')}
							onSelect={(value) =>
								props.setSelectedCompany && props.setSelectedCompany(props.companies?.find((c) => c.id === value))
							}>
							{props.companies?.map((c) => (
								<Option label={c.name} key={c.id} value={c.id}>
									<Highlighter
										highlightStyle={{backgroundColor: '#ffc069', color: '#2d9259', padding: 0}}
										searchWords={[searchedValue]}
										autoEscape
										textToHighlight={c.name}
									/>
								</Option>
							))}
						</Select>
					</Item>

					<Item name='number' rules={[{required: true}]} label={t('billing.bill.number')}>
						<Input type='number' className='Bill_Form_NumberInput' />
					</Item>

					<Item name='currency' rules={[{required: true}]} label={t('billing.bill.currency')}>
						<Select className='Bill_Form_CurrencySelect'>
							{Object.values(CURRENCY_ENUM).map((c) => (
								<Option key={c} value={c}>{c}</Option>
							))}
						</Select>
					</Item>

					<Item name='date_of_maturity' rules={[{required: true}]} label={t('billing.bill.date_of_maturity')}>
						<DatePicker format='DD.MM.YYYY' className='Bill_Form_DateInput' />
					</Item>
					<Item name='date_of_taxing' rules={[{required: true}]} label={t('billing.bill.date_of_taxing')}>
						<DatePicker format='DD.MM.YYYY' className='Bill_Form_DateInput' />
					</Item>

					<Item name='note' label={t('billing.bill.note')}>
						<TextArea style={{width: 300}} />
					</Item>
				</>
			)}
		</Card>
	)
}

export default BillVat
