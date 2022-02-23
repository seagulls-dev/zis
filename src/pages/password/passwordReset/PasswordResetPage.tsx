import React, {useEffect, useState} from 'react'
import {Card, Form, Input, Button} from 'antd'
import {formItemLayout} from 'helpers/layoutHelpers'
import {Store} from 'antd/lib/form/interface'
import {LockOutlined} from '@ant-design/icons'
import {useTranslation} from 'react-i18next'
import {RouteComponentProps, Redirect, useHistory} from 'react-router'
import queryString, {ParsedQuery} from 'query-string'
import {passwordReset} from './actions/passwordReset'

const PasswordResetPage = (props: RouteComponentProps) => {
    const history = useHistory()

    const {t} = useTranslation()
    const [resetToken, setResetToken] = useState<string | string[] | null | undefined>()
    const [email, setEmail] = useState<string | string[] | null | undefined>()

    const onFinish = (values: Store): void => {
        passwordReset({
                token: resetToken,
                password: values.password,
                password_repeat: values.password_repeat
            }, (isSuccess: boolean) => {
                if (isSuccess) {
                    history.push('/login')
                }
            }
        )
    }

    useEffect(() => {
        const url = props.location.search
        const params: ParsedQuery = queryString.parse(url)
        if (params) {
            setResetToken(params.token)
            setEmail(params.email)
        }
        // eslint-disable-next-line
    }, [])

    return (

        <Card
            title={`${t('resetPasswordPage.reset_password_for')}`}
            style={{width: 500}}

            className='PasswordResetPage'>
            <Form
                name='reset_password'
                className='reset-password-form'
                onFinish={onFinish}
                {...formItemLayout}
            >
                <Form.Item name='token' noStyle>
                    <Input type='hidden'/>
                </Form.Item>

                <Form.Item
                    name='password'
                    rules={[
                        {required: true, message: t('changePasswordPage.err_new_password')},
                        {min: 5, message: t('changePasswordPage.err_password_length', {count: 5})},
                        // { pattern: mediumRegex, message: t('changePasswordPage.err_password_mediumRegex') }
                    ]}
                    label={t('changePasswordPage.new_password')}
                >
                    <Input type='password' prefix={<LockOutlined className='site-form-item-icon'/>}/>
                </Form.Item>

                <Form.Item
                    name='password_repeat'
                    label={t('changePasswordPage.repeat_new_password')}
                    rules={[
                        {
                            required: true,
                            message: t('changePasswordPage.err_repeat_password'),
                        },
                        ({getFieldValue}) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve()
                                }
                                return Promise.reject(t('changePasswordPage.err_repeat_not_match'))
                            },
                        }),
                    ]}
                >
                    <Input type='password' prefix={<LockOutlined className='site-form-item-icon'/>}/>
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' className='login-form-button'>
                        {t('changePasswordPage.change')}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default PasswordResetPage
