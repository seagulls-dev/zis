import React, {useEffect, useState} from 'react'
import {Space, Tooltip, Table} from 'antd'
import {
	DeleteOutlined,
	EditOutlined,
	InfoCircleOutlined,
	// IssuesCloseOutlined,
	StopOutlined,
} from '@ant-design/icons/lib/icons'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import moment, {Moment} from 'moment'
import {CustomerServiceDetails} from 'pages/billing/customerservice/models'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {AppState} from 'common/models'
import Button from 'antd-button-color'
import {convertToTree} from 'helpers/arrayHelpers'
import {ColumnsType} from 'antd/es/table'
import './CustomerServiceTable.scss'

const renderBadgeContent = (unit_count: number, unit?: string) => (unit ? `${unit_count} ${unit}` : unit_count)
interface Props {
	onFinish: (record: CustomerServiceDetails) => void
	onDelete: (id: number) => void
	onUpgrade: (record: CustomerServiceDetails) => void
	range?: [Moment, Moment]
	setDataToCreate: (record?: CustomerServiceDetails) => void
	setDataToUpdate: (record: CustomerServiceDetails) => void
	setActionType: (type: 'UPDATE' | 'CREATE' | undefined) => void
	setModalVisible: (visible: boolean) => void
	setOneTimeModalVisible: (visible: boolean) => void
	setExpandedTableRows: (param: (string | number)[]) => void
	expandedTableRows?: (string | number)[]
}

