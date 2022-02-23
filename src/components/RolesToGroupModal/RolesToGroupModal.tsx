import React, { useState, useEffect } from 'react'
import Modal from 'antd/lib/modal/Modal'
import { UserAddOutlined } from '@ant-design/icons'
import { Select, Button, Row, Col, Divider } from 'antd'
import { useTranslation } from 'react-i18next'
import { GroupDetails } from 'pages/group/models'
import './RoleToGroupModal.scss'

interface Props {
  data?: any
  isVisible: boolean
  hideRoleModal?: () => void
  editRoleInGroup?: (values: string[]) => void
  destroyOnClose?: boolean
  selectedTree?: GroupDetails
  parentRoles?: string[]
}

const { Option } = Select

const RoleToGroupModal = (
  {
    data,
    isVisible,
    hideRoleModal,
    editRoleInGroup,
    destroyOnClose,
    selectedTree,
    parentRoles
  }: Props) => {
  const { t } = useTranslation()
  const [selectedNewRoles, setNewRoles] = useState<string[]>()

  const onChange = (val) => {
    setNewRoles(val)
  }

  useEffect(() => {
    setNewRoles(selectedTree?.roles)
  }, [selectedTree])

  return (
    <Modal
      destroyOnClose={destroyOnClose}
      style={{ top: 20 }}
      title={<><UserAddOutlined /> {t('userGroupPage.edit_roles')}</>}
      visible={isVisible}
      onCancel={hideRoleModal}
      className='RoleToGroupModal'
      footer={[
        <Button
          key='submit'
          type='primary'
          onClick={() => editRoleInGroup && selectedNewRoles && editRoleInGroup(selectedNewRoles)}
        >
          {t('userGroupPage.add')}
        </Button>,
      ]}
    >
      <Row gutter={[16, 16]}>
        <Col flex='100px'>Group:</Col>
        <Col flex='1 1 360px'>
          {selectedTree?.title}
        </Col>
        <Col flex={1}></Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col flex='100px'>Roles:</Col>
        <Col flex='1 1 260px'>
          <Select
            mode='multiple'
            placeholder='Please select'
            style={{ width: '100%' }}
            onChange={onChange}
            defaultValue={selectedTree?.roles}
          >
            {
              parentRoles && parentRoles.map(
                (item: string) => <Option key={item} value={item}>{item}</Option>
              )
            }
          </Select>
        </Col>
        <Col flex={1}></Col>
      </Row>

    </Modal>
  )
}

export default RoleToGroupModal
