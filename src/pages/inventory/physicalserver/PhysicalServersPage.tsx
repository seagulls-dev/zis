import React, {useState, useEffect} from 'react'
import {Card, Button, Modal, message} from 'antd'
import {GroupOutlined, PlusCircleOutlined} from '@ant-design/icons/lib/icons'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from 'common/models'
import getPhysicalServers from './actions/getPhysicalServers'
import {PhysicalServerDetails} from './models'
import createPhysicalServer from './actions/createPhysicalServer'
import updatePhysicalServer from './actions/updatePhysicalServer'
import PhysicalServerForm from 'components/PhysicalServer/PhysicalServerForm/PhysicalServerForm'
import PhysicalServersTable from 'components/PhysicalServer/PhysicalServersTable/PhysicalServersTable'
import getLocations from '../location/actions/getLocations'
import getInventories from '../inventory/actions/getInventories'
import getRacks from 'pages/datacenter/rack/actions/getRacks'


const PhysicalServersPage = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const [dataToUpdate, setDataToUpdate] = useState<PhysicalServerDetails>()
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const {physicalservers, isLoading: isPhysicalServersLoading} = useSelector((state: AppState) => state.inventoryphysicalserver)
  const {inventories} = useSelector((state: AppState) => state.inventory)
  const {inventorylocation} = useSelector((state: AppState) => state.inventorylocation)

  const hideModal = () => setModalVisible(false)
  const showModal = () => setModalVisible(true)

  useEffect(() => {
    dispatch(getPhysicalServers())
    dispatch(getLocations())
    dispatch(getInventories())
    dispatch(getRacks())
    //eslint-disable-next-line
  }, [])

  const handleUpdate = (record: PhysicalServerDetails) => {
    setDataToUpdate(record)
    showModal()
  }

  const onFormSubmit = (values: PhysicalServerDetails) => {
    dataToUpdate ?
      dispatch(updatePhysicalServer(
        {...values, id: dataToUpdate.id},
        isSuccess => {
          if (isSuccess) {
            setDataToUpdate(undefined)
            hideModal()
            message.info(t('physicalServersPage.updated'))
          }
        })) :
      dispatch(createPhysicalServer(
        {...values},
        isSuccess => {
          if (isSuccess) {
            hideModal()
            message.info(t('physicalServersPage.created'))
          }
        }
      ))
  }

  return (
    <>
      <Card
        title={<><GroupOutlined /> &nbsp; {t('physicalServersPage.title')}</>}
        extra={
          <Button type='primary' onClick={() => {
            setDataToUpdate(undefined)
            showModal()
          }}
          ><PlusCircleOutlined /> ADD </Button>
        }
        className='PhysicalServersPage'
        loading={isPhysicalServersLoading}
      >
        <PhysicalServersTable
          handleUpdate={handleUpdate}
          physicalServers={physicalservers}
          inventoryLocation={inventorylocation}
          inventories={inventories}
        />
      </Card>
      <Modal
        destroyOnClose
        style={{top: 20}}
        width={500}
        title={<><GroupOutlined /> &nbsp; {dataToUpdate ? t('physicalServersPage.update-physicalserver') : t('physicalServersPage.create-physicalserver')}</>}
        visible={isModalVisible}
        onCancel={hideModal}
        footer={null}
        confirmLoading={true}
      >

        <PhysicalServerForm
          onFormSubmit={onFormSubmit}
          dataToUpdate={dataToUpdate}
          inventorylocation={inventorylocation}
          inventories={inventories}
        />
      </Modal>
    </>
  )
}

export default PhysicalServersPage