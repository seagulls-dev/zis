import React from 'react'
import {Space, Table} from 'antd'
import {useTranslation} from 'react-i18next'
import {PhysicalServerDetails} from 'pages/inventory/physicalserver/models'
import {InventoryLocationDetails} from 'pages/inventory/location/models'
import PhysicalServerRemoveForm from '../PhysicalServerRemoveForm/PhysicalServerRemoveForm'
import Button from 'antd-button-color'
import {InventoryDetails} from 'pages/inventory/inventory/models'
import PhysicalServerAddComponentForm from '../PhysicalServerAddComponentForm/PhysicalServerAddComponentForm'
import InventoryTable from 'components/InventoryTable/InventoryTable'
import PhysicalServerRemoveComponentForm from '../PhysicalServerRemoveComponentForm/PhysicalServerRemoveComponentForm'
import PhysicalServerSwapComponentForm from '../PhysicalServerSwapComponentForm/PhysicalServerSwapComponentForm'
import {useSelector} from 'react-redux'
import {AppState} from 'common/models'
import PhysicalServerSetRackForm from '../PhysicalServerSetRackForm/PhysicalServerSetRackForm'
import PhysicalServerRemoveFromRackForm from '../PhysicalServerRemoveFromRackForm/PhysicalServerRemoveFromRackForm'

interface Props {
  handleUpdate: (record: PhysicalServerDetails) => void
  physicalServers?: PhysicalServerDetails[]
  inventoryLocation?: InventoryLocationDetails[]
  inventories?: InventoryDetails[]
}

const PhysicalServersTable = (props: Props) => {
  const {t} = useTranslation()
  const {racks} = useSelector((state: AppState) => state.rack)

  const columns = [
    {title: 'ID', dataIndex: 'id', key: 'id', sorter: (a, b) => a.id - b.id},
    {title: t('physicalServersPage.ident'), dataIndex: 'ident', key: 'ident', sorter: (a, b) => a.id - b.id},
    {
      title: t('physicalServersPage.location_id'), dataIndex: 'location_id', key: 'location_id', sorter: (a, b) => a.id - b.id,
      render: (text: number, record: PhysicalServerDetails) =>
        <>
          {
            props.inventoryLocation?.find(loc => loc.id === text)?.name &&
            <PhysicalServerRemoveForm
              physicalServer={record}
              inventoryLocation={props.inventoryLocation}
              locationName={props.inventoryLocation?.find(loc => loc.id === text)?.name}
            />
          }
        </>
    },
    {
      title: t('physicalServersPage.case_id'), dataIndex: 'case_id', key: 'case_id', sorter: (a, b) => a.id - b.id,
      render: (text: number) => props.inventories?.find(inv => inv.id === text)?.name
    },
    {
      title: t('physicalServersPage.rack_id'), dataIndex: 'rack_id', key: 'rack_id', sorter: (a, b) => a.id - b.id,
      render: (text: number, record: PhysicalServerDetails) =>
        <>
          {racks?.find(r => r.id === text)?.name}
              &nbsp; &nbsp;
          {
            text ?
              <PhysicalServerRemoveFromRackForm physicalServer={record} />
              :
              <PhysicalServerSetRackForm physicalServer={record} />
          }
        </>
    },
    {title: t('physicalServersPage.u_size'), dataIndex: 'u_size', key: 'u_size', sorter: (a, b) => a.id - b.id},
    {title: t('physicalServersPage.rack_pos'), dataIndex: 'rack_pos', key: 'rack_pos', sorter: (a, b) => a.id - b.id},
    {title: t('physicalServersPage.server_conf'), dataIndex: 'server_conf', key: 'server_conf', sorter: (a, b) => a.id - b.id},
    {title: t('physicalServersPage.power'), dataIndex: 'power', key: 'power', sorter: (a, b) => a.id - b.id},
    {
      title: 'Action', key: 'action', dataIndex: 'action', width: 140,
      render: (text: string, record: PhysicalServerDetails) => (
        <Space size='small'>
          <Button size='small' onClick={() => props.handleUpdate(record)}>
            {t('ipSubnetPage.update')}
          </Button>

          <PhysicalServerAddComponentForm
            physicalServer={record}
            inventories={props.inventories}
          />

          <PhysicalServerRemoveComponentForm
            physicalServer={record}
            inventories={props.inventories}
            inventoryLocation={props.inventoryLocation}
          />

          <PhysicalServerSwapComponentForm
            physicalServer={record}
            inventories={props.inventories}
            inventoryLocation={props.inventoryLocation}
          />
        </Space>
      ),
    }
  ]

  return (
    <Table<PhysicalServerDetails>
      scroll={{x: 'max-content'}}
      columns={columns}
      dataSource={props.physicalServers}
      rowKey='ident'
      expandable={{
        expandedRowRender: record =>
          <InventoryTable
            inventories={record.serverComponents}
            inventoryLocation={props.inventoryLocation}
          />
      }}
    />
  )
}

export default PhysicalServersTable