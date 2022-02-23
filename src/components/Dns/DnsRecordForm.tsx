import React, { useEffect, useState } from 'react'
import {
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Space,
  Typography,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { AppState } from 'common/models'
import { useDispatch, useSelector } from 'react-redux'
import { labelTopLayout } from 'helpers/layoutHelpers'
import Button from 'antd-button-color'
import { AddDnsRecordParams } from 'pages/dns/zone/models'
import getArchivedZone from 'pages/dns/zone/actions/getArchivedZone'
import { LoadingOutlined } from '@ant-design/icons'
import DnsRecordArchivedDropdown from './DnsRecordArchivedDropdown'
import { useForm } from 'antd/es/form/Form'
import { IPv4Regex, IPv6Regex } from 'helpers/stringHelpers'

interface Props {
  serviceId?: number
  onDnsRecordCreate: (values: AddDnsRecordParams) => void
}
const { Item } = Form

const dnsRecordOptions = [
  { label: 'A', value: 'A', description: 'Host address', rule: 'IPv4' },
  {
    label: 'AAAA',
    value: 'AAAA',
    description: 'IPv6 host address',
    rule: 'IPv6',
  },
  {
    label: 'CNAME',
    value: 'CNAME',
    description: 'Canonical name for an alias',
    rule: 'Domain name',
  },
  {
    label: 'MX',
    value: 'MX',
    description: 'Mail eXchange',
    rule: 'Mail eXchange address',
  },
  {
    label: 'NS',
    value: 'NS',
    description: 'Name Server',
    rule: 'Name server address',
  },
  { label: 'PTR', value: 'PTR', description: 'Pointer', rule: 'Pointer' },
  {
    label: 'SRV',
    value: 'SRV',
    description: 'location of service',
    rule: 'Location',
  },
  {
    label: 'TXT',
    value: 'TXT',
    description: 'Descriptive text',
    rule: 'Text value',
  },
]

const DnsRecordForm = ({ serviceId, onDnsRecordCreate }: Props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [form] = useForm()
  const [selectedDns, setSelectedDns] = useState(dnsRecordOptions[0])
  const { dnszone, isLoading } = useSelector((state: AppState) => state.dnszone)

  useEffect(() => {
    serviceId &&
      dnszone &&
      dispatch(
        getArchivedZone({
          service_id: serviceId,
          domain: dnszone?.domain,
        })
      )
    //eslint-disable-next-line
  }, [])

  return (
    <Form
      {...labelTopLayout}
      form={form}
      onFinish={onDnsRecordCreate}
      initialValues={{
        type: 'A',
        domain: dnszone?.domain,
        service_id: serviceId,
      }}
    >
      <Item name='service_id' style={{ display: 'none' }}>
        <Input type='hidden' />
      </Item>
      <Item name='domain' style={{ display: 'none' }}>
        <Input type='hidden' />
      </Item>

      <Row gutter={16}>
        <Col span={24}>
          <Item
            name='type'
            rules={[{ required: true }]}
            label={t('dnsRecordForm.input_type')}
          >
            <Radio.Group
              size='large'
              options={dnsRecordOptions}
              onChange={(e) =>
                setSelectedDns(
                  dnsRecordOptions.find((v) => v.value === e.target.value)!
                )
              }
              optionType='button'
              buttonStyle='solid'
            />
          </Item>
        </Col>

        <Col span={24}>
          <Space align='center'>
            <Typography.Title level={5}>
              {selectedDns?.description}
            </Typography.Title>
          </Space>
        </Col>

        <Col span={16}>
          <Item
            name='name'
            rules={[{ required: true }]}
            label={t('dnsRecordForm.input_name')}
          >
            <Input addonAfter={<strong>{dnszone?.domain}</strong>} />
          </Item>
        </Col>

        <Col span={8}>
          <Item
            name='ttl'
            rules={[{ required: true }]}
            label={t('dnsRecordForm.input_ttl')}
          >
            <InputNumber
              min={1}
              step={1}
              style={{ width: '100%' }}
              placeholder='3600'
            />
          </Item>
        </Col>

        <Col span={24}>
          <Item
            name='content'
            rules={[
              {
                required: true,
                message: `Content does not match ${selectedDns.rule}`,
                pattern:
                  (selectedDns.value === 'A' && new RegExp(IPv4Regex)) ||
                  (selectedDns.value === 'AAAA' && new RegExp(IPv6Regex)) ||
                  undefined,
              },
            ]}
            label={t('dnsRecordForm.input_content')}
          >
            <Input placeholder={selectedDns.rule} />
          </Item>
        </Col>

        <Col span={12}>
          <Item>
            <Button type='primary' size='large' htmlType='submit'>
              {t('dnsRecordForm.button_create')}
            </Button>
          </Item>
        </Col>
        <Col span={12}>
          {isLoading ? (
            <LoadingOutlined />
          ) : (
            <>
              <DnsRecordArchivedDropdown
                onSelect={(record) => form.setFieldsValue(record)}
                archivedRecords={dnszone?.archived}
              />
            </>
          )}
        </Col>
      </Row>
    </Form>
  )
}

export default DnsRecordForm
