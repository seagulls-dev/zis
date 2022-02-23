import { ExportOutlined } from '@ant-design/icons'
import { Tooltip, Button } from 'antd'
import { protectedApiClient } from 'helpers/api'
import { downloadTxtFile } from 'helpers/fileHelpers'
import { serializeParams } from 'helpers/stringHelpers'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  zone: string
  serviceId: number
}

const DnsZoneExport = ( props: Props ) => {
  const { t } = useTranslation()
  const [ dataToExport, setDataToExport ] = useState<string>()
  const [ nameToExport, setNameToExport ] = useState<string>()

  useEffect( () => {
    dataToExport && downloadTxtFile( dataToExport, `zone_${ nameToExport }_${ moment().unix() }.txt` )
    //eslint-disable-next-line
  }, [ dataToExport ] )

  const onDnsZoneExport = ( z: string ) => {
    setNameToExport( z )
    const params = {
      service_id: props.serviceId,
      domain: z,
    }
    const serializedParams = serializeParams( params )
    protectedApiClient
      .get<string>( `/dns/zone/export?${ serializedParams }` )
      .then( ( response ) => setDataToExport( response.data ) )
      .catch( ( error ) => error )
  }

  return (
    <Tooltip title={ t( 'dnsPage.export_record' ) } placement='bottom'>
      <Button
        type='text'
        size='small'
        icon={ <ExportOutlined style={ { fontSize: 22 } } /> }
        onClick={ e => {
          onDnsZoneExport( props.zone )
          e.stopPropagation()
        } }
      />
    </Tooltip>
  )
}

export default DnsZoneExport