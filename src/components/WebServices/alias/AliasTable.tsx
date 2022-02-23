import React from 'react'
import {Button, Table, Space} from 'antd'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import {useTranslation} from 'react-i18next'
import {AliasDetails} from 'pages/webservice/alias/models'

interface Props {
	setDataToUpdate: (values: AliasDetails) => void
	showModal: () => void
	onDelete: (id: number) => void
}

export const AliasesPageTable = (props: Props) => {
	const {t} = useTranslation()
	// const {al} = useSelector((state: AppState) => state.webservice)

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: t('webservice.alias.name'),
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: t('webservice.alias.action'),
			key: 'action',
			render: (text, record) => (
				<Space size='middle'>
					<Button
						type='primary'
						size='small'
						onClick={() => {
							props.setDataToUpdate && props.setDataToUpdate(record)
							props.showModal()
						}}>
						{t('customerPage.edit')}
					</Button>
					<PopConfirmZis onConfirm={() => props.onDelete(record.id)}>
						<Button type='primary' danger size='small'>
							{t('usersPage.delete')}
						</Button>
					</PopConfirmZis>
				</Space>
			),
		},
	]

	return (
		<Table<AliasDetails>
			columns={columns}
			// dataSource={AliasesPage}
			rowKey='id'
		/>
	)
}
