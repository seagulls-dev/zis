import React, {useEffect, useState} from 'react'
import {Card, Button, Modal, message} from 'antd'
import {ContainerOutlined, PlusCircleOutlined} from '@ant-design/icons/lib/icons'
import {useTranslation} from 'react-i18next'
import BladeContainerTable from 'components/BladeContainer/BladeContainerTable'
import {useDispatch} from 'react-redux'
import {BladeContainerDetails} from './models'
import BladeContainerForm from 'components/BladeContainer/BladeContainerForm'
import getBladeContainers from './actions/getBladeContainers'
import getLocations from '../location/actions/getLocations'
import getInventories from '../inventory/actions/getInventories'
import updateBladeContainer from './actions/updateBladeContainer'
import createBladeContainer from './actions/createBladeContainer'
import getPhysicalServers from '../physicalserver/actions/getPhysicalServers'
import getRacks from 'pages/datacenter/rack/actions/getRacks'
interface Props { }

const BladeContainersPage = (props: Props) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [dataToUpdate, setDataToUpdate] = useState<BladeContainerDetails>()

  const hideModal = () => setModalVisible(false)
  const showModal = () => setModalVisible(true)

  useEffect(() => {
    dispatch(getBladeContainers())
    dispatch(getLocations())
    dispatch(getInventories())
    dispatch(getPhysicalServers())
    dispatch(getRacks())
    //eslint-disable-next-line
  }, [])

  const handleUpdate = (record: BladeContainerDetails) => {
    setDataToUpdate(record)
    showModal()
  }

  const onFormSubmit = (values) => {
    dataToUpdate ?
      dispatch(updateBladeContainer({
        ...values,
        id: dataToUpdate.id,
        rack_pos: values.rack_pos[1]
      }, isSuccess => {
        isSuccess && hideModal() &&
          message.success(t('BladeContainersPage.updated'))
      })) :
      dispatch(createBladeContainer(
        {...values, rack_pos: values.rack_pos[0]},
        isSuccess => {
          isSuccess && hideModal() &&
            message.success(t('BladeContainersPage.created'))
        }))
  }

  return (
    <>
      <Card
        title={<><ContainerOutlined /> &nbsp; {t('BladeContainersPage.title')}</>}
        extra={<Button type='primary' onClick={() => {
          setDataToUpdate(undefined)
          showModal()
        }}><PlusCircleOutlined />{t('BladeContainersPage.create-blade-container')}</Button>}
        className='BladeContainersPage'
      >
        <BladeContainerTable handleUpdate={handleUpdate} />
      </Card>
      <Modal
        destroyOnClose
        style={{top: 20}}
        width={500}
        title={<><ContainerOutlined /> &nbsp; {dataToUpdate ? t('BladeContainersPage.update-blade-container') : t('BladeContainersPage.create-blade-container')}</>}
        visible={isModalVisible}
        onCancel={hideModal}
        footer={null}
        confirmLoading={true}
      >

        <BladeContainerForm
          onFormSubmit={onFormSubmit}
          dataToUpdate={dataToUpdate}
        />
      </Modal>
    </>
  )
}

export default BladeContainersPage