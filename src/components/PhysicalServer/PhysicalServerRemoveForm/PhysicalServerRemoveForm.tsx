import React, { useState } from 'react'
import { Popover, Form, Select, Tooltip } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useTranslation } from 'react-i18next'
import Button from 'antd-button-color'
import { formItemLayout, tailLayout } from 'helpers/layoutHelpers'
import { InventoryLocationDetails } from 'pages/inventory/location/models'
import { useDispatch } from 'react-redux'
import movePhysicalServer from 'pages/inventory/physicalserver/actions/movePhysicalServer'
import { ValidateStatus } from 'antd/lib/form/FormItem'
import { MdSwapVert } from 'react-icons/md'
import { PhysicalServerDetails } from 'pages/inventory/physicalserver/models'

interface Props {
  physicalServer: PhysicalServerDetails
  inventoryLocation?: InventoryLocationDetails[]
  locationName?: string
}

const { Item } = Form

const PhysicalServerRemoveForm = (props: Props) => {
  const { t } = useTranslation()
  const [form] = useForm()
  const dispatch = useDispatch()
  const [visiblePopUp, setVisiblePopUp] = useState(false)
  const [validateStatus, setValidateStatus] = useState<ValidateStatus>('')

  const onFinish = (values) => {
    setValidateStatus('validating')
    // check if value was changed
    props.physicalServer.location_id !== values.new_location_id ?
      dispatch(movePhysicalServer({
        physical_server_id: props.physicalServer.id,
        new_location_id: values.new_location_id
      }, isSuccess => isSuccess && setVisiblePopUp(false)))
      :
      setValidateStatus('error')
  }

  const RemoveForm =
    <Form
      form={form}
      {...formItemLayout}
      onFinish={onFinish}
      style={{
        padding: '20px 20px 0',
        width: 500
      }}
      validateMessages={{ required: t('physicalServersPage.error.not-changed') }}
      initialValues={{
        new_location_id: props.physicalServer.location_id
      }}
    >
      <Item
        name='new_location_id'
        rules={[{ required: true }]}
        validateStatus={validateStatus}
        label={t('physicalServersPage.remove.new_location_id')}
      >
        <Select
          showSearch
          allowClear
          optionFilterProp='label'
          options={props.inventoryLocation?.map(loc => ({ label: loc.name, value: loc.id }))} />
      </Item>

      <Item {...tailLayout}>
        <Button htmlType='submit' type='warning'>{t('physicalServersPage.remove.move')}</Button>
      </Item>
    </Form>


  return (
    <Popover
      trigger='click'
      placement='left'
      content={RemoveForm}
      title={t('physicalServersPage.remove.title')}
      visible={visiblePopUp}
      onVisibleChange={(visible) => setVisiblePopUp(visible)}
      style={{ width: '500px' }}
    >
      <Tooltip title={t('physicalServersPage.remove.move')}>
        <Button
          type='primary'
          size='small'
          icon={<MdSwapVert style={{ fontSize: 16 }} />}
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          &nbsp; {props.locationName}
        </Button>
      </Tooltip>
    </Popover>
  )
}

export default PhysicalServerRemoveForm