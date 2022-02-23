import React, {useEffect, useState} from 'react'
import {Button, DatePicker, Form, Input, InputNumber, Select, Space, Table} from 'antd'
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons'
import UpDownButton from 'components/UpDownButton/UpDownButton'
import {invoiceItemLabelLayout} from 'helpers/layoutHelpers'
import {FormInstance} from 'antd/lib/form'
import {TaxDetails} from 'pages/billing/tax/models'
import './InvoiceItemsForm.scss'
import moment from 'moment'
import {useTranslation} from 'react-i18next'
import { useSelector } from 'react-redux'
import { AppState } from 'common/models'
import {InvoiceDetails} from '../../pages/billing/invoice/models'
import {ColumnsType} from 'antd/es/table'
import {InvoiceItemDetails} from '../../pages/billing/invoice/models'

const {Item, List} = Form
const {TextArea} = Input

interface Props {
  form: FormInstance
  taxes?: TaxDetails[]
  invoiceId?: number
  isPeriodRequired: boolean
  state?: number
  isUpdate?: boolean
  invoice?: InvoiceDetails
}
const InvoiceItemsForm = (props: Props) => {
  const {t} = useTranslation()

  const { settings } = useSelector((state : AppState) => state.setting)
  const [priceRound, setPriceRound] = useState<string>()
  const [dateFormat, setDateFormat] = useState<string>()

  useEffect(() => {
    const format_price = settings?.find(item => item.name === 'price_rounding')
    setPriceRound(format_price?.value)
    const format_date = settings?.find(item => item.name === 'date_format')
    setDateFormat(format_date?.value)
  },[])

  const invoice_items = props.form.getFieldValue('invoiceItems')

  const columns: ColumnsType<InvoiceItemDetails> = [
    {
      title: t('billing.invoice.name'), dataIndex: 'name', key: 'name'
    },
    {
      title: t('billing.invoice.from'), dataIndex: 'period_from', key: 'period_from', align: 'center',
      render: text => moment(text).format(dateFormat)
    },
    {
      title: t('billing.invoice.to'), dataIndex: 'period_to', key: 'period_to', align: 'center',
      render: text => moment(text).format(dateFormat)
    },
    {
      title: t('billing.invoice.unit-count'), dataIndex: 'unit_count', key: 'unit_count', align: 'center'
    },
    {
      title: t('billing.invoice.unit'), dataIndex: 'unit', key: 'unit', align: 'center'
    },
    {
      title: t('billing.invoice.unit-price') + ' (' + props.invoice?.currency + ')', dataIndex: 'price_per_unit', key: 'price_per_unit', className: 'right',
      render: text => priceRound && text.toFixed(parseInt(priceRound))
    },
    {
      title: t('billing.invoice.tax') + ' %', dataIndex: 'tax_id', key: 'tax_id', align: 'center',
      render: text => {
        const tax = props.taxes?.filter(
          v => moment().isBetween(v.valid_from, v.valid_to ? v.valid_to : moment(), undefined, '[]') && v.country.toLowerCase().includes('cz')
        ).find(item => item.id === text)
        return tax?.rate ? (tax.rate / 100) : ''
      }
    },
    {
      title: t('billing.invoice.no-vat'), dataIndex: 'total_without_vat', key: 'total_without_vat', className: 'right',
      render: text => priceRound && text.toFixed(parseInt(priceRound))
    },
    {
      title: t('billing.invoice.total-vat'), dataIndex: 'total_vat', key: 'total_vat', className: 'right',
      render: text => priceRound && text.toFixed(parseInt(priceRound))
    },
    {
      title: t('billing.invoice.total-with-vat'), dataIndex: 'total_with_vat', key: 'total_with_vat', className: 'right',
      render: text => priceRound && text.toFixed(parseInt(priceRound))
    }
  ]

  return (
    <>
      {
        props.state === 1 &&
        <List name='invoiceItems'>
          {(fields, {add, remove, move}) => (
            <div className='invoice_items'>
              {
                fields.map((field, index) =>
                  <Space key={field.key} size='small' className='itemBody'>

                    <Item {...field} name={[field.name, 'position']} fieldKey={[field.fieldKey, 'position']} label={index === 0 && ' '} {...invoiceItemLabelLayout}>
                      <InputNumber size='large' className='positionInput' min={1} disabled formatter={value => `${value}.`} />
                    </Item>

                    <Item {...field} name={[field.name, 'name']} fieldKey={[field.fieldKey, 'name']} label={index === 0 && t('billing.invoice.name')} rules={[{required: !props.isPeriodRequired}]} {...invoiceItemLabelLayout} className='inputName'>
                      <TextArea size='large' autoSize={true} className='inputName_textArea' />
                    </Item>

                    {
                      props.isUpdate && props.invoice?.period_from &&
                      <Item {...field} name={[field.name, 'period_from']} fieldKey={[field.fieldKey, 'period_from']} label={index === 0 && t('billing.invoice.from')} {...invoiceItemLabelLayout} className='inputFrom'>
                          <DatePicker size='large' format='DD.MM.YYYY' />
                      </Item>
                    }

                    {
                      props.isUpdate && props.invoice?.period_from &&
                      <Item {...field} name={[field.name, 'period_to']} fieldKey={[field.fieldKey, 'period_to']} label={index === 0 && t('billing.invoice.to')} {...invoiceItemLabelLayout} className='inputTo'>
                          <DatePicker size='large' format='DD.MM.YYYY' />
                      </Item>
                    }

                    <Item {...field} name={[field.name, 'unit_count']} fieldKey={[field.fieldKey, 'unit_count']} rules={[{required: !props.isPeriodRequired}]} label={index === 0 && t('billing.invoice.unit-count')} {...invoiceItemLabelLayout} className='inputUnitCount'>
                      <InputNumber size='large' min={1} style={{width: '80px'}} decimalSeparator=',' />
                    </Item>

                    <Item {...field} name={[field.name, 'unit']} fieldKey={[field.fieldKey, 'unit']} label={index === 0 && t('billing.invoice.unit')} {...invoiceItemLabelLayout} className='inputUnit'>
                      <Input size='large' title='ks,TB,MHz,month' />
                    </Item>

                    <Item {...field} name={[field.name, 'price_per_unit']} fieldKey={[field.fieldKey, 'price_per_unit']} rules={[{required: !props.isPeriodRequired}]} label={index === 0 && t('billing.invoice.unit-price')} {...invoiceItemLabelLayout} className='inputPerUnit'>
                      <InputNumber size='large' style={{width: '100px'}}
                        // formatter={(value)=>{
                        //   if (priceRound && invoice_items[index] && invoice_items[index]['price_per_unit'] && props.isUpdate)
                        //     return (invoice_items[index]['price_per_unit']).toFixed(parseInt(priceRound))
                        //   else
                        //     return
                        // }}
                        // formatter={value => priceRound && value && parseFloat(value).toFixed(parseInt(priceRound))}
                      />
                    </Item>

                    <Item {...field} name={[field.name, 'tax_id']} fieldKey={[field.fieldKey, 'tax_id']} rules={[{required: !props.isUpdate}]} label={index === 0 && t('billing.invoice.tax')} {...invoiceItemLabelLayout} className='inputTax'>
                      <Select
                        size='large'
                        style={{width: '100px'}}
                        optionLabelProp='id'
                        showSearch
                        allowClear
                        optionFilterProp='label'
                        options={
                          props.taxes?.filter(
                            v => moment().isBetween(v.valid_from, v.valid_to ? v.valid_to : moment(), undefined, '[]') && v.country.toLowerCase().includes('cz')
                          ).map(
                            v => ({label: `${v.country} ${v.rate / 100} %`, value: v.id, id: `${v.rate / 100} %`}))}
                      />
                    </Item>

                    <Item {...field} name={[field.name, 'total_without_vat']} fieldKey={[field.fieldKey, 'total_without_vat']} label={index === 0 && t('billing.invoice.no-vat')} {...invoiceItemLabelLayout} className='inputNoVat'>
                      <InputNumber size='large' style={{width: '100px'}} disabled
                        // formatter={()=>{
                        //   if (priceRound && invoice_items[index] && invoice_items[index]['total_without_vat'] && props.isUpdate)
                        //     return (invoice_items[index]['total_without_vat']).toFixed(parseInt(priceRound))
                        //   else
                        //     return
                        // }}
                      />
                    </Item>

                    <Item {...field} name={[field.name, 'total_vat']} fieldKey={[field.fieldKey, 'total_vat']} label={index === 0 && t('billing.invoice.total-vat')} {...invoiceItemLabelLayout} className='inputVat'>
                      <InputNumber size='large' style={{width: '100px'}} disabled
                        // formatter={()=>{
                        //   if (priceRound && invoice_items[index] && invoice_items[index]['total_vat'] && props.isUpdate)
                        //     return (invoice_items[index]['total_vat']).toFixed(parseInt(priceRound))
                        //   else
                        //     return
                        // }}
                      />
                    </Item>

                    <Item {...field} name={[field.name, 'total_with_vat']} fieldKey={[field.fieldKey, 'total_with_vat']} label={index === 0 && t('billing.invoice.total-with-vat')} {...invoiceItemLabelLayout} className='inputTotal'>
                      <InputNumber size='large' style={{width: '100px'}} disabled
                        // formatter={()=>{
                        //   if (priceRound && invoice_items[index] && invoice_items[index]['total_with_vat'] && props.isUpdate)
                        //     return (invoice_items[index]['total_with_vat']).toFixed(parseInt(priceRound))
                        //   else
                        //     return
                        // }}
                      />
                    </Item>

                    <Item label={index === 0 && ' '}  {...invoiceItemLabelLayout}>
                      <UpDownButton size='small'
                                    disabledUp={index === 0}
                                    disabledDown={index + 1 === fields.length}
                                    onUp={() => {
                                      props.form.setFieldsValue({
                                        invoiceItems: invoice_items.map((v, i) =>
                                          i === index ? {...v, position: i} : (i === index - 1 ? {...v, position: i + 2} : {...v}))
                                      })
                                      move(index, index - 1)
                                    }}
                                    onDown={() => {
                                      props.form.setFieldsValue({
                                        invoiceItems: invoice_items.map((v, i) =>
                                          i === index ? {...v, position: i + 2} : (i === index + 1 ? {...v, position: i} : {...v}))
                                      })
                                      move(index, index + 1)
                                    }}
                      />
                    </Item>

                    <Item label={index === 0 && ' '}  {...invoiceItemLabelLayout}>
                      <Button size='large' onClick={() => fields.length > 1 && remove(field.name)} icon={<MinusCircleOutlined />} disabled={fields.length === 1} />
                    </Item>

                    <Item {...field} name={[field.name, 'invoice_id']} fieldKey={[field.fieldKey, 'invoice_id']} className='inputHidden'><InputNumber type='hidden' /></Item>
                    <Item {...field} name={[field.name, 'id']} fieldKey={[field.fieldKey, 'id']} className='inputHidden'><InputNumber type='hidden' /></Item>
                    <Item {...field} name={[field.name, 'customer_service_id']} fieldKey={[field.fieldKey, 'customer_service_id']} className='inputHidden'><InputNumber type='hidden' /></Item>

                  </Space>
                )
              }
              <Item>
                <Button
                  type='dashed'
                  size='large'
                  onClick={() => {
                    if (props.invoice?.period_from) {
                      add({position: invoice_items.length + 1, invoice_id: props.invoiceId})
                    }
                    else {
                      const tax = props.taxes?.find(item => item.country.toLowerCase().includes('cz') && item.rate === 2100)
                      add({position: invoice_items.length + 1, invoice_id: props.invoiceId, unit_count: 1, tax_id: tax?.id})
                    }
                  }}
                  block
                  className='addRowButton'
                  icon={<PlusOutlined />} >Add field</Button>
              </Item>
            </div>
          )
          }
        </List>
      }

      {
        props.state === 2 &&
        <Table dataSource={invoice_items} columns={columns} rowKey={record => `${record.id}`} className='invoiceItemsTable' bordered pagination={false}/>
      }
    </>
  )
}

export default InvoiceItemsForm
