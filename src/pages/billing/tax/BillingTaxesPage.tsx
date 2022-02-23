import React, {useEffect} from 'react'
import {Card, Table, Space, message, AutoComplete} from 'antd'
import {PercentageOutlined, PlusCircleOutlined, HistoryOutlined} from '@ant-design/icons/lib/icons'
import {RouteComponentProps} from 'react-router'
import {AppState} from 'common/models'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import getTaxes from './actions/getTaxes'
import moment from 'moment'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import getCountries from 'components/SelectCountries/actions/getCountries'
import Modal from 'antd/lib/modal/Modal'
import {useState} from 'react'
import TaxForm from 'components/TaxForm/TaxForm'
import deleteTax from './actions/deleteTax'
import {TaxDetails} from './models'
import Highlighter from 'react-highlight-words'
import History from 'components/History/History'
import Button from 'antd-button-color'
import {DeleteTwoTone, EditTwoTone} from '@ant-design/icons'

const BillingTaxesPage = (props: RouteComponentProps) => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [taxDataSource, setTaxDataSource] = useState<TaxDetails[]>()
	const [valueName, setNameValue] = useState('')

	const [isHistoryModalVisible, setHistoryModalVisible] = useState(false)
	const [isModalVisible, setModalVisible] = useState(false)
	const [dataToUpdate, setDataToUpdate] = useState<TaxDetails>()

	const {taxes, isLoading: isTaxesLoading} = useSelector((state: AppState) => state.tax)
	const {countries} = useSelector((state: AppState) => state.countries)
  const { settings } = useSelector((state : AppState) => state.setting)

  const [pageSize, setPageSize] = useState<string>()

	useEffect(() => {
		dispatch(getTaxes())
		dispatch(getCountries())
	}, [dispatch])

	useEffect(() => {
		setNameValue('CZE')
		setTaxDataSource(
			taxes?.map((tax) => ({...tax, key: tax.id})).filter((tax, i) => tax.country.toUpperCase().includes('CZE')),
		)
    const size = settings?.find(item => item.name === 'grid_page_size')
    setPageSize(size?.value)
	}, [taxes])

	const onSearch = (currValue: string) => {
		if (currValue?.length) {
			setNameValue(currValue)
			const filteredData = taxes
				?.map((tax) => ({...tax, key: tax.id}))
				.filter((tax, i) => tax.country?.toUpperCase().includes(currValue?.toUpperCase()))
			setTaxDataSource(filteredData)
		} else {
			setNameValue('')
			setTaxDataSource(taxes)
		}
	}

	const FilterByNameInput = countries && (
		<AutoComplete
			placeholder={t('billing.taxes.title')}
			options={Object.keys(countries).map((key: string) => ({value: key, label: countries[key], key: key}))}
			style={{width: 200}}
			value={valueName}
			showSearch
			allowClear
			optionFilterProp='id'
			onChange={onSearch}
			filterOption={(inputValue, option) => option!.value?.toUpperCase().indexOf(inputValue?.toUpperCase()) !== -1}
		/>
	)

	const onDelete = (id: number) => {
		dispatch(deleteTax(id, (isDone) => isDone && message.success(t('billing.tax.deleted'))))
	}

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: t('billing.tax.name'),
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: FilterByNameInput,
			dataIndex: 'country',
			key: 'country',
			render: (text: string) => (
				<Highlighter
					highlightStyle={{backgroundColor: '#ffc069', color: '#2d9259', padding: 0}}
					searchWords={[valueName]}
					autoEscape
					textToHighlight={`${countries && countries[text]} (${text})`}
				/>
			),
		},
		{
			title: t('billing.tax.rate'),
			dataIndex: 'rate',
			key: 'rate',
			render: (text: number) => `${text / 100}%`,
		},
		{
			title: t('billing.tax.valid_from'),
			key: 'valid_from',
			dataIndex: 'valid_from',
			render: (text: Date) => moment(text).format('DD.MM.YYYY'),
		},
		{
			title: t('billing.tax.valid_to'),
			key: 'valid_to',
			dataIndex: 'valid_to',
			render: (text: Date) => text && moment(text).format('DD.MM.YYYY'),
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record: TaxDetails) => (
				<Space size='middle'>
					<Button
						type='text'
						size='small'
						onClick={() => {
							setDataToUpdate(record)
							setModalVisible(true)
						}}
						icon={<EditTwoTone twoToneColor='green' />}
					/>
					<PopConfirmZis onConfirm={() => onDelete(record.id)}>
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
							setDataToUpdate(record)
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
				title={`%  ${t('billing.taxes.title')}`}
				extra={
					<Button
						type='primary'
						onClick={() => {
							setDataToUpdate(undefined)
							setModalVisible(true)
						}}>
						<PlusCircleOutlined /> {t('billing.tax.create')}
					</Button>
				}
				className='BillingTaxesPage'
				loading={isTaxesLoading}>
        {
          pageSize &&
          <Table<TaxDetails> rowClassName={() => 'highlight'} columns={columns} dataSource={taxDataSource} rowKey='id' pagination={{defaultPageSize: parseInt(pageSize)}} />
        }
			</Card>

			<Modal
				destroyOnClose={true}
				style={{top: 20}}
				title={
					<>
						<PercentageOutlined /> {dataToUpdate ? t('billing.tax.update_title') : t('billing.tax.create_title')}
					</>
				}
				visible={isModalVisible}
				onCancel={() => setModalVisible(false)}
				footer={null}>
				<TaxForm dataToUpdate={dataToUpdate} setModalVisible={setModalVisible} />
			</Modal>

			<Modal
				destroyOnClose
				width='100%'
				title={t('billing.tax.history-title')}
				visible={isHistoryModalVisible}
				onCancel={() => setHistoryModalVisible(false)}
				footer={null}>
				<History
					url='/helper/get-model-history?service=Billing&model=Tax'
					id={Number(dataToUpdate?.id)}
					historyName='tax'
				/>
			</Modal>
		</>
	)
}

export default BillingTaxesPage
