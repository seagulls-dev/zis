import React, {useEffect, useState} from 'react'
import {Card, Form, Divider, Space, message, Row, Col} from 'antd'
import {FilePdfOutlined, MoneyCollectOutlined} from '@ant-design/icons/lib/icons'
import './CreateInvoicePage.scss'
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import getCustomers from 'pages/billing/customer/actions/getCustomers'
import {AppState} from 'common/models'
import {useForm} from 'antd/lib/form/Form'
import InvoiceTopForm from 'components/Invoice/InvoiceTopForm'
import InvoiceItemsForm from 'components/Invoice/InvoiceItemsForm'
import InvoiceBottomForm from 'components/Invoice/InvoiceBottomForm'
import {CustomerDetails} from 'pages/billing/customer/models'
import getTaxes from '../tax/actions/getTaxes'
import Button from 'antd-button-color'
import InvoiceAdditionalForm from 'components/Invoice/InvoiceAdditionalForm'
import getInvoices from './actions/getInvoices'
import {Link, RouteComponentProps} from 'react-router-dom'
import createInvoice from './actions/createInvoice'
import createInvoiceItem from './actions/createInvoiceItem'
import createInvoiceDocument from '../invoicedocument/actions/createInvoiceDocument'
import {useTranslation} from 'react-i18next'
import finalizeDocument from '../invoicedocument/actions/finalizeDocument'
import { useHistory } from 'react-router-dom'


