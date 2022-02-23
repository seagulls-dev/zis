import React, { useEffect } from 'react'
import { Col, Form, Row, Space, message, PageHeader } from 'antd'
import Bill from 'components/BillVat/Bill'
import BillVatSummary from 'components/BillVat/BillVatSummary'
import { formItemLayout } from 'helpers/layoutHelpers'
import { Link, RouteComponentProps, useParams } from 'react-router-dom'
import { useForm } from 'antd/lib/form/Form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'common/models'
import updateBillVatSummary from '../billvatsummary/actions/updateBillVatSummary'
import updateBill from './actions/updateBill'
import getBill from './actions/getBill'
import getCompanies from 'pages/company/actions/getCompanies'
import moment from 'moment'
import getTaxes from '../tax/actions/getTaxes'
import getBillVatSummaryByBill from '../billvatsummary/actions/getBillVatSummaryByBill'
import { useState } from 'react'
import Button from 'antd-button-color'
import BillCostAllocationPage from '../billcostallocation/BillCostAllocationPage'
import { CompanyDetails } from 'pages/company/models'

interface ParamTypes {
  id: string
}

const UpdateBillPage = (props: RouteComponentProps) => {
  const { t } = useTranslation()
  const [form] = useForm()
  const { id } = useParams<ParamTypes>()
  const dispatch = useDispatch()

  const [precisionVatSummary, setPrecisionVatSummary] = useState<number[]>([])
  const [selectedCompany, setSelectedCompany] = useState<CompanyDetails>()

  const { taxes } = useSelector((state: AppState) => state.tax)
  const { companies, isLoading: isCompaniesLoading } = useSelector((state: AppState) => state.company)
  const { bill } = useSelector((state: AppState) => state.bill)
  const { billvatsummary } = useSelector((state: AppState) => state.billvatsummary)

  useEffect(() => {
    dispatch(getBill(Number(id)))
    dispatch(getBillVatSummaryByBill(Number(id)))
    !companies && dispatch(getCompanies())
    !taxes && dispatch(getTaxes())
    //eslint-disable-next-line
  }, [])

  useEffect(() => billvatsummary && setPrecisionVatSummary(billvatsummary.map(v => 2)), [billvatsummary])

  useEffect(() =>
    form.resetFields()
    //eslint-disable-next-line
    , [bill, precisionVatSummary])

  useEffect(() => {
    selectedCompany && form.setFieldsValue({
      currency: undefined,
      total_with_vat: undefined,
      total_vat: undefined,
      total_without_vat: undefined,
      taxes: taxes?.filter(t => t.country === selectedCompany?.country)
        .map((t, i) => (
          {
            id: billvatsummary && billvatsummary[i].id,
            tax_id: t.id,
            bill_id: id,
            rounding_difference: 0,
            precision: precisionVatSummary[i],
          }
        ))
    })
    //eslint-disable-next-line
  }, [selectedCompany])

  const handleTotal = (changedValues, values) => {
    let tVat = 0
    let tWithoutVat = 0
    let tWithVat = 0
    const rowsCopy = [...values.taxes]
    values.taxes.forEach((fieldGroup, index) => {

      const tax = taxes?.find(v => v.id === fieldGroup.tax_id)

      if (fieldGroup && tax) {
        if (fieldGroup.total_with_vat && changedValues.taxes?.some(t => t.total_with_vat)) {
          fieldGroup.rounding_difference = 0
          fieldGroup.total_vat = +(Number(fieldGroup.total_with_vat) / (100 + (tax!.rate / 100)) * (tax!.rate / 100)).toFixed(precisionVatSummary[index])
          fieldGroup.total_without_vat = +(Number(fieldGroup.total_with_vat) - Number(fieldGroup.total_vat)).toFixed(precisionVatSummary[index])
          rowsCopy.splice(index, 1, fieldGroup)
          form.setFieldsValue({ taxes: rowsCopy })
        }
        if (fieldGroup.total_without_vat && changedValues.taxes?.some(t => t.total_without_vat)) {
          fieldGroup.rounding_difference = 0
          fieldGroup.total_vat = +(Number(fieldGroup.total_without_vat) / 100 * (tax!.rate / 100)).toFixed(precisionVatSummary[index])
          fieldGroup.total_with_vat = +(Number(fieldGroup.total_vat) + Number(fieldGroup.total_without_vat)).toFixed(precisionVatSummary[index])
          rowsCopy.splice(index, 1, fieldGroup)
          form.setFieldsValue({ taxes: rowsCopy })
        }

        if (fieldGroup.total_with_vat) {
          fieldGroup.total_with_vat = (fieldGroup.total_vat + fieldGroup.total_without_vat) + fieldGroup.rounding_difference
          rowsCopy.splice(index, 1, fieldGroup)
          form.setFieldsValue({ taxes: rowsCopy })
        }

        if (fieldGroup && changedValues.taxes?.some(t => t.precision)) {
          if (fieldGroup.total_without_vat)
            fieldGroup.total_without_vat = +fieldGroup.total_without_vat.toFixed(precisionVatSummary[index])
          if (fieldGroup.total_vat)
            fieldGroup.total_vat = +fieldGroup.total_vat.toFixed(precisionVatSummary[index])
          if (fieldGroup.total_with_vat)
            fieldGroup.total_with_vat = +fieldGroup.total_with_vat.toFixed(precisionVatSummary[index])
          rowsCopy.splice(index, 1, fieldGroup)
          form.setFieldsValue({ taxes: rowsCopy })
        }

        if (fieldGroup.total_vat) {
          tVat += Number(fieldGroup.total_vat)
        }
        if (fieldGroup.total_without_vat) {
          tWithoutVat += Number(fieldGroup.total_without_vat)
        }
        if (fieldGroup.total_with_vat) {
          tWithVat += Number(fieldGroup.total_with_vat)
        }
      }
    })
    form.setFieldsValue({
      total_with_vat: tWithVat,
      total_without_vat: tWithoutVat,
      total_vat: tVat
    })

    if (changedValues.rounding_difference && values.total_without_vat) {
      form.setFieldsValue({ total_with_vat: tWithVat + changedValues.rounding_difference })
    }
  }

  const onFinish = (values) => {
    dispatch(updateBill({
      ...values,
      id: bill?.id,
      date_of_maturity: values.date_of_maturity.format('YYYY-MM-DD'),
      date_of_taxing: values.date_of_taxing.format('YYYY-MM-DD'),
      total_without_vat: values.total_without_vat * 100,
      total_vat: values.total_vat * 100,
      total_with_vat: values.total_with_vat * 100,
      rounding_difference: values.rounding_difference * 100
    }, (isSuccess) =>
      isSuccess ? values.taxes?.map(tax =>
        dispatch(updateBillVatSummary({
          ...tax,
          total_without_vat: tax.total_without_vat * 100,
          total_vat: tax.total_vat * 100,
          total_with_vat: tax.total_with_vat * 100,
          rounding_difference: tax.rounding_difference * 100
        }, isSuccess => isSuccess && props.history.replace('/billing/bill')
        ))
      ) : message.error(t('billing.bill.error.updated'))
    ))
    message.success(t('billing.bill.updated'))
  }

  return (
    <>
      <PageHeader
        title={t('biling.bill.edit-title')}
        className='UpdateBillPage'
      >

        <Row
          gutter={[20, 20]}
        >
          <Form
            form={form}
            {...formItemLayout}
            className='Bill_Form'
            validateMessages={{ required: '' }}
            preserve={false}
            initialValues={{
              ...bill,
              date_of_maturity: moment(bill?.date_of_maturity),
              date_of_taxing: moment(bill?.date_of_taxing),
              total_vat: bill && bill.total_vat / 100,
              total_with_vat: bill && bill.total_with_vat / 100,
              total_without_vat: bill && bill.total_without_vat / 100,
              taxes: billvatsummary ? billvatsummary.map((v, i) => (
                {
                  ...v,
                  total_vat: v.total_vat / 100,
                  total_with_vat: v.total_with_vat / 100,
                  total_without_vat: v.total_without_vat / 100,
                  precision: precisionVatSummary[i]
                }
              )) : [],
            }}
            onFinish={onFinish}
            onValuesChange={handleTotal}
          >


            <Col>
              <Bill
                bill={bill}
                companies={companies}
                setSelectedCompany={setSelectedCompany}
                // selectedCompany={companies?.find(c => c.id === bill?.company_id)}
                selectedCompany={selectedCompany}
                isCompaniesLoading={isCompaniesLoading}
              />
            </Col>

            <Col>
              <BillVatSummary
                form={form}
                selectedCompany={selectedCompany}
                taxes={taxes} // && taxes.filter(tax => tax.country === companies?.find(c => c.id === bill?.company_id)?.country)
                precisionVatSummary={precisionVatSummary}
                setPrecisionVatSummary={setPrecisionVatSummary}
              />
            </Col>

          </Form>

          <BillCostAllocationPage />

          <Col span={24} className='CreateBillPage_Buttons' >
            <Space>
              <Link to='/billing/bill'>
                <Button type='primary'>{t('billing.bill.cancel')}</Button>
              </Link>
              <Button onClick={form.submit} type='success'>{t('billing.bill.update')}</Button>
            </Space>

          </Col>


        </Row>
      </PageHeader>
    </>
  )
}

export default UpdateBillPage