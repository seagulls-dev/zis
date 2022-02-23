import React from 'react'
import { useForm } from 'antd/lib/form/Form'
import { formItemLayout, tailLayout } from 'helpers/layoutHelpers'
import { useTranslation } from 'react-i18next'
import { RackDetails } from 'pages/datacenter/rack/models'
import { Form, Input, InputNumber, Select } from 'antd'
import Button from 'antd-button-color'
import { useSelector } from 'react-redux'
import { AppState } from 'common/models'

interface Props {
  dataToUpdate?: RackDetails
  onFinish: (values: RackDetails) => void
}

const { Item } = Form

const RackForm = (props: Props) => {
  const [form] = useForm()
  const { t } = useTranslation()
  const { datacenters } = useSelector((state: AppState) => state.datacenter)

  return (
    <Form {...formItemLayout} form={form} onFinish={props.onFinish} initialValues={{ ...props.dataToUpdate }}>
      <Item name="name" label={t('RackPage.name')} rules={[{ required: true }]}>
        <Input />
      </Item>
      <Item name="datacenter_id" label={t('RackPage.datacenter_id')} rules={[{ required: true }]}>
        <Select options={datacenters?.map(dc => ({ label: dc.name, value: dc.id }))} />
      </Item>
      <Item name="u_count" label={t('RackPage.u_count')} rules={[{ required: true }]}>
        <InputNumber min={1} />
      </Item>
      <Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          {props.dataToUpdate
            ? t('billing.tax.update')
            : t('billing.tax.create')}
        </Button>
      </Item>
    </Form>
  )
}

export default RackForm