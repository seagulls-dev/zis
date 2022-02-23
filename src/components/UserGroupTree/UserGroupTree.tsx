import React, { useState, useEffect } from 'react'
import { Tree, Tooltip, Badge } from 'antd'
import { UserOutlined } from '@ant-design/icons/lib/icons'
import { EventDataNode, DataNode } from 'antd/lib/tree'
import { FaTheaterMasks } from 'react-icons/fa'

import './UserGroupTree.scss'

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
  setRoleModalVisible?: (param: boolean) => any
  onGroupRightSelect?: ({event, node}) => void
}

const UserGroupTree = ({ data, onGroupSelect, selectedKeys, setRoleModalVisible, onGroupRightSelect }: Props) => {

  const [mappedData, setMappedData] = useState<any[]>()
  const [expandedKeys, setExpandedKeys] = useState([''])
  const [checkKeys, setCheckKyes] = useState([''])
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true)

  useEffect(() => {
    data && setMappedData(Array.of(convert(data)))
    // eslint-disable-next-line
  }, [data])

  const handleExpand = (expandedKeys, {expanded: bool, node}) => {
    setExpandedKeys(expandedKeys);
    setCheckKyes(expandedKeys)
    setAutoExpandParent(false);
  }

  const getKeys = () => {
    return checkKeys
  }

  const expKeys = ['']
  const convert = (branch) => {
    const hierarchy = {
      id: branch.id,
      key: `${branch.key}`,
      children: [],
      users: branch.users,
      customer: branch.customer,
      company: branch.company,
      roles: branch.roles,
      parent_id: branch.parent_id,
      title: <div className='node'>

        <div>
          {
            branch.parent_id === undefined && (<UserOutlined />)
          }
          {branch.parent_id !== 2 && branch.title}

          {branch.parent_id === 2 && branch.customer?.ident}
        </div>


        <span className='actions'>

          <span className='userCount'>
            {
              branch.users && branch.users.length > 0 &&
              <>
                <UserOutlined />
                &nbsp;{branch.users.length}
              </>
            }
          </span>

          {
            branch.roles && branch.roles.length > 0 ?
              <span className='roleCount'>

                <Tooltip title={branch.roles.map((i: string) => <div key={`${branch.id}-${i}-role`} dangerouslySetInnerHTML={{ __html: i }} />)}>
                  <span>
                    <FaTheaterMasks />
                    &nbsp;{branch.roles.length}
                  </span>
                </Tooltip>
              </span> :
              <span className='roleCount'><FaTheaterMasks />
              </span>
          }
        </span>
      </div >
    }
    if (selectedKeys && !selectedKeys.includes(branch.key)) expKeys.push(`${branch.key}`)
    // expKeys.push(`${branch.key}`)
    setExpandedKeys(expKeys)
    if (branch.children !== undefined) {
      if (selectedKeys === branch.key && branch.children.some(c => c.parent_id === undefined)) {
        branch.children = branch.children.map(c => ({...c, key: selectedKeys + '_' + c.id}))
        hierarchy.children = branch.children.map((subranch) => convert(subranch))
      }
      else {
        if (branch.children.length === 0) branch.children = hierarchy.children.map(c => c)
        hierarchy.children = branch.children.map((subranch) => convert(subranch))
      }
    }
    if (branch.children?.length === 0 && branch.users.length > 0) {
      hierarchy.children = branch.users.map(user => convert(user))
    }
    return hierarchy
  }

  return (
    <Tree
      onExpand={handleExpand}
      autoExpandParent={autoExpandParent}
      expandedKeys={getKeys()}
      showLine={{showLeafIcon : false}}
      showIcon={true}
      treeData={mappedData}
      onSelect={onGroupSelect}
      onRightClick={onGroupRightSelect}
      className='UserGroupTree'
      blockNode
      selectedKeys={[`${selectedKeys}`]}
    />
  )
}

export default UserGroupTree
