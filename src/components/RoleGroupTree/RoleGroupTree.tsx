import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Tree, Badge, Tooltip, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { EditOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import { EventDataNode, DataNode } from 'antd/lib/tree'
import { FaTheaterMasks } from 'react-icons/fa'
import deleteGroup from 'pages/group/actions/deleteGroup'
import getUserGroups from 'pages/group/actions/getAll'
import {AppState} from "../../common/models";

interface Props {
  data?: {}
  onGroupSelect?: (selectedKeys: React.ReactText[], info: {
    event: 'select'
    selected: boolean
    node: EventDataNode
    selectedNodes: DataNode[]
    nativeEvent: MouseEvent
  }) => void
  selectedKeys?: string
}

const RoleGroupTree = ({ data, onGroupSelect, selectedKeys }: Props) => {

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const {self} = useSelector((state: AppState) => state.auth)
  const [mappedData, setMappedData] = useState<DataNode[] | undefined>()
  const [expandedKeys, setExpandedKeys] = useState([''])

  useEffect(() => {
    data && setMappedData(Array.of(convert(data)))
    // eslint-disable-next-line
  }, [data])


  const onGroupDelete = (id: number) => {
    dispatch(
      deleteGroup({ id },
        isSuccess => {
          if (isSuccess) {
            message.success(t('userGroupPage.deleted'))
            self?.id && dispatch(
              getUserGroups(self?.id, isSuccess => !isSuccess && message.error('Error load User groups')
              ))
          } else {
            message.error('Error update User group')
          }
        }
      )
    )
  }


  const expKeys = ['']
  const convert = (branch) => {
    const hierarchy = {
      id: branch.id,
      title: <div className='node'>
        {branch.title}

        <span className='actions'>

          {
            branch.roles && branch.roles.length > 0 && <span className='userCount'><FaTheaterMasks /><Badge count={branch.roles.length} style={{ backgroundColor: '#52c41a' }} /></span>
          }

          <Tooltip title={t('userGroupPage.edit')}>
            <Link to={`/user-group/edit/${branch.id}`}><EditOutlined /></Link>
          </Tooltip>

          <PopConfirmZis onConfirm={() => onGroupDelete(branch.id)} >
            <Tooltip title={t('userGroupPage.remove')}>
              <Link to={`/user-group/remove/${branch.id}`}><MinusCircleOutlined /></Link>
            </Tooltip>
          </PopConfirmZis>

          <Tooltip title={t('userGroupPage.add_child')}>
            <Link to={`/user-group/create/${branch.id}`}><PlusCircleOutlined /></Link>
          </Tooltip>
        </span>
      </div>,
      key: `${branch.key}`,
      children: [],
      roles: branch.roles,
      customer: branch.customer,
      company: branch.company
    }
    expKeys.push(`${branch.id}`)
    setExpandedKeys(expKeys)
    if (branch.children !== undefined)
      hierarchy.children = branch.children.map((subranch) => convert(subranch))
    return hierarchy
  }

  return (
    <Tree
      expandedKeys={expandedKeys}
      showLine={true}
      showIcon={false}
      treeData={mappedData}
      onSelect={onGroupSelect}
      className='UserGroupTree'
      blockNode
      selectedKeys={[`${selectedKeys}`]}
    />
  )
}

export default RoleGroupTree
