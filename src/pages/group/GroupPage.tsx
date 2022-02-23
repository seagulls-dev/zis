import React, {useEffect, useState} from 'react'
import {Card, message, Button, Row, Col, Modal} from 'antd'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from 'common/models'
import getUserGroups from './actions/getAll'
import {RouteComponentProps} from 'react-router-dom'
import {PlusCircleOutlined, GroupOutlined, UserSwitchOutlined} from '@ant-design/icons'
import UserGroupTree from 'components/UserGroupTree/UserGroupTree'
import UserToGroupModal from 'components/UserToGroupModal/UserToGroupModal'
import updateUserInGroup from './actions/updateUserInGroup'
import RoleToGroupModal from 'components/RolesToGroupModal/RolesToGroupModal'
import updateRoleInGroup from './actions/updateRoleInGroup'
import getGroupByParent from './actions/getGroupByParent'
import getGroup from './actions/getGroup'
import getRootGroup from './actions/getRootGroup'
import {GroupDetails} from './models'
import getRoles from 'pages/role/actions/getRoles'
import MembersTable from 'components/MembersTable/MembersTable'
import RolesTable from 'components/RolesTable/RolesTable'
import deleteGroup from './actions/deleteGroup'
import {DeleteTwoTone} from '@ant-design/icons'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import CreateGroupPage from './CreateGroupPage'
import {UsergroupAddOutlined} from '@ant-design/icons/lib/icons'

