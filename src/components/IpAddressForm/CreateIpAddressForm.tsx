import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Select, Switch } from 'antd'
import Item from 'antd/lib/form/FormItem'
import { useForm } from 'antd/lib/form/Form'
import { useTranslation } from 'react-i18next'
import { IPv4Regex, IPv6Regex } from 'helpers/stringHelpers'
import { CustomerDetails } from 'pages/billing/customer/models'
import { IpSubnetDetails } from 'pages/ip/ip-subnet/models'

interface Props {
  handleIpAddressFinish: (val: any) => void
  customers?: CustomerDetails[]
  ipSubnets?: IpSubnetDetails[]
}
const { Option } = Select


const CreateIpAddressForm = ({ handleIpAddressFinish, customers, ipSubnets }: Props) => {
  const { t } = useTranslation()
  const [form] = useForm()
  const [ipv, setIpv] = useState<boolean>(false)

  const onIpvChange = (checked: boolean) => {
    setIpv(checked)
  }

  useEffect(() => {
    form.resetFields(['subnet_prefix', 'subnet_gateway'])
    // eslint-disable-next-line
  }, [ipv])

  return (
    <Form
      name='ip-address'
      className='IpAddressPage'
      onFinish={handleIpAddressFinish}
      form={form}
    >

      <Item style={{ marginBottom: '0' }} >

        <Input.Group compact>

          <Item
            name='customer_id'
            rules={[{ required: true }]}
            label={t('createUserPage.customer_id')}
          >
            <Select
              showSearch
              allowClear
              optionFilterProp='children'
              size='large' style={{ width: '310px', marginRight: 16 }}>
              {
                customers ? customers.map((customer, i) => (<Option key={i} value={customer.id} >{customer?.company?.name}</Option>)) : 'No data'
              }
            </Select>
          </Item>

          <Item
            name='subnet_id'
            rules={[{ required: true }]}
            label={t('createUserPage.subnet_id')}
          >
            <Select
              showSearch
              allowClear
              optionFilterProp='children'
              size='large' style={{ width: '310px' }}>
              {
                ipSubnets ? ipSubnets.map((subnet, i) => (<Option key={i} value={subnet.id} >{subnet.cidr}</Option>)) : 'No data'
              }
            </Select>
          </Item>

        </Input.Group>
      </Item>


      <Item
        style={{ marginBottom: '0' }}
      >
        <Input.Group compact>

          <Item
            name='address'
            rules={[{
              required: true,
              message: t('ipAddressPage.err_ip_address'),
              pattern: !ipv ? new RegExp(IPv4Regex) : new RegExp(IPv6Regex)
            }]}
            label={t('ipAddressPage.ip_address')}
            hasFeedback
            style={{ width: 540, marginRight: 16 }}
          >
            <Input size='large' />
          </Item>

          <Item label='IP ver.' >
            <Switch
              checkedChildren='IPv6'
              unCheckedChildren='IPv4'
              onChange={onIpvChange}
              checked={ipv}
            />
          </Item>

        </Input.Group>
      </Item>


      <Item>
        <Input.Group compact>

          <Item
            name='comment'
            label={t('ipAddressPage.comment')}
            style={{ width: 640, marginRight: 16 }}
          >
            <Input size='large' />
          </Item>

        </Input.Group>
      </Item>

      <Item>
        <Button
          type='primary'
          htmlType='submit'
          className='login-form-button'
          size='large'
        >
          {t('companiesPage.create')}
        </Button>
      </Item>
    </Form>
  )
}

export default CreateIpAddressForm