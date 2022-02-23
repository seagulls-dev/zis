import React from 'react'
import { Button, Form, Input, Select, Switch } from 'antd'
import Item from 'antd/lib/form/FormItem'
import { useForm } from 'antd/lib/form/Form'
import { useTranslation } from 'react-i18next'
import { CustomerDetails } from 'pages/billing/customer/models'
import { IpDetails } from 'pages/ip/ip-address/models'
import { IpSubnetDetails } from 'pages/ip/ip-subnet/models'

interface Props {
  customers?: CustomerDetails[]
  dataToUpdate?: IpDetails
  onUpdate?: (values: any) => void
  ipSubnets?: IpSubnetDetails[]
}
const { Option } = Select


const UpdateIpAddressForm = ({ customers, dataToUpdate, onUpdate, ipSubnets }: Props) => {
  const { t } = useTranslation()
  const [form] = useForm()

  return (
    <Form
      name='ip-address'
      className='IpAddressPage'
      onFinish={onUpdate}
      form={form}
      initialValues={{ ...dataToUpdate }}
    >
      <Item name='id' style={{ display: 'none' }}>
        <Input type='hidden' />
      </Item>

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
              size='large' style={{ width: 310, marginRight: 16 }}>
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
              size='large' style={{ width: 310 }} disabled>
              {
                ipSubnets ? ipSubnets.map((subnet, i) => (<Option key={i} value={subnet.id} >{subnet.cidr}</Option>)) : 'No data'
              }
            </Select>
          </Item>

        </Input.Group>
      </Item>


      <Item style={{ marginBottom: '0' }} >

        <Input.Group compact>

          <Item
            name='address'
            rules={[{
              required: true,
              message: t('ipAddressPage.err_ip_address')
            }]}
            label={t('ipAddressPage.ip_address')}
            hasFeedback
            style={{ width: 540, marginRight: 16 }}
          >
            <Input size='large' disabled />
          </Item>

          <Item label='IP ver.' >
            <Switch
              checkedChildren='IPv6'
              unCheckedChildren='IPv4'
              checked={dataToUpdate && dataToUpdate.address.length > 15}
              disabled
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
          {t('ipAddressPage.update')}
        </Button>
      </Item>
    </Form>
  )
}

export default UpdateIpAddressForm