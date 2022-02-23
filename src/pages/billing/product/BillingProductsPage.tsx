import React, {useEffect, useState} from 'react'
import {Card, Table, Space, message, Modal, Select, Input} from 'antd'
import {
	ExpandOutlined,
	PercentageOutlined,
	PlusCircleOutlined,
	ShoppingOutlined,
	HistoryOutlined,
} from '@ant-design/icons/lib/icons'
import {RouteComponentProps} from 'react-router'
import {AppState} from 'common/models'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import getProducts from './actions/getProducts'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import ProductForm from 'components/ProductForm/ProductForm'
import deleteProduct from './actions/deleteProduct'
import {ProductDetails, UpdateProductParams, PrependedParentIdCreateParams} from './models'
import getTaxes from '../tax/actions/getTaxes'
import Badge from 'antd/lib/badge'
import {convertToTree} from 'helpers/arrayHelpers'
import {TiFlowChildren} from 'react-icons/ti'
import History from 'components/History/History'
import Button from 'antd-button-color'
import './BillingProductsPage.scss'
import {DeleteTwoTone, EditTwoTone} from '@ant-design/icons'
import getServiceTypes from '../servicetype/actions/getServiceTypes'
import Highlighter from 'react-highlight-words'
import {ColumnsType} from 'antd/lib/table'

