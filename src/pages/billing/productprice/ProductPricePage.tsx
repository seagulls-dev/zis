import React, {useEffect, useState} from 'react'
import {Button, message, Modal, PageHeader, Space, Table, Tag, AutoComplete, Input} from 'antd'
import {EuroCircleOutlined, PlusCircleOutlined} from '@ant-design/icons/lib/icons'
import {ProductPriceDetails, UpdateProductPriceParams} from './models'
import {AppState} from 'common/models'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import ProductPriceForm from 'components/ProductPriceForm/ProductPriceForm'
import getCustomers from 'pages/billing/customer/actions/getCustomers'
import {useDispatch, useSelector} from 'react-redux'
import getProducts from '../product/actions/getProducts'
import deleteProductPrice from './actions/deleteProductPrice'
import getProductPriceRanges from '../productpricerange/actions/getProductPriceRanges'
import getPricelist from '../pricelist/actions/getPricelist'
import {useTranslation} from 'react-i18next'
import getProductPricesByPricelist from './actions/getProductPricesByPricelist'
import {RouteComponentProps, useParams} from 'react-router-dom'
import getPricelists from '../pricelist/actions/getPricelists'
import {CgInfinity} from 'react-icons/cg'
import './ProductPricePage.scss'
import {DeleteTwoTone, EditTwoTone} from '@ant-design/icons'

