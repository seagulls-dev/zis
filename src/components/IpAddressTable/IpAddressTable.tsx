import React, { useState, useEffect } from 'react'
import { Table, AutoComplete, Space, Button } from 'antd'
import { IpDetails } from 'pages/ip/ip-address/models'
import { useTranslation } from 'react-i18next'
import Highlighter from 'react-highlight-words'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import { CustomerDetails } from 'pages/billing/customer/models'
import { IpSubnetDetails } from 'pages/ip/ip-subnet/models'

interface Props {
  ips: IpDetails[] | undefined
  onDelete: (id: number) => void
  handleUpdate: (record: IpDetails) => void
  customers?: CustomerDetails[]
  ipSubnets?: IpSubnetDetails[]
}

const IpAddressTable = ({ ips, onDelete, handleUpdate, customers, ipSubnets }: Props) => {
  const { t } = useTranslation()
  const [dataSource, setDataSource] = useState<IpDetails[]>()
  const [valueIpPrefix, setIpPrefixValue] = useState('')
  const [tableRowSize, setTableRowSize] = useState<number>()
  const columns: any[] = []

  useEffect(() => {
    setDataSource(ips)
  }, [ips])


  const FilterByIpPrefixInput = (
    ips && <AutoComplete
      placeholder={t('ipAddressPage.address')}
      options={ips.map(v => ({ 'value': v.address }))}
      style={{ width: 200 }}
      value={valueIpPrefix}
      onChange={(currValue) => {
        setIpPrefixValue(currValue)
        const filteredData = ips.filter(entry => (
          entry.address.includes(currValue)
        ))
        setDataSource(filteredData)
      }}
      filterOption={(inputValue, option) =>
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    />
  )

  columns.push(
    {
      title: t('ipAddressPage.id'), dataIndex: 'id', key: 'id',
      sorter: (a, b) => a.id - b.id
    }, {
    title: FilterByIpPrefixInput, dataIndex: 'address', key: 'address',
    render: (text: string) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', color: '#2d9259', padding: 0 }}
        searchWords={[valueIpPrefix]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  },  {
    title: t('ipAddressPage.subnet_id'), dataIndex: 'subnet_id', key: 'subnet_id',
    render: (text: number) => (
      ipSubnets && ipSubnets.find(subnet => subnet.id === text)?.cidr
    )
  }, {
          title: t('ipAddressPage.used'), dataIndex: 'used', key: 'used'
  }, {
    title: t('ipAddressPage.ipv6'), dataIndex: 'ipv6', key: 'ipv6',
  }, {
    title: t('ipAddressPage.is_external'), dataIndex: 'is_external', key: 'is_external'
  }, {
    title: t('ipAddressPage.comment'), dataIndex: 'comment', key: 'comment'
  }, {
          title: t('ipAddressPage.customer_id'), dataIndex: 'customer_id', key: 'customer_id',
          filters: customers?.filter(c => dataSource?.some(i => c.id === i.customer_id)).map(c => ({ text: c.company?.name, value: c.id })),
          onFilter: (value: number, record: IpDetails) => record.customer_id === value,
          sorter: (a: IpDetails, b: IpDetails) => a.customer_id - b.customer_id,
          render: (text: number) => (
              customers && customers.find(customer => customer.id === text)?.company?.name
          )
   }, {
    title: 'Action', key: 'action', dataIndex: 'action', width: 140,
    render: (text: string, record: IpDetails) => (
      <Space size='middle'>
        <Button size='small' onClick={() => handleUpdate(record)}>
          {t('ipAddressPage.update')}
        </Button>
        <PopConfirmZis
          onConfirm={() => onDelete(record.id)}
        >
          <Button type='primary' danger size='small'>
            {t('ipAddressPage.delete')}
          </Button>
        </PopConfirmZis >
      </Space>
    ),
  }
  )

  return (
    <>
      <Table<IpDetails>
        dataSource={dataSource}
        columns={columns}
        rowKey={record => `${record.id}`}
        showHeader={true}
        style={{ whiteSpace: 'pre' }}
        pagination={{
          defaultPageSize: 25,
          pageSizeOptions: ['25', '50', '75', '100'],
          pageSize: tableRowSize,
          showSizeChanger: true,
          hideOnSinglePage: false,
          onShowSizeChange: (current, size) => setTableRowSize(size)

        }}
      />
    </>
  )
}

export default IpAddressTable
