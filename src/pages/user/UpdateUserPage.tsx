import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router';
import { useTranslation } from 'react-i18next'
import {message, Space, Spin} from 'antd'
import updateUser from './actions/updateUser'
import { Store } from 'antd/lib/form/interface'
import UserUpdateForm from 'components/UserUpdateForm/UserUpdateForm'
import { AppState } from 'common/models'
import getCustomers from 'pages/billing/customer/actions/getCustomers'
import getUser from './actions/getUser'
import getSelf from '../login/actions/getSelf'
import {Link} from "react-router-dom";
import profileUser from "./actions/profileUser";

const UpdateUserPage = (props: any) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { id, onClose } = props
  const { customers } = useSelector((state: AppState) => state.customer)
  const { isSaving, user } = useSelector((state: AppState) => state.user)
  const { self } = useSelector((state: AppState) => state.auth)
  const [ selfStatus, setSelfStatus ] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    setLoading(true)
    id && dispatch(getUser(Number(id)))
    self?.is_zcom && dispatch(getCustomers('company'))
    //eslint-disable-next-line
  }, [id])

  useEffect(() => {
    if (window.location.href.includes('profile')) {
      setSelfStatus(true)
    } else {
      setSelfStatus(false)
    }
    setLoading(false)
  },[user])

  const handleFinish = (values: Store): void => {
    if (selfStatus) {
      dispatch(profileUser({
        email: values.email, name: values.name, surname: values.surname, phone: values.phone, avatar: values.avatarImage, note: values.note
      }, isSuccess => {
        isSuccess &&
        message.success(<span dangerouslySetInnerHTML={{ __html: t('updateUserPage.updated', { username: values.username }) }} />)
        dispatch(getSelf('roles'))
      }))
    } else {
      dispatch(updateUser({
        id: id, email: values.email, name: values.name, surname: values.surname, phone: values.phone, avatar: values.avatarImage, note: values.note
      }, isSuccess => {
        isSuccess &&
        message.success(<span dangerouslySetInnerHTML={{ __html: t('updateUserPage.updated', { username: values.username }) }} />)
        dispatch(getSelf('roles'))
        onClose()
      }))
    }
  }

  return (
    (isSaving || loading) ? <Spin /> :
      <>
        {
          !isSaving && !loading && user?.id !== 0 &&
          <UserUpdateForm
              customers={customers}
              user={selfStatus ? self : user}
              handleFinish={handleFinish}
          />
        }
        {
          isSaving && !loading && (user?.id === 0 || !user) &&
          <Space style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{textAlign: 'center'}}>
                  <h1 style={{color: '#ff4d4f'}}>{t('not_found')}</h1>
                  <div>
                      <Link to='/users'>
                        {t('back')}
                      </Link>
                  </div>
              </div>
          </Space>
        }
      </>

  )
}
export default withRouter(UpdateUserPage)
