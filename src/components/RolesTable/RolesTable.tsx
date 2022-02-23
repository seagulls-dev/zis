import React, {useState, useEffect} from 'react'
import {Space, Table, Button, message} from 'antd'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import {useTranslation} from 'react-i18next'
import './RolesTable.scss'
import {DeleteTwoTone} from '@ant-design/icons'
import updateRoleInGroup from 'pages/group/actions/updateRoleInGroup'
import {useDispatch, useSelector} from 'react-redux'
import getUserRoles from 'pages/user/actions/getUserRoles'
import {AppState} from 'common/models'
import {GroupDetails} from 'pages/group/models'

interface Props {
	data?: string[]
	// isLoading: boolean
	groupId?: number
	initTree?: () => void
	treeData?: GroupDetails
}

const RolesTable = (props: Props) => {
	const {t} = useTranslation()
	const {data, groupId, treeData, initTree} = props
	const [dataSource, setDataSource] = useState<any>()
	const dispatch = useDispatch()
	const {user_roles} = useSelector((state: AppState) => state.user)

	const sortByProperty = (property) => {
		return function (a, b) {
			if (a[property] > b[property]) return 1
			else if (a[property] < b[property]) return -1
			return 0
		}
	}

	useEffect(() => {
		if (treeData?.parent_id === undefined && treeData?.id) {
			treeData?.id && dispatch(getUserRoles(treeData?.id))
			const temp: any = []
			user_roles?.map((item: string, idx: number) => {
				temp.push({key: '' + idx, role_name: item})
			})
			setDataSource(temp)
		} else {
			const temp: any = []
			data?.map((item: string, idx: number) => {
				temp.push({
					key: '' + idx,
					role_name: item,
				})
			})
			setDataSource(temp.sort(sortByProperty('role_name')))
		}

		//eslint-disable-next-line
	}, [treeData, user_roles])

	const onDeleteRoleInGroup = (key: string) => {
		const updated = dataSource?.filter((item) => item.key !== key)
		const updatedRoles = updated?.filter((item) => item.key !== key)

		groupId && treeData?.customer &&
			dispatch(
				updateRoleInGroup(
					{
						id: groupId,
						roles: updatedRoles,
					},
          treeData?.customer,
					(isSuccess) => {
						if (isSuccess) {
							message.success(t('userGroupPage.remove'))
							setDataSource([...updatedRoles])

						} else {
							message.error('Error update User group')
						}
					},
				),
			)
	}

	const columns = [
		{
			title: t('userGroupPage.role_name'),
			dataIndex: 'role_name',
			key: 'role_name',
		},
		{
			title: t('userGroupPage.user_group'),
			dataIndex: 'user_group',
			key: 'user_group',
		},
		{
			title: t('userGroupPage.remove'),
			dataIndex: 'remove',
			key: 'remove',
			render: (text: string, record: any) => (
				<Space size='middle'>
					<PopConfirmZis onConfirm={() => onDeleteRoleInGroup(record.key)}>
						<Button type='text' danger size='small' icon={<DeleteTwoTone twoToneColor='red' />} />
					</PopConfirmZis>
				</Space>
			),
		},
	]

	return (
		<Table
			dataSource={dataSource}
			columns={columns}
			showHeader={true}
			rowKey='key'
			// loading={isLoading}
			pagination={false}
			className='RolesTable'
		/>
	)
}

export default RolesTable
