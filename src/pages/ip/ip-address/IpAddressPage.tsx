import React, { useState, useEffect } from 'react'
import { Card, Button, message, Modal } from 'antd'
import { PlusCircleOutlined, ApartmentOutlined } from '@ant-design/icons/lib/icons'
import { useTranslation } from 'react-i18next'
import CreateIpAddressForm from 'components/IpAddressForm/CreateIpAddressForm'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'common/models'
import getCustomers from 'pages/billing/customer/actions/getCustomers'
import createIp from './actions/createIp'
import { CreateIpParams, IpDetails, UpdateIpParams } from './models'
import listIp from './actions/getIps'
import IpAddressTable from 'components/IpAddressTable/IpAddressTable'
import deleteIp from './actions/deleteIp'
import updateIp from './actions/updateIp'
import UpdateIpAddressForm from 'components/IpAddressForm/UpdateIpAddressForm'
import getIpSubnets from 'pages/ip/ip-subnet/actions/getIpSubnets'


const IpAddressPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [dataToUpdate, setDataToUpdate] = useState<IpDetails>()
  const { isLoading: isCustomersLoading, customers } = useSelector((state: AppState) => state.customer)
  const { isLoading: isIpLoading, ips } = useSelector((state: AppState) => state.ip)
  const { ipSubnets } = useSelector((state: AppState) => state.ipSubnet)

  const showModal = () => setModalVisible(true)

  const hideModal = () => {
    setModalVisible(false)
    setDataToUpdate(undefined)
  }

  useEffect(() => {
    dispatch(listIp())
    dispatch(getCustomers('company'))
    dispatch(getIpSubnets())
    // eslint-disable-next-line
  }, [])

  const ipAddressCreate = (values: CreateIpParams) => {
    dispatch(createIp({ ...values },
      isSuccess => {
        if (isSuccess) {
          hideModal()
          message.success(t('ipAddressPage.ip_created'))
        }
      })
    )
  }

  const ipAddressDelete = (id: number) => {
    dispatch(
      deleteIp(id,
        isSuccess => {
          if (isSuccess) {
            message.success(t('ipAddressPage.ip_deleted'))
            hideModal()
          }
        }
      )
    )
  }

  const ipAddressUpdate = (values: UpdateIpParams) => {
    dispatch(
      updateIp({
        ...values
      },
        isSuccess => {
          if (isSuccess) {
            message.success(t('ipAddressPage.ip_updated'))
            setDataToUpdate(undefined)
            hideModal()
          }
        }
      )
    )
  }

  const handleUpdate = (values: IpDetails) => {
    setDataToUpdate(values)
    showModal()
  }

  return (
    <Card
      title={t('ipAddressPage.title')}
      extra={<Button type='primary' onClick={showModal}><PlusCircleOutlined /> ADD </Button>}
      className='IpAddressPage'
      loading={isIpLoading}
    >
      <IpAddressTable
        ips={ips}
        onDelete={ipAddressDelete}
        handleUpdate={handleUpdate}
        customers={customers}
        ipSubnets={ipSubnets}
      />

      <Modal
        destroyOnClose
        style={{ top: 20 }}
        width={700}
        title={
          <>
            <ApartmentOutlined /> &nbsp;
            {
              dataToUpdate ? t('ipAddressPage.update_ip_address') : t('ipAddressPage.add_ip_address')
            }
          </>
        }
        visible={isModalVisible}
        onCancel={hideModal}
        footer={null}
        confirmLoading={isCustomersLoading}
      >

        {
          dataToUpdate ? <UpdateIpAddressForm
            customers={customers}
            dataToUpdate={dataToUpdate}
            onUpdate={ipAddressUpdate}
            ipSubnets={ipSubnets}
          /> : <CreateIpAddressForm
              handleIpAddressFinish={ipAddressCreate}
              customers={customers}
              ipSubnets={ipSubnets}
            />
        }

      </Modal>

    </Card>
  )
}

export default IpAddressPage