import React, {useEffect, useState} from 'react'
import {CustomerDetails} from '../../customer/models'
import {Card, Row, Col, Typography, Modal, Space} from 'antd'
import moment from 'moment'
import {PricelistDetails} from '../../pricelist/models'
import Button from 'antd-button-color'
import {useTranslation} from 'react-i18next'
import {HistoryOutlined, MoneyCollectOutlined} from '@ant-design/icons'
import History from 'components/History/History'
import InvoiceCustomerForm from 'components/Invoice/InvoiceCustomerForm'
import {useSelector} from 'react-redux'
import {AppState} from "../../../../common/models";
import { SettingsDetails } from '../../../settings/models'

const label = {
	display: 'flex',
	justifyContent: 'flex-end',
	paddingRight: '20px',
}

const {Paragraph, Text, Title} = Typography

interface Props {
	customer: CustomerDetails
	pricelist: PricelistDetails
	customer_id: string
	setModalVisible: (visible: boolean) => void
	setOneTimeModalVisible: (visible: boolean) => void
	FilterComponent: JSX.Element
  settings?: SettingsDetails[]
}

const InvoiceDetail = [
  "None","Short","All"
]

const CustomerInfo = (props: Props) => {
	const {customer, pricelist, customer_id, settings} = props
	const {t} = useTranslation()
	const [isHistoryModalVisible, setHistoryModalVisible] = useState<boolean>(false)

	const setModalVisible = () => props.setModalVisible(true)
	const setOneTimeModalVisible = () => props.setOneTimeModalVisible(true)

  const [dateFormat, setDateFormat] = useState<string>()

  useEffect(() => {
    const format = settings?.find(item => item.name === 'date_format')
    setDateFormat(format?.value)
  },[settings])

	return (
		<Card style={{fontSize: '1em'}}>
			<Row justify='space-around' align='middle'>
				<Col xs={24} xl={12}>
					<Row>
						<Col xs={6} xl={8} style={label}>
							<Paragraph>
								<Text type='secondary'>Customer: </Text>
							</Paragraph>
						</Col>
						<Col xs={16} xl={14}>
							<Paragraph>
								<Title level={5}>{customer?.company?.name}</Title>
							</Paragraph>
						</Col>
						<Col xs={2} xl={2}>
							<Paragraph>
								<Button
									type='success'
									size='small'
									onClick={() => {
										setHistoryModalVisible(true)
									}}
									icon={<HistoryOutlined />}
									title={t('history')}
								/>
							</Paragraph>
						</Col>
					</Row>
					<Row>
						<Col xs={6} xl={8} style={label}>
							<Paragraph>
								<Text type='secondary'>IC: </Text>
							</Paragraph>
						</Col>
						<Col xs={18} xl={16}>
							<Paragraph>
								<Text>{customer?.company?.company_number}</Text>
							</Paragraph>
						</Col>
					</Row>
					<Row>
						<Col xs={6} xl={8} style={label}>
							<Paragraph>
								<Text type='secondary'>DIC: </Text>
							</Paragraph>
						</Col>
						<Col xs={18} xl={16}>
							<Paragraph>
								<Text>{customer?.company?.vat_number}</Text>
							</Paragraph>
						</Col>
					</Row>
					<Row>
						<Col xs={6} xl={8} style={label}>
							<Paragraph>
								<Text type='secondary'>Address: </Text>
							</Paragraph>
						</Col>
						<Col xs={18} xl={16}>
							<Paragraph>
								<Text>
									{customer?.company?.street}
									<br />
									{customer?.company?.zip} {customer?.company?.city} {customer?.company?.country}
								</Text>
							</Paragraph>
						</Col>
					</Row>
					<Row>
						<Col xs={6} xl={8} style={label}>
							<Paragraph>
								<Text type='secondary'>E-mail: </Text>
							</Paragraph>
						</Col>
						<Col xs={18} xl={16}>
							<Paragraph>
								<Text>{customer?.company?.email ?? '-'}</Text>
							</Paragraph>
						</Col>
					</Row>
					<Row>
						<Col xs={6} xl={8} style={label}>
							<Paragraph>
								<Text type='secondary'>Phone: </Text>
							</Paragraph>
						</Col>
						<Col xs={18} xl={16}>
							<Paragraph>
								<Text>{customer?.company?.phone ?? '-'}</Text>
							</Paragraph>
						</Col>
					</Row>
					<Row justify='center'>
						<Col>
							<Paragraph>
								<Space size='middle'>
									<Button type='success' onClick={setModalVisible}>
										Create service
									</Button>
									<Button onClick={setOneTimeModalVisible}>Create One-time product</Button>
									<InvoiceCustomerForm
										position='left'
										customer={customer}
										title={<h3>{t('billing.invoice.generate-title', {customer_name: customer?.company?.name})}</h3>}>
										<Button type='warning' icon={<MoneyCollectOutlined />} disabled={!customer?.company?.name}>
											{t('billing.invoice.generate')}{' '}
										</Button>
									</InvoiceCustomerForm>
								</Space>
							</Paragraph>
						</Col>
					</Row>
				</Col>

				<Col xs={24} xl={12}>
					<Row>
						<Col xs={6} xl={8} style={label}>
							<Paragraph>
								<Text type='secondary'>Pricelist: </Text>
							</Paragraph>
						</Col>
						<Col xs={18} xl={16}>
							<Paragraph>
								<Title level={5}>{pricelist?.name}</Title>
							</Paragraph>
						</Col>
					</Row>
					<Row>
						<Col xs={6} xl={8} style={label}>
							<Paragraph>
								<Text type='secondary'>Currency: </Text>
							</Paragraph>
						</Col>
						<Col xs={18} xl={16}>
							<Paragraph>
								<Text>{pricelist?.currency}</Text>
							</Paragraph>
						</Col>
					</Row>

          <Row>
            <Col xs={6} xl={8} style={label}>
              <Paragraph>
                <Text type='secondary'>Invoice Detail: </Text>
              </Paragraph>
            </Col>
            <Col xs={18} xl={16}>
              <Paragraph>
                <Text>{customer?.invoice_detail && InvoiceDetail[customer?.invoice_detail]}</Text>
              </Paragraph>
            </Col>
          </Row>

					<Row>
						<Col xs={6} xl={8} style={label}>
							<Paragraph>
								<Text type='secondary'>Valid from: </Text>
							</Paragraph>
						</Col>
						<Col xs={18} xl={16}>
							<Paragraph>
								<Text>{moment(pricelist?.valid_from).format(dateFormat)}</Text>
							</Paragraph>
						</Col>
					</Row>
					<Row>
						<Col xs={6} xl={8} style={label}>
							<Paragraph>
								<Text type='secondary'>Valid to: </Text>
							</Paragraph>
						</Col>
						<Col xs={18} xl={16}>
							<Paragraph>
								<Text>{pricelist?.valid_to ? moment(pricelist.valid_to).format(dateFormat) : '~'}</Text>
							</Paragraph>
						</Col>
					</Row>
          <Row>
            <Col xs={6} xl={8} style={label}>
              <Paragraph>
                <Text type='secondary'>Is Vat Payer: </Text>
              </Paragraph>
            </Col>
            <Col xs={18} xl={16}>
              <Paragraph>
                <Title level={5}>{pricelist?.is_vat_payer === 1 ? 'Yes' : 'No'}</Title>
              </Paragraph>
            </Col>
          </Row>
          <Row justify='end' align='bottom'>
            <Col>
              <Paragraph>{props.FilterComponent}</Paragraph>
            </Col>
          </Row>
				</Col>
			</Row>

			<Modal
				destroyOnClose
				width='100%'
				style={{maxHeight: '100vh'}}
				title={t('usersPage.history')}
				visible={isHistoryModalVisible}
				onCancel={() => setHistoryModalVisible(false)}
				footer={null}>
				<History
					url='/helper/get-model-history?service=billing&model=CustomerService'
					id={Number(customer_id)}
					historyName='CustomerServices'
				/>
			</Modal>
		</Card>
	)
}

export default CustomerInfo
