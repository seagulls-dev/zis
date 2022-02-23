import React, {useEffect, useState} from 'react'
import {Card, Table, message, Space, Modal} from 'antd'
import {PlusCircleOutlined, HistoryOutlined} from '@ant-design/icons/lib/icons'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from 'common/models'
import getBillls from './actions/getBills'
import getCompanies from 'pages/company/actions/getCompanies'
import moment from 'moment'
import {BillDetails} from './models'
import deleteBill from './actions/deleteBill'
import {RouteComponentProps} from 'react-router'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import History from 'components/History/History'
import Button from 'antd-button-color'
import {DeleteTwoTone, EditTwoTone} from '@ant-design/icons'

const BillsPage = (props: RouteComponentProps) => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [isHistoryModalVisible, setHistoryModalVisible] = useState(false)
	const [selectedId, setSelectedId] = useState<number>()
	const {bills, isLoading} = useSelector((state: AppState) => state.bill)
	const {companies} = useSelector((state: AppState) => state.company)
  const { settings } = useSelector((state : AppState) => state.setting)

  const [dateFormat, setDateFormat] = useState<string>()
  const [pageSize, setPageSize] = useState<string>()

	useEffect(() => {
		dispatch(getBillls())
		dispatch(getCompanies())
    const format = settings?.find(item => item.name === 'date_format')
    setDateFormat(format?.value)
    const size = settings?.find(item => item.name === 'grid_page_size')
    setPageSize(size?.value)
		//eslint-disable-next-line
	}, [])

	const onDelete = (id: number) =>
		dispatch(deleteBill(id, (isSuccess) => isSuccess && message.info(t('billing.bill.deleted'))))

	return (
		<>
			<Card
				title={`Incoming Invoices (Bills Page)`}
				extra={
					<Link to='/billing/bill/create'>
						<Button type='primary'>
							<PlusCircleOutlined /> ADD{' '}
						</Button>
					</Link>
				}
				loading={isLoading}
				className='BillsPage'>
        {
          pageSize &&
          <Table
              className='BillsTable'
              dataSource={bills}
              rowKey={(record) => record.id}
              loading={isLoading}
              columns={[
                {title: 'ID', dataIndex: 'id', key: 'id'},
                {
                  title: t('billing.bill.company_id'),
                  dataIndex: 'company_id',
                  key: 'company_id',
                  render: (text: number) => companies?.map((c) => c.id === text && c.name),
                },
                {title: t('billing.bill.number'), dataIndex: 'number', key: 'number'},
                {title: t('billing.bill.currency'), dataIndex: 'currency', key: 'currency'},
                {
                  title: t('billing.bill.date_of_maturity'),
                  dataIndex: 'date_of_maturity',
                  key: 'date_of_maturity',
                  render: (text: string) => moment(text).format(dateFormat),
                },
                {
                  title: t('billing.bill.date_of_taxing'),
                  dataIndex: 'date_of_taxing',
                  key: 'date_of_taxing',
                  render: (text: string) => moment(text).format(dateFormat),
                },
                {
                  title: t('billing.bill.total_without_vat'),
                  dataIndex: 'total_without_vat',
                  key: 'total_without_vat',
                  render: (text: number) => text / 100,
                },
                {
                  title: t('billing.bill.total_vat'),
                  dataIndex: 'total_vat',
                  key: 'total_vat',
                  render: (text: number) => text / 100,
                },
                {
                  title: t('billing.bill.total_with_vat'),
                  dataIndex: 'total_with_vat',
                  key: 'total_with_vat',
                  render: (text: number) => text / 100,
                },
                {title: t('billing.bill.internal_note'), dataIndex: 'internal_note', key: 'internal_note'},
                {
                  title: t('billing.bill.rounding_difference'),
                  dataIndex: 'rounding_difference',
                  key: 'rounding_difference',
                },
                {
                  title: t('billing.bill.action'),
                  key: 'action',
                  dataIndex: 'action',
                  width: 140,
                  render: (_, record: BillDetails) => (
                    <Space size='middle'>
                      <Link to={`/billing/bill/edit/${record.id}`}>
                        <Button type='text' size='small' icon={<EditTwoTone twoToneColor='green' />} />
                      </Link>
                      <PopConfirmZis onConfirm={() => onDelete(record.id)}>
                        <Button type='text' danger size='small' icon={<DeleteTwoTone twoToneColor='red' />} />
                      </PopConfirmZis>
                      <Button
                        size='small'
                        onClick={() => {
                          setSelectedId(record.id)
                          setHistoryModalVisible(true)
                        }}
                        icon={<HistoryOutlined />}
                        title={t('billing.tax.history-button')}
                      />
                    </Space>
                  ),
                },
              ]}
              pagination={{defaultPageSize: parseInt(pageSize)}}
          />
        }

			</Card>
			<Modal
				destroyOnClose
				width='100%'
				title={t('billing.bill.history-title')}
				visible={isHistoryModalVisible}
				onCancel={() => setHistoryModalVisible(false)}
				footer={null}>
				{selectedId && (
					<History url='/helper/get-model-history?service=Billing&model=Bill' id={selectedId} historyName='bill' />
				)}
			</Modal>
		</>
	)
}

export default BillsPage
