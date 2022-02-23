import React from 'react'
import { useSelector } from 'react-redux'
import { Form, Input, InputNumber, Select } from 'antd'
import { formItemLayout, tailLayout } from 'helpers/layoutHelpers'
import { DnsServiceDetails } from 'pages/dns/service/models'
import Button from 'antd-button-color'
import { AppState } from 'common/models'
import { useTranslation } from 'react-i18next'

interface Props {
  dataToUpdate?: DnsServiceDetails
  onFinish: ( values: DnsServiceDetails ) => void
}

const { Item } = Form

const DnsServiceForm = ( props: Props ) => {
  const { t } = useTranslation()
  const { isLoading, servers } = useSelector( ( state: AppState ) => state.server )

  return (
    <Form
      onFinish={ props.onFinish }
      { ...formItemLayout }
      initialValues={
        props.dataToUpdate && {
          ...props.dataToUpdate,
        }
      }
    >
      {
        !props.dataToUpdate &&
        <>
          <Item label={ t( 'dnsPage.server_id' ) } name='server_id' rules={ [ { required: true } ] }>
            <Select options={ servers?.map( s => ( { label: s.hostname, value: s.id, key: s.id } ) ) } loading={ isLoading } />
          </Item>
          <Item label={ t( 'dnsPage.driver' ) } name='driver' rules={ [ { required: true } ] }>
            <Select options={ [
              { label: 'PowerDns', value: 'PowerDns', key: 'PowerDns' },
              { label: 'Amazon', value: 'Amazon', key: 'Amazon' }
            ] } />
          </Item>
        </>
      }
      <Item label={ t( 'dnsPage.protocol' ) } name='protocol' rules={ [ { required: true } ] }>
        <Select options={ [
          { label: 'http', value: 'http', key: 'http' },
          { label: 'https', value: 'https', key: 'https' }
        ] } />
      </Item>
      <Item label={ t( 'dnsPage.host' ) } name='host' rules={ [ { required: true } ] }>
        <Input />
      </Item>
      <Item label={ t( 'dnsPage.port' ) } name='port' rules={ [ { required: true } ] }>
        <InputNumber min={ 1 } max={ 65535 } step={ 1 } />
      </Item>
      <Item label={ t( 'dnsPage.instance' ) } name='instance'>
        <Input />
      </Item>
      <Item label={ t( 'dnsPage.username' ) } name='username'>
        <Input />
      </Item>
      <Item label={ t( 'dnsPage.password' ) } name='password'>
        <Input />
      </Item>
      <Item label={ t( 'dnsPage.base_url' ) } name='base_url'>
        <Input />
      </Item>
      <Item label={ t( 'dnsPage.token_name' ) } name='token_name'>
        <Input />
      </Item>
      <Item label={ t( 'dnsPage.token_value' ) } name='token_value'>
        <Input />
      </Item>

      <Item { ...tailLayout }>
        <Button type='primary' size='large' htmlType='submit'>
          { props.dataToUpdate ? t( 'dnsPage.update_button' ) : t( 'dnsPage.create_button' ) }
        </Button>
      </Item>
    </Form>
  )
}

export default DnsServiceForm
