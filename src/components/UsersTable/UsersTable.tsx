import React, { useState, useEffect } from 'react'
import { Space, Table, AutoComplete, Button, Tag, Row, Col, Form, Avatar, Modal, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import {UserDetails, UserState} from 'pages/user/models'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import './UsersTable.scss'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { CustomerDetails } from "pages/billing/customer/models"
import {DeleteTwoTone, EditTwoTone} from '@ant-design/icons'
import History from "../History/History";
import UpdateUserPage from 'pages/user/UpdateUserPage'
import {isNavAllowHelper, isZcomNavHelper} from 'helpers/authHelpers'
import { useSelector } from 'react-redux'
import { AppState } from 'common/models'

interface Props {
  data?: UserDetails[]
  isLoading: boolean
  onDelete: (id: number) => void
  showActionColumn?: boolean
  customers?: CustomerDetails[],
  update?:() => void
}

const UsersTable = (props: Props) => {
  const { t } = useTranslation()
  const { data, isLoading, onDelete, showActionColumn, customers } = props
  const [dataSource, setDataSource] = useState<UserDetails[]>()
  const [username, setUsername] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [surname, setSurname] = useState<string>()
  const [ident, setIdent] = useState<string>()
  const [modalEditVisible, setModalEditVisible] = useState<boolean>(false)
  const [id,setId] = useState<number>()
  const [historyModal, setHistoryModal] = useState<boolean>(false)
  const [visibleUser, setVisibleUser] = useState<UserDetails[]>()
  const [totalData, setTotalData] = useState<UserDetails[]>()
  const [visible, setVisible] = useState<boolean>(false)
  const { self, menu_roles } = useSelector((state: AppState) => state.auth)
  const { settings } = useSelector((state : AppState) => state.setting)

  const [dateFormat, setDateFormat] = useState<string>()
  const [pageSize, setPageSize] = useState<string>()

  useEffect(() => {
    if (data) {
      let useData = [];
      data.map(item => {
        if (item.deleted_at === 0) {
          // @ts-ignore
          useData.push(item)
        }
      })
      // @ts-ignore
      setVisibleUser(useData)
      setDataSource(visibleUser)
      setTotalData(visibleUser)
    }
    const format = settings?.find(item => item.name === 'date_format')
    setDateFormat(format?.value)
    const size = settings?.find(item => item.name === 'grid_page_size')
    setPageSize(size?.value)
  }, [data])

  const FilterByUsernameInput = (
      dataSource && <AutoComplete
      placeholder={t('usersPage.username')}
      options={dataSource.map(v => ({ 'value': v.username }))}
      style={{ width: 150 }}
      value={username}
      onChange={(currValue) => {
        setUsername(currValue)
        const filteredData = totalData?.filter((entry) => (
          entry.username.toLowerCase().includes(currValue.toLowerCase())
        ))
        setDataSource(filteredData)
      }}
      filterOption={(inputValue, option) =>
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    />
  )
  const FilterByEmailInput = (
      dataSource && <AutoComplete
      placeholder='E-mail'
      options={dataSource.map(v => ({ 'value': v.email }))}
      style={{ width: 150 }}
      value={email}
      onChange={(currValue) => {
        setEmail(currValue)
        const filteredData = totalData?.filter((entry) => (
          entry.email.toLowerCase().includes(currValue.toLowerCase())
        ))
        setDataSource(filteredData)
      }}
      filterOption={(inputValue, option) =>
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    />
  )
  const FilterBySurnameInput = dataSource && (
      <Input
          placeholder={t('usersPage.surname')}
          style={{ width: 100 }}
          value={surname}
          onChange={(current) => {
            const value = current.target.value
            setSurname(value)
            const filteredData = totalData?.filter((entry) => (
                entry.surname.toLowerCase().includes(value.toLowerCase())
            ))
            setDataSource(filteredData)
          }}
      />
  )

  const FilterByCustomer = data && (
    <Input
      placeholder={t('usersPage.ident')}
      style={{width: 120}}
      value={ident}
      onChange={current => {
        const value = current.target.value
        setIdent(value)
        const filtered = data?.filter(item => customers?.filter(c => c.ident?.toLowerCase().includes(value.toLowerCase())).some(i => i.id === item.customer_id))
        setDataSource(filtered)
      }}
    />
  )

  const handleClose = () => {
    setModalEditVisible(false)
    // if (props.update) props.update()
  }

  const handleBtnEdit = (_id: number) => {
    setId(_id);
    setModalEditVisible(true)
  }

  const handleBtnDelete = (_id: number) => {
    onDelete(_id)
  }

  const showAllUser = (status) => {
    if (status) {
      setDataSource(data)
      setTotalData(data)
    } else {
      setDataSource(visibleUser)
      setTotalData(visibleUser)
    }
    setVisible(status)
  }

  const columns = [
    {
      title: FilterByUsernameInput,
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: FilterByEmailInput,
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: t('usersPage.name'),
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: FilterBySurnameInput,
      dataIndex: 'surname',
      key: 'surname'
    },
    {
      title: t('usersPage.phone'),
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: FilterByCustomer,
      dataIndex: 'customer_id',
      key: 'customer_id',
      render: (customer_id: number) =>{
        const customer = customers?.find(item => item.id === customer_id)
        return (
          customer?.ident
        )
      }
    },
    {
      title:<div onClick={() =>showAllUser(!visible)}><label htmlFor="showDeleted">Deleted</label> <input type="checkbox" id='showDeleted' className='pt-2' /></div>,
      key: 'action',
      dataIndex: 'action',
      width: showActionColumn || showActionColumn === undefined ? 140 : 0,
      className: showActionColumn || showActionColumn === undefined ? 'show' : 'hide',
      render: (text: string, record: UserDetails) => (
        <Space size='middle'>
          {
            (isNavAllowHelper(self, menu_roles? menu_roles['page_users_create_button'] : []) || isZcomNavHelper(self)) && (
              <>
                <Button type='text' size='small' onClick={()=>handleBtnEdit(record.id)} icon={<EditTwoTone twoToneColor='green' />} />

                <PopConfirmZis
                  onConfirm={() => handleBtnDelete(record.id)}
                >
                  <Button type='text' danger size='small' disabled={!!record.deleted_at} icon={<DeleteTwoTone twoToneColor='red' />} />
                </PopConfirmZis >
              </>
            )

          }


        </Space>
      ),
    }
  ]

  const expandedRowRender = (record: UserDetails) => {
    const customer = customers?.find(item => item.id === record.customer_id)
    const roles = record?.roles?.map((i,idx) => <Tag key={idx} color='orange'>{i}</Tag>)
    return (
      <Row>
        <Col span='12'>
          <Form>
            <Form.Item>
              {
                record.avatar && <Avatar src={record.avatar} alt='Avatar' />
              }
              {
                !record.avatar && <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              }
            </Form.Item>
            <Form.Item
              label='ID'
              className='label-bold'
            >
              <span>{record.id}</span>
            </Form.Item>
            <Form.Item
              label='Username'
              className='label-bold'
            >
              <span>{record.username}</span>
            </Form.Item>
            <Form.Item
              label='Email'
              className='label-bold'
            >
              <span>{record.email}</span>
            </Form.Item>
            <Form.Item
              label='Name'
              className='label-bold'
            >
              <span>{record.name}</span>
            </Form.Item>
            <Form.Item
              label='Surname'
              className='label-bold'
            >
              <span>{record.surname}</span>
            </Form.Item>
            <Form.Item
              label='Phone'
              className='label-bold'
            >
              <span>{record.phone}</span>
            </Form.Item>
            <Form.Item
              label='Customer'
              className='label-bold'
            >
              <span>{customer?.ident}</span>
            </Form.Item>
            <Form.Item
              label='Unix'
              className='label-bold'
            >
              <span>{record.is_unix}</span>
            </Form.Item>
            <Form.Item
              label='Note'
              className='label-bold'
            >
              <span>{record.note}</span>
            </Form.Item>
          </Form>
        </Col>
        <Col span='12'>
          <Form>
            <Form.Item
              label='Roles'
              className='label-bold'
            >
              {roles}
            </Form.Item>
            <Form.Item
              label='Created'
              className='label-bold'
            >
              <span>{moment.unix(record.created_at).format(dateFormat)}</span>
            </Form.Item>
            <Form.Item
              label='Updated'
              className='label-bold'
            >
              <span>{record.updated_at && moment.unix(record.updated_at).format(dateFormat)}</span>
            </Form.Item>
            <Form.Item
              label='Deleted'
              className='label-bold'
            >
              <span>{record.deleted_at && moment.unix(record.deleted_at).format(dateFormat)}</span>
            </Form.Item>
            <Form.Item>
              <Button color='lightdark' size='small' onClick={ () => {
                setId(record.id);
                setHistoryModal(true);
              } }>{ t('usersPage.history') }</Button>
              <Button type='primary' size='small' onClick={ () => {

              } } style={{marginLeft: '1rem'}}>{ t('usersPage.send_pwd') }</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    )
  }

  return (
    <>
      {
        pageSize &&
        <Table<UserDetails>
            dataSource={dataSource}
            columns={columns}
            rowKey={record => `${record.id}`}
            showHeader={true}
            expandable={{ expandedRowRender }}
            className='UsersTable'
            loading={isLoading}
            pagination={{defaultPageSize: parseInt(pageSize)}}
        />
      }
      <Modal
        destroyOnClose
        width='100%'
        style={{maxHeight: '100vh'}}
        title={t('usersPage.history')}
        visible={historyModal}
        onCancel={() => setHistoryModal(false)}
        footer={null}>
        <History url='/helper/get-model-history?service=User&model=User' id={Number(id)} historyName='user' />
      </Modal>
      <Modal
        style={{ top: 20 }}
        width={600}
        title={<>
          <AiOutlineUserAdd /> &nbsp;
          {t('updateUserPage.title')}
        </>}
        visible={modalEditVisible}
        onCancel={handleClose}
        footer={null}
        confirmLoading={true}
      >
        <UpdateUserPage id={id} onClose={handleClose} />
      </Modal>
    </>
  )

}

export default UsersTable
