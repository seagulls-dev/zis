import React, { useState } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { Tooltip, Button } from 'antd'
import { AppState } from 'common/models'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import deleteDnsZone from 'pages/dns/zone/actions/deleteDnsZone'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  zone: string
  serviceId: number
}

const DnsZoneDelete = ( props: Props ) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [ domainForDelete, setDomainForDelete ] = useState<string>()
  const { isSaving } = useSelector( ( state: AppState ) => state.dnszone )

  const onDnsZoneDelete = ( z: string ) => {
    setDomainForDelete( z )
    dispatch( deleteDnsZone( {
      domain: z,
      service_id: props.serviceId
    } ) )
  }

  return (
    <PopConfirmZis onConfirm={ e => {
      onDnsZoneDelete( props.zone )
      e.stopPropagation()
    } }
      onCancel={ e => e.stopPropagation() }
    >
      <Tooltip title={ t( 'dnsPage.remove_zone' ) } placement='bottom'>
        <Button
          loading={ isSaving && domainForDelete === props.zone }
          type='text'
          size='small'
          icon={ <DeleteOutlined style={ { fontSize: 22 } } /> }
          onClick={ e => e.stopPropagation() }
        />
      </Tooltip>
    </PopConfirmZis>
  )
}

export default DnsZoneDelete