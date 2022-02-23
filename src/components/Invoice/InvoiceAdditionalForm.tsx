import React from 'react'
import {Col, Input, Row, Form, Select} from 'antd'
import {formItemLayout} from 'helpers/layoutHelpers'
import {FormInstance} from 'antd/lib/form'
import Button from 'antd-button-color'
import './InvoiceAdditionalForm.scss'
import { useTranslation } from 'react-i18next'
import {InvoiceDetails} from '../../pages/billing/invoice/models'

interface Props {
  form: FormInstance
  isPeriodRequired: boolean
  setPeriodRequired: (val: React.SetStateAction<boolean>) => void
  generateInvoice?: () => void
  isUpdate?: boolean
  invoice?: InvoiceDetails
}
const {Item} = Form
const {TextArea} = Input

const InvoiceAdditionalForm = (props: Props) => {

  const { t } = useTranslation()

  return (
    <>
      <Row align='middle' className='InvoiceMoreInfoForm'>

        <Col span={8}>

          {
            props.invoice?.state === 1 &&
            <Item name='items_text_prefix' label={`Items text prefix`} {...formItemLayout} >
                <TextArea rows={1} style={{width: 300}} />
            </Item>
          }
          {
            props.invoice?.state === 2 &&
            <Item label={`Prefix`} {...formItemLayout} >
              {props.invoice.items_text_prefix}
            </Item>
          }

        </Col>

        {
          props.isUpdate && props.invoice?.period_from &&
          <Col span={8}>
              <Item
                  name='period'
                  label='Period'
                  rules={[{required: props.isPeriodRequired}]}
                  {...formItemLayout}
                  style={{width: '528px'}}
              >
                  <span><b>{props.invoice?.period_from}</b>{' - '}<b>{props.invoice?.period_to}</b></span>
              </Item>
          </Col>
        }

        {
          props.isUpdate && props.invoice?.period_from && props.invoice.state === 1 &&
          <Col span={8} className='InvoiceMoreInfoForm_periodBlock'>
              <Item name='invoice_detail' label={t('customerPage.invoice_detail')}>

                  <Select
                      allowClear
                      optionFilterProp='label'
                      options={[
                        ({label: 'Single Item',value: 0}),({label: 'Group Items',value: 1}),({label: 'All Details',value: 2}),
                      ]}
                      style={{width: 160}}
                  />
              </Item>

              <Item>
                  <Button
                      onClick={() => {
                        props.setPeriodRequired(true)
                        props.form.validateFields(['period'])
                        props.generateInvoice &&  props.generateInvoice()
                      }}
                    // htmlType='submit'
                      type='info'
                      size='large'
                      className='InvoiceMoreInfoForm_periodBlock_perionButton'
                  >
                      Re-Generate services
                  </Button>
              </Item>

          </Col>
        }

      </Row>
    </>
  )
}

export default InvoiceAdditionalForm
