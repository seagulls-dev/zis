import React, {useEffect, useState} from 'react'
import { Card, Col, Divider, Form, InputNumber, Row, Select, Skeleton, Space } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined, SaveOutlined, DeleteTwoTone } from '@ant-design/icons/lib/icons'
import { useForm } from 'antd/lib/form/Form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'antd-button-color'
import { AppState } from 'common/models'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import TextArea from 'antd/lib/input/TextArea'
import { formItemLayout } from 'helpers/layoutHelpers'
import { sum } from 'helpers/arrayHelpers'
import deleteInvoiceCostAllocation from './actions/deleteInvoiceCostAllocation'
import createInvoiceCostAllocation from './actions/createInvoiceCostAllocation'
import { message } from 'antd'
import updateInvoiceCostAllocation from './actions/updateInvoiceCostAllocation'
import getCostAllocations from '../costallocation/actions/getCostAllocations'
import './InvoiceCostAllocationPage.scss'
import getInvoiceCostAllocationByInvoice from './actions/getInvoiceCostAllocationByInvoice'

const { Item, List } = Form

const InvoiceCostAllocationPage = () => {
  const { t } = useTranslation()
  const [form] = useForm()
  const dispatch = useDispatch()

  const { invoice, isLoading: isInvoiceLoading } = useSelector((state: AppState) => state.invoice)
  const { costallocations, isLoading: isCostAllocationLoading } = useSelector((state: AppState) => state.costallocation)
  const { invoiceallocations, isLoading: isInvoiceCostAllocationLoading } = useSelector((state: AppState) => state.invoicecostallocation)
  const { settings } = useSelector((state: AppState) => state.setting)

  const [priceRound, setPriceRound] = useState<string>()

  useEffect(() => {
    !costallocations && dispatch(getCostAllocations())
    dispatch(getInvoiceCostAllocationByInvoice(invoice.id))
    const format = settings?.find(item => item.name === 'price_rounding')
    setPriceRound(format?.value)
    form.setFieldsValue({
      invoicecostallocations: invoiceallocations && invoiceallocations.length ?
        invoiceallocations.map(v => ({ ...v, price: v.price / 100 })) :
        [],
      total_without: invoice.total_without_vat && priceRound && (invoice.total_without_vat / 100).toFixed(parseInt(priceRound)),
      allocated: invoiceallocations && priceRound && (sum(invoiceallocations.filter(item => item.invoice_id === invoice.id), 'price') / 100).toFixed(parseInt(priceRound)),
      rest: invoice.total_without_vat && priceRound && invoiceallocations && (invoice.total_without_vat / 100 - sum(invoiceallocations.filter(item => item.invoice_id === invoice.id), 'price') / 100).toFixed(parseInt(priceRound)),
    })
    //eslint-disable-next-line
  }, [invoice])

  useEffect(() =>{
    form.setFieldsValue({
      invoicecostallocations: invoiceallocations && invoiceallocations.length ?
        invoiceallocations.map(v => ({ ...v, price: v.price / 100 })) :
        [],
      total_without: invoice.total_without_vat && priceRound && (invoice.total_without_vat / 100).toFixed(parseInt(priceRound)),
      allocated: invoiceallocations && priceRound && (sum(invoiceallocations.filter(item => item.invoice_id === invoice.id), 'price') / 100).toFixed(parseInt(priceRound)),
      rest: invoice.total_without_vat && priceRound && invoiceallocations && (invoice.total_without_vat / 100 - sum(invoiceallocations.filter(item => item.invoice_id === invoice.id), 'price') / 100).toFixed(parseInt(priceRound)),
    })
  },[invoiceallocations])

  const handleTotal = (_, values) => {
    const allocated = sum(values.invoicecostallocations, 'price')
    invoice.total_without_vat && form.setFieldsValue({ allocated, rest: invoice.total_without_vat / 100 - allocated })
  }

  return (
    <Card
      title={t('billing.invoice-cost-allocation.page-title')}
      className='InvoiceCostAllocationsPage'
      headStyle={{ background: 'grey' }}
    >

      {
        isInvoiceCostAllocationLoading && isInvoiceLoading && isCostAllocationLoading ? <Skeleton /> :
          <Form
            form={form}
            className='InvoiceCostAllocationsPage'
            name='InvoiceCostAllocationsPage_dynamic_form_nest_item'
            autoComplete='off'
            onValuesChange={handleTotal}
            validateMessages={{ required: '' }}
          >
            <List name='invoicecostallocations'>
              {(fields, { add, remove }) => (
                <>
                  <Row gutter={20} style={{fontWeight: 'bold'}}>
                    <Col flex={0} style={{ width: '260px' }}>
                      {t('billing.invoice-cost-allocation.title.category')}
                    </Col>
                    <Col flex={0} style={{ width: '180px' }}>
                      {t('billing.invoice-cost-allocation.title.price')}
                    </Col>
                    <Col flex={1}>
                      {t('billing.invoice-cost-allocation.title.note')}
                    </Col>
                  </Row>
                  <br></br>
                  {fields.map((field, index) => (

                    <Row
                      key={field.key}
                      gutter={20}
                    >

                      <Col flex={0} style={{ width: '260px' }}>

                        <Item
                          {...field}
                          name={[field.name, 'cost_allocation_category_id']}
                          fieldKey={[field.fieldKey, 'cost_allocation_category_id']}
                          rules={[{ required: true }]}
                        >
                          <Select
                            showSearch
                            allowClear
                            optionFilterProp='label'
                            placeholder={t('billing.invoice-cost-allocation.allocate-to')}
                            loading={isCostAllocationLoading}
                            className='costAllocationSelect'
                            options={costallocations?.map(c => ({ value: c.id, key: c.id, label: c.name }))}
                          />
                        </Item>
                      </Col>

                      <Col flex={0}>
                        <Item
                          {...field}
                          name={[field.name, 'price']}
                          fieldKey={[field.fieldKey, 'price']}
                          rules={[{ required: true, message: 'Missing price' }]}
                        >
                          <InputNumber placeholder='Price' className='priceInput' style={{ width: '160px' }} />
                        </Item>
                      </Col>

                      <Col flex={1}>
                        <Item {...field} name={[field.name, 'note']} fieldKey={[field.fieldKey, 'note']}>
                          <TextArea rows={1} placeholder={t('billing.invoice-cost-allocation.note')} />
                        </Item>
                      </Col>

                      <Space>
                        <Item fieldKey={[field.fieldKey, 'saveButton']}>
                          <Button
                            onClick={() => {
                              const current = sum(form.getFieldValue('invoicecostallocations'),'price')
                              const total = invoice.total_without_vat
                              if (total && current * 100 <= total) {
                                const cost_allocation_category_id = form.getFieldValue('invoicecostallocations')[index].cost_allocation_category_id
                                const invoice_id = form.getFieldValue('invoicecostallocations')[index].invoice_id
                                const price = form.getFieldValue('invoicecostallocations')[index].price
                                const note = form.getFieldValue('invoicecostallocations')[index].note
                                const id = form.getFieldValue('invoicecostallocations')[index].id

                                cost_allocation_category_id && price && invoice_id ?
                                  invoiceallocations && id ?
                                    dispatch(updateInvoiceCostAllocation({
                                      id,
                                      cost_allocation_category_id,
                                      invoice_id,
                                      price: price * 100,
                                      note
                                    }, isSuccess => isSuccess && message.info(t('billing.invoice-cost-allocation.updated')))) :
                                    dispatch(
                                      createInvoiceCostAllocation({
                                        cost_allocation_category_id,
                                        invoice_id,
                                        price: price * 100,
                                        note: note
                                      }, isSuccess => isSuccess && message.info(t('billing.invoice-cost-allocation.created')))) :
                                  form.validateFields()
                              }
                              else {
                                message.error(t('billing.invoice-cost-allocation.not_save'))
                              }
                            }}
                            icon={<SaveOutlined style={{color: '#28a745'}} />}
                            type='text'
                            title={t('billing.invoice-cost-allocation.save_btn')}
                          />
                        </Item>

                        <Item fieldKey={[field.fieldKey, 'removeButton']}>
                          <PopConfirmZis
                            onConfirm={() => {
                              const cost_allocation_category_id = form.getFieldValue('invoicecostallocations')[index].cost_allocation_category_id
                              const price = form.getFieldValue('invoicecostallocations')[index].price
                              const id = form.getFieldValue('invoicecostallocations')[index].id
                              cost_allocation_category_id && price && id && dispatch(deleteInvoiceCostAllocation(id, isSuccess => isSuccess && message.info(t('billing.invoice-cost-allocation.deleted'))))
                              remove(field.name)
                            }}
                            placement='right'
                          >
                            <Button type='text' icon={<DeleteTwoTone twoToneColor='red' />} title={t('billing.invoice-cost-allocation.delete_btn')} />
                          </PopConfirmZis>
                        </Item>

                        <Item
                          {...field}
                          name={[field.name, 'invoice_id']}
                          fieldKey={[field.fieldKey, 'invoice_id']}
                          style={{ display: 'none' }}
                        >
                          <InputNumber type='hidden' />
                        </Item>

                        <Item
                          {...field}
                          name={[field.name, 'id']}
                          fieldKey={[field.fieldKey, 'id']}
                          style={{ display: 'none' }}
                        >
                          <InputNumber type='hidden' />
                        </Item>

                      </Space>
                    </Row>
                  ))}
                  <Item>
                    <Button
                      onClick={() => add({ price: invoice.total_without_vat && invoice.total_without_vat / 100, invoice_id: invoice.id })}
                      icon={<PlusCircleOutlined />}
                      type='success'
                      title={t('billing.invoice-cost-allocation.add_btn')}
                    />
                  </Item>
                </>
              )}
            </List>

            <Divider />
            <Row>
              <Col span={8} offset={6}>
                <Item
                  name='rest'
                  label={t('billing.invoice-cost-allocation.rest')}
                  {...formItemLayout}
                  rules={[{
                    validator: async (_, rest) => {
                      if (!rest || rest > 0) {
                        return Promise.reject(new Error('.'))
                      }
                    },
                  }]}
                >
                  <InputNumber
                    formatter={value => `${value} ${invoice.currency}`}
                    parser={value => value ? value.replace(invoice.currency, '') : ''}
                    style={{ minWidth: '160px' }}
                    size='large'
                    disabled
                  />
                </Item>
              </Col>
            </Row>
          </Form>
      }
    </Card>
  )
}

export default InvoiceCostAllocationPage
