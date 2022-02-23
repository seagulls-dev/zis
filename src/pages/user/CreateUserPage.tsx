import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { message } from 'antd'
import { AppState } from 'common/models'
import createUser from './actions/createUser'
import UserCreateForm from 'components/UserCreateForm/UserCreateForm'
import { Store } from 'antd/lib/form/interface'
import getCustomers from 'pages/billing/customer/actions/getCustomers'

const CreateUserPage = (props: any) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isSaving } = useSelector((state: AppState) => state.user)
  const { customers } = useSelector((state: AppState) => state.customer)
  const { self } = useSelector((state: AppState) => state.auth)

  useEffect(() => {
    self?.is_zcom && dispatch(getCustomers('company'))
    //eslint-disable-next-line
  }, [])

  const handleFinish = (values: Store): void => {

    dispatch(createUser({
      username: values.username,
      email: values.email,
      password: values.password,
      password_repeat: values.password_repeat,
      name: values.name,
      surname: values.surname,
      is_unix: Number(values.is_unix),
      phone: values.phone,
      avatar: values.avatar,
      note: values.note,
      customer_id: self?.is_zcom ? values.customer_id : self?.customer_id
    }, (isSuccess) => {
      isSuccess && message.success(<span dangerouslySetInnerHTML={{ __html: t('createUserPage.created', { username: values.username }) }}></span>)
      props.onClose()
    })
    )
  }

  return (
    <UserCreateForm
      isSaving={isSaving}
      customers={customers}
      handleFinish={handleFinish}
    />
  )
}
export default CreateUserPage
