import React, {useEffect, useState} from 'react'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import {Button, TreeSelect, Input, Form, message} from 'antd'
import {useSelector, useDispatch} from 'react-redux'
import {AppState} from 'common/models'
import {GroupDetails} from './models'
import {useTranslation} from 'react-i18next'
import createUserGroup from './actions/createGroup'
import {CustomerDetails} from '../billing/customer/models'
import {protectedApiClient} from '../../helpers/api'

interface PropsTypes {
	parent_id?: string
  customer?: CustomerDetails
	close: () => void
}

const CreateGroupPage = (props: PropsTypes) => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const {isLoading, data} = useSelector((state: AppState) => state.group)
	// const { customers } = useSelector((state: AppState) => state.customer)
	const {parent_id, close, customer} = props
	const [parentId, setParentId] = useState('')
  const [groupName, setGroupName] = useState<string>('')

	useEffect(() => {
		// !data && props.history.replace('/user-group')
		parent_id ? setParentId(parent_id) : setParentId('1')
    parent_id && protectedApiClient
      .get<GroupDetails>(`/user/user-group/get?id=${parent_id}&expand=customer,users,roles`)
      .then((response) => {
        setGroupName(response.data.title)
      })
		// dispatch(getCustomers('company'))
		// eslint-disable-next-line
	}, [parent_id])

	const createGroup = (values) => {
		const customer_id = localStorage.getItem('customerId')
		if (customer_id && customer)
			dispatch(
				createUserGroup(
					{
						title: values.title,
						parent_id: parentId,
						customer_id: parseInt(customer_id),
					},
          customer,
					(isSuccess) => {
						if (isSuccess) {
							message.success(t('userGroupPage.created'))
							close()
						}
					},
				),
			)
	}

	return (
		<Form onFinish={createGroup}>
			<Form.Item label={t('userGroupPage.parent_group')} {...formItemLayout}>
        {groupName}
			</Form.Item>
			<Form.Item
				{...formItemLayout}
				label={t('userGroupPage.group_name')}
				name='title'
				rules={[{required: true, message: 'Please input New category title!'}]}
				hasFeedback>
				<Input placeholder={t('userGroupPage.group_name')} />
			</Form.Item>

			<Form.Item {...tailLayout}>
				<Button type='primary' loading={isLoading} htmlType='submit'>
					{t('userGroupPage.create')}{' '}
				</Button>
			</Form.Item>
		</Form>
	)
}

export default CreateGroupPage
