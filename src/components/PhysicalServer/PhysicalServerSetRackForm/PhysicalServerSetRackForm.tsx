import {PlusOutlined, PicLeftOutlined} from '@ant-design/icons'
import {Select, Popover, Tooltip, Form} from 'antd'
import Button from 'antd-button-color'
import {useForm} from 'antd/lib/form/Form'
import RackPositionsFormItem from 'components/Datacenter/Rack/RackPositionsFormItem'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import setRack from 'pages/inventory/physicalserver/actions/setRack'
import {PhysicalServerDetails} from 'pages/inventory/physicalserver/models'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'

const {Item} = Form

interface Props {
  physicalServer: PhysicalServerDetails
}

const PhysicalServerSetRackForm = (props: Props) => {
  const {t} = useTranslation()
  const [form] = useForm()
  const dispatch = useDispatch()

  const onFinish = (values) => dispatch(setRack({...values}))

  const SetRackForm =
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
        server_id: props.physicalServer.id,
        u_size: props.physicalServer.u_size
      }}
    >
      <Item
        name='server_id'
        rules={[{required: true}]}
        label={t('physicalServersPage.server_id')}
      >
        <Select options={[{
          label: props.physicalServer.ident,
          value: props.physicalServer.id
        }]} />
      </Item>

      {/* U size & Rack ID select & Position in rack */}
      <RackPositionsFormItem dataToUpdate={props.physicalServer} usizeDisabled rackRequired />

      <Item {...tailLayout}>
        <Button htmlType='submit' type='warning'>{t('physicalServersPage.set-rack.set')}</Button>
      </Item>
    </Form>


  return (
    <Popover
      trigger='click'
      placement='left'
      content={SetRackForm}
      title={t('physicalServersPage.set-rack.title')}
      style={{width: '500px'}}
    >
      <Tooltip title={t('physicalServersPage.set-rack.set-title')}>
        <Button type='info' size='small'>
          <PlusOutlined />
          <PicLeftOutlined />
        </Button>
      </Tooltip>
    </Popover>
  )
}
export default PhysicalServerSetRackForm