const CustomerServiceTable = (props: Props) => {
	const {t} = useTranslation()

	const {products} = useSelector((state: AppState) => state.product)
	const {customer} = useSelector((state: AppState) => state.customer)
	const {isLoading, customerservices} = useSelector((state: AppState) => state.customerservice)

  const { settings } = useSelector((state : AppState) => state.setting)
  const [pageSize, setPageSize] = useState<string>()
  const [priceRound, setPriceRound] = useState<string>()

  const [currency, setCurrency] = useState<string>('')

  const [source, setSource] = useState()
  useEffect(() => {
    const treeData = convertToTree(
      customerservices?.filter((service) =>
        props.range ? moment(service.date_from).isBetween(props.range[0], props.range[1], undefined, '[]') : true,
      ),
    )
    setSource(treeData)
    if (treeData?.length > 0) setCurrency(treeData[0].price.currency)
  },[customerservices])


  useEffect(() => {
    const size = settings?.find(item => item.name === 'grid_page_size')
    setPageSize(size?.value)
    const format = settings?.find(item => item.name === 'price_rounding')
    setPriceRound(format?.value)
  },[])

	const isVatPayer = Boolean(customer?.company?.vat_payer)
	const isExpanded = (record: CustomerServiceDetails) => props.expandedTableRows?.find((i) => i === record.key)

	const columns: ColumnsType<CustomerServiceDetails> = [
		// {title: 'ID', dataIndex: 'id', key: 'id', className: 'ellipsis centered', width: 70},
		// { title: 'Previous id', dataIndex: 'previous_id', key: 'previous_id', className: 'previous_id' },
		{
			title: t('billing.customer-services.name'),
			dataIndex: 'name',
			key: 'name',
			width: 300,
		},
		{
			title: t('billing.customer-services.service'),
			dataIndex: 'product_id',
			key: 'product_id',
			width: 200,
			render: (text: number) => products?.find((i) => i.id === text)?.name,
		},
    {
      title: t('billing.customer-services.unit-price') + ' (' + currency + ')',
      dataIndex: 'price',
      width: 120,
      key: 'price.price_per_unit',
      className: 'price',
      render: (text, record) => {
        if (!isExpanded(record)) {
          return priceRound && (text.price_per_unit / 100).toFixed(parseInt(priceRound))
        } else {
          return priceRound && (text.price_per_unit / 100).toFixed(parseInt(priceRound))
        }
      },
    },
    {
      title: t('billing.customer-services.amount'),
      dataIndex: 'unit_count',
      key: 'unit_count',
      align: 'center',
      width: 120,
      render: (text: number, record) => {
        let product = products?.find((i) => i.id === record.product_id)
        if (!isExpanded(record)) {
          return renderBadgeContent(text, product?.unit)
        } else {
          return text ? renderBadgeContent(text, product?.unit) : ''
        }
      },
    },
		{
			title: t('billing.customer-services.price') + ' (' + currency + ')',
			dataIndex: 'price',
			width: 120,
			key: 'price.vat',
      className: 'price',
			render: (text, record) => {
				if (!isExpanded(record)) {
					return record.children ? (
						<>
							{priceRound && (record.children.reduce(
								(acc, val) => {
									return acc + (isVatPayer ? val.price?.with_vat : val.price?.without_vat)
								},
								isVatPayer ? text.with_vat : text.without_vat,
							) / 100).toFixed(parseInt(priceRound))}{' '}
						</>
					) : (
						<>
							{priceRound && ((isVatPayer ? text.with_vat : text.without_vat) / 100).toFixed(parseInt(priceRound))}
						</>
					)
				} else {
					return (
						<>
							{priceRound && ((isVatPayer ? text.with_vat : text.without_vat) / 100).toFixed(parseInt(priceRound))}
						</>
					)
				}
			},
		},
		{
			dataIndex: 'internal_note',
			key: 'internal_note',
			width: 100,
			align: 'center',
			title: t('billing.customer-services.internal_note'),
			render: (text) => <Tooltip title={text}>{text && <InfoCircleOutlined />}</Tooltip>,
		},
    {
      dataIndex: 'created_at',
      key: 'created_at',
      width: 100,
      align: 'center',
      title: t('billing.customer-services.created_at'),
      render: (text) => (text ? moment.unix(text).format('DD.MM.YYYY') : '')
    },
		{
			title: t('billing.customer-services.date_from'),
			dataIndex: 'date_from',
			key: 'date_from',
			width: 120,
			className: 'centered bold',
			render: (text: Date) => (text ? moment(text).format('DD.MM.YYYY') : ''),
		},
		{
			dataIndex: 'date_to',
			key: 'date_to',
			width: 120,
			title: t('billing.customer-services.date_to'),
			className: 'centered bold',
			render: (text: Date, record) =>
				record.unit_price === 0 &&
				(text ? (
					moment(text).format('DD.MM.YYYY')
				) : (
          <Button type='link' className='finish-form-button'>
            <StopOutlined />
          </Button>
				)),
		},
		{
			title: t('billing.customer-services.action_title'),
			key: 'action',
			width: 100,
			className: 'action-column centered',
			render: (text, record) =>
				record.title && record.parent_id === null && (
					<Space size='middle'>
						<Tooltip title={t('customerPage.edit')} placement='bottom'>
							<Button
								type='text'
								onClick={() => {
									props.setDataToCreate(undefined)
									props.setDataToUpdate(record)
									props.setActionType('UPDATE')
									record.unit_price === 0 ? props.setModalVisible(true) : props.setOneTimeModalVisible(true)
								}}>
								<EditOutlined />
							</Button>
						</Tooltip>
						<PopConfirmZis onConfirm={() => props.onDelete(record.id)}>
							<Tooltip title={t('usersPage.delete')} placement='bottom'>
								<Button type='text' danger disabled={!!record.deleted_at}>
									<DeleteOutlined />
								</Button>
							</Tooltip>
						</PopConfirmZis>

						{/* <PopConfirmZis onConfirm={() => props.onUpgrade(record)}>
							<Tooltip title='Upgrade' placement='bottom'>
								<Button type='text' className='upgrade-form-button gold'>
									<IssuesCloseOutlined />
								</Button>
							</Tooltip>
						</PopConfirmZis> */}
					</Space>
				),
		},
	]

	return (
    <>
      {
        pageSize &&
        <Table
            columns={columns}
            bordered
            scroll={{x: 'max-content'}}
            dataSource={source}
            pagination={{defaultPageSize: parseInt(pageSize)}}
            rowClassName={(record) =>
              !!record.date_to
                ? customerservices?.find((service) => service.previous_id === record.id)
                ? 'upgradedRow'
                : 'finishedRow'
                : ''
            }
            loading={isLoading}
            rowKey={(record) => record.id}
            expandable={{
              expandedRowKeys: props.expandedTableRows,
              onExpandedRowsChange: (expandedRows) => props.setExpandedTableRows(expandedRows),
            }}
            className='CustomerServiceTable'
        />
      }
    </>
	)
}

export default CustomerServiceTable
