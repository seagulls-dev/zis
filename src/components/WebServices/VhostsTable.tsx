import React, {useEffect} from 'react'
import {AppState} from 'common/models'
import {useSelector, useDispatch} from 'react-redux'
import {VhostDetails, AliasDetail} from 'pages/webservice/vhost/models'
import {useTranslation} from 'react-i18next'
import {Space, Button, Table} from 'antd'
import {ColumnsType} from 'antd/es/table'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import {DeleteTwoTone, EditTwoTone} from '@ant-design/icons'
import getCustomers from 'pages/billing/customer/actions/getCustomers'
import getServers from 'pages/server/actions/getServers'

interface TableProps {
	setDataToUpdate?: (values: VhostDetails) => void
	showModal: () => void
	onDelete: (id: number) => void
}

const VhostsTable = (props: TableProps) => {
	const {t} = useTranslation()
	const dispatch = useDispatch()

	const {vhost} = useSelector((state: AppState) => state.webservice)
	const {servers} = useSelector((state: AppState) => state.server)
	const {customers} = useSelector((state: AppState) => state.customer)

	useEffect(() => {
		dispatch(getCustomers())
		dispatch(getServers())
		dispatch(getCustomers('company'))
		//eslint-disable-next-line
	}, [])

	const columns: ColumnsType<VhostDetails> = [
		{
			title: t('webservice.vhost.hostname'),
			dataIndex: 'hostname',
			key: 'hostname',
		},
		{
			title: t('webservice.vhost.server'),
			dataIndex: 'server_id',
			key: 'server_id',
			render: (text: number) => servers?.find((s) => s.id === text)?.hostname,
		},
		{
			title: t('webservice.vhost.customer'),
			dataIndex: 'customer_id',
			key: 'customer_id',
			render: (text: number) => customers?.find((c) => c.id === text)?.company?.name,
		},
		{
			title: t('webservice.vhost.web_server'),
			dataIndex: 'web_server',
			key: 'web_server',
		},
		{
			title: t('webservice.vhost.database_id'),
			dataIndex: 'database_id',
			key: 'database_id',
		},
		{
			title: t('webservice.vhost.mail_server_id'),
			dataIndex: 'mail_server_id',
			key: 'mail_server_id',
		},
		{
			title: t('webservice.vhost.ssl'),
			dataIndex: 'ssl',
			key: 'ssl',
		},
		{
			title: t('webservice.vhost.force_redirect'),
			dataIndex: 'force_redirect',
			key: 'force_redirect',
		},
		{
			title: t('webservice.vhost.aliases'),
			dataIndex: 'aliases',
			key: 'aliases',
			render: (text: AliasDetail[]) => text?.map((alias, i) => <div key={i}>{alias.hostname}</div>),
		},
		{
			title: t('webservice.vhost.action'),
			key: 'action',
			width: 100,
			render: (_text, record) => (
				<Space>
					<PopConfirmZis onConfirm={() => props.onDelete(record.id)}>
						<Button type='text' icon={<DeleteTwoTone twoToneColor='red' />} />
					</PopConfirmZis>

					<Button
						type='text'
						icon={<EditTwoTone twoToneColor='green' />}
						onClick={() => {
							props.setDataToUpdate && props.setDataToUpdate(record)
							props.showModal()
						}}
					/>
				</Space>
			),
		},
	]

	const expandableColumns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: t('webservice.vhost.protocol'),
			dataIndex: 'protocol',
			key: 'protocol',
		},
		{
			title: t('webservice.vhost.backend'),
			dataIndex: 'backend',
			key: 'backend',
		},
		{
			title: t('webservice.vhost.certificate_id'),
			dataIndex: 'certificate_id',
			key: 'certificate_id',
		},
		{
			title: t('webservice.vhost.daemon'),
			dataIndex: 'daemon',
			key: 'daemon',
		},
		{
			title: t('webservice.vhost.custom_config'),
			dataIndex: 'custom_config',
			key: 'custom_config',
		},
		{
			title: t('webservice.vhost.fpm'),
			dataIndex: 'fpm',
			key: 'fpm',
		},
		{
			title: t('webservice.vhost.settings'),
			dataIndex: 'settings',
			key: 'settings',
			render: (text: any[]) => text?.map((setting, i) => <div key={i}>{setting}</div>),
		},
	]

	const expandedRowRender = ({
		id,
		protocol,
		backend,
		certificate_id,
		custom_config,
		daemon,
		fpm,
		aliases,
	}: VhostDetails) => {
		const nestedData = [{id, protocol, backend, certificate_id, daemon, custom_config, fpm, aliases}]
		return (
			<Table columns={expandableColumns} dataSource={nestedData} pagination={false} rowKey='id' footer={() => <></>} />
		)
	}

	return (
		<Table
			columns={columns}
			loading={vhost.isLoading}
			dataSource={vhost.vhosts}
			rowKey='certificate_id'
			expandable={{expandedRowRender}}
		/>
	)
}

export default VhostsTable
