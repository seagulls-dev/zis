import { Input, Button, Form, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { AppState } from 'common/models'
import { formItemLayout, tailLayout } from 'helpers/layoutHelpers'
import { DataCenterDetails } from 'pages/datacenter/datacenter/models'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

interface Props {
  dataToUpdate?: DataCenterDetails
  onFinish: (values: DataCenterDetails) => void
}

const { Item } = Form

const DatacenterForm = (props: Props) => {
  const [form] = useForm()
  const { t } = useTranslation()
  const { inventorylocation } = useSelector((state: AppState) => state.inventorylocation)

  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={props.onFinish}
      initialValues={{ ...props.dataToUpdate }}
    >
      <Item
        name='name'
        label={t('DatacenterPage.name')}
        rules={[{ required: true }]}
      >
        <Input />
      </Item>
      <Item
        name='location_id'
        label={t('DatacenterPage.location_id')}
        rules={[{ required: true }]}
      >
        <Select options={inventorylocation?.map(loc => ({ label: loc.name, value: loc.id }))} />
      </Item>
      <Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          {props.dataToUpdate ? t('billing.tax.update') : t('billing.tax.create')}
        </Button>
      </Item>
    </Form>
  )
}
export default DatacenterForm