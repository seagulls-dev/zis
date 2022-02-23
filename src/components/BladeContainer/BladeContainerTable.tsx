import React from 'react'
import { Button, Space, Table } from 'antd'
import { BladeContainerDetails } from 'pages/inventory/bladecontainer/models'
import { useTranslation } from 'react-i18next'
import { CustomerDetails } from 'pages/billing/customer/models'
import InsertBladeForm from './InsertBladeForm'
import NestedPhysicalServersTable from 'components/PhysicalServer/PhysicalServersTable/NestedPhysicalServersTable'
import { AppState } from 'common/models'
import { useSelector } from 'react-redux'

interface Props {
  isLoading?: boolean
  handleUpdate?: (record: BladeContainerDetails) => void
  onDelete?: (id: number) => void
  customers?: CustomerDetails[]
}

const BladeContainerTable = (props: Props) => {
  const { t } = useTranslation()
  const { inventorylocation } = useSelector((state: AppState) => state.inventorylocation)
  const { inventories } = useSelector((state: AppState) => state.inventory)
  const { bladecontainers, isLoading, isSaving } = useSelector((state: AppState) => state.bladecontainer)
  const { racks } = useSelector((state: AppState) => state.rack)

  const columns = [
    { title: t('BladeContainersPage.name'), dataIndex: 'name', key: 'name' },
    {
      title: t('BladeContainersPage.case_id'), dataIndex: 'case_id', key: 'case_id',
      render: (text: number) => inventories?.find(inv => inv.id === text)?.name
    },
    {
      title: t('BladeContainersPage.location_id'), dataIndex: 'location_id', key: 'location_id',
      render: (text: number) => inventorylocation?.find(loc => loc.id === text)?.name
    },
    { title: t('BladeContainersPage.count'), dataIndex: 'count', key: 'count' },
    { title: t('BladeContainersPage.u_size'), dataIndex: 'u_size', key: 'u_size' },
    {
      title: t('BladeContainersPage.rack_id'), dataIndex: 'rack_id', key: 'rack_id',
      render: (text: number) => racks?.find(rack => text === rack.id)?.name
    },
    { title: t('BladeContainersPage.rack_pos'), dataIndex: 'rack_pos', key: 'rack_pos' },
    {
      title: 'Actions', key: 'action', dataIndex: 'action', width: 140,
      render: (_: string, record: BladeContainerDetails) => (
        <Space size='middle'>
          <Button size='small' onClick={() => props.handleUpdate && props.handleUpdate(record)}>
            {t('ipSubnetPage.update')}
          </Button>
          <InsertBladeForm bladeContainer={record} />
        </Space>
      ),
    }
  ]

  return (
    <Table<BladeContainerDetails>
      columns={columns}
      dataSource={bladecontainers}
      scroll={{ x: 'max-content' }}
      rowKey='id'
      loading={isSaving || isLoading}
      expandable={{
        expandedRowRender: record =>
          <NestedPhysicalServersTable
            bladeContainer={record}
          />
      }}
    />
  )
}

export default BladeContainerTable