interface ParamTypes {
	id: string
}
const ProductPricePage = (props: RouteComponentProps) => {
	const {id} = useParams<ParamTypes>()
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const {pricelist, pricelists} = useSelector((state: AppState) => state.pricelist)

	const productprice = useSelector((state: AppState) => state.productprice)
	const {isLoading: isProductPricesLoading} = productprice

	const {products} = useSelector((state: AppState) => state.product)
	const {isLoading: isRangeLoading} = useSelector((state: AppState) => state.productpricerange)
	const {customers} = useSelector((state: AppState) => state.customer)
  const { settings } = useSelector((state : AppState) => state.setting)

	const [isProductPricesModalVisible, setProductPricesModalVisible] = useState(false)
	const [dataProductPricesToUpdate, setProductPricesDataToUpdate] = useState<ProductPriceDetails>()

  const [dataSource,setDataSource] = useState<ProductPriceDetails[]>()
  const [name, setName] = useState<string>('')
  const [serviceType, setServiceType] = useState<string>('')
  const [priceRound, setPriceRound] = useState<string>()

	useEffect(() => {
		dispatch(getProductPricesByPricelist(Number(id)))
		dispatch(getPricelist(Number(id)))
		dispatch(getPricelists())
		dispatch(getCustomers('company'))
		dispatch(getProducts())
	}, [dispatch, id])

  useEffect(() => {
    setDataSource(productprice[id])
    const format = settings?.find(item => item.name === 'price_rounding')
    setPriceRound(format?.value)
  },[productprice[id]])

	const onProductPricesDelete = (id: number) => {
		dispatch(deleteProductPrice(id, (isDone) => isDone && message.success(t('billing.productprice.deleted'))))
	}

	useEffect(() => {
		!isProductPricesModalVisible && dispatch(getProductPricesByPricelist(Number(id)))
	}, [isProductPricesModalVisible, dispatch, id])

	const renderPrice = (text: number, record: ProductPriceDetails) => {
		if (record.calculation_type === 'range' && record.productPriceRanges) {
			let product = products?.find((i) => i.id === record.product_id)
			return record.productPriceRanges
				.sort((a, b) => a.volume_from - b.volume_from)
				.map((v, i) => (
					<div key={v.id} className='Price'>
						<Tag className='Price_Tag' color='volcano'>
							{v.volume_from} - &nbsp;
							{record.productPriceRanges && record.productPriceRanges[i + 1] ? (
								record.productPriceRanges[i + 1].volume_from
							) : (
								<div className='Price_Tag_iconWrapper'>
									<CgInfinity size={22} className='Price_Tag_iconWrapper_icon' />
								</div>
							)}
							&nbsp; <span className='Price_Tag_unit'>{product?.unit}</span>
						</Tag>
						<span className='Price_priceWrapper'>
							<span className='Price_priceWrapper_price'>{priceRound && (v.price / 100).toFixed(parseInt(priceRound))}</span> &nbsp;
						</span>
					</div>
				))
		} else {
			return priceRound && `${(text / 100).toFixed(parseInt(priceRound))}`
		}
	}

	const FilterByName = productprice[id] && (
	  <AutoComplete
      placeholder={t('billing.productprice.name')}
      options={productprice[id].map(v => ({ 'value': v.name }))}
      style={{ width: 250 }}
      value={name}
      onChange={(currValue) => {
        setName(currValue)
        const filteredData = productprice[id].filter((entry) => (
          entry.name.includes(currValue)
        ))
        setDataSource(filteredData)
      }}
      filterOption={(inputValue, option) =>
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    />
  )

  const FilterByServiceType = productprice[id] && (
    <Input
      placeholder={t('billing.productprice.service_type')}
      style={{ width: 250 }}
      value={serviceType}
      onChange={e => {
        const value = e.target.value
        setServiceType(value)
        const filteredProducts = products?.filter(item => item.service_type?.toLowerCase().includes(value.toLowerCase()))
        const filteredId = filteredProducts?.map(item => item.id)
        const filteredData = productprice[id].filter(item => filteredId?.includes(item.product_id))
        setDataSource(filteredData)
      }}
    />
  )

	const columns = [
		{title: 'ID', dataIndex: 'id', key: 'id', className: 'ellipsis'},
		{title: FilterByName, dataIndex: 'name', key: 'name'},
		{
			title: FilterByServiceType,
			dataIndex: 'product_id',
			key: 'product_id',
			render: (text: number) => {
				const product = products?.find((i) => i.id === text)
				return product?.service_type
			},
		},
		{
			title: t('billing.productprice.calculation_type'),
			key: 'calculation_type',
			dataIndex: 'calculation_type',
			render: (text: string, record: ProductPriceDetails) => (
				<>
					<Tag color={text === 'range' ? 'green' : text === 'unit' ? 'blue' : 'red'}>{text.toUpperCase()}</Tag>
					<Tag>{products?.find((p) => p.id === record.product_id)?.unit}</Tag>
				</>
			),
		},
    {
      title: t('billing.productprice.price') + ' (' + pricelist?.currency + ')',
      key: 'price',
      dataIndex: 'price',
      className: 'priceCell',
      render: renderPrice,
    },
		{
			title: 'Action',
			key: 'action',
			render: (text, record) => (
				<Space size='middle'>
					<Button
						type='text'
						size='small'
						disabled={isRangeLoading}
						onClick={() => {
							setProductPricesDataToUpdate(text)
							dispatch(getProductPriceRanges(text.id, (isSuccess) => isSuccess && setProductPricesModalVisible(true)))
						}}
						icon={<EditTwoTone twoToneColor='green' />}
					/>
					<PopConfirmZis onConfirm={() => onProductPricesDelete(record.id)}>
						<Button
							type='text'
							danger
							size='small'
							disabled={!!record.deleted_at}
							icon={<DeleteTwoTone twoToneColor='red' />}
						/>
					</PopConfirmZis>
				</Space>
			),
		},
	]

	const getCompanyName = (id: number) =>
		customers?.find((v) => v.id === pricelists?.find((v) => v.id === id)?.customer_id)?.company?.name

	return (
		<>
			<PageHeader
				className='ProductPriceDetailsHeader'
				onBack={() => props.history.replace('/billing/pricelist')}
				title={
					<>
						{t('billing.productprice.pricelist_id')}:<Tag style={{fontSize: '1.4rem'}}>{pricelist?.name}</Tag>
					</>
				}
				subTitle={<small>{getCompanyName(Number(id))}</small>}
				extra={
					<Button
						style={{marginTop: '10px'}}
						type='primary'
						onClick={() => {
							setProductPricesDataToUpdate(undefined)
							setProductPricesModalVisible(true)
						}}>
						<PlusCircleOutlined /> {t('billing.productprice.add')}
					</Button>
				}
			/>

			<Table<ProductPriceDetails>
				rowClassName={() => 'highlight'}
				columns={columns}
				dataSource={dataSource}
				rowKey={(record) => record.name}
				pagination={false}
				className='PricelistProductsPage'
				loading={isProductPricesLoading}
			/>

			<Modal
				destroyOnClose={true}
				style={{top: 20}}
				width={600}
				title={
					<>
						<EuroCircleOutlined />{' '}
						{dataProductPricesToUpdate ? t('billing.productprice.update') : t('billing.productprice.add')}
					</>
				}
				visible={isProductPricesModalVisible}
				onCancel={() => setProductPricesModalVisible(false)}
				footer={null}>
				<ProductPriceForm
					dataToUpdate={dataProductPricesToUpdate}
					setModalVisible={setProductPricesModalVisible}
					pricelist={pricelist}
					pricelists={pricelists}
					products={products}
				/>
			</Modal>
		</>
	)
}

export default ProductPricePage
