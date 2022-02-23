import {
  MoneyCollectOutlined,
  FilePdfOutlined,
  SendOutlined
} from '@ant-design/icons'
import { Card, Space, Input, Divider, Skeleton, message, Col, Row, Modal, Spin } from 'antd'
import Button from 'antd-button-color'
import { Form } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { AppState } from 'common/models'
import InvoiceAdditionalForm from 'components/Invoice/InvoiceAdditionalForm'
import InvoiceBottomForm from 'components/Invoice/InvoiceBottomForm'
import InvoiceItemsForm from 'components/Invoice/InvoiceItemsForm'
import InvoiceTopForm from 'components/Invoice/InvoiceTopForm'
import moment from 'moment'
import { CustomerDetails } from 'pages/billing/customer/models'
import React, {ChangeEvent, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import getTaxes from '../tax/actions/getTaxes'
import getInvoice from './actions/getInvoice'
import updateInvoice from './actions/updateInvoice'
import updateInvoiceItem from './actions/updateInvoiceItem'
import generateInvoice from './actions/generateInvoice'
import { RouteComponentProps } from 'react-router-dom'
import deleteInvoiceItem from './actions/deleteInvoiceItem'
import finalizeDocument from '../invoicedocument/actions/finalizeDocument'
import InvoiceCostAllocationPage from '../invoicecostallocation/InvoiceCostAllocationPage'
import { useTranslation } from 'react-i18next'
import getCurrencies from 'components/SelectCurrencies/actions/getCurrencies'
import InvoiceHistory from 'components/Invoice/InvoiceHistory'
import { useHistory } from "react-router-dom";
import createInvoiceItem from './actions/createInvoiceItem'
import {protectedApiClient} from 'helpers/api'
import createInvoiceMail from './actions/createInvoiceMail'
import sendInvoiceMail from './actions/sendInvoiceMail'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import getCompanies from '../../company/actions/getCompanies'
import {CompanyDetails} from '../../company/models'

interface ParamTypes {
  id: string
}

const { Item } = Form
const {TextArea} = Input

type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];

