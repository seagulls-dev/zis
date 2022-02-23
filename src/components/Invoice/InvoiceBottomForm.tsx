
import {Col, Divider, Form, Input, Row} from 'antd'
import {formItemLayout} from 'helpers/layoutHelpers'
import React, {useState} from 'react'
import InvoiceAttachment from './InvoiceAttachment/InvoiceAttachments'
import {FormInstance} from 'antd/lib/form'
import { ArrowDownOutlined } from '@ant-design/icons'
import { Skeleton } from 'antd'
import './InvoiceBottomForm.scss'
import {InvoiceDetails} from '../../pages/billing/invoice/models'
import { useTranslation } from 'react-i18next'
import {protectedApiClient} from 'helpers/api'

interface Props {
  totalVat?: number
  totalWithoutVat?: number
  totalWithVat?: number
  form: FormInstance
  invoice?: InvoiceDetails
}

const {Item} = Form
const {TextArea} = Input

const InvoiceBottomForm = (props: Props) => {
  const currency = props.form.getFieldValue('currency')
  const { t } = useTranslation()
  const [downloading, setDownloading] = useState<boolean>(false)

  const handleDownload = (v: number, id: number) => {
    setDownloading(true)
    protectedApiClient.get<string>(`/billing/invoice-document/get-content?id=${id}`,{onDownloadProgress: progressEvent => {
      }})
      .then(response => {
        const downloadLink = document.createElement("a")
        downloadLink.href = `data:application/pdf;base64,${response.data}`
        downloadLink.download = (props.invoice?.number?.toString() + '-' + v.toString()) || 'default'
        downloadLink.click()
        setDownloading(false)
      })
      .catch(error => {
        console.log(error)
        setDownloading(false)
      })
  }

  return (
    <Row className='InvoiceBottomForm' gutter={[50, 5]}>
      <Col span={6}>
        {
          props.invoice?.state === 1 &&
            <>
                <Item name='items_text_sufix' label={`Items text suffix`} {...formItemLayout} >
                    <TextArea rows={1} style={{width: 300}} />
                </Item>
                <Item name='internal_note' label={`Poznamka`}  {...formItemLayout}>
                    <TextArea rows={2} style={{width: 300}} />
                </Item>
            </>
        }
        {
          props.invoice?.state === 2 &&
            <>
                <Item label={`Suffix`} {...formItemLayout} >
                  {props.invoice.items_text_sufix}
                </Item>
                <Item label={`Poznamka`}  {...formItemLayout}>
                  {props.invoice.internal_note}
                </Item>
            </>
        }

      </Col>

      <Col span={4}>
        <h3>{t('billing.invoice.historical_v')}</h3>
        {
          !downloading && props.invoice?.documents && props.invoice?.documents.map(document => (
            <div key={document.id} className="d-flex" onClick={() => handleDownload(document.version, document.id)}>
              <div className="download">
                <span><b>{document.version}</b></span>{' - '}
                <span>{props.invoice?.number}</span>
              </div>
              <span><ArrowDownOutlined/></span>
            </div>
          ))
        }
        {
          downloading && <Skeleton active/>
        }
        {
          (!props.invoice?.documents || props.invoice.documents.length === 0) && <span>{t('billing.invoice.historical_no')}</span>
        }
      </Col>

      <Col span={8}>
        <Divider type='vertical' style={{height: '100%', float: 'left'}} />
        <Divider type='vertical' style={{height: '100%', float: 'right'}} />
        <Item label='Attachments' {...formItemLayout}>
          <InvoiceAttachment />
        </Item>
      </Col>


      <Col span={6}>
        <div className='totalBlock'>
          <h3 className='totalBlock_leftColumn_totalWithoutVat'>Total:</h3>
          <h3 className='totalBlock_rightColumn_totalWithoutVat text-right'>&nbsp; {props.totalWithoutVat ? `${props.totalWithoutVat} ${currency}` : ''} </h3>
          <h3 className='totalBlock_leftColumn_totalVat'>VAT:</h3>
          <h3 className='totalBlock_rightColumn_totalVat text-right'>&nbsp; {props.totalVat ? `${props.totalVat} ${currency}` : ''} </h3>
          <h2 className='totalBlock_leftColumn_totalWithVat'>Total+VAT:</h2>
          <h2 className='totalBlock_rightColumn_totalWithVat text-right'>&nbsp; {props.totalWithVat ? `${props.totalWithVat} ${currency}` : ''} </h2>
        </div>
      </Col>

    </Row>
  )
}

export default InvoiceBottomForm
