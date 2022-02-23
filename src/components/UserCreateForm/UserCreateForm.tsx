import React, { useState } from 'react'
import { formItemLayout, tailLayout } from 'helpers/layoutHelpers'
import Form, { useForm } from 'antd/lib/form/Form'
import Item from 'antd/lib/form/FormItem'
import { Input, Switch, Button, Select } from 'antd'
import { UserOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { AiOutlineMail } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { RiStickyNoteLine } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'
import { Store } from 'antd/lib/form/interface'
import { useSelector } from 'react-redux'
import { AppState } from 'common/models'
import { CustomerDetails } from 'pages/billing/customer/models'
import { MaskedInput } from 'antd-mask-input'

interface Props {
  customers?: CustomerDetails[]
  isSaving: boolean
  handleFinish: (values: Store) => void
}

const { Option } = Select

const UserCreateForm = ({ isSaving, handleFinish, customers }: Props) => {
  const { t } = useTranslation()
  const [form] = useForm()
  const [checked, setChecked] = useState(true)
  const { fontSize } = useSelector((state: AppState) => state.font)
  const { self } = useSelector((state: AppState) => state.auth)
  // const [pass, setPass] = useState<string>()

  // useEffect(() => {
  //   form.setFieldsValue({ password: pass, password_repeat: pass })
  //   //eslint-disable-next-line
  // }, [pass])

  // const generatePassword = () => {
  //   let length = 8,
  //     charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^*()_',
  //     retVal = ''
  //   for (let i = 0, n = charset.length; i < length; ++i) {
  //     retVal += charset.charAt(Math.floor(Math.random() * n))
  //   }
  //   return retVal
  // }

  return (
    <Form
      {...formItemLayout}
      form={form}
      name='create-user'
      className='create-user-form'
      onFinish={handleFinish}
    >

      {/* <AvatarUpload /> */}
      {
        self?.is_zcom &&
        <Item
            name='customer_id'
            label={t('createUserPage.customer_id')}
            rules={[{ required: true, message: t('createUserPage.err_customer') }]}
        >
            <Select
                showSearch
                optionFilterProp='children'
                size={fontSize}
            >
              {
                customers?.map((customer, i) => (<Option key={i} value={customer.id} >{customer?.company?.name}</Option>))
              }
            </Select>
        </Item>
      }

      <Item
        name='username'
        rules={[{ required: true, message: t('loginPage.err_username') }]}
        label={t('createUserPage.username')}
      >
        <Input
          size={fontSize}
          prefix={<UserOutlined className='site-form-item-icon' />}
        />
      </Item>
      <Item
        name='email'
        rules={[{ required: true, message: t('loginPage.err_username') }]}
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
        name='note'
        label={t('createUserPage.note')}
      >
        <Input
          size={fontSize}
          prefix={<RiStickyNoteLine className='site-form-item-icon' />}
        />
      </Item>


      <Item {...tailLayout}>
        <Button type='primary' loading={isSaving} htmlType='submit' className='login-form-button'
          size={fontSize}>
          {t('createUserPage.create')}
        </Button>
      </Item>
    </Form>
  )
}

export default UserCreateForm
