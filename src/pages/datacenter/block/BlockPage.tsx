import React, { useEffect, useState } from 'react'
import { Card, Button, Modal, message } from 'antd'
import { PicLeftOutlined, PlusCircleOutlined } from '@ant-design/icons/lib/icons'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { BlockDetails, BlockParams } from './models'
import getBlocks from './actions/getBlocks'
import updateBlock from './actions/updateBlock'
import createBlock from './actions/createBlock'
import deleteBlock from './actions/deleteBlock'
import BlockForm from 'components/Datacenter/Block/BlockForm'
import BlockTable from 'components/Datacenter/Block/BlockTable'
import getRacks from '../rack/actions/getRacks'

const BlockPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [dataToUpdate, setDataToUpdate] = useState<BlockDetails>()
  const [isModalVisible, setModalVisible] = useState<boolean>(false)

  useEffect(() => {
    dispatch(getBlocks())
    dispatch(getRacks())
    //eslint-disable-next-line
  }, [])

  const hideModal = () => setModalVisible(false)
  const showModal = () => setModalVisible(true)

  const onFinish = (values: BlockParams) => {
    dataToUpdate ?
      dispatch(updateBlock(
        { ...values, id: dataToUpdate?.id, rack_pos: values.rack_pos[0] },
        isOk => {
          isOk && message.success(t('BlockPage.updated'))
          hideModal()
          dispatch(getRacks())
        }
      )) :
      dispatch(createBlock(
        { ...values, rack_pos: values.rack_pos[0] },
        isOk => {
          isOk && message.success(t('BlockPage.created'))
          hideModal()
          dispatch(getRacks())
        }
      ))
  }

  const onDelete = (id: number) => {
    dispatch(deleteBlock(id, isDone => isDone && message.success(t('BlockPage.deleted'))))
  }

  return (
    <>
      <Card
        title={ <><PicLeftOutlined /> &nbsp; { t('BlockPage.title') }</> }
        extra={
          <Button
            type='primary'
            onClick={ () => {
              setDataToUpdate(undefined)
              setModalVisible(true)
            } }
          >
            <PlusCircleOutlined /> { t('BlockPage.create') }
          </Button> }
        className='BlockPage' >
        <BlockTable setDataToUpdate={ setDataToUpdate } showModal={ showModal } onDelete={ onDelete } />
      </Card>
      <Modal
        destroyOnClose
        style={ { top: 20 } }
        width={ 600 }
        title={ <><PicLeftOutlined /> &nbsp; { dataToUpdate ? <>{ t('BlockPage.update-title') } "{ dataToUpdate.comment }"</> : t('BlockPage.create-title') }</> }
        visible={ isModalVisible }
        onCancel={ hideModal }
        footer={ null }
        confirmLoading={ true }
      >
        <BlockForm dataToUpdate={ dataToUpdate } onFinish={ onFinish } />
      </Modal>
    </>
  )
}

export default BlockPage