import React, { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import {Form, Card, InputNumber, Space, Select, Empty, Divider} from 'antd'
import { FormInstance } from 'antd/lib/form'
import Button from 'antd-button-color'
import { PlusCircleOutlined } from '@ant-design/icons/lib/icons'
import { labelTopLayout } from 'helpers/layoutHelpers'
import { TaxDetails } from 'pages/billing/tax/models'
import { useTranslation } from 'react-i18next'
import './BillVatSummary.scss'
import { CompanyDetails } from 'pages/company/models'

interface Props {
  taxes?: TaxDetails[]
  form: FormInstance
  setPrecisionVatSummary: Dispatch<SetStateAction<number[]>>
  precisionVatSummary: number[]
  selectedCompany?: CompanyDetails
}
const { Item, List } = Form

const BillVatSummary = (props: Props) => {
  const { t } = useTranslation()

  console.log('TAXES PROPS', props.taxes);

  return (
    <Card
      title={`${t('billing.bill-vat-summary.title')} (Bill Vat Summary)  `}
      className='BillVatSummary'
      extra={<> &nbsp; <Link to='/billing/taxes' key='BillVatSummary'><Button type='dashed' icon={<PlusCircleOutlined />} /></Link></>}
    >
      {
        !props.taxes ? <Empty description={t('billing.bill-vat-summary.no-data-title')} /> :
          <>
          <List
            name='taxes'
          >
            {
              (fields) => (
                <>
                  {fields.map((field, i) => (

                    <Space size='small' key={field.key}
                      className='BillVatSummary_Form_Space'
                      style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 0 }}
                    // align='baseline'
                    >

                      <Item
                        {...field}
                        name={[field.name, 'id']}
                        fieldKey={[field.fieldKey, 'id']}
                        style={{ display: 'none' }}
                        label={t('billing.bill-vat-summary.id')}
                      >
                        <InputNumber type='hidden' disabled />
                      </Item>

                      <Item
                        {...field}
                        name={[field.name, 'bill_id']}
                        fieldKey={[field.fieldKey, 'bill_id']}
                        style={{ display: 'none' }}
                        label={t('billing.bill-vat-summary.bill_id')}
                      >
                        <InputNumber type='hidden' disabled />
                      </Item>


                      <Item
                        {...field} {...labelTopLayout}
                        name={[field.name, 'tax_id']}
                        fieldKey={[field.fieldKey, 'tax_id']}
                        label={!i && t('billing.bill-vat-summary.tax_id')}
                      >
                        <Select
                          showSearch
                          optionFilterProp='label'
                          options={
                            props.taxes?.map(
                              tax => ({
                                label: `${tax.country} ${tax.rate / 100}%`,
                                key: tax.id,
                                value: tax.id
                              })
                            )}
                          className='taxRateSelect'
                        />
                      </Item>

                      <Item
                        {...field} {...labelTopLayout}
                        name={[field.name, 'total_without_vat']}
                        fieldKey={[field.fieldKey, 'total_without_vat']}
                        label={!i && t('billing.bill-vat-summary.total_without_vat')}
                        rules={[{ required: props.form.getFieldValue('taxes')[i].total_with_vat > 0 }]}
                      >
                        <InputNumber
                          min={0}
                          precision={props.precisionVatSummary[i]}
                          className={`totalWithoutVatInput ${props.form.getFieldValue('taxes')[i].rounding_difference !== 0 ? `rounded` : ''}`}
                        />
                      </Item>

                      <Item
                        {...field} {...labelTopLayout}
                        name={[field.name, 'total_vat']}
                        fieldKey={[field.fieldKey, 'total_vat']}
                        label={!i && t('billing.bill-vat-summary.total_vat')}
                      >
                        <InputNumber
                          min={0}
                          precision={props.precisionVatSummary[i]}
                          className='totalVatInput'
                          disabled
                        />
                      </Item>

                      <Item
                        {...field} {...labelTopLayout}
                        name={[field.name, 'total_with_vat']}
                        fieldKey={[field.fieldKey, 'total_with_vat']}
                        label={!i && t('billing.bill-vat-summary.total_with_vat')}
                        rules={[{ required: props.form.getFieldValue('taxes')[i].total_without_vat > 0 }]}
                      >
                        <InputNumber
                          min={0}
                          precision={props.precisionVatSummary[i]}
                          className={`totalWithVatInput ${props.form.getFieldValue('taxes')[i].rounding_difference !== 0 ? `rounded` : ''}`}
                        />
                      </Item>

                      <Item
                        {...field} {...labelTopLayout}
                        name={[field.name, 'rounding_difference']}
                        fieldKey={[field.fieldKey, 'rounding_difference']}
                        label={!i && t('billing.bill-vat-summary.rounding_difference')}
                      >
                        <InputNumber
                          disabled={!props.form.getFieldValue('taxes')[i].total_with_vat}
                          className='roundingInput'
                        />
                      </Item>
                      <Item
                        {...field} {...labelTopLayout}
                        name={[field.name, 'precision']}
                        fieldKey={[field.fieldKey, 'precision']}
                        label={!i && t('billing.bill-vat-summary.percision')}
                      >
                        <InputNumber
                          min={0}
                          max={2}
                          step={1}
                          precision={0}
                          onChange={v => {
                            const newArr = [...props.precisionVatSummary]
                            newArr[i] = Number(v)
                            props.setPrecisionVatSummary(newArr)
                          }}
                          className='precisionInput'
                        />
                      </Item>

                    </Space>
                  ))}

                </>
              )}
          </List>

          <Divider>
            <i>{t('billing.bill.total')}</i>
          </Divider>

          <Item name='total_without_vat' rules={[{required: true}]} label={t('billing.bill-vat.total_without_vat')}>
            <InputNumber disabled className='Bill_Form_TotalInput' />
          </Item>

          <Item name='total_vat' rules={[{required: true}]} label={t('billing.bill-vat.total_vat')}>
            <InputNumber disabled className='Bill_Form_TotalInput' />
          </Item>

          <Item name='total_with_vat' rules={[{required: true}]} label={t('billing.bill-vat.total_with_vat')}>
            <InputNumber disabled className='Bill_Form_TotalInput' />
          </Item>

          <Item name='rounding_difference' label={t('billing.bill-vat.rounding_difference')}>
            <InputNumber className='Bill_Form_TotalInput' />
          </Item>

        </>

      }
    </Card>
  )
}

export default BillVatSummary