import React, {useEffect, useState} from 'react'
import {Card, Table, Space, Modal, Input, message, Tooltip, Row, Col} from 'antd'
import {useTranslation} from 'react-i18next'
import {AppState} from 'common/models'
import {useDispatch, useSelector} from 'react-redux'
import moment, {Moment} from 'moment'
import {ColumnsType} from 'antd/lib/table'
import getMails from './actions/getMails'
import {MailDetails} from './models'
import {MailOutlined} from "@ant-design/icons";
import getCustomers from 'pages/billing/customer/actions/getCustomers'
import { Link } from 'react-router-dom'

export enum MAIL_STATE {
  STATE_PREPARED = 1,
  STATE_SENT = 2,
  STATE_ERROR = 3
}


const MailPage = () => {

  const {t} = useTranslation()
  const dispatch = useDispatch()

  const { mails, isLoading } = useSelector((state : AppState) => state.mail)
  const { settings } = useSelector((state : AppState) => state.setting)
  const { customers } = useSelector((state : AppState) => state.customer)

  const [dataSource, setDataSource] = useState<MailDetails[]>()
  const [dateFormat, setDateFormat] = useState<string>()
  const [timeFormat, setTimeFormat] = useState<string>()
  const [pageSize, setPageSize] = useState<string>()

  const [customer, setCustomer] = useState<string>()

  useEffect(() => {
    !mails && dispatch(getMails())
    const format = settings?.find(item => item.name === 'date_format')
    setDateFormat(format?.value)
    const size = settings?.find(item => item.name === 'grid_page_size')
    setPageSize(size?.value)
    const time = settings?.find(item => item.name === 'datetime_format')
    setTimeFormat(time?.value)
    !customers && dispatch(getCustomers('company'))
  },[])

  useEffect(() => {
    setDataSource(mails)
  },[mails])

  const FilterByCustomer = mails && (
    <Input
      value={customer}
      onChange={e => {
        const value = e.target.value
        setCustomer(value)
        const filtered = mails?.filter(mail => customers?.filter(c => c.ident?.toLowerCase().includes(value.toLowerCase())).some(item => mail.customer_id === item.id))
        setDataSource(filtered)
      }}
      placeholder={t('billing.invoice.table.search_customer')}
    />
  )

  const columns: ColumnsType<MailDetails> = [
    { title: t('billing.mail.table.created_at'), dataIndex: 'created_at', key: 'created_at', render: text => moment.unix(text).format(dateFormat) },
    { title: t('billing.mail.table.state'), dataIndex: 'state', key: 'state',
      render: text => {
        switch (text) {
          case MAIL_STATE.STATE_PREPARED:
            return t('billing.mail.state.prepared')
          case MAIL_STATE.STATE_SENT:
            return t('billing.mail.state.sent')
          case MAIL_STATE.STATE_ERROR:
            return t('billing.mail.state.error')
        }
      }
    },
    { title: FilterByCustomer, dataIndex: 'customer_id', key: 'customer_id',
      render: text => customers?.find(c => c.id === text)?.ident
    },
    { title: t('billing.mail.table.subject'), dataIndex: 'subject', key: 'subject' },
    { title: t('billing.mail.table.reference'), dataIndex: 'reference', key: 'reference',
      render: text => {
        if (text.includes("Invoice")) {
          const link = text.replace('Invoice:','')
          return <Link to={`/billing/invoice/edit/${link}`}>{text}</Link>
        }
        else {
          return text
        }
      }
    },
    { title: t('billing.mail.table.count'), dataIndex: 'count', key: 'count', render: (text, record) => record.sent?.length }
  ]

  const expandedRowRender = (parentRecord, index: number) => {
    const columns = [
      { title: t('billing.mail.table.mail_to'), dataIndex: 'mail_to', key: 'mail_to'},
      { title: t('billing.mail.table.sent_at'), dataIndex: 'created_at', key: 'created_at', render: text => moment.unix(text).format(timeFormat) },
    ]
    return (
      <Table
        columns={columns}
        dataSource={dataSource && dataSource[index]?.sent}
        pagination={false}
        rowKey={record => record.id}
        size='small'
      />
    )
  }

  return (
    <Card
      title={
        <><MailOutlined /> &nbsp; {t('billing.mail.title')}</>
      }
    >
      {
        pageSize &&
        <Table
            dataSource={dataSource}
            rowKey='id'
            loading={isLoading}
            columns={columns}
            bordered
            expandable={{expandedRowRender}}
            pagination={{defaultPageSize: parseInt(pageSize)}}
        />
      }
    </Card>
  )
}

export default MailPage
