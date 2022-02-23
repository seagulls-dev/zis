import React, {useEffect, useState} from 'react'
import {Space, Table, AutoComplete, Input} from 'antd'
import {HistoryOutlined} from '@ant-design/icons/lib/icons'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import {CustomerDetails} from 'pages/billing/customer/models'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'
import Button from 'antd-button-color'
import {AppState} from 'common/models'
import {useSelector} from 'react-redux'
import {DeleteTwoTone, EditTwoTone} from '@ant-design/icons'
import {ColumnsType} from 'antd/es/table'

interface Props {
	onDelete: (id: number) => void
	setDataToUpdate: (values: CustomerDetails) => void
	showModal: () => void
	setHistoryModalVisible: (visible: boolean) => void
}

const CustomerTable = (props: Props) => {
	const {t} = useTranslation()
	const {users} = useSelector((state: AppState) => state.user)
	const {isLoading, customers} = useSelector((state: AppState) => state.customer)

  const { settings } = useSelector((state : AppState) => state.setting)
  const [pageSize, setPageSize] = useState<string>()

  const [ident, setIdent] = useState('')
  const [dataSource, setDataSource] = useState<CustomerDetails[]>()

  useEffect(() => {
    const shown_customers = customers?.filter((item:CustomerDetails) => item.id !== 1)
    setDataSource(shown_customers)
    const size = settings?.find(item => item.name === 'grid_page_size')
    setPageSize(size?.value)
  },[customers])

  const FilterByName = customers && (
    <Input
      placeholder={t('customerPage.company_id')}
      value={ident}
      onChange={e => {
        const value = e.target.value
        setIdent(value)
        const shown_customers = customers?.filter((item:CustomerDetails) => item.id !== 1)
        const filteredData = shown_customers.filter(item => item.ident?.toLowerCase().includes(value.toLowerCase()))
        setDataSource(filteredData)
      }}
    />
  )


	const columns: ColumnsType<CustomerDetails> = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: FilterByName,
			dataIndex: 'ident',
			key: 'ident',
			width: '250px',
			render: (text, record) => (
				<Link to={`/billing/customer-services/${record.id}`} title={t('customerPage.services')}>
					{text}
				</Link>
			),
		},
		{
			title: t('customerPage.owner_id'),
			dataIndex: 'owner_id',
			key: 'owner_id',
			render: (text, record) => {
				let userObj = users && users.find((user) => user.id === Number(text))
				return userObj && `${userObj.name && userObj.name} ${userObj.surname && userObj.surname}`
			},
		},
		{
			title: t('customerPage.administrative_id'),
			dataIndex: 'administrative_id',
			key: 'administrative_id',
			render: (text, record) => {
				let userObj = users && users.find((user) => user.id === Number(text))
				return userObj && userObj.name && `${userObj.name} ${userObj.surname && userObj.surname}`
			},
		},
		{
			title: t('customerPage.technical_id'),
			dataIndex: 'technical_id',
			key: 'technical_id',
			render: (text, record) => {
				let userObj = users && users.find((user) => user.id === Number(text))
				return userObj && `${userObj.name && userObj.name} ${userObj.surname && userObj.surname}`
			},
		},
		{
			title: t('customerPage.billing_period'),
			dataIndex: 'billing_period',
			key: 'billing_period',
		},
		{
			title: t('customerPage.billing_currency'),
			dataIndex: 'billing_currency',
			key: 'billing_currency',
		},
		{
			title: '',
			key: 'action',
			dataIndex: 'action',
			width: 140,
			render: (_text, record) => (
				<Space size='middle'>
					<Button
						type='text'
						size='small'
						icon={<EditTwoTone twoToneColor='green' />}
						onClick={() => {
							props.showModal()
							props.setDataToUpdate(record)
						}}
					/>

					<PopConfirmZis onConfirm={() => props.onDelete(record.id)}>
						<Button
							type='text'
							danger
							size='small'
							disabled={!!record.deleted_at}
							icon={<DeleteTwoTone twoToneColor='red' />}
						/>
					</PopConfirmZis>

					<Button
						size='small'
						onClick={() => {
							props.setDataToUpdate(record)
							props.setHistoryModalVisible(true)
						}}
						icon={<HistoryOutlined />}
						title={t('billing.customer.service-history-button')}
					/>
				</Space>
			),
		},
	]

	return (
	  <>
      {
        pageSize &&
        <Table<CustomerDetails>
            dataSource={dataSource}
            columns={columns}
            rowKey={(record) => `${record.id}`}
            showHeader={true}
            className='CustomersTable'
            loading={isLoading}
            scroll={{x: 'max-content'}}
            pagination={{defaultPageSize: parseInt(pageSize)}}
        />
      }
    </>

  )
}

export default CustomerTable
