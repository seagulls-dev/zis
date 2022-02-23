import React, { useState, useEffect } from 'react'
import {Space, Table, Button, message} from 'antd'
import { UserDetails } from 'pages/user/models'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import { useTranslation } from 'react-i18next'
import './MembersTable.scss'
import {DeleteTwoTone} from '@ant-design/icons'
import updateUserInGroup from 'pages/group/actions/updateUserInGroup'
import { useDispatch } from 'react-redux'
import {CustomerDetails} from '../../pages/billing/customer/models'

interface Props {
  data?: UserDetails[]
  // isLoading: boolean
  groupId?: number
  initTree: () => void
  customer?: CustomerDetails
}

const MembersTable = (props: Props) => {

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { data, groupId, customer, initTree } = props
  const [dataSource, setDataSource] = useState<UserDetails[]>()

  const sortByProperty = property => {
    return function(a,b){
      if(a[property] > b[property])
        return 1;
      else if(a[property] < b[property])
        return -1;
      return 0;
    }
  }

  useEffect(()=> {
    setDataSource(data?.sort(sortByProperty('title')))
  },[data])

  const onDeleteUserInGroup = (id: number) => {
    const userIds = data?.map(item => item.id)
    const updatedIds = userIds && userIds.filter(item => item !== id)
    const updatedData = dataSource?.filter(item => item.id !== id)
    updatedData && setDataSource([...updatedData])
    groupId && updatedIds && customer && dispatch(
      updateUserInGroup({ id: groupId, users_id: updatedIds }, customer,
        isSuccess => {
          // initTree()
          if (isSuccess) {
            message.success(t('userGroupPage.deleted'))

          } else {
            message.error('Error update User group')
          }
        }
      )
    )
  }

  const columns = [
    {
      title: t('usersPage.username'),
      key: 'title',
      dataIndex: 'title'
    },
    {
      title: t('userGroupPage.remove'),
      key: 'remove',
      dataIndex: 'remove',
      render: (text: string, record: UserDetails) => (
        <Space size='middle'>
          <PopConfirmZis
            onConfirm={() => onDeleteUserInGroup(record.id)}
          >
            <Button type='text' danger size='small' icon={<DeleteTwoTone twoToneColor='red' />} />
          </PopConfirmZis >
        </Space>
      ),
    }
  ]

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      showHeader={true}
      rowKey='id'
      // loading={isLoading}
      pagination={false}
      className='MembersTable'
    />
  )
}

export default MembersTable
