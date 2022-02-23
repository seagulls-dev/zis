import {CustomerDetails} from '../customer/models'

export const filterPeriods = Object.freeze([
	'ACT_HALF',
	'ACT_MONTH',
	'ACT_QUARTER',
	'ACT_YEAR',
	'FIRST_HALF_AGO',
	'PREV_MONTH',
	'PREV_QUARTER',
	'PREV_YEAR',
	'SECOND_HALF_AGO',
	'TWO_MONTH_AGO',
	'TWO_QUARTER_AGO',
	'TWO_YEAR_AGO',
	'THIRD_HALF_AGO',
	'THREE_MONTH_AGO',
	'THREE_QUARTER_AGO',
	'THREE_YEAR_AGO',
	'MONTH_BEFORE_YEAR',
	'QUARTER_BEFORE_YEAR',
])

export const isCustomerVatPayer = (customer_id: number, customers: CustomerDetails[]): boolean =>
	Boolean(customers?.find((customer) => customer.id === customer_id)?.company?.vat_payer)
