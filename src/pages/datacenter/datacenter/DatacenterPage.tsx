import React, { useEffect, useState } from 'react'
import { Card, Button, Modal, message } from 'antd'
import { DatabaseOutlined, PlusCircleOutlined } from '@ant-design/icons/lib/icons'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { DataCenterDetails } from './models'
import DatacenterTable from 'components/Datacenter/DatacenterTable'
import DatacenterForm from 'components/Datacenter/DatacenterForm'
import getDatacenters from './actions/getDatacenters'
import getLocations from 'pages/inventory/location/actions/getLocations'
import createDatacenter from './actions/createDatacenter'
import deleteDatacenter from './actions/deleteDatacenter'
import updateDatacenter from './actions/updateDatacenter'


const DatacenterPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [dataToUpdate, setDataToUpdate] = useState<DataCenterDetails>()
  const [isModalVisible, setModalVisible] = useState<boolean>(false)

  const hideModal = () => setModalVisible(false)
  const showModal = () => setModalVisible(true)

  useEffect(() => {
    dispatch(getDatacenters())
    dispatch(getLocations())
    //eslint-disable-next-line
  }, [])

  const onFinish = (values: DataCenterDetails) => {
    if (dataToUpdate) {
      dispatch(updateDatacenter(
        { ...values, id: dataToUpdate.id },
        isOk => {
          isOk && message.success(t('DatacenterPage.updated'))
          hideModal()
        }
      ))
    } else {
      dispatch(createDatacenter(
        { ...values },
        isOk => {
          isOk && message.success(t('DatacenterPage.created'))
          hideModal()
        }
      ))
    }
  }

  const onDelete = (id: number) => {
    dispatch(deleteDatacenter(id, isDone => isDone && message.success(t('DatacenterPage.deleted'))))
  }

  return (
    <>
      <Card
        title={<><DatabaseOutlined /> &nbsp; {t('DatacenterPage.title')}</>}
        extra={
          <Button
            type='primary'
            onClick={() => {
              setDataToUpdate(undefined)
              setModalVisible(true)
            }}
          >
            <PlusCircleOutlined /> {t('DatacenterPage.create')}
          </Button>}
        className='DatacenterPage' >
        <DatacenterTable
          setDataToUpdate={setDataToUpdate}
          showModal={showModal}
          onDelete={onDelete}
        />
      </Card>
      <Modal
        destroyOnClose
        style={{ top: 20 }}
        width={600}
        title={<>
          <DatabaseOutlined /> &nbsp;
        {dataToUpdate ? t('DatacenterPage.update-title') : t('DatacenterPage.create-title')}
        </>}
        visible={isModalVisible}
        onCancel={hideModal}
        footer={null}
        confirmLoading={true}
      >
        <DatacenterForm
          dataToUpdate={dataToUpdate}
          onFinish={onFinish}
        />
      </Modal>
    </>
  )
}

export default DatacenterPage