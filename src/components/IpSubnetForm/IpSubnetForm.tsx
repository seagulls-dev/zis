import React, { useState, useEffect } from 'react'
import { Button, Form, Input, InputNumber, Select, Switch } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useTranslation } from 'react-i18next'
import { IPv6RegexWithSubnet, IPv6Regex, IPv4RegexWithSubnet, IPv4Regex } from 'helpers/stringHelpers'
import { CustomerDetails } from 'pages/billing/customer/models'
import { IpSubnetDetails } from 'pages/ip/ip-subnet/models'

interface Props {
  ipSubnetCreate: (val: any) => void
  customers?: CustomerDetails[]
  dataToUpdate?: IpSubnetDetails
  ipSubnetUpdate?: (val: any) => void
}
const { Option } = Select
const { Item } = Form

const IpSubnetForm = ({ ipSubnetCreate, customers, dataToUpdate, ipSubnetUpdate }: Props) => {
  const { t } = useTranslation()
  const [form] = useForm()
  const [ipv, setIpv] = useState<boolean>(false)

  const onIpvChange = (checked: boolean) => {
    setIpv(checked)
  }

  useEffect(() => {
    form.resetFields(['subnet_prefix', 'gateway'])
    // eslint-disable-next-line
  }, [ipv])

  return (
    <Form
      name='ip-address'
      className='IpSubnetFrom'
      onFinish={!!dataToUpdate ? ipSubnetUpdate : ipSubnetCreate}
      initialValues={
        {
          ...dataToUpdate
        }
      }
      form={form}
    >
      {

        !!dataToUpdate &&
        <Item name='id' style={{ display: 'none' }}>
          <Input type='hidden' />
        </Item>

      }

      <Item style={{ marginBottom: '0' }} >
        <Input.Group compact>
          <Item
            name='customer_id'
            rules={[{ required: true, message: t('ipSubnetPage.err_customer') }]}
            label={t('createUserPage.customer_id')}
          >
            <Select
              showSearch
              allowClear
              optionFilterProp='children'
              size='large' style={{ width: 310, margin: '0 16px 0 0' }}>
              {
                customers?.map((customer, i) => (<Option key={i} value={customer.id} >{customer?.company?.name}</Option>))
              }
            </Select>
          </Item>
          <Item
            name='location'
            label={t('ipSubnetPage.location')}
            hasFeedback
            style={{ width: 310, margin: '0 16px 0 0' }}
          >
            <Input
              size='large' />
          </Item>
        </Input.Group>
      </Item>


      <Item style={{ marginBottom: '0' }} >
        <Input.Group compact>
          {
            !ipv ?
              <>
                <Item
                  name='cidr'
                  rules={[{
                    required: true,
                    message: t('ipSubnetPage.err_subnet_prefix'),
                    pattern: new RegExp(IPv4RegexWithSubnet)
                  }]}
                  label={t('ipSubnetPage.cidr')}
                  hasFeedback
                  style={{ width: 310, marginRight: '16px' }}
                >
                  <Input
                    size='large'
                    disabled={!!dataToUpdate}
                  />
                </Item>

                <Item
                  name='gateway'
                  rules={[{
                    pattern: new RegExp(IPv4Regex),
                    message: t('ipSubnetPage.err_subnet_gateway')
                  }]}
                  label={t('ipSubnetPage.subnet_gateway')}
                  hasFeedback
                  style={{ width: 310, marginRight: '16px' }}
                >

                  <Input size='large' disabled={!!dataToUpdate} />
                </Item>
              </>
              :
              <>
                <Item
                  name='cidr'
                  rules={[{
                    required: true,
                    message: t('ipSubnetPage.err_subnet_prefix'),
                    pattern: new RegExp(IPv6RegexWithSubnet)
                  }]}
                  label={t('ipSubnetPage.cidr')}
                  hasFeedback
                  style={{ width: 480, marginRight: '16px' }}
                >
                  <Input size='large' disabled={!!dataToUpdate} />
                </Item>
                <Item
                  name='gateway'
                  rules={[{
                    pattern: new RegExp(IPv6Regex),
                    message: t('ipSubnetPage.err_subnet_gateway')
                  }]}
                  label={t('ipSubnetPage.subnet_gateway')}
                  hasFeedback
                  style={{ width: 480, marginRight: '16px' }}
                >
                  <Input size='large' disabled={!!dataToUpdate} />
                </Item>
              </>
          }

          <Item label='IP ver.'
            style={{ width: 70, margin: '0 16px 0 0' }}
            valuePropName='checked'
          >
            <Switch
              checkedChildren='IPv6'
              unCheckedChildren='IPv4'
              onChange={onIpvChange}
              disabled={!!dataToUpdate}
            />

          </Item>

        </Input.Group>
      </Item>

      <Item>
        <Input.Group compact>
          <Item
            name='vlan'
            label={t('ipSubnetPage.vlan')}
            style={{ width: 310, margin: '0 16px 0 0' }}
          >
            <InputNumber size='large' style={{ width: 310 }} />
          </Item>

          <Item
            name='dns_id'
            label={t('ipSubnetPage.dns_id')}
            style={{ width: 310, margin: '0 16px 0 0' }}
          >
            <InputNumber size='large' style={{ width: 310 }} />
          </Item>

          <Item
            name='ipmi'
            label={t('ipSubnetPage.management_subnet')}
            style={{ width: 70, margin: '0 16px 0 0' }}
            valuePropName='checked'
          >
            <Switch
              checkedChildren='Yes'
              unCheckedChildren='No'
              defaultChecked={dataToUpdate && dataToUpdate.ipmi === 1 ? true : false}
            />
          </Item>

        </Input.Group>
      </Item>

      <Item
      // {...tailLayout}
      >
        <Button
          type='primary'
          // loading={isSaving} 
          htmlType='submit'
          className='login-form-button'
          size='large'
        >
          {!!dataToUpdate ? t('ipSubnetPage.update') : t('ipSubnetPage.create')}
        </Button>
      </Item>
    </Form>

  )
}

export default IpSubnetForm