import React, {useState} from 'react'
import {Col, DatePicker, Row, Select, Form, Divider, Space, Input} from 'antd'
import {FormInstance} from 'antd/lib/form'
import Button from 'antd-button-color'
import {formItemLayout} from 'helpers/layoutHelpers'
import {useTranslation} from 'react-i18next'
import {CustomerDetails} from 'pages/billing/customer/models'
import moment from 'moment'
import {Link} from 'react-router-dom'

import './InvoiceTopForm.scss'
import SelectCurrencies from 'components/SelectCurrencies/SelectCurrencies'

interface Props {
  customers?: CustomerDetails[]
  form: FormInstance
  setSelectedCustomer: (customer: CustomerDetails) => void
  selectedCustomer?: CustomerDetails
  isCustomersLoading?: boolean
  state?: number
  customer_name?: string
  isUpdate?: boolean
  customer_id?: number
}
const {Item} = Form

const InvoiceTopForm = (props: Props) => {
  const {t} = useTranslation()
  const [openMaturity, setOpenMaturity] = useState(false)
  const [openPayment, setOpenPayment] = useState(false)

  return (
    <>
      <Row justify='space-between' className='InvoiceTopForm'>
        <Col span={9} >

          <Divider type='vertical' style={{height: '100%', width: '1px', float: 'right'}} />

          {
            (props.isUpdate && props.customer_id && props.customer_id > 0) ?
            <Item
                label={t('billing.invoice.customer')}
                {...formItemLayout}
            >
                <Link to={`/billing/customer-services/${props.customer_id}`} className='link'>
                  {props.customer_name}
                </Link>
            </Item> : null
          }

          {
            !props.isUpdate &&
            <Item
                name='customer_id'
                rules={[{required: true}]}
                label={t('billing.invoice.customer')}
                {...formItemLayout}
            >
                <Select
                    onChange={
                      (value: number) => {
                        props.setSelectedCustomer(props.customers?.find(customer => customer.id === value)!)
                      }
                    }
                    size='large'
                    style={{width: 300}}
                    placeholder={t('billing.invoice.select-customer')}
                    options={props.customers?.map(i => ({
                      value: i.id,
                      key: i.id,
                      label: i.ident
                    }))}
                    showSearch
                    optionFilterProp='label'
                    allowClear
                    loading={props.isCustomersLoading}
                />
            </Item>
          }

          <Item name='currency' label={t('billing.invoice.currency')} {...formItemLayout} >
            <Input size='large' style={{width: 80, fontWeight: 'bold'}} readOnly bordered={false} />
          </Item>

        </Col>


        <Col span={15}>

          <Row justify='space-between' className='InvoiceTopForm_datesBlock' >

            <Col span={14}>

              <Divider type='vertical' style={{height: '100%', width: '1px', float: 'right'}} />

              <Item
                name='date_of_issue'
                rules={[{required: true}]}
                label={t('billing.invoice.date_of_issue')}
              >
                <DatePicker onChange={(v) => props.form.setFieldsValue({date_of_taxing: v})} format='DD.MM.YYYY' size='large' disabled={props.state === 2} className='f-bold'/>
              </Item>
              <Item
                name='date_of_maturity'
                rules={[{required: true}]}
                label={t('billing.invoice.date_of_maturity')}
              >
                <DatePicker
                  open={openMaturity}
                  onOpenChange={open => setOpenMaturity(open)}
                  format='DD.MM.YYYY'
                  size='large'
                  showToday={false}
                  disabled={props.state === 2}
                  className='f-bold'
                  renderExtraFooter={() =>
                    <Space className='InvoiceTopForm_datesBlock_extraCalendarButtons'>
                      <Button type='lightdark' onClick={() => {
                        props.form.setFieldsValue({'date_of_maturity': moment()})
                        setOpenMaturity(false)
                      }}>{t('billing.invoice.today')}</Button>
                      <Button type='warning' onClick={() => {
                        props.form.setFieldsValue({'date_of_maturity': moment().add(7, 'days')})
                        setOpenMaturity(false)
                      }}>+7</Button>
                      <Button type='danger' onClick={() => {
                        props.form.setFieldsValue({'date_of_maturity': moment().add(14, 'days')})
                        setOpenMaturity(false)
                      }}>+14</Button>
                    </Space>
                  } />
              </Item>

            </Col>

            <Col span={10} flex={1} >

              <Item
                name='date_of_taxing'
                rules={[{required: true}]}
                label={t('billing.invoice.date_of_taxing')}
              >
                <DatePicker format='DD.MM.YYYY' size='large' disabled={props.state === 2} className='f-bold' />
              </Item>

              {
                props.isUpdate &&
                <Item
                    name='date_of_payment'
                    label={t('billing.invoice.date_of_payment')}
                >
                    <DatePicker open={openPayment} onOpenChange={open => setOpenPayment(open)} format='DD.MM.YYYY' size='large' disabled={props.state === 2} showToday={false} className='f-bold' renderExtraFooter={() =>
                      <Space className='InvoiceTopForm_datesBlock_extraCalendarButtons'>
                        <Button type='success' onClick={() => {
                          props.form.setFieldsValue({'date_of_payment': moment()})
                          setOpenPayment(false)
                        }} >{t('billing.invoice.today')}</Button>
                      </Space>
                    }
                    />
                </Item>
              }

            </Col>

          </Row>

        </Col>

      </Row>

    </>
  )
}

export default InvoiceTopForm
