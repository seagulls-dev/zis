import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Card, Table, Space, Modal, Input, message, Tooltip, Row, Col} from 'antd'
import {MoneyCollectOutlined, PlusCircleOutlined, HistoryOutlined, CloseOutlined, CheckOutlined, ExclamationOutlined, FileTextOutlined, DownloadOutlined, ClockCircleOutlined} from '@ant-design/icons/lib/icons'
import {useTranslation} from 'react-i18next'
import {AppState} from 'common/models'
import {useDispatch, useSelector} from 'react-redux'
import getInvoices from './actions/getInvoices'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import {InvoiceDetails, InvoiceItemDetails} from './models'
// import getCustomers from 'pages/billing/customer/actions/getCustomers'
import deleteInvoice from './actions/deleteInvoice'
import getTaxes from '../tax/actions/getTaxes'
import moment, {Moment} from 'moment'
import History from 'components/History/History'
import Button from 'antd-button-color'

import './InvoicePage.scss'
import {DeleteTwoTone, EditTwoTone} from '@ant-design/icons'
import {ColumnsType} from 'antd/lib/table'
import {protectedApiClient} from 'helpers/api'
import RangeFilter from 'components/RangeFilter/RangeFilter'
import {filterPeriods} from '../customerservice/utils'

let range = [moment().startOf('month'),moment().endOf('month')]

