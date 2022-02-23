import React, { ReactElement, useState } from 'react'
import {DatePicker, Popover, Form, InputNumber, Tooltip, Space, Select, Modal} from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useTranslation } from 'react-i18next'
import RangeFilter from 'components/RangeFilter/RangeFilter'
import Button from 'antd-button-color'
import { formItemLayout, tailLayout } from 'helpers/layoutHelpers'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import createInvoice from 'pages/billing/invoice/actions/createInvoice'
import { CustomerDetails } from 'pages/billing/customer/models'
import { CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { useHistory } from "react-router-dom";

interface Props {
  children: ReactElement
  customer: CustomerDetails
  [propName: string]: {}
}

const { Item } = Form

const InvoiceCustomerForm = ({ children, customer, ...rest }: Props) => {
  const { t } = useTranslation()
  const [form] = useForm()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [visiblePopUp, setVisiblePopUp] = useState(false)
  const history = useHistory();

  const success = (invoice_id: number) => {
    Modal.confirm({
      content: t('billing.invoice.done'),
      okText: t('billing.invoice.okText'),
      cancelText: t('billing.invoice.cancelText'),
      onOk() {
        history.push('/billing/invoice/edit/' + invoice_id)
      },
      icon: <CheckCircleOutlined />,
    });
  }

  const onFinish = (values) => {
    dispatch(createInvoice({
      customer_id: values.customer_id,
      generate_customer_services: 1,
      period_from: moment(values.range[0]).format('YYYY-MM-DD'),
      period_to: moment(values.range[1]).format('YYYY-MM-DD'),
      date_of_maturity: moment(values.date_of_maturity).format('YYYY-MM-DD'),
      date_of_taxing: moment(values.date_of_taxing).format('YYYY-MM-DD'),
      date_of_issue: moment(values.date_of_issue).format('YYYY-MM-DD'),
      currency: customer.billing_currency,
      invoiceItems: []
    }, (isSuccess, invoice_id) => {
      if (isSuccess) {
        isSuccess && setVisiblePopUp(false)
        isSuccess && success(invoice_id)
      }
      else {
        setVisiblePopUp(false)
      }
    }))
  }

  const invoivceForm =
    <Form
      form={form}
      {...formItemLayout}
      onFinish={onFinish}
      style={{ padding: '20px 20px 0' }}
      validateMessages={{ required: '' }}
      initialValues={{
        customer_id: customer.id,
        date_of_issue: moment(),
        date_of_maturity: moment(customer.nextInvoice?.period_to),
        date_of_taxing: moment(customer.nextInvoice?.period_to),
        invoice_detail: customer.invoice_detail,
        range: ''
      }}
    >
      <Item
        name='date_of_issue'
        rules={[{ required: true }]}
        label={t('billing.bill.date_of_issue')}
      >
        <DatePicker
          format='DD.MM.YYYY'
          style={{ width: '280px' }}
        />
      </Item>

      <Item
        name='date_of_maturity'
        rules={[{ required: true }]}
        label={t('billing.bill.date_of_maturity')}
      >
        <DatePicker
          format='DD.MM.YYYY'
          style={{ width: '280px' }}
          showToday={false}
          onOpenChange={(open) => setOpen(open)}
          open={open}
          renderExtraFooter={() =>
            <Space>
              <Button children='+7' size='small'
                onClick={() => {
                  form.setFieldsValue({ date_of_maturity: moment().add(7, 'days') })
                  setOpen(false)
                }}
              />
              <Button children='+15' size='small'
                onClick={() => {
                  form.setFieldsValue({ date_of_maturity: moment().add(15, 'days') })
                  setOpen(false)
                }}
              />
            </Space>
          }
        />
      </Item>

      <Item
        name='date_of_taxing'
        rules={[{ required: true }]}
        label={t('billing.bill.date_of_taxing')}
      >
        <DatePicker
          format='DD.MM.YYYY'
          style={{ width: '280px' }}
        />
      </Item>

      <Item
        name='range'
        rules={[{ required: true }]}
        label={
          <>
            <Tooltip placement='topRight' title={t('billing.invoice.preselected-period')} arrowPointAtCenter>
              <InfoCircleOutlined />
            </Tooltip>

            {t('invoice-customer-form.period')}
          </>
        }
      >
        <RangeFilter periods={['PREV_MONTH', 'ACT_MONTH']} style={{ width: '280px' }} />
      </Item>

      <Item
        name='invoice_detail'
        label={t('customerPage.invoice_detail')}
        rules={[{ required: true }]}
      >
        <Select
          showSearch
          allowClear
          optionFilterProp='label'
          options={[
            ({label: 'None',value: 0}),({label: 'Short',value: 1}),({label: 'All',value: 2}),
          ]}
          style={{ width: '280px' }}
        />
      </Item>

      <Item name='customer_id' style={{ display: 'none' }}>
        <InputNumber type='hidden' />
      </Item>

      <Item {...tailLayout}>
        <Button htmlType='submit' type='warning'>{t('invoice-customer-form.generate')}</Button>
      </Item>
    </Form>


  return (
    <>
      <Popover

        trigger='click'
        content={invoivceForm}
        visible={visiblePopUp}
        onVisibleChange={(visible) => setVisiblePopUp(visible)}
        {...rest}
      >
        {children}
      </Popover>
    </>
  )
}

export default InvoiceCustomerForm
