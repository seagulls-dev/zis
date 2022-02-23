import React from 'react'
import { useTranslation } from 'react-i18next'
import { RackDetails } from 'pages/datacenter/rack/models'
import { Space, Table, Tooltip } from 'antd'
import Button from 'antd-button-color'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import { useSelector } from 'react-redux'
import { AppState } from 'common/models'

interface TableProps {
  setDataToUpdate?: (values: RackDetails) => void
  showModal: () => void
  onDelete: (id: number) => void
}
const RackTable = (props: TableProps) => {
  const { t } = useTranslation()
  const { racks, isLoading: isRackLoding } = useSelector((state: AppState) => state.rack)
  const { datacenters, isLoading: isDatacenterLoading } = useSelector((state: AppState) => state.datacenter)
  const { inventorylocation, isLoading: isLocationLoading } = useSelector((state: AppState) => state.inventorylocation)

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: t('RackPage.name'), dataIndex: 'name', key: 'name', },
    {
      title: t('RackPage.datacenter_id'), dataIndex: 'datacenter_id', key: 'datacenter_id',
      render: (text: number) => {
        let dataCenter = datacenters?.find(dc => dc.id === text)
        let location = inventorylocation?.find(loc => loc.id === dataCenter?.location_id)
        return <Tooltip title={location?.name}>{dataCenter?.name}</Tooltip>
      }
    },
    { title: t('RackPage.u_count'), dataIndex: 'u_count', key: 'u_count', },
    {
      title: t('RackPage.action'), key: 'action',
      render: (_, record: RackDetails) => (
        <Space size='middle'>
          <Button
            type='primary'
            size='small'
            onClick={() => {
              props.setDataToUpdate && props.setDataToUpdate(record)
              props.showModal()
            }
            }
          >
            {t('customerPage.edit')}
          </Button>
          <PopConfirmZis
            onConfirm={() => props.onDelete(record.id)}
          >
            <Button type='primary' danger size='small'>
              {t('usersPage.delete')}
            </Button>
          </PopConfirmZis >
        </Space>
      ),
    },
  ]

  return (
    <Table<RackDetails>
      columns={columns}
      dataSource={racks}
      rowKey='id'
      loading={isRackLoding || isDatacenterLoading || isLocationLoading}
    />
  )
}
export default RackTable