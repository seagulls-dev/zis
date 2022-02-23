import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {RouteComponentProps} from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import {Card, Table, Space, message, Modal, AutoComplete, Tooltip} from 'antd'
import {AccountBookOutlined, PercentageOutlined, PlusCircleOutlined, HistoryOutlined} from '@ant-design/icons/lib/icons'
import {AppState} from 'common/models'
import {useTranslation} from 'react-i18next'
import {PricelistDetails} from './models'
import getPricelists from './actions/getPricelists'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import PricelistForm from 'components/PricelistForm/PricelistForm'
import deletePricelist from './actions/deletePricelist'
import getCustomers from 'pages/billing/customer/actions/getCustomers'
import History from 'components/History/History'
import Button from 'antd-button-color'
import moment from 'moment'
import './BillingPricelistPage.scss'
import {DeleteTwoTone, EditTwoTone} from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import {ColumnsType} from 'antd/lib/table'

const BillingPricelistsPage = (props: RouteComponentProps) => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [isHistoryModalVisible, setHistoryModalVisible] = useState(false)

	const {isLoading: isPricelistsLoading, pricelists} = useSelector((state: AppState) => state.pricelist)
	const {customers} = useSelector((state: AppState) => state.customer)

  const { settings } = useSelector((state : AppState) => state.setting)
  const [pageSize, setPageSize] = useState<string>()

	const [dataSource, setDataSource] = useState<PricelistDetails[]>()

	useEffect(() => {
		setDataSource(pricelists)
    const size = settings?.find(item => item.name === 'grid_page_size')
    setPageSize(size?.value)
	}, [pricelists])

	const [isPricelistModalVisible, setPricelistModalVisible] = useState(false)
	const [dataPricelistToUpdate, setPricelistDataToUpdate] = useState<PricelistDetails>()

	const [name, setName] = useState<string>('')

	useEffect(() => {
		dispatch(getPricelists())
		dispatch(getCustomers('company'))
	}, [dispatch])

	const onPricelistDelete = (id: number) => {
		dispatch(deletePricelist(id, (isDone) => isDone && message.success(t('billing.pricelist.deleted'))))
	}

	const FilterByName = pricelists && (
		<AutoComplete
			placeholder='Search Customer'
			options={pricelists.map((v) => ({value: v.name, key: v.id}))}
			style={{width: '100%'}}
			value={name}
			virtual={false}
			onChange={(currentValue) => {
				setName(currentValue)
				const filteredData = pricelists?.filter((item) => item.name.toLowerCase().includes(currentValue.toLowerCase()))
				setDataSource(filteredData)
			}}
		/>
	)

	const columnsPricelist: ColumnsType<PricelistDetails> = [
		{title: 'ID', dataIndex: 'id', key: 'id', className: 'ellipsis centered', width: 70},
		{
			title: FilterByName,
			dataIndex: 'name',
			key: 'name',
			render: (text: string, record: PricelistDetails) => (
				<Tooltip title={t('billing.pricelist.go_to_products')}>
					<Link to={`/billing/pricelist-products/${record.id}`}>
						<Highlighter
							highlightStyle={{
								backgroundColor: '#ffc069',
								color: '#2d9259',
								padding: 0,
							}}
							searchWords={[name]}
							textToHighlight={text.toString()}
							autoEscape
						/>
					</Link>
				</Tooltip>
			),
		},
		{
			title: t('billing.pricelist.currency'),
			dataIndex: 'currency',
			key: 'currency',
		},
		{
			title: t('billing.pricelist.valid_from'),
			key: 'valid_from',
			dataIndex: 'valid_from',
			render: (text: Date) => moment(text).format('DD.MM.YYYY'),
		},
		{
			title: t('billing.pricelist.valid_to'),
			key: 'valid_to',
			dataIndex: 'valid_to',
			render: (text: Date) => text && moment(text).format('DD.MM.YYYY'),
		},
		{
			title: t('billing.pricelist.customer_id'),
			dataIndex: 'customer_id',
			key: 'customer_id',
			render: (text: number) => {
				let customer = customers?.find((i) => i.id === text)
				return (
					<Tooltip title={t('billing.pricelist.go_to_services')}>
						<Link to={`/billing/customer-services/${text}`}>{customer?.ident}</Link>
					</Tooltip>
				)
			},
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record: PricelistDetails) => (
				<Space size='middle'>
					<Button
						type='text'
						size='small'
						onClick={() => {
							setPricelistDataToUpdate(record)
							setPricelistModalVisible(true)
						}}
						icon={<EditTwoTone twoToneColor='green' />}
					/>

					<PopConfirmZis onConfirm={() => onPricelistDelete(record.id)}>
						<Button
							type='text'
							danger
							size='small'
							disabled={record.deleted_at ? true : false}
							icon={<DeleteTwoTone twoToneColor='red' />}
						/>
					</PopConfirmZis>
					<Button
						size='small'
						onClick={() => {
							setPricelistDataToUpdate(record)
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
				title={
					<>
						<AccountBookOutlined /> {t('billing.pricelist.title')}
					</>
				}
				extra={
					<Button
						type='primary'
						onClick={() => {
							setPricelistDataToUpdate(undefined)
							setPricelistModalVisible(true)
						}}>
						<PlusCircleOutlined /> {t('billing.pricelist.create')}
					</Button>
				}
				className='BillingPricelistPage'
				loading={isPricelistsLoading}>
        {
          pageSize &&
          <Table<PricelistDetails>
              expandedRowKeys={[1, 2]}
              rowClassName={() => 'highlight'}
              columns={columnsPricelist}
              dataSource={dataSource}
              rowKey={(record) => record.id}
              pagination={{defaultPageSize: parseInt(pageSize)}}
          />
        }

			</Card>

			<Modal
				destroyOnClose
				style={{top: 20}}
				title={
					<>
						<PercentageOutlined />{' '}
						{dataPricelistToUpdate ? t('billing.pricelist.update_title') : t('billing.pricelist.create_title')}
					</>
				}
				visible={isPricelistModalVisible}
				onCancel={() => setPricelistModalVisible(false)}
				footer={null}>
				<PricelistForm
					dataToUpdate={dataPricelistToUpdate}
					setModalVisible={setPricelistModalVisible}
					customers={customers}
					pricelists={pricelists}
				/>
			</Modal>
			<Modal
				destroyOnClose
				width='100%'
				title={t('billing.invoice.history-title')}
				visible={isHistoryModalVisible}
				onCancel={() => setHistoryModalVisible(false)}
				footer={null}>
				{dataPricelistToUpdate && (
					<History
						url='/helper/get-model-history?service=Billing&model=Pricelist'
						id={dataPricelistToUpdate.id}
						historyName='pricelist'
					/>
				)}
			</Modal>
		</>
	)
}

export default BillingPricelistsPage
