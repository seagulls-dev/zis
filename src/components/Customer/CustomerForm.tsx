import React, {ChangeEvent, useState} from 'react'
import {Button, Form, Select, Input, Switch, Modal} from 'antd'
import SelectCountries from 'components/SelectCountries/SelectCountries'
import SelectCurrencies from 'components/SelectCurrencies/SelectCurrencies'
import { formItemLayout, tailLayout } from 'helpers/layoutHelpers'
import { CustomerDetails, CustomerParams } from 'pages/billing/customer/models'
import { useForm } from 'antd/lib/form/Form'
import { AppState } from 'common/models'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {CheckCircleOutlined, CheckOutlined, CloseOutlined, UserOutlined} from "@ant-design/icons";
import {AiOutlineMail} from "react-icons/ai";
import {BsFillPersonFill} from "react-icons/bs";
import {MaskedInput} from "antd-mask-input";

interface Props {
  dataToUpdate?: CustomerDetails
  dataToUpdateFromNew?: boolean
  onFinish: (values: CustomerParams) => void
}

const { Item } = Form

type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];

const CustomerForm = (props: Props) => {
  const [form] = useForm()
  const { t } = useTranslation()
  const { isLoading: isCompaniesLoading, companies } = useSelector((state: AppState) => state.company)
  const { fontSize } = useSelector((state: AppState) => state.font)
  const { users, isLoading: isUserLoading } = useSelector((state: AppState) => state.user)

  const [checked, setChecked] = useState(true)

  const filteredUsers = users?.filter(item => item.customer_id === props.dataToUpdate?.id)
  let adminOptions = users?.map(c => ({ label: c.title, value: c.id }));
  if (props.dataToUpdate?.administrative_id) {
    adminOptions = adminOptions?.filter(c => c.value == props.dataToUpdate?.administrative_id)
  }

  const [invoicing, setInvoicing] = useState<{
    value: string,
    validateStatus?: ValidateStatus,
    errorMsg?: string | null
  }>({value: ''})

  const handleCompanyChange = (id : number) => {
    const selected = companies?.find(item=>item.id === id)
    form.setFieldsValue({ident : selected?.name})
  }

  const handleUserChange = (id: number) => {
    const selected = users?.find(item=>item.id === id)
    form.setFieldsValue({owner_id : selected?.id})
  }

  const handleAdminChange = (id: number) => {
    const selected = users?.find(item=>item.id === id)
    form.setFieldsValue({administrative_id: selected?.id})
  }

  const handleTechChange = (id: number) => {
    const selected = users?.find(item=>item.id === id)
    form.setFieldsValue({technical_id: selected?.id})
  }

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

  const handleFinish = (values) => {
    if (invoicing.validateStatus === 'success' || invoicing.value === '') {
      if (values.billing_currency !== props.dataToUpdate?.billing_currency) {
        Modal.confirm({
          content: t('customerPage.modal'),
          okText: t('customerPage.modal_okText'),
          cancelText: t('customerPage.modal_cancelText'),
          onOk() {
            props.onFinish(form.getFieldsValue())
          },
          onCancel() {
            const old = props.dataToUpdate?.billing_currency
            form.setFieldsValue({ billing_currency: old })
          },
          icon: <CheckCircleOutlined />,
        })
      }
      else {
        props.onFinish(form.getFieldsValue())
      }
    }
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={handleFinish}
      initialValues={{
        billing_period: 'month',
        billing_currency: 'CZK',
        language: 'CZE',
        ...props.dataToUpdate,
        company_name: props.dataToUpdate?.company?.name,
        owner_id: filteredUsers?.find(item => item.id === props.dataToUpdate?.owner_id) ? props.dataToUpdate?.owner_id : null,
        administrative_id: users?.find(item => item.id === props.dataToUpdate?.administrative_id) ? props.dataToUpdate?.administrative_id : null,
        technical_id: filteredUsers?.find(item => item.id === props.dataToUpdate?.technical_id) ? props.dataToUpdate?.technical_id : null
      }}
    >

      {
        !props.dataToUpdate &&
          <>
              <Item
                  name='username'
                  rules={[
                    { required: true, message: t('loginPage.err_username') },
                    { type : 'string', min : 4, message : t('loginPage.err_name_length')},
                  ]}
                  label={t('createUserPage.username')}
              >
                  <Input
                      size={fontSize}
                      prefix={<UserOutlined className='site-form-item-icon' />}
                  />
              </Item>
              <Item
                  name='email'
                  rules={[{ required: true, message: t('loginPage.err_username') }, { type : 'email'}]}
                  label={t('createUserPage.email')}
              >
                  <Input
                      size={fontSize}
                      prefix={<AiOutlineMail className='site-form-item-icon' />}
                      type='email' />
              </Item>
              <Item
                  name='name'
                  label={t('createUserPage.name')}
                  rules={[{ required: true, message: t('loginPage.err_username') }]}
              >
                  <Input
                      size={fontSize}
                      prefix={<BsFillPersonFill className='site-form-item-icon' />}
                  />
              </Item>
              <Item
                  name='surname'
                  rules={[{ required: true, message: t('createUserPage.err_surname') }]}
                  label={t('createUserPage.surname')}
              >
                  <Input
                      size={fontSize}
                      prefix={<BsFillPersonFill className='site-form-item-icon' />}
                  />
              </Item>

              <Item
                  name='is_unix'
                  label={t('createUserPage.is_unix.title')}
                  initialValue={checked}
                  valuePropName='checked'
              >
                  <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                  />
              </Item>
          </>
      }

      {
        props.dataToUpdate &&
        <>
            <Item
                name='company_name'
                label={t('createUserPage.company_name')}
            >
                <Input
                    disabled
                    size={fontSize}
                    type='text' />
            </Item>
            <Item
                name='ident'
                label={t('createUserPage.ident')}
            >
                <Input
                    size={fontSize}
                    type='text' />
            </Item>
            <Item
                name='owner_id'
                label={t('createUserPage.owner')}
                hasFeedback
            >
                <Select
                    showSearch
                    allowClear
                    optionFilterProp='label'
                    loading={isUserLoading}
                    options={users?.filter(item => item.customer_id === props.dataToUpdate?.id).map(c => ({ label: c.title, value: c.id }))}
                    onChange={handleUserChange}
                />
            </Item>
            <Item
                name='administrative_id'
                label={t('createUserPage.administrative')}
                hasFeedback
            >
                <Select
                    showSearch
                    allowClear
                    optionFilterProp='label'
                    loading={isUserLoading}
                    options={adminOptions}
                    onChange={handleAdminChange}
                />
            </Item>
            <Item
                name='technical_id'
                label={t('createUserPage.technical')}
                hasFeedback
            >
                <Select
                    showSearch
                    allowClear
                    optionFilterProp='label'
                    loading={isUserLoading}
                    options={users?.filter(item => item.customer_id === props.dataToUpdate?.id).map(c => ({ label: c.title, value: c.id }))}
                    onChange={handleTechChange}
                />
            </Item>
        </>
      }

      {//when click create customer button, not from creating new company
        ((!props.dataToUpdate && !props.dataToUpdateFromNew)) &&
            <>
                <Item
                    name='phone'
                    label={t('createUserPage.phone')}
                >
                    <MaskedInput
                        mask='+111 111 111 111'
                        placeholder='+420 606 654 321'
                    />
                </Item>
                <Item
                    name='company_id'
                    label={t('customerPage.company_id')}
                    rules={[{ required: true, message: t('customerPage.err_company') }]}
                    hasFeedback
                >
                    <Select
                        showSearch
                        allowClear
                        optionFilterProp='label'
                        loading={isCompaniesLoading}
                        options={companies?.map(c => ({ label: c.name, value: c.id }))}
                        onChange={handleCompanyChange}
                    />
                </Item>
            </>
      }

      <Item name='billing_period' label={t('customerPage.billing_period')}>
        <Select options={['month', 'quarter_year', 'half_year', 'year'].map(v => ({ label: v, value: v }))} />
      </Item>

      <Item name='billing_currency' label={t('customerPage.billing_currency')}>
        <SelectCurrencies />
      </Item>

      <Item name='language' label={t('customerPage.language')}>
        <SelectCountries />
      </Item>

      <Item name='invoicing' label={t('customerPage.invoice')} hasFeedback validateStatus={invoicing.validateStatus} help={invoicing.errorMsg}>
        <Input onChange={handleInvoiceChange} />
      </Item>

      <Item
        name='invoice_detail'
        label={t('customerPage.invoice_detail')}
        hasFeedback
      >
        <Select
          showSearch
          allowClear
          optionFilterProp='label'
          options={[
            ({label: 'None',value: 0}),({label: 'Short',value: 1}),({label: 'All',value: 2}),
          ]}
        />
      </Item>

      <Item {...tailLayout}>
        <Button
          type='primary'
          htmlType='submit'
          className='login-form-button'
        >
          {props.dataToUpdate ? t('customerPage.update') : t('customerPage.create')}
        </Button>
      </Item>
    </Form>
  )
}

export default CustomerForm
