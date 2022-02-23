import React from 'react'
import {Button, Form, Input, InputNumber} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import {useTranslation} from 'react-i18next'
import {useForm} from 'antd/lib/form/Form'
import {Select} from 'antd'
import {PhysicalServerDetails} from 'pages/inventory/physicalserver/models'
import {InventoryLocationDetails} from 'pages/inventory/location/models'
import {InventoryDetails} from 'pages/inventory/inventory/models'

interface Props {
  onFormSubmit: (values: PhysicalServerDetails) => void
  dataToUpdate?: PhysicalServerDetails
  inventorylocation?: InventoryLocationDetails[]
  inventories?: InventoryDetails[]
}

const {Item} = Form

const ServerForm = (props: Props) => {
  const {t} = useTranslation()
  const [form] = useForm()

  return (
    <Form
      {...formItemLayout}
      onFinish={props.onFormSubmit}
      form={form}
      initialValues={{...props.dataToUpdate}}
    >
      <Item name='ident' label={t('physicalServersPage.ident')} rules={[{required: true}]}>
        <Input />
      </Item>
      <Item name='location_id' label={t('physicalServersPage.location_id')} rules={[{required: true}]}>
        <Select
          showSearch
          allowClear
          optionFilterProp='label'
          options={props.inventorylocation?.map(loc => ({label: loc.name, value: loc.id}))}
        />
      </Item>

      <Item name='u_size' label={t('physicalServersPage.u_size')} >
        <InputNumber min={1} />
      </Item>
      {/* inventory item */}
      <Item name='case_id' label={t('physicalServersPage.case_id')} >
        <Select
          showSearch
          allowClear
          optionFilterProp='label'
          options={props.inventories?.map(inv => ({label: inv.name, value: inv.id}))} />
      </Item>
      <Item name='server_conf' label={t('physicalServersPage.server_conf')} >
        <TextArea />
      </Item>
      <Item name='power' label={t('physicalServersPage.power')} >
        <InputNumber />
      </Item>

      <Item {...tailLayout}>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          {
            props.dataToUpdate ? t('billing.tax.update') : t('billing.tax.create')
          }
        </Button>
      </Item>
    </Form>
  )

}

export default ServerForm