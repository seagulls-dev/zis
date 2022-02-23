import React from 'react'
import { Card, Form, Input, Button, message } from 'antd'
import { LockOutlined, SyncOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Store } from 'antd/lib/form/interface'
import { useDispatch, useSelector } from 'react-redux'
import changePasswordAction from './actions/changePassword'
import { RouteComponentProps } from 'react-router'
import { AppState } from 'common/models'
import { formItemLayout, tailLayout } from 'helpers/layoutHelpers'
import './PasswordChangePage.scss'

type AllProps = RouteComponentProps<{}>


const PasswordChangePage = (props: AllProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { fontSize } = useSelector((state: AppState) => state.font)

  const onFinish = (values: Store): void => {
    dispatch(
      changePasswordAction(
        {
          password_old: values.password_old,
          password: values.password,
          password_repeat: values.password_repeat
        },
        (isSuccess) => {
          isSuccess ?
            message.success(t('changePasswordPage.changed')) :
            message.error('Change password error')
        }))
  }

  return (
    <div className='changePassword'>
      <Card
        title={ <><SyncOutlined /> { t('changePasswordPage.change_password') }</> }
        style={ { width: 500 } }
      >
        <Form
          name='change_password'
          className='change-password-form'
          initialValues={ { remember: true } }
          onFinish={ onFinish }
          { ...formItemLayout }
        >
          <Form.Item
            name='password_old'
            rules={ [ { required: true, message: t('changePasswordPage.err_old_password') } ] }
            label={ t('changePasswordPage.old_password') }
          >
            <Input
              type='text'
              prefix={ <LockOutlined className='site-form-item-icon' /> }
              size={ fontSize }
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={ [
              { required: true, message: t('changePasswordPage.err_new_password') },
              { min: 5, message: t('changePasswordPage.err_password_length', { count: 5 }) },
              // { pattern: mediumRegex, message: t('changePasswordPage.err_password_mediumRegex') }
            ] }
            label={ t('changePasswordPage.new_password') }
          >
            <Input
              type='password'
              prefix={ <LockOutlined className='site-form-item-icon' /> }
              size={ fontSize }
            />
          </Form.Item>

          <Form.Item
            name='password_repeat'
            label={ t('changePasswordPage.repeat_new_password') }
            rules={ [
              {
                required: true,
                message: t('changePasswordPage.err_repeat_password'),
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(t('changePasswordPage.err_repeat_not_match'))
                },
              }),
            ] }
          >
            <Input
              type='password'
              prefix={ <LockOutlined className='site-form-item-icon' /> }
              size={ fontSize }
              autoComplete='off'
            />
          </Form.Item>

          <Form.Item { ...tailLayout }>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              size={ fontSize }
            >
              { t('changePasswordPage.change') }
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div >
  )
}

export default PasswordChangePage