const UserGroupPage = (props: RouteComponentProps) => {
	const {t} = useTranslation()
	const dispatch = useDispatch()

	const [isTreeSelected, setTreeSelected] = useState<boolean>(false)      //flag for tree selected or not

	const [selectedTree, setSelectedTree] = useState<GroupDetails>()                  //selected tree node ( group detail )

	const [isModalVisible, setModalVisible] = useState(false)               //add user to the group modal flag
	const [isRoleModalVisible, setRoleModalVisible] = useState(false)       //add role to the group modal flag

	const [selectedGroupId, setSelectedGroupId] = useState<number>()                  //selected tree group's id
	const [parentRoles, setParentRoles] = useState<string[]>([])              //roles strings of selected group tree

	const {isLoading, data} = useSelector((state: AppState) => state.group)
	const {roles} = useSelector((state: AppState) => state.role)
	const {self} = useSelector((state: AppState) => state.auth)

	const showModal = () => setModalVisible(true)
	const hideModal = () => setModalVisible(false)

	const showRoleModal = () => {
		setRoleModalVisible(true)
		data && getRolesByGroupId(data)
		const parent_id = selectedTree?.parent_id
		const selected = rolesByGroupId.find((item) => item.id === parent_id)
		selected && selected.roles && setParentRoles(selected.roles)
	}
	const hideRoleModal = () => setRoleModalVisible(false)

	const [modalCreateVisible, setModalCreateVisible] = useState<boolean>(false)          //create group page modal dialog flag

	let rolesByGroupId: any = []
	const getRolesByGroupId = (items: GroupDetails) => {
		if (items && items.children) {
			rolesByGroupId.push({id: items.id, roles: items.roles})
			for (const child of items.children) {
				getRolesByGroupId(child)
			}
		}
	}

	const initialize = () => {
		// self?.id && dispatch(getUserGroups(self?.id, (isSuccess) => !isSuccess && message.error('Error load User groups!')))
    // dispatch(getGroupByParent(1, isSuccess => !isSuccess && message.error('Error load User groups!')))
    dispatch(getRootGroup((isSuccess, id) => {
      isSuccess && id && dispatch(getGroupByParent(id, isSuccess => !isSuccess && message.error('Error load User groups!')))
      !isSuccess && message.error('Error load User groups!')
    }))

		dispatch(getRoles((isSuccess) => !isSuccess && message.error('Error load roles!')))
		if (selectedTree) setSelectedTree(undefined)
		// eslint-disable-next-line
	}

	useEffect(() => {
		initialize()
		return () => {
			//eslint-disable-next-line
			rolesByGroupId = []
		}
	}, [])

	const onGroupSelect = (selectedKeys, info) => {
		setTreeSelected(selectedKeys.length >= 0)
		setSelectedTree(info.node)
		setSelectedGroupId(info.node.id)
    if (info.node.users !== undefined && info.node.users && info.node.users.length > 0 ) {
      dispatch(getGroupByParent(info.node.id, isSuccess => !isSuccess && message.error('Error load User groups!')))
    }
	}

	const onGroupRightSelect = (info) => {
    if (info.node.users !== undefined && (info.node.users && info.node.users.length > 0)) {
      dispatch(getGroupByParent(info.node.id, isSuccess => !isSuccess && message.error('Error load User groups!')))
    }
  }

	//add or update user to group
	const editUserInGroup = (selectedNewUsers: number[], selectedNewGroup: string) => {
		selectedNewUsers && selectedTree?.customer &&
			dispatch(
				updateUserInGroup(
					{
						id: parseInt(selectedNewGroup),
						users_id: selectedNewUsers,
					},
          selectedTree?.customer,
					(isSuccess) => {
						if (isSuccess) {
              message.success(t('userGroupPage.edited_ok'))
              setModalVisible(false)
						}
						else {
              message.error('Error load User groups')
            }
					},
				),
			)
	}

	const editRoleInGroup = (values: string[]) => {
		selectedTree?.customer && dispatch(
			updateRoleInGroup(
				{
					id: Number(selectedTree?.id),
					roles: values,
				},
        selectedTree?.customer,
				(isSuccess) => {
					isSuccess && hideRoleModal()
				},
			),
		)
	}
	// eslint-disable-next-line
	const getSelectedUsersFromTree = (arr, itemId) =>
		// eslint-disable-next-line
		arr.reduce((a, item) => {
			if (a) return a
			if (item.id === itemId) return item['users']
			if (item['children']) return getSelectedUsersFromTree(item['children'], itemId)
		}, null)

	const onGroupDelete = () => {
		const id = selectedTree?.id
		const length = selectedTree?.users?.length
		if (length && length > 0) {
			message.error('You can remove only empty usergroup')
		} else {
			id &&
				dispatch(
					deleteGroup({id}, (isSuccess) => {
						if (isSuccess) {
							message.success(t('userGroupPage.deleted'))
							setTreeSelected(false)
						} else {
							message.error('Error update User group')
						}
					}),
				)
		}
	}

	const openCreateGroupModal = () => {
		setModalCreateVisible(true)
		selectedTree?.customer?.id && localStorage.setItem('customerId', (selectedTree?.customer?.id).toString())
	}


	return (
		<div className='UserGroupPage'>
			<Row gutter={16}>
				<Col xs={10}>
					<Card
						// loading={isLoading}
						title={
							<>
								<GroupOutlined /> {t('userGroupPage.title')}
							</>
						}
						extra={
							<>
								{/*<Link to={`/user-group/create/${selectedTree?.parent_id}`}>*/}
								{/*  */}
								{/*</Link>*/}
								<Button
									type='primary'
									icon={<PlusCircleOutlined />}
									disabled={!isTreeSelected || selectedTree?.parent_id === undefined || selectedTree.parent_id === 1}
									onClick={openCreateGroupModal}>
									{t('userGroupPage.create')}
								</Button>
								<PopConfirmZis onConfirm={onGroupDelete}>
									<Button
										type='primary'
										ghost
										danger
										icon={<DeleteTwoTone twoToneColor='red' />}
										disabled={!isTreeSelected || selectedTree?.parent_id === undefined}>
										{t('userGroupPage.delete_group')}
									</Button>
								</PopConfirmZis>
							</>
						}>
						{data && (
							<UserGroupTree
								data={data}
								onGroupSelect={onGroupSelect}
                onGroupRightSelect={onGroupRightSelect}
								selectedKeys={selectedTree ? `${selectedTree?.key}` : ''}
								setRoleModalVisible={setRoleModalVisible}
							/>
						)}
					</Card>
				</Col>

				<Col span={14} xs={14}>
					<Card
						// loading={isLoading}
						title={
							<>
								<UserSwitchOutlined /> {t('usersPage.members')}
							</>
						}
						extra={
							<Button
								type='primary'
								onClick={showModal}
								icon={<UserSwitchOutlined />}
								disabled={!isTreeSelected || selectedTree?.parent_id === undefined}>
								{t('userGroupPage.add_member')}
							</Button>
						}
						bodyStyle={{overflow: 'auto', height: '385px'}}
						style={{marginBottom: '10px'}}>
						{
							<MembersTable
								data={isTreeSelected ? selectedTree?.users : undefined}
								// isLoading={isLoading} //isTreeSelected
								groupId={selectedGroupId}
                customer={isTreeSelected ? selectedTree?.customer : undefined}
                initTree={() => setSelectedTree(undefined)}
							/>
						}
					</Card>
					<Card
						// loading={isLoading}
						title={
							<>
								<UserSwitchOutlined /> {t('usersPage.roles')}
							</>
						}
						extra={
							<Button
								type='primary'
								onClick={showRoleModal}
								icon={<UserSwitchOutlined />}
								disabled={!isTreeSelected || selectedTree?.parent_id === undefined}>
								{t('userGroupPage.add_role')}
							</Button>
						}
						bodyStyle={{overflow: 'auto', height: '385px'}}>
						{
							<RolesTable
								data={isTreeSelected ? selectedTree?.roles : undefined}
								// isLoading={isLoading} //isTreeSelected
								groupId={selectedGroupId}
                initTree={() => setSelectedTree(undefined)}
								treeData={selectedTree}
							/>
						}
					</Card>
				</Col>
			</Row>
			{selectedTree && (
				<UserToGroupModal
					isVisible={isModalVisible}
					groups={data}
					hideModal={hideModal}
					editUserInGroup={editUserInGroup}
					selectedGroupId={selectedTree?.id}
					preselectedUsers={selectedTree?.users}
					selectedTreeCustomerId={selectedTree?.customer?.id}
				/>
			)}
			{selectedTree && (
				<RoleToGroupModal
					destroyOnClose={true}
					data={roles}
					isVisible={isRoleModalVisible}
					hideRoleModal={hideRoleModal}
					editRoleInGroup={editRoleInGroup}
					selectedTree={selectedTree}
					parentRoles={parentRoles}
				/>
			)}
			<Modal
				style={{top: 20}}
				width={600}
				title={
					<>
						<UsergroupAddOutlined /> {t('userGroupPage.create')}
					</>
				}
				visible={modalCreateVisible}
				onCancel={() => setModalCreateVisible(false)}
				footer={null}
				confirmLoading={true}>
				<CreateGroupPage
					parent_id={selectedTree?.id?.toString()}
          customer={selectedTree?.customer}
					close={() => {
						setModalCreateVisible(false)
						// initialize()
					}}
				/>
			</Modal>
		</div>
	)
}

export default UserGroupPage