const InvoicePage = () => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [isHistoryModalVisible, setHistoryModalVisible] = useState(false)
	const [selectedId, setSelectedId] = useState<number>()
	const [tableRowSize, setTableRowSize] = useState<number>()
	const {self} = useSelector((state: AppState) => state.auth)
	const {invoices, isLoading} = useSelector((state: AppState) => state.invoice)
	// const {customers} = useSelector((state: AppState) => state.customer)
	const {taxes} = useSelector((state: AppState) => state.tax)
  const { settings } = useSelector((state : AppState) => state.setting)

  const [dataSource, setDataSource] = useState<InvoiceDetails[]>()
  const [customer, setCustomer] = useState<string>()

  const [dateFormat, setDateFormat] = useState<string>()
  const [pageSize, setPageSize] = useState<string>()
  const [priceRound, setPriceRound] = useState<string>()

  useEffect(() => {
    const filtered = invoices?.filter(item =>
      item.date_of_maturity && range ? moment(item.date_of_maturity).isBetween(range[0],range[1],undefined,'[]') : true
    )
    setDataSource(filtered)
  },[invoices])

  useEffect(() => {
    const format = settings?.find(item => item.name === 'date_format')
    setDateFormat(format?.value)
    const size = settings?.find(item => item.name === 'grid_page_size')
    setPageSize(size?.value)
    const price = settings?.find(item => item.name === 'price_rounding')
    setPriceRound(price?.value)
  },[])

	useEffect(() => {
		dispatch(getInvoices())
		// self?.is_zcom && dispatch(getCustomers('company'))
		dispatch(getTaxes())
	}, [dispatch, self])

	const expandedRowRender = (parentRecord, index: number) => {
		const columns = [
			{title: t('billing.invoice.table.name'), dataIndex: 'name', key: 'name'},
			{
				title: t('billing.invoice.table.period'),
				key: 'period',
        dataIndex: 'period',
				render: (_: Date, record: InvoiceItemDetails) =>
          (record?.period_from && record?.period_to) ? `${moment(record?.period_from).format(dateFormat)} - ${moment(record?.period_to).format(dateFormat)}` : '',
			},
			{
				title: t('billing.invoice.table.unit'),
				dataIndex: 'unit_count',
				key: 'unit_count',
				render: (text: number, record: InvoiceItemDetails) => `${text} ${record.unit ? record.unit : ''}`,
			},
			{
				title: t('billing.invoice.table.price_per_unit') + ' (' + parentRecord.currency + ')',
				dataIndex: 'price_per_unit',
				key: 'price_per_unit',
        className: 'right',
				render: (text: number) => priceRound && (text / 100).toFixed(parseInt(priceRound)),
			},
			{
				title: t('billing.invoice.table.vat'),
				dataIndex: 'tax_id',
				key: 'tax_id',
				render: (text: number) =>
					taxes
						?.filter((v) => moment().isBetween(v.valid_from, v.valid_to ? v.valid_to : moment(), undefined, '[]'))
						.map((v) => v.id === text && `${v.rate / 100} %`),
			},
			{
				title: t('billing.invoice.table.total_vat') + ' (' + parentRecord.currency + ')',
				dataIndex: 'total_vat',
				key: 'total_vat',
        className: 'right',
				render: (text: number) => priceRound && (text / 100).toFixed(parseInt(priceRound)),
			},
			{
				title: t('billing.invoice.table.total_without_vat') + ' (' + parentRecord.currency + ')',
				dataIndex: 'total_without_vat',
				key: 'total_without_vat',
        className: 'right',
				render: (text: number) => priceRound && (text / 100).toFixed(parseInt(priceRound)),
			},
			{
				title: t('billing.invoice.table.total_with_vat') + ' (' + parentRecord.currency + ')',
				dataIndex: 'total_with_vat',
				key: 'total_with_vat',
        className: 'right',
				render: (text: number) => priceRound && (text / 100).toFixed(parseInt(priceRound)),
			},
		]
		return (
			<Table
				columns={columns}
				dataSource={dataSource && dataSource[index]?.invoiceItems}
				pagination={false}
				rowKey={(record) => record?.id}
				className='nestedTable'
			/>
		)
	}

	const onDelete = (id: number) => {
		dispatch(deleteInvoice(id))
	}

  const FilterByCustomer = invoices && (
    <Input
      value={customer}
      onChange={e => {
        const value = e.target.value
        setCustomer(value)
        const filtered = invoices?.filter(item =>
          item.customer_name && (item.customer_name.toLowerCase()).toString().includes(value.toLowerCase())
        )
        setDataSource(filtered)
      }}
      placeholder={t('billing.invoice.table.search_customer')}
    />
  )

  const handleRangeChange = ranges => {
    const filtered = invoices?.filter(item =>
      ranges ? moment(item.date_of_maturity).isBetween(ranges[0],ranges[1],undefined,'[]') : true
    )
    setDataSource(filtered)
    if (ranges) {
      range[0] = ranges[0]
      range[1] = ranges[1]
    }
  }

  const downloadInvoice = (record: InvoiceDetails) => {
    record.documents?.map(item => {
      message.info({content: 'Downloading...',duration: 0, key: item.id})
      protectedApiClient.get<string>(`/billing/invoice-document/get-content?id=${item.id}`,{onDownloadProgress: progressEvent => {
        }})
        .then(response => {
          const downloadLink = document.createElement("a")
          downloadLink.href = `data:application/pdf;base64,${response.data}`
          downloadLink.download = (record?.number?.toString() + '-' + item.version.toString()) || 'default'
          downloadLink.click()
          message.destroy(item.id)
        })
        .catch(error => {
          console.log(error)
          message.error('Download Failed')
        })
    })
  }

	const columns: ColumnsType<InvoiceDetails> = [
    {title: t('billing.invoice.table.id'), dataIndex: 'id', key: 'id', width: 10},
    {
      title: t('billing.invoice.table.state'),
      dataIndex: 'state',
      key: 'state',
      align: 'center',
      width: 30,
      render: (text,record) => {
        if (text === 1) {
          return <CloseOutlined className="bg-yellow"/>
        }
        else {
          if (record.sent && record.internal_note) {
            return <ExclamationOutlined className="bg-orange" />
          }
          else {
            return <CheckOutlined className="bg-green" />
          }
        }
      }
    },
    {
      title: t('billing.invoice.table.paid'),
      dataIndex: 'paid',
      key: 'paid',
      align: 'center',
      width: 30,
      render: (text, record) => {
        if (text) {
          return <CheckOutlined className="bg-green" />
        }
        else {
          const now = moment()
          if (now < moment(record.date_of_maturity)) {
            return <ClockCircleOutlined />
          }
          else {
            return <CloseOutlined className="bg-orange"/>
          }
        }
      }
    },
    {
      title: t('billing.invoice.table.created'),
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      render: (text) => moment.unix(text).format(dateFormat)
    },
    {
      title: FilterByCustomer,
      dataIndex: 'customer_name',
      key: 'customer_name'
    },
    {
      title: t('billing.invoice.table.number'),
      dataIndex: 'number',
      key: 'number'
    },
    {
      title: t('billing.invoice.table.total_with_vat'),
      dataIndex: 'total_with_vat',
      className: 'right',
      key: 'total_with_vat',
      render : text => priceRound && text && (text / 100).toFixed(parseInt(priceRound))
    },
    {
      title: 'Note',
      dataIndex: 'internal_note',
      align: 'center',
      key: 'internal_note',
      render: text => (text &&
        <Tooltip title={text}>
          <FileTextOutlined />
        </Tooltip>
      )
    },
    {
      title: t('billing.invoice.table.date_of_taxing'),
      dataIndex: 'date_of_taxing',
      align: 'center',
      key: 'date_of_taxing',
      render: text => text ? moment(text).format(dateFormat) : ''
    },
    {
      title: t('billing.invoice.table.date_of_maturity'),
      dataIndex: 'date_of_maturity',
      align: 'center',
      key: 'date_of_maturity',
      render: text => text ? moment(text).format(dateFormat) : ''
    },
    {
      title: t('billing.invoice.table.date_of_sent'),
      dataIndex: 'sent_at',
      align: 'center',
      key: 'sent_at',
      render: text => text ? moment.unix(text).format(dateFormat) : ''
    },
    {
      title: t('billing.invoice.table.date_of_pay'),
      dataIndex: 'date_of_payment',
      align: 'center',
      key: 'date_of_payment',
      render: text => text ? moment(text).format(dateFormat) : ''
    },
		{
			title: t('billing.invoice.table.action'),
			key: 'action',
			dataIndex: 'action',
      align: 'center',
			width: 140,
			render: (_, record: InvoiceDetails) => (
				<Space size='middle'>
          <Button
            icon={<DownloadOutlined />}
            size='small'
            type='text'
            onClick={() => downloadInvoice(record)}
            disabled={record.documents?.length === 0}
            title={t('billing.invoice.table.download')}
          />
					<Link to={`/billing/invoice/edit/${record?.id}`}>
						<Button type='text' size='small' icon={<EditTwoTone twoToneColor='green' />} title={t('billing.invoice.table.edit')}/>
					</Link>
					<PopConfirmZis onConfirm={() => onDelete(record.id)}>
						<Button type='text' danger size='small' icon={<DeleteTwoTone twoToneColor='red' title={t('billing.invoice.table.delete')}/>} />
					</PopConfirmZis>
					<Button
						size='small'
						onClick={() => {
							setSelectedId(record?.id)
							setHistoryModalVisible(true)
						}}
						icon={<HistoryOutlined />}
						title={t('billing.tax.history-button')}
					/>
				</Space>
			),
		},
	]

	return (
		<>
			<Card
				className='InvoicePage'
				title={
					<Row>
            <Col span={6}>
              <MoneyCollectOutlined /> &nbsp; {t('billing.invoice.title')}
            </Col>
            <Col offset={8}>{t('billing.invoice.period_filter')}&nbsp;</Col>
            <Col>
              <RangeFilter onSelect={(v) => handleRangeChange(v)} periods={filterPeriods} initial={true} initRange={range}/>
            </Col>
					</Row>
				}
				extra={
					<Link to='/billing/invoice/create'>
						<Button type='primary'>
							<PlusCircleOutlined /> {t('billing.invoice.create_invoice')}{' '}
						</Button>
					</Link>
				}>
        {
          pageSize &&
          <Table<InvoiceDetails>
              dataSource={dataSource}
              rowKey="id"
              loading={isLoading}
              columns={columns}
            // childrenColumnName='invoiceItems'
              bordered={true}
              expandable={{
                expandedRowRender,
                rowExpandable: (record) => record?.invoiceItems?.length !== 0,
              }}
              pagination={{defaultPageSize: parseInt(pageSize)}}
              className='invoiceDetailTable'
              rowClassName={(record, index) => {
                if (record?.state != 1)
                  return 'prepared'
                else
                  return ''
              }}
          />
        }

			</Card>
			<Modal
				destroyOnClose
				style={{top: 20}}
				width='100%'
				title={t('billing.invoice.history-title')}
				visible={isHistoryModalVisible}
				onCancel={() => setHistoryModalVisible(false)}
				footer={null}>
				{selectedId && (
					<History
						url='/helper/get-model-history?service=Billing&model=Invoice'
						id={selectedId}
						historyName='invoice'
					/>
				)}
			</Modal>
		</>
	)
}

export default InvoicePage
