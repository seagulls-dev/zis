import React from 'react'
import {Button, Form, Input} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import {useTranslation} from 'react-i18next'
import { CreateUpdateServerParams, CustomerManagementEnum, ServerBackupEnum, ServerDetails, ServerMonitoringEnum, ServerTypeEnum, VPSTypeEnum, ZISManagementEnum } from 'pages/server/models'
import {useForm} from 'antd/lib/form/Form'
import {Select} from 'antd'
import {AppState} from 'common/models'
import {useSelector} from 'react-redux'

interface Props {
  onFormSubmit: (values: CreateUpdateServerParams) => void
  dataToUpdate?: ServerDetails
}

const {Item} = Form

const ServerForm = (props: Props) => {
  const {t} = useTranslation()
  const [form] = useForm()
  const {physicalservers} = useSelector((state: AppState) => state.inventoryphysicalserver)
  const {customers} = useSelector((state: AppState) => state.customer)
  const {ips} = useSelector((state: AppState) => state.ip)
  const { isSaving } = useSelector( ( state: AppState ) => state.server )

  return (
    <Form
      {...formItemLayout}
      onFinish={props.onFormSubmit}
      form={form}
      initialValues={{...props.dataToUpdate}}
    >
      <Item name='hostname' label={t('serversPage.hostname')} rules={[{required: true}]}>
        <Input />
      </Item>
      <Item name='primary_ip_id' label={t('serversPage.primary_ip_id')} rules={[{required: true}]}>
        <Select
          showSearch
          allowClear
          optionFilterProp='label'
          options={ips?.map(ip => ({label: ip.address, value: ip.id}))}
        />
      </Item>
      <Item name='customer_id' label={t('serversPage.customer_id')} rules={[{required: true}]}>
        <Select
          showSearch
          allowClear
          optionFilterProp='label'
          options={customers?.map(c => ({label: c.company?.name, value: c.id, key: c.id, disabled: !c.company}))} />
      </Item>
      <Item name='server_type' label={t('serversPage.server_type')} rules={[{required: true}]}>
        <Select options={ Object.values( ServerTypeEnum ).map( v => ( { label: v, value: v, key: v } ) ) } />
      </Item>
      {/* Server ID */}
      <Item name='location_id' label={t('serversPage.location_id')} rules={[{required: true}]}>
        <Select
          showSearch
          allowClear
          optionFilterProp='label'
          options={physicalservers?.map(ph => ({label: ph.ident, value: ph.id}))} />
      </Item>
      <Item name='vps_type' label={t('serversPage.vps_type')} rules={[{required: true}]}>
        <Select options={ Object.values( VPSTypeEnum ).map( v => ( { label: v, value: v, key: v } ) ) } />
      </Item>
      <Item name='zis_management' label={t('serversPage.zis_management')} rules={[{required: true}]}>
        <Select options={ Object.values( ZISManagementEnum ).map( v => ( { label: v, value: v, key: v } ) ) } />
      </Item>
      <Item name='customer_management' label={t('serversPage.customer_management')} rules={[{required: true}]}>
        <Select options={ Object.values( CustomerManagementEnum ).map( v => ( { label: v, value: v, key: v } ) ) } />
      </Item>
      <Item name='server_backup' label={t('serversPage.server_backup')} rules={[{required: true}]}>
        <Select options={ Object.values( ServerBackupEnum ).map( v => ( { label: v, value: v, key: v } ) ) } />
      </Item>
      <Item name='server_monitoring' label={t('serversPage.server_monitoring')} rules={[{required: true}]}>
        <Select options={ Object.values( ServerMonitoringEnum ).map( v => ( { label: v, value: v, key: v } ) ) } />
      </Item>
      <Item name='comment' label={t('serversPage.comment')}>
        <TextArea />
      </Item>


      <Item {...tailLayout}>
        <Button type='primary' htmlType='submit' className='login-form-button' loading={ isSaving }>
          {
            props.dataToUpdate ? t('billing.tax.update') : t('billing.tax.create')
          }
        </Button>
      </Item>
    </Form>
  )

}

export default ServerForm