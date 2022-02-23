import React, { useEffect, useState } from 'react'
import { Card, Button, Modal, message } from 'antd'
import { OrderedListOutlined, PlusCircleOutlined } from '@ant-design/icons/lib/icons'
import { useTranslation } from 'react-i18next'
import { InventoryDetails } from './models'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'common/models'
import InventoryTable from 'components/InventoryTable/InventoryTable'
import getInventories from './actions/getInventories'
import deleteInventory from './actions/deleteInventory'
import createInventory from './actions/createInventory'
import updateInventory from './actions/updateInventory'
import InventoryForm from 'components/InventoryForm/InventoryForm'
import getInventoryLocations from '../location/actions/getLocations'
import getCompanies from 'pages/company/actions/getCompanies'
import getInventoryType from 'pages/inventory/type/actions/getTypes'
import getBills from 'pages/billing/bill/actions/getBills'
import moment from 'moment'
import getPhysicalServers from '../physicalserver/actions/getPhysicalServers'

interface Props { }

const InventoryPage = (props: Props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [dataToUpdate, setDataToUpdate] = useState<InventoryDetails>()
  const [isModalVisible, setModalVisible] = useState<boolean>(false)

  const { inventories, isLoading, isSaving } = useSelector((state: AppState) => state.inventory)
  const { companies } = useSelector((state: AppState) => state.company)
  const { inventorylocation } = useSelector((state: AppState) => state.inventorylocation)
  const { inventorytype } = useSelector((state: AppState) => state.inventorytype)
  const { bills } = useSelector((state: AppState) => state.bill)
  const { physicalservers } = useSelector((state: AppState) => state.inventoryphysicalserver)


  useEffect(() => {
    dispatch(getInventories())
    dispatch(getCompanies())
    dispatch(getInventoryLocations())
    dispatch(getInventoryType())
    dispatch(getBills())
    dispatch(getPhysicalServers())
    //eslint-disable-next-line
  }, [])

  const hideModal = () => setModalVisible(false)
  const showModal = () => setModalVisible(true)


  const handleUpdate = ((record: InventoryDetails) => {
    setDataToUpdate(record)
    showModal()
  })

  const onFinish = (values) => {
    dataToUpdate ?
      dispatch(updateInventory(
        {
          ...values,
          purchase_date: moment(values.purchase_date).format('YYYY-MM-DD')
        },
        isSuccess => {
          if (isSuccess) {
            setDataToUpdate(undefined)
            hideModal()
            message.success(t('inventoryPage.updated'))
          }
        }
      )) :
      dispatch(createInventory(
        {
          ...values,
          purchase_date: moment(values.purchase_date).format('YYYY-MM-DD')
        },
        isSuccess => {
          if (isSuccess) {
            hideModal()
            message.success(t('inventoryPage.created'))
          }
        }
      ))
  }

  const onDelete = (id: number) => {
    dispatch(deleteInventory(
      id,
      isSuccess => isSuccess &&
        message.success(t('inventoryPage.deleted'))
    ))
  }

  return (
    <>
      <Card
        title={<><OrderedListOutlined /> &nbsp; {t('inventoryPage.title')} </>}
        extra={
          <Button type='primary' onClick={() => {
            setDataToUpdate(undefined)
            showModal()
          }}
          ><PlusCircleOutlined /> ADD </Button>
        }
        className='InventoryPage'
        loading={isLoading}
      // style={{ width: '1731px' }}
      >{inventories &&
        <InventoryTable
          onDelete={onDelete}
          handleUpdate={handleUpdate}
          inventories={inventories}
          inventoryLocation={inventorylocation}
          inventoryType={inventorytype}
          companies={companies}
          physicalServers={physicalservers}
        />}
      </Card>
      <Modal
        destroyOnClose
        style={{ top: 20 }}
        width={500}
        title={<><OrderedListOutlined /> &nbsp; {dataToUpdate ? t('inventoryPage.update') : t('inventoryPage.create')}</>}
        visible={isModalVisible}
        onCancel={hideModal}
        footer={null}
        confirmLoading={true}
      >
        <InventoryForm
          dataToUpdate={dataToUpdate}
          onFormSubmit={onFinish}
          companies={companies}
          inventories={inventories}
          bills={bills}
          physicalServers={physicalservers}
          inventoryLocation={inventorylocation}
          inventoryType={inventorytype}
          isSaving={isSaving}
        />
      </Modal>
    </>
  )
}

export default InventoryPage