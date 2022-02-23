import {MinusOutlined, GroupOutlined} from '@ant-design/icons'
import Button from 'antd-button-color'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import removeFromRack from 'pages/inventory/physicalserver/actions/removeFromRack'
import {PhysicalServerDetails} from 'pages/inventory/physicalserver/models'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'


interface Props {
  physicalServer: PhysicalServerDetails
}

const PhysicalServerRemoveFromRackForm = (props: Props) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const onRemoveFromRack = (id: number) => dispatch(removeFromRack({server_id: id}))



  return (
    <PopConfirmZis
      title={`${t('physicalServersPage.remove-from-rack')}?`}
      onConfirm={() => onRemoveFromRack(props.physicalServer.id)}
    >
      <Button type='warning' size='small' title={t('physicalServersPage.remove-from-rack')}>
        <MinusOutlined /><GroupOutlined />
      </Button>
    </PopConfirmZis>
  )
}
export default PhysicalServerRemoveFromRackForm