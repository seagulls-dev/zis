import React, { useState } from 'react'
import { Popover, Form, Select, Tooltip, InputNumber } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useTranslation } from 'react-i18next'
import Button from 'antd-button-color'
import { formItemLayout, tailLayout } from 'helpers/layoutHelpers'
import { useDispatch, useSelector } from 'react-redux'
import { MenuFoldOutlined } from '@ant-design/icons'
import { MoveBladeParams } from 'pages/inventory/bladecontainer/models'
import { AppState } from 'common/models'
import moveBlade from 'pages/inventory/bladecontainer/actions/moveBlade'
import { PhysicalServerDetails } from 'pages/inventory/physicalserver/models'
import { MdSwapVert } from 'react-icons/md'
import { arrayFromCount } from 'helpers/arrayHelpers'
import getBladeContainers from 'pages/inventory/bladecontainer/actions/getBladeContainers'

interface Props {
  server?: PhysicalServerDetails
  slotCount?: number
}
const { Item } = Form

const MoveBladeForm = (props: Props) => {
  const { t } = useTranslation()
  const [form] = useForm()
  const dispatch = useDispatch()
  const [visiblePopUp, setVisiblePopUp] = useState(false)
  const { bladecontainers, isSaving } = useSelector((state: AppState) => state.bladecontainer)

  const onFinish = (values: MoveBladeParams) => {
    dispatch(moveBlade(
      { ...values },
      isSuccess => {
        isSuccess && setVisiblePopUp(false)
        dispatch(getBladeContainers())
      }
    ))
  }

  const MoveForm =
    <Form
      form={form}
      {...formItemLayout}
      onFinish={onFinish}
      style={{ padding: '20px 20px 0', width: 500 }}
      validateMessages={{ required: '' }}
      initialValues={{
        container_id: props.server?.container_id,
        position_index: props.server?.position_index
      }}
    >
      <Item
        name='container_id'
        rules={[{ required: true }]}
        label={t('BladeContainersPage.container_id')}
      >
        <Select
          disabled
          options={bladecontainers?.map(cont => ({ label: cont.name, value: cont.id, }))}
        />
      </Item>
      {/* Slot */}
      <Item
        name='position_index'
        rules={[{ required: true }]}
        label={t('BladeContainersPage.position_index')}
      >
        <InputNumber disabled />
      </Item>
      {/* Slot */}
      <Item
        name='new_position_index'
        rules={[{ required: true }]}
        label={t('BladeContainersPage.new_position_index')}
      >
        <Select
          loading={!props.slotCount}

          options={
            arrayFromCount(props.slotCount!)
              .map(v => ({ value: v, label: v, disabled: v === props.server?.position_index }))
          }
        />
      </Item>

      <Item {...tailLayout}>
        <Button htmlType='submit' loading={isSaving} type='warning'>
          {t('BladeContainersPage.move-blade-button')}
        </Button>
      </Item>
    </Form>


  return (
    <Tooltip title={t('BladeContainersPage.move-blade-title')}>
      <Popover
        trigger='click'
        placement='left'
        content={MoveForm}
        title={t('BladeContainersPage.move-blade-title')}
        visible={visiblePopUp}
        onVisibleChange={(visible) => setVisiblePopUp(visible)}
        style={{ width: '500px' }}
      >
        <Button type='warning' size='small'>
          <MdSwapVert /><MenuFoldOutlined />
        </Button>
      </Popover>
    </Tooltip>
  )
}

export default MoveBladeForm