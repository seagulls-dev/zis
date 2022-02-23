import React, { useEffect } from 'react'
import { Card, Col, Divider, Form, InputNumber, Row, Select, Space } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined, SaveOutlined } from '@ant-design/icons/lib/icons'
import { useForm } from 'antd/lib/form/Form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'antd-button-color'
import { AppState } from 'common/models'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import TextArea from 'antd/lib/input/TextArea'
import { formItemLayout } from 'helpers/layoutHelpers'
import { sum } from 'helpers/arrayHelpers'
import deleteBillCostAllocation from './actions/deleteBillCostAllocation'
import createBillCostAllocation from './actions/createBillCostAllocation'
import { message } from 'antd'
import updateBillCostAllocation from './actions/updateBillCostAllocation'
import getCostAllocations from '../costallocation/actions/getCostAllocations'
import './BillCostAllocationPage.scss'
import getBillCostAllocationByBill from './actions/getBillCostAllocationByBill'

const { Item, List } = Form

const BillCostAllocationPage = () => {
  const { t } = useTranslation()
  const [form] = useForm()
  const dispatch = useDispatch()

  const { billallocations, isLoading: isBillCostAllocationLoading } = useSelector((state: AppState) => state.billcostallocation)
  const { costallocations, isLoading: isCostAllocationLoading } = useSelector((state: AppState) => state.costallocation)
  const { bill, isLoading: isBillLoading } = useSelector((state: AppState) => state.bill)

  useEffect(() => {
    bill && dispatch(getBillCostAllocationByBill(bill.id))
    !costallocations && dispatch(getCostAllocations())
    //eslint-disable-next-line
  }, [bill])

  useEffect(() => {
    !isBillCostAllocationLoading && !isBillLoading && form.resetFields()
    //eslint-disable-next-line
  }, [billallocations, costallocations])

  const handleTotal = (_, values) => {
    const allocated = sum(values.billcostallocations, 'price')
    bill?.total_without_vat && form.setFieldsValue({ allocated, rest: bill.total_without_vat / 100 - allocated })
  }

  return (
    <Card
      title={t('billing.bill-cost-allocation.page-title')}
      className='BillCostAllocationsPage'
      loading={isBillCostAllocationLoading || isBillLoading}
      headStyle={{ background: 'grey' }}
    >
      <Form
        form={form}
        className='BillCostAllocationsPage_Form'
        name='BillCostAllocationsPage_dynamic_form_nest_item'
        autoComplete='off'
        onValuesChange={handleTotal}
        validateMessages={{ required: '' }}
        initialValues={{
          billcostallocations: billallocations && billallocations.length ?
            billallocations.map(v => ({ ...v, price: v.price / 100 })) :
            [{ price: 0, bill_id: bill?.id }],
          total_without: bill?.total_without_vat && Number(bill?.total_without_vat) / 100,
          allocated: billallocations && sum(billallocations, 'price') / 100,
          rest: bill?.total_without_vat && billallocations && Number(bill?.total_without_vat) / 100 - sum(billallocations, 'price') / 100
        }}
      >
        <List name='billcostallocations'>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (

                <Row
                  key={field.key}
                  gutter={20}
                >

                  <Col flex={0} style={{ width: '240px' }}>

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
                        placeholder={t('billing.bill-cost-allocation.allocate-to')}
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
                      <InputNumber min={0} placeholder='Price' className='priceInput' style={{ width: '160px' }} />
                    </Item>
                  </Col>

                  <Col flex={1}>
                    <Item {...field} name={[field.name, 'note']} fieldKey={[field.fieldKey, 'note']}>
                      <TextArea rows={1} placeholder={t('billing.bill-cost-allocation.note')} />
                    </Item>
                  </Col>


                  <Space>
                    {
                      index === fields.length - 1
                        ?
                        <Item fieldKey={[field.fieldKey, 'addButton']} >
                          <Button
                            onClick={() => add({ price: 0, bill_id: bill?.id })}
                            icon={<PlusCircleOutlined />}
                            type='success'
                          />
                        </Item>
                        :
                        <Item fieldKey={[field.fieldKey, 'removeButton']}>

                          <PopConfirmZis
                            onConfirm={() => {
                              const cost_allocation_category_id = form.getFieldValue('billcostallocations')[index].cost_allocation_category_id
                              const price = form.getFieldValue('billcostallocations')[index].price
                              const id = form.getFieldValue('billcostallocations')[index].id
                              cost_allocation_category_id && price && id && dispatch(deleteBillCostAllocation(id))
                              remove(field.name)
                            }}
                            placement='right'
                          >
                            <Button type='danger' icon={<MinusCircleOutlined />} />
                          </PopConfirmZis>

                        </Item>
                    }

                    <Item fieldKey={[field.fieldKey, 'saveButton']}>
                      <Button
                        onClick={() => {
                          const cost_allocation_category_id = form.getFieldValue('billcostallocations')[index].cost_allocation_category_id
                          const bill_id = form.getFieldValue('billcostallocations')[index].bill_id
                          const price = form.getFieldValue('billcostallocations')[index].price
                          const note = form.getFieldValue('billcostallocations')[index].note
                          const id = form.getFieldValue('billcostallocations')[index].id

                          cost_allocation_category_id && price && bill_id ?
                            billallocations && id ?
                              dispatch(updateBillCostAllocation({
                                id,
                                cost_allocation_category_id,
                                bill_id,
                                price: price * 100,
                                note
                              }, isSuccess => isSuccess && message.info(t('billing.bill-cost-allocation.updated')))) :
                              dispatch(
                                createBillCostAllocation({
                                  cost_allocation_category_id,
                                  bill_id,
                                  price: price * 100,
                                  note
                                }, isSuccess => isSuccess && message.info(t('billing.bill-cost-allocation.created')))) :
                            form.validateFields()
                        }}
                        icon={<SaveOutlined />}
                        type='info'
                      />
                    </Item>

                    <Item
                      {...field}
                      name={[field.name, 'bill_id']}
                      fieldKey={[field.fieldKey, 'bill_id']}
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
            </>
          )}
        </List>

        <Divider />
        <Item
          name='total_without'
          label={t('billing.bill-cost-allocation.total-without')}
          {...formItemLayout}
        >
          <InputNumber
            formatter={value => `${value} ${bill?.currency}`}
            parser={value => value && bill ? value.replace(bill.currency, '') : ''}
            style={{ minWidth: '160px' }}
            disabled
          />
        </Item>

        <Item
          name='allocated'
          label={t('billing.bill-cost-allocation.allocated')}
          {...formItemLayout}
        >
          <InputNumber
            formatter={value => `${value} ${bill?.currency}`}
            parser={value => value && bill ? value.replace(bill.currency, '') : ''}
            style={{ minWidth: '160px' }}
            disabled
          />
        </Item>

        <Item
          name='rest'
          label={t('billing.bill-cost-allocation.rest')}
          {...formItemLayout}
          rules={[{
            validator: async (_, value) => {
              if (!value || value < 0) {
                return Promise.reject(new Error('.'))
              }
            },
          }]}
        >
          <InputNumber
            formatter={value => `${value} ${bill?.currency}`}
            parser={value => value && bill ? value.replace(bill.currency, '') : ''}
            style={{ minWidth: '160px' }}
            disabled
          />
        </Item>
      </Form>
    </Card>
  )
}

export default BillCostAllocationPage