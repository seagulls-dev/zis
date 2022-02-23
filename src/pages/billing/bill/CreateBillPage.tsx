import React from 'react'
import { Col, Row, PageHeader, Space, message } from 'antd'
import BillVatSummary from 'components/BillVat/BillVatSummary'
import Bill from 'components/BillVat/Bill'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'common/models'
import { Link, RouteComponentProps } from 'react-router-dom'
import { useEffect } from 'react'
import getCompanies from 'pages/company/actions/getCompanies'
import getTaxes from '../tax/actions/getTaxes'
import { CompanyDetails } from 'pages/company/models'
import { useState } from 'react'
import Button from 'antd-button-color'
import { Form } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { formItemLayout } from 'helpers/layoutHelpers'
import createBill from './actions/createBill'
import createBillVatSummary from '../billvatsummary/actions/createBillVatSummary'
import { useTranslation } from 'react-i18next'
import BillCostAllocationPage from "../billcostallocation/BillCostAllocationPage";


const CreateBillPage = (props: RouteComponentProps) => {
  const { t } = useTranslation()
  const [form] = useForm()
  const dispatch = useDispatch()

  const [selectedCompany, setSelectedCompany] = useState<CompanyDetails>()
  const [precisionVatSummary, setPrecisionVatSummary] = useState<number[]>([])

  const { taxes } = useSelector((state: AppState) => state.tax)
  const { companies, isLoading: isCompaniesLoading } = useSelector((state: AppState) => state.company)

  useEffect(() => {
    dispatch(getCompanies())
    dispatch(getTaxes())
    //eslint-disable-next-line
  }, [])

  useEffect(() => taxes && setPrecisionVatSummary(taxes.map(v => 2)), [taxes])

  useEffect(() => {
    form.resetFields()
    //eslint-disable-next-line
  }, [taxes, selectedCompany])

  console.log('SELECTED COMPANY', selectedCompany);


  const handleTotal = (changedValues, values) => {
    console.log('CHANGE VALUES', changedValues);
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
    dispatch(createBill({
      ...values,
      date_of_maturity: values.date_of_maturity.format('YYYY-MM-DD'),
      date_of_taxing: values.date_of_taxing.format('YYYY-MM-DD'),
      total_without_vat: values.total_without_vat * 100,
      total_vat: values.total_vat * 100,
      total_with_vat: values.total_with_vat * 100,
    }, (isSuccess, bill_id) =>
      isSuccess && bill_id ? values.taxes?.map(tax =>
        dispatch(createBillVatSummary({
          ...tax,
          bill_id,
          total_without_vat: tax.total_without_vat * 100,
          total_vat: tax.total_vat * 100,
          total_with_vat: tax.total_with_vat * 100,
        }, isSuccess => isSuccess && message.success(t('billing.bill.created')))) && props.history.replace('/billing/bill')
      ) : message.error(t('billing.bill.error.created'))
    ))
  }

  return (
    <>
      <PageHeader
        title={t('billing.bill.create-page')}
        className='CreateBillPage'
      >

        <Form
          form={form}
          {...formItemLayout}
          className='Bill_Form'
          validateMessages={{ required: '' }}
          initialValues={{
            currency: 'CZK',
            company_id: selectedCompany?.id,
            rounding_difference: 0,
            taxes: taxes?.filter(t => t.country === selectedCompany?.country)
              .map((t, i) => (
                {
                  tax_id: t.id,
                  rounding_difference: 0,
                  precision: precisionVatSummary[i]
                }
              )),
          }}
          onFinish={onFinish}
          onValuesChange={handleTotal}
        >

          <Row
            gutter={20}
          >

            <Col>

              <Bill
                companies={companies}
                isCompaniesLoading={isCompaniesLoading}
                setSelectedCompany={setSelectedCompany}
                selectedCompany={selectedCompany}
              />

            </Col>

            <Col>

              <BillVatSummary
                form={form}
                taxes={taxes}
                selectedCompany={selectedCompany}
                precisionVatSummary={precisionVatSummary}
                setPrecisionVatSummary={setPrecisionVatSummary}
              />

            </Col>

            <Col span={24} className='CreateBillPage_Buttons' >
              <br />
              <Space>
                <Link to='/billing/bill'>
                  <Button type='primary'>{t('billing.bill.cancel')}</Button>
                </Link>
                <Button htmlType='submit' type='success'>{t('billing.bill.create')}</Button>
              </Space>

            </Col>

          </Row>
        </Form>
      </PageHeader>


    </>
  )
}

export default CreateBillPage