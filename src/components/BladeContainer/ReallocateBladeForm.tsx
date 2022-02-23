import React, { useState } from 'react'
import { Popover, Form, Select, Tooltip, InputNumber } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useTranslation } from 'react-i18next'
import Button from 'antd-button-color'
import { formItemLayout, tailLayout } from 'helpers/layoutHelpers'
import { useDispatch, useSelector } from 'react-redux'
import { SwapOutlined } from '@ant-design/icons'
import { ReallocateBladeParams } from 'pages/inventory/bladecontainer/models'
import { AppState } from 'common/models'
import reallocateBlade from 'pages/inventory/bladecontainer/actions/reallocateBlade'
import { PhysicalServerDetails } from 'pages/inventory/physicalserver/models'

interface Props {
  server?: PhysicalServerDetails
  text?: string
}
const { Item } = Form

const ReallocateBladeForm = (props: Props) => {
  const { t } = useTranslation()
  const [form] = useForm()
  const dispatch = useDispatch()
  const [visiblePopUp, setVisiblePopUp] = useState(false)
  const { bladecontainers, isSaving } = useSelector((state: AppState) => state.bladecontainer)
  const { inventorylocation } = useSelector((state: AppState) => state.inventorylocation)

  const onFinish = (values: ReallocateBladeParams) => {
    dispatch(reallocateBlade({ ...values }, isSuccess => isSuccess && setVisiblePopUp(false)))
  }

  const ReallocateForm =
    <Form
      form={form}
      {...formItemLayout}
      onFinish={onFinish}
      style={{ padding: '20px 20px 0', width: 500 }}
      validateMessages={{ required: '' }}
      initialValues={{ container_id: props.server?.container_id, position_index: props.server?.position_index }}
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

      <Item
        name='new_location_id'
        rules={[{ required: true }]}
        label={t('BladeContainersPage.new_location_id')}
      >
        <Select
          showSearch
          optionFilterProp='label'
          options={inventorylocation?.map(loc => ({ label: loc.name, value: loc.id, }))}
        />
      </Item>

      <Item {...tailLayout}>
        <Button htmlType='submit' loading={isSaving} type='warning'>
          {t('BladeContainersPage.reallocate-blade-button')}
        </Button>
      </Item>
    </Form>


  return (
    <Tooltip title={t('BladeContainersPage.reallocate-blade-title')}>
      <Popover
        trigger='click'
        placement='left'
        content={ReallocateForm}
        title={t('BladeContainersPage.reallocate-blade-title')}
        visible={visiblePopUp}
        onVisibleChange={(visible) => setVisiblePopUp(visible)}
        style={{ width: '500px' }}
      >
        <Button type='lightdark' size='small'>
          <SwapOutlined />&nbsp;{props.text}
        </Button>
      </Popover>
    </Tooltip>
  )
}

export default ReallocateBladeForm