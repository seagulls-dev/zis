import React, { useState, useEffect } from 'react'
import { Card, Button, Modal, message } from 'antd'
import { PlusCircleOutlined, ApartmentOutlined, ArrowsAltOutlined } from '@ant-design/icons/lib/icons'
import { useTranslation } from 'react-i18next'
import IpSubnetForm from 'components/IpSubnetForm/IpSubnetForm'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'common/models'
import getCustomers from 'pages/billing/customer/actions/getCustomers'
import getListIpSubnet from './actions/getIpSubnets'
import IpSubnetTable from 'components/IpSubnetTable/IpSubnetTable'
import { IpSubnetDetails, UpdateSubnetIpParams } from './models'
import createIpSubnet from './actions/createIpSubnet'
import deleteIpSubnet from './actions/deleteIpSubnet'
import updateIpSubnet from './actions/updateIpSubnet'

const IpSubnetPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [dataToUpdate, setDataToUpdate] = useState<IpSubnetDetails>()
  const [isVisible, setVisible] = useState<boolean>(false)
  const { isLoading: isCustomersLoading, customers } = useSelector((state: AppState) => state.customer)
  const { isLoading: isListIpSubnetLoading, ipSubnets } = useSelector((state: AppState) => state.ipSubnet)


  useEffect(() => {
    dispatch(getCustomers('company'))
    dispatch(getListIpSubnet())
    // eslint-disable-next-line
  }, [])

  const hideModal = () => {
    setVisible(false)
    setDataToUpdate(undefined)
  }
  const showModal = () => setVisible(true)

  const ipSubnetCreate = (values: IpSubnetDetails) => {
    dispatch(createIpSubnet(
      {
        ...values,
        ipmi: values.ipmi ? 1 : 0
      },
      isSuccess => {
        if (isSuccess) {
          hideModal()
          message.success(t('ipSubnetPage.ip_created'))
        }
      })
    )

  }

  const ipSubnetDelete = (id: number) => {
    dispatch(
      deleteIpSubnet(id,
        isSuccess => {
          if (isSuccess) {
            hideModal()
            message.success(t('ipSubnetPage.ip_deleted'))
          }
        }
      )
    )
  }

  const ipSubnetUpdate = (values: UpdateSubnetIpParams) => {
    dispatch(
      updateIpSubnet({
        ...values,
        ipmi: values.ipmi ? 1 : 0,
      },
        isSuccess => {
          if (isSuccess) {
            hideModal()
            setDataToUpdate(undefined)
            message.success(t('ipSubnetPage.ip_updated'))
          }
        }
      )
    )
    setDataToUpdate(undefined)
  }

  const handleUpdate = (values: IpSubnetDetails) => {
    setDataToUpdate(values)
    showModal()
  }

  return (
    <Card
      title={<><ArrowsAltOutlined /> {t('ipSubnetPage.title')}</>}
      extra={<Button type='primary' onClick={() => setVisible(true)}><PlusCircleOutlined /> ADD </Button>}
      className='IpSubnetsPage'
      loading={isCustomersLoading || isListIpSubnetLoading}
    >

      <IpSubnetTable
        ipSubnet={ipSubnets}
        onDelete={ipSubnetDelete}
        handleUpdate={handleUpdate}
        customers={customers}
      />

      <Modal
        destroyOnClose
        style={{ top: 20 }}
        width={900}
        title={<><ApartmentOutlined /> &nbsp; {!!dataToUpdate ? t('ipSubnetPage.update_subnet') : t('ipSubnetPage.create_subnet')}</>}
        visible={isVisible}
        onCancel={hideModal}
        footer={null}
      >
        <IpSubnetForm
          ipSubnetCreate={ipSubnetCreate}
          customers={customers}
          dataToUpdate={dataToUpdate}
          ipSubnetUpdate={ipSubnetUpdate}
        />

      </Modal>

    </Card >
  )
}

export default IpSubnetPage