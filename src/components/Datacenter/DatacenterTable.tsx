import React from 'react'
import { Space, Table } from 'antd'
import Button from 'antd-button-color'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import { DataCenterDetails } from 'pages/datacenter/datacenter/models'
import { useTranslation } from 'react-i18next'
import { AppState } from 'common/models'
import { useSelector } from 'react-redux'

interface TableProps {
  setDataToUpdate?: (values: DataCenterDetails) => void
  showModal: () => void
  onDelete: (id: number) => void
}
const DatacenterTable = (props: TableProps) => {
  const { t } = useTranslation()
  const { inventorylocation } = useSelector((state: AppState) => state.inventorylocation)
  const { datacenters } = useSelector((state: AppState) => state.datacenter)

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: t('DatacenterPage.name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('DatacenterPage.location_id'),
      dataIndex: 'location_id',
      key: 'location_id',
      render: (text: number) => inventorylocation?.find(l => l.id === text)?.name
    }, {
      title: 'Action',
      key: 'action',
      render: (_, record: DataCenterDetails) => (
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
    <Table<DataCenterDetails>
      columns={columns}
      dataSource={datacenters}
      rowKey='id'
    />
  )
}

export default DatacenterTable
