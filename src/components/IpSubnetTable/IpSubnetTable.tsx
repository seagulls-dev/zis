import React, { useState, useEffect } from 'react'
import { Table, AutoComplete, Space, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import Highlighter from 'react-highlight-words'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import { CustomerDetails } from 'pages/billing/customer/models'
import { IpSubnetDetails } from 'pages/ip/ip-subnet/models'

interface Props {
  ipSubnet: IpSubnetDetails[] | undefined
  onDelete: (id: number) => void
  handleUpdate: (record: IpSubnetDetails) => void
  customers?: CustomerDetails[]
}

const IpSubnetTable = ({ ipSubnet, onDelete, handleUpdate, customers }: Props) => {
  const { t } = useTranslation()
  const [dataSource, setDataSource] = useState<IpSubnetDetails[]>()
  const [addressValue, setAddressValue] = useState('')

  useEffect(() => {
    setDataSource(ipSubnet)
  }, [ipSubnet])

  const FilterByIpPrefixInput = (
    ipSubnet && <AutoComplete
      placeholder={t('ipSubnetPage.ip_with_prefix')}
      options={ipSubnet.map(v => ({ 'value': v.cidr }))}
      style={{ width: 200 }}
      value={addressValue}
      onChange={(currValue) => {
        setAddressValue(currValue)
        const filteredData = ipSubnet.filter(entry => (
          entry.cidr.toLowerCase().includes(currValue.toLowerCase())
        ))
        setDataSource(filteredData)
      }}
      filterOption={(inputValue, option) =>
        option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    />
  )

  const columns = [
    {
      title: t('ipSubnetPage.id'), dataIndex: 'id', key: 'id',
      sorter: (a, b) => a.id - b.id
    }, {
      title: FilterByIpPrefixInput, dataIndex: 'cidr', key: 'cidr',
      render: (text: string) => (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', color: '#2d9259', padding: 0 }}
          searchWords={[addressValue]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
    }, {
      title: t('ipSubnetPage.gateway'), dataIndex: 'gateway', key: 'gateway',
      sorter: (a, b) => a.gateway - b.gateway
    }, {
      title: t('ipSubnetPage.ipmi'), dataIndex: 'ipmi', key: 'ipmi',
      render: (record: 1 | 0) => record === 1 ? 'Yes' : 'No',
      filters: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }],
      onFilter: (value: string | number | boolean, record: IpSubnetDetails) => record.ipmi === value,
    }, {
      title: t('ipSubnetPage.vlan'), dataIndex: 'vlan', key: 'vlan',
    }, {
      title: t('ipSubnetPage.location'), dataIndex: 'location', key: 'location',
    }, {
      title: t('ipSubnetPage.dns_id'), dataIndex: 'dns_id', key: 'dns_id',
      sorter: (a, b) => a.dns_id - b.dns_id
    }, {
      title: t('ipSubnetPage.customer_id'), dataIndex: 'customer_id', key: 'customer_id',
      sorter: (a, b) => a.customer_id - b.customer_id,
      render: (text: string, record: IpSubnetDetails) => (
          customers && customers.find(customer => customer.id === record.customer_id)?.company?.name
      )
    }, {
      title: 'Action', key: 'action', dataIndex: 'action', width: 140,
      render: (text: string, record: IpSubnetDetails) => (
        <Space size='middle'>
          <Button size='small' onClick={() => handleUpdate(record)}>
            {t('ipSubnetPage.update')}
          </Button>
          <PopConfirmZis
            onConfirm={() => onDelete(record.id)}
            placement='leftTop'
          >
            <Button type='primary' danger size='small'>
              {t('ipSubnetPage.delete')}
            </Button>
          </PopConfirmZis >
        </Space>
      ),
    }
  ]

  return (
    <>
      <Table<IpSubnetDetails>
        dataSource={dataSource}
        columns={columns}
        rowKey={record => `${record.id}`}
        showHeader={true}
        style={{ whiteSpace: 'pre' }}
      />
    </>
  )
}

export default IpSubnetTable
