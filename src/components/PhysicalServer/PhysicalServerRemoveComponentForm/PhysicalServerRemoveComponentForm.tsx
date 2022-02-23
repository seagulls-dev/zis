import React, {useState} from 'react'
import {Popover, Form, Select, Tooltip} from 'antd'
import {useForm} from 'antd/lib/form/Form'
import {useTranslation} from 'react-i18next'
import Button from 'antd-button-color'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import {useDispatch} from 'react-redux'
import {InventoryDetails} from 'pages/inventory/inventory/models'
import {MenuFoldOutlined, MinusOutlined} from '@ant-design/icons'
import {PhysicalServerDetails} from 'pages/inventory/physicalserver/models'
import {InventoryLocationDetails} from 'pages/inventory/location/models'
import {ValidateStatus} from 'antd/lib/form/FormItem'
import removeComponentFromPhysicalServer from 'pages/inventory/physicalserver/actions/removeComponentFromPhysicalServer'

interface Props {
  physicalServer: PhysicalServerDetails
  inventories?: InventoryDetails[]
  inventoryLocation?: InventoryLocationDetails[]
}

const {Item} = Form

const PhysicalServerRemoveComponentForm = (props: Props) => {
  const {t} = useTranslation()
  const [form] = useForm()
  const dispatch = useDispatch()
  const [validateLocationStatus, setValidateLocationStatus] = useState<ValidateStatus>('')
  const [validateComponentsStatus, setValidateComponentsStatus] = useState<ValidateStatus>('')

  const onFinish = (values) => {
    const oldComponents = props.physicalServer.serverComponents?.map(comp => comp.id)
    const componentsToRemove = oldComponents?.filter(item => values.server_component_ids.indexOf(item) === -1)
    setValidateLocationStatus('validating')
    setValidateComponentsStatus('validating')
    // check if location was changed
    setValidateLocationStatus(props.physicalServer.location_id === values.new_location_id ? 'error' : 'success')
    // check if components was changed
    setValidateComponentsStatus(componentsToRemove?.length === 0 ? 'error' : 'success')

    if (props.physicalServer.location_id !== values.new_location_id && componentsToRemove?.length)
      componentsToRemove?.map(server_component_ids =>
        dispatch(removeComponentFromPhysicalServer({
          physical_server_id: props.physicalServer.id,
          server_component_id: server_component_ids,
          new_location_id: values.new_location_id,
        }))
      )

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
        server_component_ids: props.physicalServer.serverComponents?.map(comp => comp.id),
        new_location_id: props.physicalServer.location_id
      }}
    >
      <Item
        name='server_component_ids'
        validateStatus={validateComponentsStatus}
        label={t('physicalServersPage.add-component.server_component_id')}
      >
        <Select
          mode='multiple'
          options={props.inventories?.map(
            inv => ({
              label: inv.name,
              value: inv.id
            })
          )}
        />
      </Item>
      <Item
        name='new_location_id'
        validateStatus={validateLocationStatus}
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
          {t('physicalServersPage.button.remove')}
        </Button>
      </Item>

    </Form>


  return (
    <Tooltip title={t('physicalServersPage.removecomponent')}>
      <Popover
        trigger='click'
        placement='left'
        content={AddCompnentForm}
        title={t('physicalServersPage.removecomponent')}
        style={{width: '500px'}}
      >
        <Button type='warning' size='small'>
          <MinusOutlined /><MenuFoldOutlined />
        </Button>
      </Popover>
    </Tooltip>
  )
}

export default PhysicalServerRemoveComponentForm