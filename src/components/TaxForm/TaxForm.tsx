import React from 'react'
import {Button, DatePicker, Form, Input, message, Select} from 'antd'
import {useForm} from 'antd/lib/form/Form'
import {AppState} from 'common/models'
import {getLanguage} from 'helpers/langHelpers'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import createTax from 'pages/billing/tax/actions/createTax'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {Store} from 'antd/lib/form/interface'
import localeCS from 'antd/es/date-picker/locale/cs_CZ'
import localeEN from 'antd/es/date-picker/locale/en_US'
import {UpdateTaxParams} from 'pages/billing/tax/models'
import moment from 'moment'
import updateTax from 'pages/billing/tax/actions/updateTax'

interface Props {
  dataToUpdate?: UpdateTaxParams
  setModalVisible?: (param: boolean) => void
}

const {Option} = Select
const {Item} = Form

const TaxForm = ({dataToUpdate, setModalVisible}: Props) => {

  const [form] = useForm()
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const {isLoading: isCountriesLoading, countries} = useSelector((state: AppState) => state.countries)
  const {isSaving: isTaxSaving} = useSelector((state: AppState) => state.tax)

  const onFormSubmit = (values: Store) => {
    dataToUpdate ?
      dispatch(updateTax({
        id: dataToUpdate.id,
        name: values.name,
        rate: values.rate * 100,
        valid_from: values.valid_from.format('YYYY-MM-DD'),
        valid_to: values.valid_to ? values.valid_to.format('YYYY-MM-DD') : '',
        country: values.country
      }, (isSuccess: boolean) => {
        if (isSuccess) {
          setModalVisible &&
            setModalVisible(false)
          message.info(t('billing.tax.updated'))
        }
      })) :
      dispatch(createTax({
        name: values.name,
        rate: values.rate * 100,
        valid_from: values.valid_from.format('YYYY-MM-DD'),
        valid_to: values.valid_to ? values.valid_to.format('YYYY-MM-DD') : '',
        country: values.country
      }, (isSuccess: boolean) => {
        if (isSuccess) {
          setModalVisible &&
            setModalVisible(false)
          message.info(t('billing.tax.created'))
        }
      }
      ))
  }

  return (
    <Form
      {...formItemLayout}
      onFinish={onFormSubmit}
      form={form}
      initialValues={
        {
          ...dataToUpdate,
          valid_from: dataToUpdate?.valid_from ? moment(dataToUpdate?.valid_from) : '',
          valid_to: dataToUpdate?.valid_to ? moment(dataToUpdate?.valid_to) : '',
          rate: dataToUpdate?.rate && dataToUpdate.rate / 100
        }
      }
    >
      <Item
        name='name'
        rules={[{required: true, message: t('billing.tax.error.name')}]}
        label={t('billing.tax.name')}
        hasFeedback
      >
        <Input />
      </Item>

      <Item
        name='rate'
        rules={[{required: true, message: t('billing.tax.error.rate')}]}
        label={t('billing.tax.rate')}
        hasFeedback
      >
        <Input type='number' />
      </Item>

      <Item
        name='valid_from'
        rules={[{required: true, message: t('billing.tax.error.valid_from')}]}
        label={t('billing.tax.valid_from')}
      >
        <DatePicker style={{width: '100%'}}
          locale={getLanguage() === 'cs' ? localeCS : localeEN}
          format='DD.MM.YYYY'
        />
      </Item>

      <Item
        name='valid_to'
        label={t('billing.tax.valid_to')}
      >
        <DatePicker style={{width: '100%'}}
          locale={getLanguage() === 'cs' ? localeCS : localeEN}
          format='DD.MM.YYYY'
        />
      </Item>

      <Item
        name='country'
        rules={[{required: true, message: t('billing.tax.error.country')}]}
        label={t('billing.tax.country')}
        hasFeedback
      >
        <Select
          loading={isCountriesLoading}
          showSearch
          optionFilterProp='children'
          allowClear
        >
          {
            countries && Object.keys(countries).map((key: string) => <Option key={key} value={key}>{countries[key]}</Option>)
          }
        </Select>
      </Item>

      <Item {...tailLayout}>
        <Button loading={isTaxSaving} type='primary' htmlType='submit' className='login-form-button'>
          {
            dataToUpdate ? t('billing.tax.update') : t('billing.tax.create')
          }
        </Button>
      </Item>

    </Form>
  )
}

export default TaxForm