import React, {useEffect, useState} from 'react'
import { Card, Button, message, Modal } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from 'common/models'
import { useTranslation } from 'react-i18next'
import getAllUsers from './actions/getAllUsers'
import deleteUser from 'pages/user/actions/deleteUser'
import UsersTable from 'components/UsersTable/UsersTable'
import { UserAddOutlined } from '@ant-design/icons'
import {isAllowedHelper, isNavAllowHelper, isZcomNavHelper} from 'helpers/authHelpers'
import getCustomers from "../billing/customer/actions/getCustomers";
import { AiOutlineUserAdd } from 'react-icons/ai'
import CreateUserPage from "./CreateUserPage"
import { RouteComponentProps } from 'react-router'

const UsersPage = (props: RouteComponentProps) => {
  const { isLoading, users } = useSelector((state: AppState) => state.user)
  const { self, menu_roles } = useSelector((state: AppState) => state.auth)
  const { rolesPermissions } = useSelector((state: AppState) => state.role)
  const { customers } = useSelector((state : AppState) => state.customer)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [modalCreateVisible, setModalCreateVisible] = useState<boolean>(false)


  useEffect(() => {
    dispatch(getAllUsers(cb => { }, 'roles'))
    isAllowedHelper(['zcom-root','zcom-admin'], self) && dispatch(getCustomers('company,nextInvoice'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateAll = () => {
    dispatch(getAllUsers(cb => { },'roles,company'))
  }

  const onDelete = (id: number) => {
    dispatch(deleteUser(id, onSuccess => onSuccess && message.warning(t('usersPage.user_deleted'))))
  }

  const handleBtnCreate = () => {
    if ((isNavAllowHelper(self, menu_roles? menu_roles['page_users_create_button'] : [])) || self?.roles.includes('zcom-root'))
      setModalCreateVisible(true)
    else
      message.warning(t('usersPage.create_user_role'))
  }

  return (
    <Card
      title={t('usersPage.title')}
      className='UsersPage'
      extra={
        self && rolesPermissions && (isNavAllowHelper(self, menu_roles? menu_roles['page_users_create_button'] : []) || isZcomNavHelper(self)) &&
          <Button type='primary' onClick={handleBtnCreate}>
            <UserAddOutlined />{t('usersPage.create_user')}
          </Button>
        }
    >
      <UsersTable isLoading={isLoading} data={users} onDelete={onDelete} customers={customers} {...props}/>
      <Modal
        style={{ top: 20 }}
        width={600}
        title={<>
          <AiOutlineUserAdd /> &nbsp;
          {t('createUserPage.title')}
        </>}
        visible={modalCreateVisible}
        onCancel={()=>setModalCreateVisible(false)}
        footer={null}
        confirmLoading={true}
      >
        <CreateUserPage onClose={()=>setModalCreateVisible(false)} />
      </Modal>

    </Card>
  )
}

export default UsersPage
