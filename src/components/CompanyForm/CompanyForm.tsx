import React, {useState, useEffect} from 'react'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import {useForm} from 'antd/lib/form/Form'
import {Form, Input, Switch, Button, Select} from 'antd'
import {CheckOutlined, CloseOutlined, MailOutlined} from '@ant-design/icons'
import {AiOutlineNumber} from 'react-icons/ai'
import {FiPhoneCall} from 'react-icons/fi'
import {RiStickyNoteLine} from 'react-icons/ri'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from 'common/models'
import {FaRegAddressBook} from 'react-icons/fa'
import {GiInjustice} from 'react-icons/gi'
import {protectedApiClient} from 'helpers/api'
import {CompanyDetails, CompanyParams} from 'pages/company/models'
import getCountries from 'components/SelectCountries/actions/getCountries'
import {VALIDATE_STATUS_ENUM} from 'common/enums'

interface Props {
	dataToUpdate?: CompanyDetails
	onFinish: (values: CompanyParams) => void
}

const {Item} = Form

const CompanyForm = ({onFinish, dataToUpdate}: Props) => {
	const [form] = useForm()
	const [checked, setChecked] = useState(false)
  const [customerChecked, setCustomerChecked] = useState(false)
	const dispatch = useDispatch()
	const [companyId, setCompanyId] = useState('')
	const [isExist, setIsExist] = useState<boolean>(false)      //used for existing validation
	const [aresData, setAresData] = useState<any>()
	const [validationStatus, setValidationStatus] = useState<VALIDATE_STATUS_ENUM>(VALIDATE_STATUS_ENUM.WARNING)
	const {fontSize} = useSelector((state: AppState) => state.font)
	const {countries, isLoading} = useSelector((state: AppState) => state.countries)
  const {companies} = useSelector((state: AppState) => state.company)
	const {t} = useTranslation()

	useEffect(() => {
		!countries && dispatch(getCountries())
		//eslint-disable-next-line
	}, [])

	useEffect(() => {
	  if (!dataToUpdate) {
      if (companyId && companyId.length > 4) {
        //if already exists
        if (companies?.find(item => item.company_number === companyId)) {
          setValidationStatus(VALIDATE_STATUS_ENUM.VALIDATION)
          setIsExist(true)
        }
        else {
          setValidationStatus(VALIDATE_STATUS_ENUM.SUCCESS)
          if (form.getFieldValue('country') === 'Czechia' || form.getFieldValue('country') === 'CZE') {

            setIsExist(false)

            protectedApiClient
              .get(`/company/get-from-ares?id_number=${companyId}`)
              .then((response: any) => {
                if (response.status === 200) {
                  const data = response.data
                  setAresData({
                    name: data.name,
                    vat_number: data.vat_number,
                    street: data.street,
                    city: data.city,
                    zip: data.zip,
                    vat_payer: data.vat_payer,
                    file_number: data.file_number
                  })
                }
                else {
                  setValidationStatus(VALIDATE_STATUS_ENUM.SUCCESS)
                  setAresData({
                    name: '',
                    vat_number: '',
                    street: '',
                    city: '',
                    zip: '',
                    vat_payer: '',
                    file_number: ''
                  })
                }
              })
              .catch((error) => {
                setValidationStatus(VALIDATE_STATUS_ENUM.SUCCESS)
                setAresData({
                  name: '',
                  vat_number: '',
                  street: '',
                  city: '',
                  zip: '',
                  vat_payer: '',
                  file_number: ''
                })
              })
          }
        }
      }
      else {
        setValidationStatus(VALIDATE_STATUS_ENUM.VALIDATION)
        setIsExist(false)
      }
    }


		//eslint-disable-next-line
	}, [companyId])

	useEffect(() => {
		form.setFieldsValue(aresData)
		//eslint-disable-next-line
	}, [aresData])

	return (
		<Form
			form={form}
			{...formItemLayout}
			name='create-company'
			className='CompanyCreateForm'
			onFinish={onFinish}
			initialValues={{...dataToUpdate, country: 'Czechia'}}>
			{dataToUpdate && (
				<Item name='id' style={{display: 'none'}}>
					<Input type='hidden' />
				</Item>
			)}

			<Item
				name='company_number'
				rules={[
					{required: true, message: t('companiesPage.error.ico')},
					{
            pattern: new RegExp('^[0-9]{1,8}$'),
            message: 'Number Length less than 8'
					},
				]}
				label={t('companiesPage.ico')}
				validateStatus={validationStatus}
				help={(isExist && companyId !== '')? t('companiesPage.error.no_exist') : null}
				hasFeedback>
				<Input
					size={fontSize}
					onChange={(e): void => setCompanyId(e.target.value)}
					// autoComplete='new-password'
					autoFocus
          disabled={!!dataToUpdate}
				/>
			</Item>

			<Item
				name='name'
				rules={[{required: true, message: t('companiesPage.error.name')}]}
				label={t('companiesPage.name')}
				hasFeedback>
				<Input
					size={fontSize}
					autoComplete='new-password'
					disabled={validationStatus === VALIDATE_STATUS_ENUM.VALIDATION}
				/>
			</Item>
			<Item
				name='vat_number'
				rules={[{required: true, min: 8, max: 14, message: t('companiesPage.error.dic')}]}
				label={t('companiesPage.dic')}
				hasFeedback>
				<Input
					size={fontSize}
					suffix={<AiOutlineNumber className='site-form-item-icon' />}
					disabled={validationStatus === VALIDATE_STATUS_ENUM.VALIDATION}
				/>
			</Item>
			<Item
				name='street'
				label={t('companiesPage.address_1')}
				rules={[{required: true, message: t('companiesPage.error.address_1')}]}
				hasFeedback>
				<Input
					size={fontSize}
					suffix={<FaRegAddressBook className='site-form-item-icon' />}
					disabled={validationStatus === VALIDATE_STATUS_ENUM.VALIDATION}
				/>
			</Item>
			<Item
				name='city'
				label={t('companiesPage.city')}
				rules={[{required: true, message: t('companiesPage.error.city')}]}
				hasFeedback>
				<Input
					size={fontSize}
					suffix={<FaRegAddressBook className='site-form-item-icon' />}
					disabled={validationStatus === VALIDATE_STATUS_ENUM.VALIDATION}
				/>
			</Item>
			<Item
				name='zip'
				label={t('companiesPage.zip')}
				rules={[{required: true, message: t('companiesPage.error.zip')}]}
				hasFeedback>
				<Input
					size={fontSize}
					suffix={<FaRegAddressBook className='site-form-item-icon' />}
					disabled={validationStatus === VALIDATE_STATUS_ENUM.VALIDATION}
				/>
			</Item>
			<Item
				name='country'
				label={t('companiesPage.country')}
				rules={[{required: true, message: t('companiesPage.error.country')}]}
				hasFeedback>
				<Select
					showSearch
					filterOption={true}
					optionFilterProp='label'
					options={countries && Object.keys(countries).map((key) => ({label: countries[key], key: key, value: key}))}
					size={fontSize}
					loading={isLoading}
					disabled={validationStatus === VALIDATE_STATUS_ENUM.VALIDATION}
				/>
			</Item>
			<Item
				name='vat_payer'
				label={t('companiesPage.vat_payer')}
				// initialValue={checked}
				valuePropName='checked'>
				<Switch
					checkedChildren={<CheckOutlined />}
					unCheckedChildren={<CloseOutlined />}
					checked={checked}
					onChange={() => setChecked(!checked)}
					disabled={validationStatus === VALIDATE_STATUS_ENUM.VALIDATION}
				/>
			</Item>
			<Item name='file_number' label={t('companiesPage.file_number')}>
				<Input
					size={fontSize}
					suffix={<GiInjustice className='site-form-item-icon' />}
					disabled={validationStatus === VALIDATE_STATUS_ENUM.VALIDATION}
				/>
			</Item>
			<Item name='email' label={t('companiesPage.email')}>
				<Input size={fontSize} suffix={<MailOutlined className='site-form-item-icon' />} />
			</Item>
			<Item name='phone' label={t('companiesPage.phone')}>
				<Input size={fontSize} suffix={<FiPhoneCall className='site-form-item-icon' />} />
			</Item>
			<Item name='note' label={t('companiesPage.note')}>
				<Input size={fontSize} suffix={<RiStickyNoteLine className='site-form-item-icon' />} />
			</Item>

      <Item
        name='is_new_customer'
        label={t('companiesPage.is_new_customer')}
        // initialValue={checked}
        valuePropName='checked'>
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={customerChecked}
          onChange={() => setCustomerChecked(!customerChecked)}
          disabled={validationStatus === VALIDATE_STATUS_ENUM.VALIDATION}
        />
      </Item>

			<Item {...tailLayout}>
				<Button type='primary' htmlType='submit' className='login-form-button' size={fontSize} disabled={validationStatus === VALIDATE_STATUS_ENUM.VALIDATION}>
					{dataToUpdate ? t('companiesPage.update') : t('companiesPage.create')}
				</Button>
			</Item>
		</Form>
	)
}

export default CompanyForm
