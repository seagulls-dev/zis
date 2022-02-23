import React, {useState, useEffect} from 'react'
import Modal from 'antd/lib/modal/Modal'
import {UserAddOutlined} from '@ant-design/icons'
import {Select, Button, Row, Col} from 'antd'
import {useTranslation} from 'react-i18next'
import {GroupDetails} from 'pages/group/models'
import {UserDetails} from 'pages/user/models'
import {useSelector, useDispatch} from 'react-redux'
import {AppState} from 'common/models'
import getAllUsers from 'pages/user/actions/getAllUsers'

interface Props {
	isVisible: boolean
	hideModal?: () => void
	groups?: GroupDetails
	selectedGroupId?: number
	preselectedUsers?: UserDetails[]
	editUserInGroup: (selectedNewUsers: number[], selectedNewGroup: string) => void
	selectedTreeCustomerId?: number
}

const {Option} = Select

const UserToGroupModal = ({
	isVisible,
	hideModal,
	groups,
	selectedGroupId,
	preselectedUsers,
	editUserInGroup,
	selectedTreeCustomerId,
}: Props) => {
	const dispatch = useDispatch()
	const {t} = useTranslation()
	const {isLoading, users} = useSelector((state: AppState) => state.user)
	// const [mappedData, setMappedData] = useState<any[]>()
	const [selectedGroup, setSelectedGroup] = useState('') //selected group number id
	const [selectedNewUsers, setNewUsers] = useState<number[]>() //selected user's id number array
	// const [selectedNewCustomerId, setSelectedNewCustomerId] = useState()

	useEffect(() => {
		dispatch(getAllUsers())
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		selectedGroupId ? setSelectedGroup(`${selectedGroupId}`) : setSelectedGroup('1')
		// eslint-disable-next-line
	}, [selectedGroupId])

	useEffect(() => {
		preselectedUsers && setNewUsers(preselectedUsers.map((item) => item.id))
		// eslint-disable-next-line
	}, [preselectedUsers])

	// const convert = (branch) => {
	//   const hierarchy = {
	//     id: branch.id,
	//     title: branch.title,
	//     value: `${branch.id}`,
	//     key: branch.id,
	//     children: [],
	//     users: []
	//   }
	//   if (branch.children !== undefined)
	//     hierarchy.children = branch.children.map((subranch) => convert(subranch))
	//   return hierarchy
	// }

	// useEffect(() => {
	//   // set group tree data for tree-select component
	//   groups && setMappedData(Array.of(convert(groups)))
	//   // eslint-disable-next-line
	// }, [groups])

	const onUserSelect = (val: number, opt: {}) => {
		selectedNewUsers ? setNewUsers([...selectedNewUsers, val]) : setNewUsers([val])
	}

	const onUserDeselect = (item: number) => {
		selectedNewUsers && setNewUsers(selectedNewUsers.filter((i) => i !== item))
	}

	return (
		<Modal
			style={{top: 20}}
			title={
				<>
					<UserAddOutlined /> {t('userGroupPage.edit_users')}
				</>
			}
			visible={isVisible}
			onCancel={hideModal}
			footer={[
				<Button
					key='submit'
					type='primary'
					onClick={() => selectedNewUsers && editUserInGroup(selectedNewUsers, selectedGroup)}>
					{t('userGroupPage.add')}
				</Button>,
			]}>
			<Row gutter={[16, 16]}>
				<Col flex='100px'>User:</Col>
				<Col flex='1 1 260px'>
					<Select
						mode='multiple'
						placeholder='Please select'
						style={{width: '100%'}}
						loading={isLoading}
						onSelect={onUserSelect}
						onDeselect={onUserDeselect}
						value={selectedNewUsers}
						showSearch
						allowClear
						optionFilterProp='children'>
						{users &&
							users.map(
								(item) =>
									item.customer_id === selectedTreeCustomerId && (
										<Option key={item.id} value={item.id}>
											{item.title}
										</Option>
									),
							)}
					</Select>
				</Col>

				<Col flex={1}></Col>
			</Row>
		</Modal>
	)
}

export default UserToGroupModal
