import React from 'react'
import {Collapse} from 'antd'
import History from '../History/History'
import {useTranslation} from 'react-i18next'

const {Panel} = Collapse

interface Props {
	invoiceId: number
}

const InvoiceHistory = (props: Props) => {
	const {t} = useTranslation()
	return (
		<Collapse className='InvoiceHistory'>
			<Panel header={<>{t('billing.invoice.history-title')}</>} key={1}>
				<History
					url='/helper/get-model-history?service=Billing&model=Invoice'
					id={Number(props.invoiceId)}
					historyName='invoice'
				/>
			</Panel>
		</Collapse>
	)
}

export default InvoiceHistory
