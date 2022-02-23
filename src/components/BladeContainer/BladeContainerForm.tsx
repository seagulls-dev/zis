import React from 'react'
import { Button, Form, Input, InputNumber } from 'antd'
import { formItemLayout, tailLayout } from 'helpers/layoutHelpers'
import { useTranslation } from 'react-i18next'
import { CreateUpdateServerParams } from 'pages/server/models'
import { useForm } from 'antd/lib/form/Form'
import { Select } from 'antd'
import { BladeContainerDetails } from 'pages/inventory/bladecontainer/models'
import { AppState } from 'common/models'
import { useSelector } from 'react-redux'
import RackPositionsFormItem from 'components/Datacenter/Rack/RackPositionsFormItem'

interface Props {
  onFormSubmit: (values: CreateUpdateServerParams) => void
  dataToUpdate?: BladeContainerDetails
}

const { Item } = Form

const BladeContainerForm = (props: Props) => {
  const { t } = useTranslation()
  const [form] = useForm()

  const { inventorylocation } = useSelector((state: AppState) => state.inventorylocation)
  const { inventories } = useSelector((state: AppState) => state.inventory)

  return (
    <Form
      {...formItemLayout}
      onFinish={props.onFormSubmit}
      form={form}
      initialValues={{ ...props.dataToUpdate }}
    >
      <Item name='name' label={t('BladeContainersPage.name')} rules={[{ required: true }]}>
        <Input />
      </Item>
      {/* Inventory Item */}
      <Item name='case_id' label={t('BladeContainersPage.case_id')} rules={[{ required: true }]}>
        <Select
          showSearch
          filterOption={true}
          optionFilterProp='label'
          options={inventories?.map(inv => ({ label: inv.name, value: inv.id }))}
        />
      </Item>
      <Item name='location_id' label={t('BladeContainersPage.location_id')} rules={[{ required: true }]}>
        <Select
          showSearch
          optionFilterProp='label'
          options={inventorylocation?.map(loc => ({ label: loc.name, value: loc.id }))}
        />
      </Item>
      {/* Count of slots */}
      <Item name='count' label={t('BladeContainersPage.count')} rules={[{ required: true }]}>
        <InputNumber min={1} />
      </Item>

      {/* U size & Rack ID select & Position in rack */}
      <RackPositionsFormItem dataToUpdate={props.dataToUpdate} />

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

export default BladeContainerForm