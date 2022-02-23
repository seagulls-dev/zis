import React, { useEffect, useState } from 'react'
import { Card, Modal, message } from 'antd'
import { GlobalOutlined, PlusCircleOutlined } from '@ant-design/icons/lib/icons'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'common/models'
import { DnsServiceDetails } from './models'
import Button from 'antd-button-color'
import DnsServiceForm from 'components/Dns/DnsServiceForm'
import getServers from 'pages/server/actions/getServers'
import getDnsServices from './actions/getDnsServices'
import updateDnsService from './actions/updateDnsService'
import createDnsService from './actions/createDnsService'
import deleteDnsService from './actions/deleteDnsService'
import DnsServiceTable from 'components/Dns/DnsServiceTable'
import './DnsServicePage.scss'

const DnsServicePage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [ isDnsModalVisible, setDnsModalVisible ] = useState<boolean>( false )
  const [ dataToUpdate, setDataToUpdate ] = useState<DnsServiceDetails>()
  const { isLoading } = useSelector( ( state: AppState ) => state.dnsservice )

  useEffect( () => {
    dispatch( getDnsServices() )
    dispatch( getServers() )
    //eslint-disable-next-line
  }, [] )

  const handleUpdate = ( record: DnsServiceDetails ) => {
    setDataToUpdate( record )
    setDnsModalVisible( true )
  }
  const handleCreate = () => {
    setDataToUpdate( undefined )
    setDnsModalVisible( true )
  }
  const handleDelete = ( id: number ) => {
    dispatch( deleteDnsService( id, isOk => isOk && message.success( t( 'dnsPage.deleted' ) ) ) )
  }

  const onFinish = ( values: DnsServiceDetails ) => {
    dataToUpdate ? dispatch( updateDnsService(
      { ...values, id: dataToUpdate.id, },
      isOk => {
        if ( isOk ) {

          message.success( t( 'dnsPage.updated' ) )
        }
      } ) )
      : dispatch( createDnsService( { ...values, }, ( isOk ) => isOk && message.success( t( 'dnsPage.created' ) ), ), )
  }

  return (
    <>
      <Card
        loading={ isLoading }
        className='DnsServicePage'
        title={ <><GlobalOutlined /> &nbsp;{ t( 'dnsPage.title' ) }</> }
        extra={
          <Button type='primary' onClick={ handleCreate }>
            <PlusCircleOutlined /> { t( 'dnsPage.create_button' ) }
          </Button>
        }
      >
        <DnsServiceTable handleDelete={ handleDelete } handleUpdate={ handleUpdate } />
      </Card>

      <Modal
        destroyOnClose
        style={ { top: 20 } }
        width={ 600 }
        title={
          <>
            <GlobalOutlined /> &nbsp;
            {
              dataToUpdate
                ? <>{ t( 'dnsPage.update_title' ) }</>
                : <>{ t( 'dnsPage.create_title' ) }</>
            }
          </>
        }
        visible={ isDnsModalVisible }
        onCancel={ () => setDnsModalVisible( false ) }
        footer={ null }
        confirmLoading={ true }
      >
        <DnsServiceForm dataToUpdate={ dataToUpdate } onFinish={ onFinish } />
      </Modal>

    </>
  )
}

export default DnsServicePage