const BillingProductsPage = (props: RouteComponentProps) => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const {isLoading: isProductsLoading, products} = useSelector((state: AppState) => state.product)
	const {taxes} = useSelector((state: AppState) => state.tax)
	const {servicetypes} = useSelector((state: AppState) => state.servicetype)

  const { settings } = useSelector((state : AppState) => state.setting)
  const [pageSize, setPageSize] = useState<string>()

	const [valueName, setNameValue] = useState('')
	const [dataSource, setDataSource] = useState<ProductDetails[]>()

	const [isModalVisible, setModalVisible] = useState(false)
	const [isHistoryModalVisible, setHistoryModalVisible] = useState(false)
	const [historyId, setHistoryId] = useState<number>()
	const [dataToUpdate, setDataToUpdate] = useState<UpdateProductParams>()
	const [dataToCreate, setDataToCreate] = useState<PrependedParentIdCreateParams>()
	const [actionType, setActionType] = useState<'UPDATE' | 'CREATE' | undefined>()
	const [expandedRows, setExpandedRows] = useState<(string | number)[]>()

	useEffect(() => {
		setDataSource(products)
    const size = settings?.find(item => item.name === 'grid_page_size')
    setPageSize(size?.value)
	}, [products])

	useEffect(() => {
		dispatch(getProducts())
		dispatch(getTaxes())
		dispatch(getServiceTypes())
	}, [dispatch])

	const onDelete = (id: number) => {
		dispatch(deleteProduct(id, (isDone) => isDone && message.success(t('billing.product.deleted'))))
	}

	const FilterByName = products && (
		<Input
			placeholder={t('billing.product.name')}
			style={{width: 200}}
			value={valueName}
			onChange={(e) => {
				const value = e.target.value
				setNameValue(value)
				const filteredData = products?.filter((p) => p.name.toLowerCase().includes(value.toLowerCase()))
				setDataSource(filteredData)
			}}
		/>
	)

	const columns: ColumnsType<ProductDetails> = [
		{title: 'ID', dataIndex: 'id', key: 'id', className: 'noWrap', width: 80},
		{
			title: FilterByName,
			dataIndex: 'name',
			key: 'name',
			render: (text: string) => (
				<Highlighter
					highlightStyle={{backgroundColor: '#ffc069', color: '#2d9259', padding: 0}}
					searchWords={[valueName]}
					autoEscape
					textToHighlight={`${text}`}
				/>
			),
		},
		{title: t('billing.product.service_type'), dataIndex: 'service_type', key: 'service_type'},
		{title: t('billing.product.unit'), dataIndex: 'unit', key: 'unit'},
		{
			title: t('billing.product.tax_id'),
			key: 'tax_id',
			dataIndex: 'tax_id',
			render: (text: string) => {
				const tax = taxes?.find((tax) => tax.id === Number(text))
				return tax?.rate && `${tax.rate / 100}%`
			},
		},
		{
			title: t('billing.product.expired'),
			key: 'expired',
			dataIndex: 'expired',
			render: (text: number) =>
				text ? <Badge count={'yes'} /> : <Badge count={'no'} style={{backgroundColor: '#52c41a'}} />,
		},
		{
			title: 'Action',
			key: 'action',
			width: 60,
			render: (text, record: ProductDetails) => (
				<Space size='middle'>
					<Button
						type='text'
						size='small'
						onClick={() => {
							setDataToCreate(undefined)
							setDataToUpdate(text)
							setActionType('UPDATE')
							setModalVisible(true)
						}}
						icon={<EditTwoTone twoToneColor='green' />}
					/>
					<PopConfirmZis onConfirm={() => onDelete(record.id)}>
						<Button type='text' danger size='small' icon={<DeleteTwoTone twoToneColor='red' />} />
					</PopConfirmZis>

					{record.parent_id === null && (
						<Button
							type='primary'
							size='small'
							onClick={() => {
								setDataToUpdate(undefined)
								setDataToCreate({parent_id: text.id})
								setActionType(undefined)
								setModalVisible(true)
							}}>
							<TiFlowChildren /> {t('billing.product.create')}
						</Button>
					)}

					<Button
						size='small'
						onClick={() => {
							setHistoryId(record.id)
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
				className='BillingProductsPage'
				loading={isProductsLoading}
				title={
					<>
						<ShoppingOutlined /> {t('billing.products.title')}
					</>
				}
				extra={
					<Space>
						<Button
							type='primary'
							onClick={() => {
								setDataToUpdate(undefined)
								setDataToCreate(undefined)
								setActionType('CREATE')
								setModalVisible(true)
							}}>
							<PlusCircleOutlined /> {t('billing.product.create')}
						</Button>

						<Button
							onClick={() => {
								expandedRows?.length
									? setExpandedRows([])
									: setExpandedRows(
											convertToTree(dataSource)
												.filter((product: ProductDetails) => product.children !== null)
												.map((product: ProductDetails) => product.id),
									  )
							}}>
							<ExpandOutlined />{' '}
							{expandedRows?.length ? t('billing.product.collapse_all') : t('billing.product.expand_all')}
						</Button>
					</Space>
				}>
        {
          pageSize &&
          <Table<ProductDetails>
              columns={columns}
              loading={isProductsLoading}
              dataSource={convertToTree(dataSource)}
              expandable={{
                expandedRowKeys: expandedRows,
                onExpandedRowsChange: (expandedRows) => setExpandedRows(expandedRows),
              }}
              pagination={{defaultPageSize: parseInt(pageSize), showSizeChanger: false}}
          />
        }

			</Card>

			<Modal
				destroyOnClose={true}
				style={{top: 20}}
				title={
					<>
						<PercentageOutlined />{' '}
						{dataToUpdate ? t('billing.product.update_title') : t('billing.product.create_title')}
					</>
				}
				visible={isModalVisible}
				onCancel={() => setModalVisible(false)}
				footer={null}>
				<ProductForm
					dataToUpdate={dataToUpdate}
					setModalVisible={setModalVisible}
					taxes={taxes}
					actionType={actionType}
					dataToCreate={dataToCreate}
					servicetypes={servicetypes}
				/>
			</Modal>
			<Modal
				destroyOnClose
				width='100%'
				title={t('billing.product.history-title')}
				visible={isHistoryModalVisible}
				onCancel={() => setHistoryModalVisible(false)}
				footer={null}>
				{historyId && (
					<History url='/helper/get-model-history?service=Billing&model=Product' id={historyId} historyName='product' />
				)}
			</Modal>
		</>
	)
}

export default BillingProductsPage
