import React, { useState, useEffect } from 'react'
import { Card, Button, Modal, message, Space } from 'antd'
import { CloudServerOutlined, PlusCircleOutlined } from '@ant-design/icons/lib/icons'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import getServers from './actions/getServers'
import { CreateUpdateServerParams, ServerDetails } from './models'
import ServerForm from 'components/ServerForm/ServerForm'
import createServer from './actions/createServer'
import updateServer from './actions/updateServer'
import ServersTable from 'components/ServersTable/ServersTable'
import getCustomers from 'pages/billing/customer/actions/getCustomers'
import deleteServer from './actions/deleteServer'
import getIps from 'pages/ip/ip-address/actions/getIps'
import getPhysicalServers from 'pages/inventory/physicalserver/actions/getPhysicalServers'
import GlobalSearchInput from 'components/GlobalSearchInput/GlobalSearchInput'
import { AppState } from 'common/models'




const ServersPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [dataToUpdate, setDataToUpdate] = useState<ServerDetails>()
  const [ filteredData, setFilteredData ] = useState<any[]>()
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const { servers, isLoading } = useSelector( ( state: AppState ) => state.server )

  const hideModal = () => setModalVisible(false)
  const showModal = () => setModalVisible(true)

  useEffect(() => {
    dispatch(getServers())
    dispatch(getCustomers('company'))
    dispatch(getIps())
    dispatch(getPhysicalServers())
    //eslint-disable-next-line
  }, [])

  const onDelete = ( id: number ) => dispatch( deleteServer( id ) )

  const onFormSubmit = (values: CreateUpdateServerParams) => {
    dataToUpdate ?
      dispatch(updateServer({ ...values }, (isSuccess: boolean) => {
        if (isSuccess) {
          setModalVisible &&
            setModalVisible(false)
          message.info(t('serversPage.updated'))
        }
      })) :
      dispatch(createServer({ ...values }, (isSuccess: boolean) => {
        if (isSuccess) {
          setModalVisible &&
            setModalVisible(false)
          message.info(t('serversPage.created'))
        }
      }
      ))
  }

  const tabExtra = (
    <Space>

      <GlobalSearchInput dataSource={ servers } filteredData={ ( data ) => setFilteredData( data ) } searchBy={ [ 'hostname' ] } />

      <Button
        type='primary'
        onClick={ () => {
          setDataToUpdate( undefined )
          showModal()
        } }
      >
        <PlusCircleOutlined /> ADD
      </Button>
    </Space>
  )

  return (
    <>
      <Card
        title={ <><CloudServerOutlined /> &nbsp; { t( 'serversPage.title' ) }</> }
        extra={ tabExtra }
        className='ServersPage'
        loading={ isLoading }
      >

        <ServersTable
          setDataToUpdate={ setDataToUpdate }
          onDelete={ onDelete }
          showModal={ showModal }
          servers={ filteredData || servers }
        />

      </Card>

      <Modal
        destroyOnClose
        style={{ top: 20 }}
        width={500}
        title={<><CloudServerOutlined /> &nbsp; {dataToUpdate ? t('serversPage.update-server') : t('serversPage.create-server')}</>}
        visible={isModalVisible}
        onCancel={hideModal}
        footer={null}
        confirmLoading={true}
      >

        <ServerForm
          onFormSubmit={ onFormSubmit }
          dataToUpdate={ dataToUpdate }
        />

      </Modal>
    </>
  )
}

export default ServersPage