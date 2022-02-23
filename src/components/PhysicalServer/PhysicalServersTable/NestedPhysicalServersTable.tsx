import React from 'react'
import { Table } from 'antd'
import { useTranslation } from 'react-i18next'
import { PhysicalServerDetails } from 'pages/inventory/physicalserver/models'
import MoveBladeForm from 'components/BladeContainer/MoveBladeForm'
import ReallocateBladeForm from 'components/BladeContainer/ReallocateBladeForm'
import InsertBladeForm from 'components/BladeContainer/InsertBladeForm'
import { BladeContainerDetails } from 'pages/inventory/bladecontainer/models'
import { AppState } from 'common/models'
import { useSelector } from 'react-redux'
import { arrayFromCount } from 'helpers/arrayHelpers'

interface Props {
  bladeContainer: BladeContainerDetails
}

const NestedPhysicalServersTable = (props: Props) => {
  const { t } = useTranslation()
  const { inventorylocation } = useSelector((state: AppState) => state.inventorylocation)
  const { inventories } = useSelector((state: AppState) => state.inventory)

  const columns = [
    { title: t('physicalServersPage.position_index'), dataIndex: 'position_index', key: 'position_index' },
    {
      title: t('physicalServersPage.case_id'), dataIndex: 'case_id', key: 'case_id', sorter: (a, b) => a.id - b.id,
      render: (text: number) => inventories?.find(inv => inv.id === text)?.name
    },
    { title: t('physicalServersPage.ident'), dataIndex: 'ident', key: 'ident', sorter: (a, b) => a.id - b.id },
    {
      title: t('physicalServersPage.location_id'), dataIndex: 'location_id', key: 'location_id', sorter: (a, b) => a.id - b.id,
      render: (text: number, record: PhysicalServerDetails) =>
        text ? <ReallocateBladeForm
          server={record}
          text={inventorylocation?.find(loc => loc.id === text)?.name}
        /> : ''

    },
    { title: t('physicalServersPage.rack_id'), dataIndex: 'rack_id', key: 'rack_id', sorter: (a, b) => a.id - b.id },
    { title: t('physicalServersPage.rack_pos'), dataIndex: 'rack_pos', key: 'rack_pos', sorter: (a, b) => a.id - b.id },
    { title: t('physicalServersPage.server_conf'), dataIndex: 'server_conf', key: 'server_conf', sorter: (a, b) => a.id - b.id },
    { title: t('physicalServersPage.power'), dataIndex: 'power', key: 'power', sorter: (a, b) => a.id - b.id },
    { title: t('physicalServersPage.u_size'), dataIndex: 'u_size', key: 'u_size', sorter: (a, b) => a.id - b.id },
    {
      title: 'Action', key: 'action', dataIndex: 'action', width: 140,
      render: (text: string, record: PhysicalServerDetails) =>
        record.location_id ? <MoveBladeForm
          server={record}
          slotCount={props.bladeContainer.count}
        /> : <InsertBladeForm
            bladeContainer={props.bladeContainer}
            position={record.position_index} />

    }
  ]

  return (
    <Table<PhysicalServerDetails>
      pagination={false}
      scroll={{ x: 'max-content' }}
      columns={columns}
      // dataSource={props.physicalServers}
      dataSource={
        arrayFromCount(props.bladeContainer.count)
          .map(
            slot => {
              let row = props.bladeContainer.physicalServers?.find(s => s.position_index === slot)
              if (row)
                return row
              else
                return { id: slot, position_index: slot, ident: '', location_id: 0 }
            }

          )
      }
      rowKey='position_index'
    />
  )
}

export default NestedPhysicalServersTable