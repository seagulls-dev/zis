import React, { useState, useEffect } from 'react'
import { Card, Button, Modal, message } from 'antd'
import { PicCenterOutlined, PlusCircleOutlined } from '@ant-design/icons/lib/icons'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { RackDetails } from './models'
import RackForm from 'components/Datacenter/Rack/RackForm'
import RackTable from 'components/Datacenter/Rack/RackTable'
import updateRack from './actions/updateRack'
import getDatacenters from '../datacenter/actions/getDatacenters'
import deleteRack from './actions/deleteRack'
import createRack from './actions/createRack'
import getRacks from './actions/getRacks'
import getLocations from 'pages/inventory/location/actions/getLocations'

const RackPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [dataToUpdate, setDataToUpdate] = useState<RackDetails>()
  const [isModalVisible, setModalVisible] = useState<boolean>(false)

  useEffect(() => {
    dispatch(getDatacenters())
    dispatch(getRacks())
    dispatch(getLocations())
    //eslint-disable-next-line
  }, [])

  const hideModal = () => setModalVisible(false)
  const showModal = () => setModalVisible(true)

  const onFinish = (values: RackDetails) => {
    dataToUpdate ?
      dispatch(updateRack(
        { ...values, id: dataToUpdate?.id },
        isOk => {
          isOk && message.success(t('RackPage.updated'))
          hideModal()
        }
      )) :
      dispatch(createRack(
        { ...values },
        isOk => {
          isOk && message.success(t('RackPage.created'))
          hideModal()
        }
      ))
  }

  const onDelete = (id: number) => {
    dispatch(deleteRack(id, isDone => isDone && message.success(t('RackPage.deleted'))))
  }

  return (
    <>
      <Card
        title={<><PicCenterOutlined /> &nbsp; {dataToUpdate ? t('RackPage.update-title') : t('RackPage.create-title')}</>}
        extra={
          <Button
            type='primary'
            onClick={() => {
              setDataToUpdate(undefined)
              setModalVisible(true)
            }}
          >
            <PlusCircleOutlined /> {t('RackPage.create')}
          </Button>}
        className='RackPage' >
        <RackTable setDataToUpdate={setDataToUpdate} showModal={showModal} onDelete={onDelete} />
      </Card>
      <Modal
        destroyOnClose
        style={{ top: 20 }}
        width={600}
        title={<><PicCenterOutlined /> &nbsp; {dataToUpdate ? t('RackPage.update-title') : t('RackPage.create-title')}</>}
        visible={isModalVisible}
        onCancel={hideModal}
        footer={null}
        confirmLoading={true}
      >
        <RackForm dataToUpdate={dataToUpdate} onFinish={onFinish} />
      </Modal>
    </>
  )
}

export default RackPage