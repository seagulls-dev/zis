import React from 'react'
import { Card, Form, Input, Button, message } from 'antd'
import { MailOutlined, UnlockOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { formItemLayout, tailLayout } from 'helpers/layoutHelpers'
import { passwordRequest } from './actions/passwordRequest'
import { Store } from 'antd/lib/form/interface'
import { useSelector } from 'react-redux'
import { AppState } from 'common/models'

const PasswordRequestPage = () => {
  const { t } = useTranslation()
  const { fontSize } = useSelector((state: AppState) => state.font)

  const onFinish = (values: Store) => {
    passwordRequest({ email: values.email }, (isSent) => {
      isSent && message.success(t('resetPasswordPage.reset'))
    })
  }

  return (
    <div className='PasswordRequestPage'>
      <Card
        title={ <><UnlockOutlined /> { t('resetPasswordPage.reset_password_request') }</> }
        style={ { width: 500 } }
      >
        <Form
          name='reset_password'
          className='login-form'
          initialValues={ { remember: true } }
          onFinish={ onFinish }
          { ...formItemLayout }
          noValidate
        >
          <Form.Item
            name='email'
            label='E-mail'
            rules={ [
              { required: true, message: t('resetPasswordPage.err_empty') },
              { type: 'email', message: t('resetPasswordPage.err_invalid_email') }
            ] }
          >
            <Input
              type='email'
              size={ fontSize }
              prefix={ <MailOutlined className='site-form-item-icon' /> }
              placeholder={ t('resetPasswordPage.email') }
            />
          </Form.Item>

          <Form.Item { ...tailLayout }>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              size={ fontSize }
            >
              { t('resetPasswordPage.reset') }
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default PasswordRequestPage