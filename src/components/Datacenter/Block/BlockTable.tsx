import { Space, Table } from 'antd'
import Button from 'antd-button-color'
import { AppState } from 'common/models'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import { BlockDetails } from 'pages/datacenter/block/models'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

interface TableProps {
  setDataToUpdate?: (values: BlockDetails) => void
  showModal: () => void
  onDelete: (id: number) => void
}
const BlockTable = (props: TableProps) => {
  const { t } = useTranslation()
  const { blocks, isLoading: isBlocksLoading } = useSelector((state: AppState) => state.block)
  const { racks, isLoading: isRacksLoading } = useSelector((state: AppState) => state.rack)

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: t('BlockPage.rack_id'),
      dataIndex: 'rack_id',
      key: 'rack_id',
      render: (text: number) => racks?.find(r => r.id === text)?.name
    },
    {
      title: t('BlockPage.rack_pos'),
      dataIndex: 'rack_pos',
      key: 'rack_pos',
    },
    {
      title: t('BlockPage.u_size'),
      dataIndex: 'u_size',
      key: 'u_size',
    },
    {
      title: t('BlockPage.comment'),
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: t('BlockPage.action'),
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Button
            type='primary'
            size='small'
            onClick={ () => {
              props.setDataToUpdate && props.setDataToUpdate(record)
              props.showModal()
            }
            }
          >
            { t('customerPage.edit') }
          </Button>
          <PopConfirmZis
            onConfirm={ () => props.onDelete(record.id) }
          >
            <Button type='primary' danger size='small'>
              { t('usersPage.delete') }
            </Button>
          </PopConfirmZis >
        </Space>
      ),
    },
  ]

  return (
    <Table<BlockDetails>
      columns={ columns }
      dataSource={ blocks }
      rowKey='id'
      loading={ isBlocksLoading || isRacksLoading }
    />
  )
}

export default BlockTable 
