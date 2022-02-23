import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import TextArea from 'antd/lib/input/TextArea'
import { formItemLayout, tailLayout } from 'helpers/layoutHelpers'
import { CreateInventoryParams, UpdateInventoryParams, InventoryDetails } from 'pages/inventory/inventory/models'
import { useTranslation } from 'react-i18next'
import { InventoryLocationDetails } from 'pages/inventory/location/models'
import { InventoryTypeDetails } from 'pages/inventory/type/models'
import { CompanyDetails } from 'pages/company/models'
import { BillDetails } from 'pages/billing/bill/models'
import { PhysicalServerDetails } from 'pages/inventory/physicalserver/models'
import moment from 'moment'

interface Props {
  onFormSubmit: (values: CreateInventoryParams | UpdateInventoryParams) => void
  dataToUpdate?: InventoryDetails
  companies?: CompanyDetails[]
  inventoryLocation?: InventoryLocationDetails[]
  inventories?: InventoryDetails[]
  inventoryType?: InventoryTypeDetails[]
  bills?: BillDetails[]
  physicalServers?: PhysicalServerDetails[]
  isSaving?: boolean
}

const { Item } = Form

const InventoryForm = (props: Props) => {
  const { t } = useTranslation()
  const [form] = useForm()
  const [filteredBills, setFilteredBills] = useState<BillDetails[] | undefined>(props.bills)

  const fixAutocomplete = () => {
    document.querySelectorAll('.ant-select-selector input').forEach((e) => {
      e.setAttribute('autocomplete', 'stopDamnAutocomplete')
    })
  }
  useEffect(() => {
    fixAutocomplete()
    //eslint-disable-next-line
  }, [])

  return (
    <Form
      {...formItemLayout}
      onFinish={props.onFormSubmit}
      form={form}
      initialValues={{
        ...props.dataToUpdate,
        purchase_date: props.dataToUpdate && moment(props.dataToUpdate.purchase_date),
        owner: 'Tlap'
      }}
    >
      <Item name='id' style={{ display: 'none' }}>
        <InputNumber type='hidden' />
      </Item>
      <Item name='name' label={t('inventoryPage.name')} rules={[{ required: true }]}>
        <Input autoComplete={'newpassword'} />
      </Item>
      <Item name='location_id' label={t('inventoryPage.location_id')} rules={[{ required: true }]}>
        <Select
          showSearch
          filterOption={true}
          optionFilterProp='label'
          options={props.inventoryLocation?.map(l => ({ label: l.name, value: l.id }))}
        />
      </Item>
      <Item name='type_id' label={t('inventoryPage.type_id')} rules={[{ required: true }]}>
        <Select
          showSearch
          filterOption={true}
          optionFilterProp='label'
          options={props.inventoryType?.map(t => ({ label: t.name, value: t.id }))}
        />
      </Item>
      {/* company_id */}
      <Item name='vendor_id' label={t('inventoryPage.company_id')} >
        <Select
          allowClear
          showSearch
          filterOption={true}
          optionFilterProp='label'
          loading={!props.companies}
          options={props.companies?.map(c => ({ label: c.name, value: c.id }))}
          onSelect={(value: number) =>
            setFilteredBills(props.bills?.filter(b => b.company_id === value))
          }
          onClear={() => setFilteredBills(props.bills)}
        />
      </Item>
      <Item name='vendor' label={t('inventoryPage.vendor')} >
        <Input autoComplete={'newpassword'} />
      </Item>
      <Item name='inv_no' label={t('inventoryPage.inv_no')} rules={[{ required: true }]}>
        <Select
          allowClear
          showSearch
          optionFilterProp='label'
          options={filteredBills?.map(b => ({ label: `${b.number} (${b.total_without_vat / 100} ${b.currency})`, value: b.number ? b.number : '' }))}
        />
      </Item>
      {/* string  */}
      <Item name='owner' label={t('inventoryPage.owner')} rules={[{ required: true }]}>
        <Input autoComplete={'newpassword'} />
      </Item>
      {/* server_id */}
      <Item name='server_id' label={t('inventoryPage.server_id')} >
        <Select
          showSearch
          filterOption={true}
          optionFilterProp='label'
          allowClear
          options={props.physicalServers?.map(serv => ({ label: serv.ident, value: serv.id }))} />
      </Item>
      <Item name='purchase_date' label={t('inventoryPage.purchase_date')}>
        <DatePicker format='DD.MM.YYYY' style={{ width: '-webkit-fill-available' }} />
      </Item>
      <Item name='serial' label={t('inventoryPage.serial')} >
        <Input autoComplete={'newpassword'} />
      </Item>
      <Item name='warranty' label={t('inventoryPage.warranty')}>
        <InputNumber min={1} />
      </Item>
      <Item name='price' label={t('inventoryPage.price')}>
        <InputNumber min={1} />
      </Item>
      <Item name='parameters' label={t('inventoryPage.parameters')}>
        <Input />
      </Item>
      <Item name='comment' label={t('inventoryPage.comment')}>
        <TextArea />
      </Item>


      <Item {...tailLayout}>
        <Button loading={props.isSaving} type='primary' htmlType='submit' className='login-form-button'>
          {
            props.dataToUpdate ? t('billing.tax.update') : t('billing.tax.create')
          }
        </Button>
      </Item>
    </Form>
  )
}

export default InventoryForm