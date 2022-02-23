import React, {useState} from 'react'
import {Popover, Form, Select, Tooltip} from 'antd'
import {useForm} from 'antd/lib/form/Form'
import {useTranslation} from 'react-i18next'
import Button from 'antd-button-color'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import {useDispatch} from 'react-redux'
import {InventoryDetails} from 'pages/inventory/inventory/models'
import {MenuFoldOutlined, SwapOutlined} from '@ant-design/icons'
import {PhysicalServerDetails} from 'pages/inventory/physicalserver/models'
import {InventoryLocationDetails} from 'pages/inventory/location/models'
import {ValidateStatus} from 'antd/lib/form/FormItem'
import swapComponentPhysicalServer from 'pages/inventory/physicalserver/actions/swapComponentPhysicalServer'

interface Props {
  physicalServer: PhysicalServerDetails
  inventories?: InventoryDetails[]
  inventoryLocation?: InventoryLocationDetails[]
}

const {Item} = Form

const PhysicalServerSwapComponentForm = (props: Props) => {
  const {t} = useTranslation()
  const [form] = useForm()
  const dispatch = useDispatch()
  const [validateStatus, setValidateStatus] = useState<ValidateStatus>('')

  const onFinish = (values) => {
    setValidateStatus('validating')
    // check if value was changed
    props.physicalServer.location_id !== values.new_location_id ?
      dispatch(swapComponentPhysicalServer({
        physical_server_id: props.physicalServer.id,
        ...values
      }))
      :
      setValidateStatus('error')
  }

  const AddCompnentForm =
    <Form
      form={form}
      {...formItemLayout}
      onFinish={onFinish}
      style={{
        padding: '20px 20px 0',
        width: 500
      }}
      validateMessages={{required: ''}}
      initialValues={{
        new_location_id: props.physicalServer.location_id
      }}
    >
      <Item
        name='old_component_id'
        rules={[{required: true}]}
        label={t('physicalServersPage.add-component.old_component_id')}
      >
        <Select
          showSearch
          allowClear
          optionFilterProp='label'
          options={props.physicalServer.serverComponents?.map(
            inv => ({
              label: inv.name,
              value: inv.id
            })
          )}
        />
      </Item>

      <Item
        name='new_component_id'
        rules={[{required: true}]}
        label={t('physicalServersPage.add-component.new_component_id')}
      >
        <Select
          showSearch
          allowClear
          optionFilterProp='label'
          options={props.inventories?.map(
            inv => ({
              label: inv.name,
              value: inv.id,
              disabled: !!props.physicalServer.serverComponents?.find(comp => comp.id === inv.id)
            })
          )}
        />
      </Item>
      <Item
        name='new_location_id'
        validateStatus={validateStatus}
        rules={[{required: true}]}
        label={t('physicalServersPage.remove.new_location_id')}
      >
        <Select
          showSearch
          allowClear
          optionFilterProp='label'
          options={props.inventoryLocation?.map(loc => ({label: loc.name, value: loc.id}))} />
      </Item>

      <Item {...tailLayout}>
        <Button htmlType='submit' type='warning'>
          {t('physicalServersPage.button.swap')}
        </Button>
      </Item>

    </Form>


  return (
    <Tooltip title={t('physicalServersPage.swap-component')} >
      <Popover
        trigger='click'
        placement='left'
        content={AddCompnentForm}
        title={t('physicalServersPage.swap-component')}
        style={{width: '500px'}}
      >
        <Button type='lightdark' size='small'>
          <SwapOutlined /><MenuFoldOutlined />
        </Button>
      </Popover>
    </Tooltip>
  )
}

export default PhysicalServerSwapComponentForm