const CreateInvoicePage = (props: RouteComponentProps) => {
  const {t} = useTranslation()
  const [form] = useForm()
  const dispatch = useDispatch()
  const history = useHistory()
  const [totalVat, setTotalVat] = useState<number>()
  const [totalWithoutVat, setTotalWithoutVat] = useState<number>()
  const [totalWithVat, setTotalWithVat] = useState<number>()
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetails>()
  const [isPeriodRequired, setPeriodRequired] = useState(false)
  const [createdInvoiceId, setCreatedInvoiceId] = useState<number>()

  const {customers} = useSelector((state: AppState) => state.customer)
  const {taxes} = useSelector((state: AppState) => state.tax)

  useEffect(() => {
    dispatch(getCustomers(''))
    dispatch(getTaxes())
  }, [dispatch])

  useEffect(() => {
    selectedCustomer && form.setFieldsValue({'currency': selectedCustomer?.billing_currency})
    //eslint-disable-next-line
  }, [selectedCustomer])

  const handleTotal = (_, values) => {
    let tVat = 0
    let tWithoutVat = 0
    let tWithVat = 0
    const rowsCopy = [...values.invoiceItems]
    values.invoiceItems.forEach((fieldGroup, index) => {
      if (fieldGroup && fieldGroup.unit_count && fieldGroup.price_per_unit) {
        fieldGroup.total_without_vat = parseFloat((fieldGroup.unit_count * fieldGroup.price_per_unit).toFixed(2))
        rowsCopy.splice(index, 1, fieldGroup)
        form.setFieldsValue({invoiceItems: rowsCopy})
      }
      if (fieldGroup && fieldGroup.tax_id && fieldGroup.total_without_vat) {
        const tax = taxes?.find(v => v.id === fieldGroup.tax_id)
        fieldGroup.total_vat = parseFloat((fieldGroup.total_without_vat / 100 * (tax!.rate) / 100).toFixed(2))
        fieldGroup.total_with_vat = parseFloat((fieldGroup.total_vat + fieldGroup.total_without_vat).toFixed(2))
        rowsCopy.splice(index, 1, fieldGroup)
        form.setFieldsValue({invoiceItems: rowsCopy})
      }
      if (fieldGroup && fieldGroup.total_vat) {
        tVat += parseFloat(fieldGroup.total_vat)
      }
      if (fieldGroup && fieldGroup.total_without_vat) {
        tWithoutVat += parseFloat(fieldGroup.total_without_vat)
      }
      if (fieldGroup && fieldGroup.total_with_vat) {
        tWithVat += parseFloat(fieldGroup.total_with_vat)
      }
    })
    setTotalVat(parseFloat((tVat).toFixed(2)))
    setTotalWithoutVat(parseFloat((tWithoutVat).toFixed(2)))
    setTotalWithVat(parseFloat((tWithVat).toFixed(2)))
  }

  const defaultFormValues = {
    date_of_issue: moment(),
    date_of_taxing: moment(),
    currency: 'CZK',
    invoiceItems: [{position: 1}]
  }


  const onFinish = values => {
    let isCreated = false
    dispatch(
      createInvoice(
        {
          ...values,
          date_of_issue: moment(values.date_of_issue).format('YYYY-MM-DD'),
          date_of_maturity: moment(values.date_of_maturity).format('YYYY-MM-DD'),
          date_of_taxing: moment(values.date_of_taxing).format('YYYY-MM-DD'),
          generate_customer_services: 0, // if period selected make 1/0
          period_from: values.period?.length && moment(values.period[0]).format('YYYY-MM-DD'),
          period_to: values.period?.length && moment(values.period[1]).format('YYYY-MM-DD'),
        },
        (isSuccess, invoice_id) => {
          if (isSuccess) {
            isCreated = true
            message.info(t('billing.invoice.invoice-created'))
            values.invoiceItems.filter(v => v.name && v.tax_id && v.price_per_unit && v.unit_count).map((item) =>
              dispatch(
                createInvoiceItem(
                  {
                    ...item,
                    invoice_id,
                    price_per_unit: item.price_per_unit * 100,
                    total_vat: Math.round(item.total_vat * 100),
                    total_with_vat: Math.round(item.total_with_vat * 100),
                    total_without_vat: Math.round(item.total_without_vat * 100),
                    period_from: item.period_from ? moment(item.period_from).format('YYYY-MM-DD') : '',
                    period_to: item.period_to ? moment(item.period_to).format('YYYY-MM-DD') : ''
                  },
                  (isSuccess) => {
                    if (isSuccess) {
                      message.info(t('billing.invoice.invoice-item-created')) &&
                        setCreatedInvoiceId(invoice_id)
                    } else {isCreated = false}
                  }
                ))
            )
          }
          else {isCreated = false}
          // isCreated && props.history.replace(`/billing/invoice/edit/${invoice_id}`)
        }
      ))

  }

  return (
    <>
      <Space direction='vertical' style={ { minWidth: '1248px', width: '100%' } }>
        <Form
          form={form}
          labelCol={{flex: '1'}}
          wrapperCol={{flex: '1'}}
          autoComplete='off'
          onFinish={onFinish}
          onValuesChange={handleTotal}
          initialValues={defaultFormValues}
          validateMessages={{required: ''}}
        >
          <Card
            className='CreateInvoicePage'
            title={<><MoneyCollectOutlined /> &nbsp; {t('billing.invoice.create-invoice-title')} </>}
            style={{maxWidth: '1760px'}}
          >

            <InvoiceTopForm
              customers={customers}
              form={form}
              setSelectedCustomer={setSelectedCustomer}
              selectedCustomer={selectedCustomer}
              isUpdate={false}
            />

            <Divider><small>{t('billing.invoice.more-info')}</small></Divider>

            <InvoiceAdditionalForm
              form={form}
              setPeriodRequired={setPeriodRequired}
              isPeriodRequired={true}
              isUpdate={false}
            />

            <Divider><small>{t('billing.invoice.items')}</small></Divider>

            <InvoiceItemsForm
              form={form}
              taxes={taxes}
              isPeriodRequired={isPeriodRequired}
              isUpdate={false}
            />

            <Divider />

            <InvoiceBottomForm
              totalVat={totalVat}
              totalWithoutVat={totalWithoutVat}
              totalWithVat={totalWithVat}
              form={form}
            />

            <Row justify="space-between">
              <Col span={12}>
                <Space>
                  <Form.Item>
                    <Button
                      type='success'
                      size='large'
                      disabled={!createdInvoiceId}
                      onClick={() =>
                        createdInvoiceId &&
                        dispatch(finalizeDocument({
                          id: Number(createdInvoiceId)
                        }, isSuccess => {
                          message.success(t('billing.invoice.finalize'))
                          history.push('/billing/invoice/edit/' + Number(createdInvoiceId))
                          // dispatch( getInvoice( Number( createdInvoiceId ) ) )
                        }))
                      }
                      icon={<FilePdfOutlined />}
                    >{ t( 'billing.invoice.generate-pdf' ) }</Button>
                  </Form.Item>
                </Space>
              </Col>
              <Col span={12} style={{textAlign: 'right'}}>
                <Space>
                  <Form.Item>
                    <Button type='primary' htmlType='submit' size='large' disabled={isPeriodRequired || !!createdInvoiceId}>{t('billing.invoice.create')}</Button>
                  </Form.Item>
                  <Form.Item>
                    <Link to='/billing/invoice'>
                      <Button type='lightdark' size='large'>Cancel</Button>
                    </Link>
                  </Form.Item>
                </Space>
              </Col>
            </Row>
          </Card>

        </Form>

      </Space>
    </>
  )
}

export default CreateInvoicePage
