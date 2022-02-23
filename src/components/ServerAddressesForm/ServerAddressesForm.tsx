import React from 'react'
import { Select } from 'antd'
import { AppState } from 'common/models'
import addIpToServer from 'pages/server/actions/addIpToServer'
import removeIpFromServer from 'pages/server/actions/removeIpFromServer'
import { ServerDetails } from 'pages/server/models'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  server: ServerDetails
}

const ServerAddressesForm = ( props: Props ) => {
  const server_id = useDispatch()
  const { ips } = useSelector( ( state: AppState ) => state.ip )

  const onSelect = ( v: number ) => {
    server_id( addIpToServer( { server_id: props.server?.id, address_id: v } ) )
  }
  const onDeselect = ( v: number ) => {
    server_id( removeIpFromServer( { server_id: props.server?.id, address_id: v } ) )
  }
  return (
    <Select
      mode='multiple'
      showArrow
      optionFilterProp='label'
      options={ ips?.map( a => ( { label: a.address, value: a.id, key: a.id } ) ) }
      style={ { width: '200px' } }
      placeholder="Please select"
      defaultValue={ props.server?.addresses?.map( a => a.id ) }
      onSelect={ onSelect }
      onDeselect={ onDeselect }
    />
  )
}

export default ServerAddressesForm