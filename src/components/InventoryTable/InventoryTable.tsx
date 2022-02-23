import React from 'react'
import { Button, Space, Table } from 'antd'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import { InventoryDetails } from 'pages/inventory/inventory/models'
import { useTranslation } from 'react-i18next'
import { InventoryLocationDetails } from 'pages/inventory/location/models'
import { InventoryTypeDetails } from 'pages/inventory/type/models'
import { CompanyDetails } from 'pages/company/models'
import { PhysicalServerDetails } from 'pages/inventory/physicalserver/models'
import moment from 'moment'

interface Props {
  handleUpdate?: (record: InventoryDetails) => void
  onDelete?: (id: number) => void
  inventories?: InventoryDetails[]
  inventoryLocation?: InventoryLocationDetails[]
  inventoryType?: InventoryTypeDetails[]
  companies?: CompanyDetails[]
  physicalServers?: PhysicalServerDetails[]
}

const InventoryTable = (props: Props) => {
  const { t } = useTranslation()

  const columns = [
    { title: t('inventoryPage.name'), dataIndex: 'name', key: 'name', sorter: (a, b) => a.id - b.id },
    {
      title: t('inventoryPage.location_id'), dataIndex: 'location_id', key: 'location_id', sorter: (a, b) => a.id - b.id, className: 'hide',
      render: (text: number) => props.inventoryLocation?.map(loc => loc.id === text ? loc.name : '')
    },
    {
      title: t('inventoryPage.type_id'), dataIndex: 'type_id', key: 'type_id', sorter: (a, b) => a.id - b.id,
      render: (text: number) => props.inventoryType?.map(type => type.id === text ? type.name : '')
    },
    {
      title: t('inventoryPage.vendor_id'), dataIndex: 'vendor_id', key: 'vendor_id', sorter: (a, b) => a.id - b.id,
      render: (text: number) => props.companies?.map(company => company.id === text ? company.name : '')
    },
    { title: t('inventoryPage.vendor'), dataIndex: 'vendor', key: 'vendor', sorter: (a, b) => a.id - b.id },
    { title: t('inventoryPage.inv_no'), dataIndex: 'inv_no', key: 'inv_no', sorter: (a, b) => a.id - b.id },
    { title: t('inventoryPage.owner'), dataIndex: 'owner', key: 'owner', sorter: (a, b) => a.id - b.id },
    {
      title: t('inventoryPage.server_id'), dataIndex: 'server_id', key: 'server_id', sorter: (a, b) => a.id - b.id,
      render: (text: number) => props.physicalServers?.map(serv => serv.id === text ? serv.ident : '')
    },
    {
      title: t('inventoryPage.purchase_date'), dataIndex: 'purchase_date', key: 'purchase_date', sorter: (a, b) => a.id - b.id,
      render: (text: string) => text ? moment(text).format('DD.MM.YYYY') : '~'
    },
    { title: t('inventoryPage.serial'), dataIndex: 'serial', key: 'serial', sorter: (a, b) => a.id - b.id },
    { title: t('inventoryPage.warranty'), dataIndex: 'warranty', key: 'warranty', sorter: (a, b) => a.id - b.id },
    { title: t('inventoryPage.price'), dataIndex: 'price', key: 'price', sorter: (a, b) => a.id - b.id },
    { title: t('inventoryPage.parameters'), dataIndex: 'parameters', key: 'parameters', sorter: (a, b) => a.id - b.id },
    { title: t('inventoryPage.comment'), dataIndex: 'comment', key: 'comment', sorter: (a, b) => a.id - b.id },
    {
      title: 'Action', key: 'action', dataIndex: 'action', width: 140,
      render: (_: any, record: InventoryDetails) => (
        <Space size='middle'>
          <Button size='small' disabled={!props.handleUpdate} onClick={() => props.handleUpdate && props.handleUpdate(record)}>
            {t('ipSubnetPage.update')}
          </Button>
          <PopConfirmZis
            onConfirm={() => props.onDelete && props.onDelete(record.id)}
            placement='leftTop'
          >
            <Button type='primary' disabled={!props.onDelete} danger size='small'>
              {t('ipSubnetPage.delete')}
            </Button>
          </PopConfirmZis >
        </Space>
      ),
    }
  ]

  return (
    <Table<InventoryDetails>
      scroll={{ x: 'max-content' }}
      columns={columns}
      dataSource={props.inventories}
      rowKey='id'
    />
  )
}

export default InventoryTable