import React, { useState } from 'react'
import { Popover, Form, Select, Tooltip } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useTranslation } from 'react-i18next'
import Button from 'antd-button-color'
import { formItemLayout, tailLayout } from 'helpers/layoutHelpers'
import { useDispatch, useSelector } from 'react-redux'
import { PlusOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import insertBlade from 'pages/inventory/bladecontainer/actions/insertBlade'
import TextArea from 'antd/lib/input/TextArea'
import { BladeContainerDetails, InsertBladeParams } from 'pages/inventory/bladecontainer/models'
import { AppState } from 'common/models'
import { arrayFromCount } from 'helpers/arrayHelpers'

interface Props {
  bladeContainer: BladeContainerDetails
  position?: number
}
const { Item } = Form

const InsertBladeForm = (props: Props) => {
  const { t } = useTranslation()
  const [form] = useForm()
  const dispatch = useDispatch()
  const [visiblePopUp, setVisiblePopUp] = useState(false)
  const { inventories, isLoading } = useSelector((state: AppState) => state.inventory)
  const { bladecontainers, isSaving } = useSelector((state: AppState) => state.bladecontainer)
  const { physicalservers } = useSelector((state: AppState) => state.inventoryphysicalserver)

  const onFinish = (values: InsertBladeParams) => {
    dispatch(insertBlade({ ...values }, isSuccess => isSuccess && setVisiblePopUp(false)))
  }

  const InsertForm =
    <Form
      form={form}
      {...formItemLayout}
      onFinish={onFinish}
      style={{
        width: '500px',
        padding: '20px 20px 0 0'
      }}
      validateMessages={{ required: '' }}
      initialValues={{
        container_id: props.bladeContainer.id,
        position_index: props.position
      }}
    >
      <Item
        name='container_id'
        rules={[{ required: true }]}
        label={t('BladeContainersPage.container_id')}
      >
        <Select
          disabled
          options={bladecontainers?.map(cont => ({ label: cont.name, value: cont.id, }))}
        />
      </Item>
      {/* Slot */}
      <Item
        name='position_index'
        rules={[{ required: true }]}
        label={t('BladeContainersPage.position_index')}
      >
        <Select
          disabled={!!props.position}
          options={
            arrayFromCount(props.bladeContainer.count)
              .map(v => ({
                value: v,
                label: v,
                disabled: props.bladeContainer.physicalServers?.some(s => s.position_index === v)
              }))
          }
        />
      </Item>
      {/* Inventory Item */}
      <Item
        name='case_id'
        rules={[{ required: true }]}
        label={t('BladeContainersPage.case_id')}
      >
        <Select
          showSearch
          optionFilterProp='label'
          options={inventories?.map(inv => ({ label: inv.name, value: inv.id, }))}
          loading={isLoading}
        />
      </Item>
      <Item
        name='ident'
        rules={[{ required: true }]}
        label={t('BladeContainersPage.ident')}
      >
        <Select
          showSearch
          optionFilterProp='label'
          options={physicalservers?.map(serv => ({ label: serv.ident, value: serv.ident }))} />
      </Item>
      <Item
        name='server_conf'
        label={t('BladeContainersPage.server_conf')}
      >
        <TextArea />
      </Item>

      <Item {...tailLayout}>
        <Button htmlType='submit' loading={isSaving} type='warning'>
          {t('BladeContainersPage.insert-blade-button')}
        </Button>
      </Item>
    </Form>


  return (
    <Tooltip title={<>{t('BladeContainersPage.insert-blade-title')} {props.position}</>}>
      <Popover
        trigger='click'
        placement='left'
        content={InsertForm}
        title={<h3 style={{ marginTop: 10 }}>{t('BladeContainersPage.insert-blade-title')} {props.position}</h3>}
        visible={visiblePopUp}
        onVisibleChange={(visible) => setVisiblePopUp(visible)}
        style={{ width: '500px' }}
      >
        <Button type='success' size='small'>
          <PlusOutlined /><MenuUnfoldOutlined />
        </Button>
      </Popover>
    </Tooltip>
  )
}

export default InsertBladeForm