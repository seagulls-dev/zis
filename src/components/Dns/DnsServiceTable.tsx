import React from 'react'
import { Table, Space, Input, notification, Skeleton } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons/lib/icons'
import { DnsServiceDetails } from 'pages/dns/service/models'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import { useTranslation } from 'react-i18next'
import Button from 'antd-button-color'
import { AppState } from 'common/models'
import { useSelector } from 'react-redux'

interface Props {
  handleUpdate: (record: DnsServiceDetails) => void
  handleDelete: (id: number) => void
}

const DnsServiceTable = (props: Props) => {
  const { t } = useTranslation()
  const { dnsservices, isLoading } = useSelector(
    (state: AppState) => state.dnsservice
  )

  const copyText = (e) =>
    navigator.clipboard.writeText(
      e.currentTarget.parentNode.nextElementSibling.value
    ) && openNotification('info')

  const openNotification = (type: string) => {
    notification[type]({
      message: t('dnsPage.copied'),
      duration: 1,
      style: { background: 'rgba(45,146,89, 0.6)' },
    })
  }

  const nestedTable = () => (
    <Table
      rowKey='id'
      dataSource={dnsservices}
      columns={[
        {
          title: t('dnsPage.username'),
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: t('dnsPage.password'),
          dataIndex: 'password',
          key: 'password',
          render: (text) =>
            text && (
              <Input.Password
                value={text}
                readOnly
                bordered={false}
                prefix={<CopyOutlined onClick={copyText} />}
              />
            ),
        },
        {
          title: t('dnsPage.token_name'),
          dataIndex: 'token_name',
          key: 'token_name',
        },
        {
          title: t('dnsPage.token_value'),
          dataIndex: 'token_value',
          key: 'token_value',
          ellipsis: true,
          render: (text) =>
            text && (
              <Input.Password
                value={text}
                readOnly
                bordered={false}
                prefix={<CopyOutlined onClick={copyText} />}
              />
            ),
        },
      ]}
      pagination={false}
      footer={() => <>&nbsp;</>}
    />
  )

  return (
    <>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Table<DnsServiceDetails>
          dataSource={dnsservices}
          rowKey='id'
          columns={[
            { title: t('dnsPage.driver'), dataIndex: 'driver', key: 'driver' },
            {
              title: t('dnsPage.protocol'),
              dataIndex: 'protocol',
              key: 'protocol',
            },
            { title: t('dnsPage.host'), dataIndex: 'host', key: 'host' },
            { title: t('dnsPage.port'), dataIndex: 'port', key: 'port' },
            {
              title: t('dnsPage.instance'),
              dataIndex: 'instance',
              key: 'instance',
            },

            {
              title: t('dnsPage.base_url'),
              dataIndex: 'base_url',
              key: 'base_url',
            },
            {
              title: t('dnsPage.actions'),
              key: 'action',
              dataIndex: 'action',
              width: 140,

              render: (_: string, record: DnsServiceDetails) => (
                <Space size='small'>
                  <Button
                    size='small'
                    type='warning'
                    onClick={() => props.handleUpdate(record)}
                    icon={<EditOutlined />}
                  >
                    {t('dnsPage.edit_button')}
                  </Button>

                  <PopConfirmZis
                    onConfirm={() => props.handleDelete(record.id)}
                  >
                    <Button
                      size='small'
                      type='danger'
                      icon={<DeleteOutlined />}
                    >
                      {t('dnsPage.delete_button')}
                    </Button>
                  </PopConfirmZis>
                </Space>
              ),
            },
          ]}
          expandable={{
            expandedRowRender: nestedTable,
          }}
        />
      )}
    </>
  )
}

export default DnsServiceTable