const EditInvoicePage = ( props: RouteComponentProps ) => {
  const [ form ] = useForm()
  const { id } = useParams<ParamTypes>()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory();
  const [ selectedCustomer, setSelectedCustomer ] = useState<CustomerDetails>()
  const [ isPeriodRequired, setPeriodRequired ] = useState( false )
  const [ totalVat, setTotalVat ] = useState<number>()
  const [ totalWithoutVat, setTotalWithoutVat ] = useState<number>()
  const [ totalWithVat, setTotalWithVat ] = useState<number>()

  const [pdfDlg, setPdfDlg] = useState<boolean>(false)
  const [previewLoading, setPreviewLoading] = useState<boolean>(false)
  const [preview, setPreview] = useState<string>('')

  const [mailDlg, setMailDlg] = useState<boolean>(false)
  const [mailLoading, setMailLoading] = useState<boolean>(false)
  const [from, setFrom] = useState<CompanyDetails>()

  const { taxes, isLoading: isTaxesLoading } = useSelector( ( state: AppState ) => state.tax )
  const { invoice, mail, isLoading: isInvoiceLoading } = useSelector( ( state: AppState ) => state.invoice )
  const { document } = useSelector( ( state: AppState ) => state.invoicedocument )
  const { currencies } = useSelector( ( state: AppState ) => state.currencies )
  const {companies} = useSelector((state: AppState) => state.company)

  const [invoicing, setInvoicing] = useState<{
    value: string,
    validateStatus?: ValidateStatus,
    errorMsg?: string | null
  }>({value: ''})

  const handleInvoiceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInvoicing({...validateInvoicingEmail(value),value})
  }

  const validateInvoicingEmail = (invoice: string): {validateStatus: ValidateStatus, errorMsg: string | null} => {
    const invoices = invoice.trim().split(',')
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = true
    for (const item of invoices) {
      result = pattern.test(item.toLowerCase())
      if (!result) break
    }
    if (!result) {
      return {
        validateStatus: 'error',
        errorMsg: 'Should be comma-separated emails'
      }
    }
    else {
      return {
        validateStatus: 'success',
        errorMsg: null
      }
    }
  }

  useEffect( () => {
    dispatch( getInvoice( Number( id ) ) )
    !isTaxesLoading && dispatch( getTaxes() )
    // document?.invoice_id !== Number( id ) && dispatch( getInvoiceDocumentByInvoice( Number( id ) ) )
    !currencies && dispatch( getCurrencies() )
    // dispatch( getInvoiceCostAllocationByInvoice( Number( id ) ) )
    !companies && dispatch(getCompanies())
    //eslint-disable-next-line
  }, [] )

  useEffect(() => {
    const temp = companies?.find(item => item.customer?.id === 1)
    temp && setFrom(temp)
  },[companies])

  const handleTotal = ( changedValues, values ) => {
    // do not recalculate when new field is added
    if (Object.keys(changedValues).includes('invoiceItems')) {
      const newField = changedValues.invoiceItems.some((item) => {
        return Object.keys(item).length == 2 && Object.keys(item).includes('position') && Object.keys(item).includes('invoice_id');
      })

      if (newField) return;
    }

    // only when except invoice_detail is changed, trigger and manual invoice
    if ((!Object.keys(changedValues).includes('invoice_detail') && !invoice.period_from) || (invoice.period_from && invoice.invoiceItems.length < values.invoiceItems.length)) {
      let tVat = 0
      let tWithoutVat = 0
      let tWithVat = 0
      const rowsCopy = [ ...values.invoiceItems ]
      values.invoiceItems.forEach( ( fieldGroup, index ) => {
        if ( fieldGroup && fieldGroup.unit_count && fieldGroup.price_per_unit ) {
          fieldGroup.total_without_vat = parseFloat( ( fieldGroup.unit_count * fieldGroup.price_per_unit ).toFixed( 2 ) )
          rowsCopy.splice( index, 1, fieldGroup )
          form.setFieldsValue( { invoiceItems: rowsCopy } )
        }
        if ( fieldGroup && fieldGroup.tax_id && fieldGroup.total_without_vat ) {
          const tax = taxes?.find( v => v.id === fieldGroup.tax_id )
          fieldGroup.total_vat = tax && parseFloat( ( fieldGroup.total_without_vat / 100 * ( tax.rate ) / 100 ).toFixed( 2 ) )
          fieldGroup.total_with_vat = parseFloat( ( fieldGroup.total_vat + fieldGroup.total_without_vat ).toFixed( 2 ) )
          rowsCopy.splice( index, 1, fieldGroup )
          form.setFieldsValue( { invoiceItems: rowsCopy } )
        }
        if ( fieldGroup && fieldGroup.total_vat ) {
          tVat += parseFloat( fieldGroup.total_vat )
        }
        if ( fieldGroup && fieldGroup.total_without_vat ) {
          tWithoutVat += parseFloat( fieldGroup.total_without_vat )
        }
        if ( fieldGroup && fieldGroup.total_with_vat ) {
          tWithVat += parseFloat( fieldGroup.total_with_vat )
        }
      } )
      setTotalVat( parseFloat( ( tVat ).toFixed( 2 ) ) )
      setTotalWithoutVat( parseFloat( ( tWithoutVat ).toFixed( 2 ) ) )
      setTotalWithVat( parseFloat( ( tWithVat ).toFixed( 2 ) ) )
    }

  }

  useEffect( () => {
    invoice.total_vat && setTotalVat(invoice.total_vat / 100)
    invoice.total_without_vat && setTotalWithoutVat(invoice.total_without_vat / 100)
    invoice.total_with_vat && setTotalWithVat(invoice.total_with_vat / 100)
  }, [ invoice ] )

  const dataToUpdate = {

    ...invoice,
    date_of_issue: invoice.date_of_issue && moment( invoice.date_of_issue ),
    date_of_taxing: invoice.date_of_taxing && moment( invoice.date_of_taxing ),
    date_of_maturity: invoice.date_of_maturity && moment( invoice.date_of_maturity ),
    date_of_payment: invoice.date_of_payment && moment( invoice.date_of_payment ),
    period_from: invoice.period_from && moment( invoice.period_from ),
    period_to: invoice.period_to && moment( invoice.period_to ),
    period: [ invoice.period_from && moment( invoice.period_from ), invoice.period_to && moment( invoice.period_to ) ],
    invoiceItems:
      invoice.invoiceItems?.length ?
        invoice.invoiceItems.sort(
          ( a, b ) => (
            ( a.position && b.position ) ? a.position - b.position : 1 )
        )
          .map( ( item, index ) => ( {
            ...item,
            period_from: item.period_from && moment( item.period_from ),
            period_to: item.period_to && moment( item.period_to ),
            position: !item.position ? index + 1 : item.position,
            price_per_unit: item.price_per_unit && item.price_per_unit / 100,
            total_vat: item.total_vat && item.total_vat / 100,
            total_with_vat: item.total_with_vat && item.total_with_vat / 100,
            total_without_vat: item.total_without_vat && item.total_without_vat / 100
          } ) ) :
        [ { position: 1, invoice_id: Number( id ) } ]
  }

  useEffect( () =>
    invoice && form.resetFields()
    //eslint-disable-next-line
    , [ invoice ] )


  const onFinish = values => {
    //changed items array
    const itemsToSave = values.invoiceItems.map(
      v => ( {
        ...v,
        period_to: v.period_to ? v.period_to.format( 'YYYY-MM-DD' ) : null,
        period_from: v.period_from ? v.period_from.format( 'YYYY-MM-DD' ) : null,
        price_per_unit: v.price_per_unit && v.price_per_unit * 100,
        total_vat: v.total_vat && Math.round(v.total_vat * 100),
        total_with_vat: v.total_with_vat && Math.round(v.total_with_vat * 100),
        total_without_vat: v.total_without_vat && Math.round(v.total_without_vat * 100),
      } )
    ).filter( x => !invoice.invoiceItems.some( i => JSON.stringify( x ) === JSON.stringify( i ) ) )

    const itemsToDelete = invoice.invoiceItems.filter( i => !values.invoiceItems.find( v => v.id === i.id ) )

    const invoiceToSave = {
      ...values,
      date_of_issue: values.date_of_issue && values.date_of_issue.format( 'YYYY-MM-DD' ),
      date_of_taxing: values.date_of_taxing && values.date_of_taxing.format( 'YYYY-MM-DD' ),
      date_of_maturity: values.date_of_maturity && values.date_of_maturity.format( 'YYYY-MM-DD' ),
      date_of_payment: values.date_of_payment && values.date_of_payment.format( 'YYYY-MM-DD' ),
      invoiceItems: undefined,
      period: undefined,
      // period_from: values.period[ 0 ]?.format( 'YYYY-MM-DD' ),
      // period_to: values.period[ 1 ]?.format( 'YYYY-MM-DD' )
    }

    let total_count = itemsToDelete.length + itemsToSave.length
    let current_count = 0

    itemsToDelete.map( item => dispatch(deleteInvoiceItem(item.id, isSuccess => {
      isSuccess && current_count++
      isSuccess && message.info(t( 'billing.invoice.invoice-item-updated' ))
    })))

    itemsToSave.map(item => {
      item.id ?
        dispatch(
          updateInvoiceItem(
            { ...item },
            isSuccess => {
              isSuccess && message.info( t( 'billing.invoice.invoice-item-updated' ) )
              current_count++
            }
          ) )
        :
        dispatch(createInvoiceItem({
          ...item,
          invoice_id : invoice.id,
          price_per_unit: item.price_per_unit,
          total_vat: item.total_vat,
          total_with_vat: item.total_with_vat,
          total_without_vat: item.total_without_vat,
          period_from: item.period_from ? moment(item.period_from).format('YYYY-MM-DD') : '',
          period_to: item.period_to ? moment(item.period_to).format('YYYY-MM-DD') : ''
        },isSuccess => {
          isSuccess && message.info( t( 'billing.invoice.invoice-item-updated' ) )
          current_count++
        }))
    })

    const interval = setInterval(() => {
      if (current_count === total_count) {
        clearInterval(interval)
        invoiceToSave && dispatch(
          updateInvoice( invoiceToSave,
            ( isSuccess ) => isSuccess && message.info(
              <>{ t( 'billing.invoice.updated' ) }</>)
          )
        )
      }
    },300)

  }

  const handleGenerateInvoice = () => {
    dispatch(generateInvoice({ id: parseInt(id), invoice_detail: form.getFieldValue('invoice_detail')}, isSuccess => {
      isSuccess && message.info(<>{ t( 'billing.invoice.generated' ) } </>,
        2)
    }))
  }

  const pdfPreview = () => {
    setPdfDlg(true)
    setPreviewLoading(true)
    protectedApiClient.get<string>(`/billing/invoice/get-preview?id=${invoice.id}`)
      .then(response => {
        setPreviewLoading(false)
        setPreview(response.data)
      })
      .catch(error => {
        message.error(t('billing.invoice.preview_fail'))
        setPreviewLoading(false)
      })
  }

  const handleSendInvoice = () => {
    setMailDlg(true)
    setMailLoading(true)
    dispatch(createInvoiceMail({id: invoice.id}, isSuccess => {
      isSuccess && setMailLoading(false)
      !isSuccess && message.error(t('billing.invoice.create_mail_error'))
    }))
  }

  const handleFinish = (v) => {
    if ((invoicing.validateStatus === 'success' || !invoicing.validateStatus) && mail) {
      const data = {
        mail_id: mail.id, subject: v.subject, body: v.body, emails: v.to
      }
      dispatch(sendInvoiceMail(data, (isSuccess, sent) => {
        setMailDlg(false)
        if (isSuccess) {
          sent.map(item => message.success(t('billing.invoice.send_mail_success') + moment.unix(item.created_at).format('hh:mm:ss') + ' to ' + item.mail_to))
        }
        else {
          message.error(t('billing.invoice.send_mail_error'))
        }
      }))
    }
  }

  return (
    <>
      {
        isInvoiceLoading && <Spin />
      }
      {
        !isInvoiceLoading && invoice.id !== 0 &&
        <Space direction='vertical' style={ { minWidth: '1248px', width: '100%' } }>
            <Form
                form={ form }
                labelCol={ { flex: '1' } }
                wrapperCol={ { flex: '1' } }
                autoComplete='off'
                onFinish={ onFinish }
                onValuesChange={ handleTotal }
                initialValues={ dataToUpdate }
                validateMessages={ { required: '' } }
            >
                <Item name='id' style={ { display: 'none' } }><Input type='hidden' /></Item>
                <Card
                    className='EditInvoicePage'
                    title={ <><MoneyCollectOutlined /> &nbsp; { t( 'billing.invoice.invoice-details' ) }</> }
                    extra={
                      <Space>
                        <Item
                          name='number'
                          style={ { marginBottom: 0 } }
                          label={ t( 'billing.invoice.invoice-number' ) }
                        >
                          <Input
                            disabled
                            size='large'
                            style={ { border: 0, fontWeight: 'bold' } }
                            // suffix={ <EditOutlined color='blue' /> }
                            className='invoiceNumberInput'
                          />
                        </Item>
                      </Space>
                    }
                >

                    <InvoiceTopForm
                        form={ form }
                        customer_name = { invoice.customer_name }
                        customer_id = {invoice.customer_id}
                        setSelectedCustomer={ setSelectedCustomer }
                        selectedCustomer={ selectedCustomer }
                        state={invoice.state}
                        isUpdate={true}
                    />

                    <Divider><small>{ t( 'billing.invoice.more-info' ) }</small></Divider>

                    <InvoiceAdditionalForm
                        form={ form }
                        setPeriodRequired={ setPeriodRequired }
                        isPeriodRequired={ isPeriodRequired }
                        generateInvoice = { handleGenerateInvoice }
                        isUpdate={true}
                        invoice={invoice}
                    />

                    <Divider><small>{ t( 'billing.invoice.invoice-items' ) }</small></Divider>

                  {
                    isInvoiceLoading ? <Skeleton active loading={ isInvoiceLoading } /> :
                      <InvoiceItemsForm
                        form={ form }
                        taxes={ taxes }
                        invoiceId={ Number( id ) }
                        isPeriodRequired={ isPeriodRequired }
                        state={invoice.state}
                        isUpdate={true}
                        invoice={invoice}
                      />
                  }

                    <Divider />
                  {
                    invoice && <InvoiceBottomForm
                        totalVat={ totalVat }
                        totalWithoutVat={ totalWithoutVat }
                        totalWithVat={ totalWithVat }
                        form={ form }
                        invoice={invoice}
                    />
                  }
                    <Divider />

                    <Row justify="space-between">
                        <Col span={12}>
                            <Space>
                                <Form.Item>
                                    <Button
                                        type="success"
                                        size='large'
                                        disabled={
                                          invoice.state === 2
                                        }
                                        onClick={
                                          () => {
                                            id &&
                                            dispatch(finalizeDocument({
                                              id: Number(id)
                                            }, isSuccess => {
                                              message.success(t('billing.invoice.finalize'))
                                              // history.push('/billing/invoice')
                                              dispatch( getInvoice( Number( id ) ) )
                                            }))
                                          }
                                        }
                                    >
                                        <><FilePdfOutlined /> { t( 'billing.invoice.generate-pdf' ) }</>
                                    </Button>


                                </Form.Item>
                              {
                                invoice.state === 2 &&
                                <Form.Item>
                                    <Button type="primary" size='large'>
                                      {t('billing.invoice.repair')}
                                    </Button>
                                </Form.Item>
                              }
                              {
                                invoice.state === 2 &&
                                <Form.Item>
                                    <Button type="primary" size='large' icon={<SendOutlined />} onClick={handleSendInvoice}>
                                      {t('billing.invoice.send')}
                                    </Button>
                                </Form.Item>
                              }
                            </Space>
                        </Col>

                        <Col span={12} style={{textAlign: 'right'}}>
                            <Space>
                              {
                                invoice.state === 1 &&
                                <Form.Item>
                                    <Button type='default' size='large' onClick={pdfPreview}>
                                      {t('billing.invoice.pdf_preview')}
                                    </Button>
                                </Form.Item>
                              }
                                <Form.Item>
                                    <Button type='primary' htmlType='submit' size='large' disabled={ isPeriodRequired || isInvoiceLoading || invoice.state === 2 } >{ t( 'billing.invoice.update' ) }</Button>
                                </Form.Item>
                                <Form.Item>
                                    <Link to='/billing/invoice'>
                                        <Button type='lightdark' size='large'>{ t( 'billing.invoice.cancel' ) }</Button>
                                    </Link>
                                </Form.Item>

                            </Space>
                        </Col>
                    </Row>
                </Card>

            </Form>

          {
            invoice.id !== 0 && invoice.state === 2 &&
            <InvoiceCostAllocationPage />
          }

            <Row gutter={ 16 }>
                <Col flex={ 1 }>
                    <InvoiceHistory invoiceId={ dataToUpdate.id } />
                </Col>
            </Row>

            <Modal
                visible={pdfDlg}
                footer={null}
                onCancel={() => setPdfDlg(false)}
                width={1200}
                style={{height: '100vh', top: 50}}
                title={t('billing.invoice.pdf_preview')}
            >
              {
                previewLoading &&
                <Spin />
              }
              {
                !previewLoading &&
                <embed type='application/pdf' src={`data:application/pdf;base64, ${preview}`} style={{width: '100%', height: '100vh'}}/>
              }
            </Modal>

            <Modal
                visible={mailDlg}
                footer={null}
                onCancel={() => setMailDlg(false)}
                title={t('billing.invoice.send_mail')}
                width={900}
            >
              {
                mailLoading &&
                <Spin />
              }
              {
                !mailLoading && mail &&
                <Form
                  {...formItemLayout}
                  initialValues={{
                    body: mail.body,
                    to: mail.emails?.join(","),
                    subject: mail.subject
                  }}
                  onFinish={handleFinish}
                >
                    <Item label={t('billing.invoice.modal.from')}>
                        <span style={{fontWeight: 'bold'}}>{from?.name}</span>
                    </Item>
                    <Item name='to' label={t('billing.invoice.modal.to')} validateStatus={invoicing.validateStatus} help={invoicing.errorMsg}>
                        <Input onChange={handleInvoiceChange} />
                    </Item>
                    <Item name='subject' label={t('billing.invoice.modal.subject')}>
                        <Input />
                    </Item>
                    <Item name='body' label={t('billing.invoice.modal.body')}>
                        <TextArea autoSize={{minRows: 5}} />
                    </Item>
                    <Item name='attachment' label={t('billing.invoice.modal.attachment')}>
                        <span style={{fontWeight: 'bold'}}>{invoice.number}.pdf</span>
                    </Item>
                    <Item {...tailLayout}>
                        <Space>
                            <Button htmlType='submit' size='large' type='primary'>
                              {t('billing.invoice.modal.btn_send')}
                            </Button>
                            <Button size='large' type='default' onClick={() => setMailDlg(false)}>
                              {t('billing.invoice.modal.btn_close')}
                            </Button>
                        </Space>
                    </Item>
                </Form>
              }
            </Modal>
        </Space>
      }
      {
        !isInvoiceLoading && invoice.id === 0 &&
          <Space style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{textAlign: 'center'}}>
                  <h1 style={{color: '#ff4d4f'}}>{t('not_found')}</h1>
                  <div>
                      <Link to='/billing/invoice'>
                        {t('back')}
                      </Link>
                  </div>
              </div>
          </Space>
      }
    </>
  )
}

export default EditInvoicePage
