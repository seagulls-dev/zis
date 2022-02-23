import React from 'react'
import {Popover, Form, Select, Tooltip} from 'antd'
import {useForm} from 'antd/lib/form/Form'
import {useTranslation} from 'react-i18next'
import Button from 'antd-button-color'
import {formItemLayout} from 'helpers/layoutHelpers'
import {useDispatch} from 'react-redux'
import {InventoryDetails} from 'pages/inventory/inventory/models'
import {PlusOutlined, MenuUnfoldOutlined} from '@ant-design/icons'
import addComponentToPhysicalServer from 'pages/inventory/physicalserver/actions/addComponentToPhysicalServer'
import {PhysicalServerDetails} from 'pages/inventory/physicalserver/models'
import './PhysicalServerAddComponentForm.scss'

interface Props {
  physicalServer: PhysicalServerDetails
  inventories?: InventoryDetails[]
}

const {Item} = Form

const PhysicalServerAddComponentForm = (props: Props) => {
  const {t} = useTranslation()
  const [form] = useForm()
  const dispatch = useDispatch()

  const onFinish = (values) => {
    dispatch(
      addComponentToPhysicalServer({
        ...values,
        physical_server_id: props.physicalServer.id,
      })
    )
  }

  const AddComponentForm = (
    <Form
      form={form}
      {...formItemLayout}
      onFinish={onFinish}
      className='AddCompnentForm'
      validateMessages={{required: ''}}
      initialValues={{
        server_component_ids: props.physicalServer.serverComponents?.map(
          (comp) => comp.id
        ),
      }}
    >
      <Item
        name='server_component_ids'
        rules={[{required: true}]}
        label={t('physicalServersPage.add-component.server_component_id')}
      >
        <Select
          dropdownStyle={{position: 'fixed'}}
          getPopupContainer={(trigger) => trigger.parentNode}
          mode='multiple'
          options={props.inventories?.map((inv) => ({
            label: (
              <div className='select-name-wrapper'>
                <span>{inv.name}</span>
                <small>{inv.server_id}</small>
              </div>
            ),
            value: inv.id,
            disabled: !!inv.server_id,
          }))}
        />
      </Item>

      <Item>
        <Button htmlType='submit' type='warning'>
          {t('physicalServersPage.add')}
        </Button>
      </Item>
    </Form>
  )

  return (
    <Tooltip title={t('physicalServersPage.addcomponent')}>
      <Popover
        trigger='click'
        placement='left'
        content={AddComponentForm}
        title={t('physicalServersPage.addcomponent')}
        style={{width: '500px'}}
      >
        <Button type='success' size='small'>
          <PlusOutlined />
          <MenuUnfoldOutlined />
        </Button>
      </Popover>
    </Tooltip>
  )
}

export default PhysicalServerAddComponentForm
