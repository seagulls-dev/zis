import React from 'react'
import { Button, Form } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { BlockDetails } from 'pages/datacenter/block/models'
import { formItemLayout, tailLayout } from 'helpers/layoutHelpers'
import { useTranslation } from 'react-i18next'
import TextArea from 'antd/lib/input/TextArea'
import RackPositionsFormItem from '../Rack/RackPositionsFormItem'

const { Item } = Form

interface Props {
  dataToUpdate?: BlockDetails
  onFinish: (values: BlockDetails) => void
}

const BlockForm = (props: Props) => {
  const [form] = useForm()
  const { t } = useTranslation()

  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={props.onFinish}
      initialValues={{ ...props.dataToUpdate }}
    >

      {/* U size & Rack ID select & Position in rack */}
      <RackPositionsFormItem dataToUpdate={props.dataToUpdate} type='Block' />

      <Item
        name='comment'
        label={t('BlockPage.comment')}
        rules={[{ required: true }]}
      >
        <TextArea />
      </Item>

      <Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          {props.dataToUpdate ? t('billing.tax.update') : t('billing.tax.create')}
        </Button>
      </Item>
    </Form>
  )
}

export default BlockForm
