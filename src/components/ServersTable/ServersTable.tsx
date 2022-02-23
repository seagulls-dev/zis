import React from 'react'
import {Badge, Button, Descriptions, Space, Table, Tag} from 'antd'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import {ServerDetails, ServerService} from 'pages/server/models'
import {useTranslation} from 'react-i18next'
import {AppState} from 'common/models'
import {useSelector} from 'react-redux'
import {GlobalOutlined} from '@ant-design/icons'
import './ServersTable.scss'
import ServerAddressesForm from 'components/ServerAddressesForm/ServerAddressesForm'

const {Item} = Descriptions

const generateServices = (name: string) => {
	switch (name) {
		case 'bacula_client':
			return (
				<Tag color='magenta' key='magenta'>
					Bacula client
				</Tag>
			)
		case 'bacula_server':
			return (
				<Tag color='red' key='red'>
					Bacila server
				</Tag>
			)
		case 'dns':
			return (
				<Tag color='volcano' key='volcano' icon={<GlobalOutlined />}>
					DNS
				</Tag>
			)
		case 'ftp':
			return (
				<Tag color='orange' key='orange'>
					FTP
				</Tag>
			)
		case 'mail':
			return (
				<Tag color='gold' key='gold'>
					Mail
				</Tag>
			)
		case 'mysql':
			return (
				<Tag color='green' key='green'>
					MySQL
				</Tag>
			)
		case 'proxmox':
			return (
				<Tag color='cyan' key='cyan'>
					Proxmox
				</Tag>
			)
		case 'web_ep':
			return (
				<Tag color='blue' key='blue'>
					Web EP
				</Tag>
			)
		case 'web_php':
			return (
				<Tag color='geekblue' key='geekblue'>
					Web PHP
				</Tag>
			)
		case 'web_ruby':
			return (
				<Tag color='purple' key='purple'>
					WEB Ruby
				</Tag>
			)
	}
}

interface Props {
	setDataToUpdate: (record: ServerDetails) => void
	onDelete: (id: number) => void
	showModal: () => void
	servers?: ServerDetails[]
}

const ServersTable = (props: Props) => {
	const {t} = useTranslation()
	const {physicalservers} = useSelector((state: AppState) => state.inventoryphysicalserver)
	const {customers} = useSelector((state: AppState) => state.customer)
	const {ips} = useSelector((state: AppState) => state.ip)

	const serverDescription = (record: ServerDetails) => {
		return (
			<Descriptions title='Server Info' bordered className='serverDescription'>
				<Item label={t('serversPage.server_type')}>{record.server_type}</Item>
				<Item label={t('serversPage.vps_type')}>{record.vps_type}</Item>
				<Item label={t('serversPage.server_backup')}>{record.server_backup}</Item>
				<Item span={3} label='Status'>
					{' '}
					<Badge status='processing' text='Running' />{' '}
				</Item>

				<Item label={t('serversPage.zis_management')}>{record.zis_management}</Item>
				<Item span={2} label={t('serversPage.customer_management')}>
					{record.customer_management}
				</Item>
				<Item label={t('serversPage.server_monitoring')}>{record.server_monitoring}</Item>
				<Item span={2} label={t('serversPage.comment')}>
					{record.comment}
				</Item>

				<Item span={3} label={t('serversPage.server_addresses')}>
					<ServerAddressesForm server={record} />
				</Item>
			</Descriptions>
		)
	}

	const columns = [
		{title: 'ID', dataIndex: 'id', key: 'id', sorter: (a, b) => a.id - b.id},
		{title: t('serversPage.hostname'), dataIndex: 'hostname', key: 'hostname', sorter: (a, b) => a.id - b.id},
		{
			title: t('serversPage.primary_ip_id'),
			dataIndex: 'primary_ip_id',
			key: 'primary_ip_id',
			sorter: (a, b) => a.id - b.id,
			render: (text: number) => ips?.find((ip) => ip.id === text)?.address,
		},
		{
			title: t('serversPage.customer_id'),
			dataIndex: 'customer_id',
			key: 'customer_id',
			sorter: (a, b) => a.id - b.id,
			render: (text: number) => customers?.find((c) => c.id === text)?.company?.name,
		},
		{
			title: t('serversPage.location_id'),
			dataIndex: 'location_id',
			key: 'location_id',
			sorter: (a, b) => a.id - b.id,
			render: (text: number) => physicalservers?.find((loc) => loc.id === text)?.ident,
		},
		{
			title: 'Services',
			dataIndex: 'services',
			key: 'services',
			render: (text: ServerService[], record: ServerDetails) => record.services?.map((v) => generateServices(v.name)),
		},
		{
			title: 'Action',
			key: 'action',
			dataIndex: 'action',
			width: 140,
			render: (text: string, record) => (
				<Space size='middle'>
					<Button
						size='small'
						onClick={() => {
							props.setDataToUpdate(record)
							props.showModal()
						}}>
						{t('ipSubnetPage.update')}
					</Button>
					<PopConfirmZis onConfirm={() => props.onDelete(record.id)} placement='leftTop'>
						<Button type='primary' danger size='small'>
							{t('ipSubnetPage.delete')}
						</Button>
					</PopConfirmZis>
				</Space>
			),
		},
	]

	return (
		<Table<ServerDetails>
			columns={columns}
			dataSource={props.servers}
			scroll={{x: 'max-content'}}
			rowKey='id'
			// defaultExpandedRowKeys={ [ 1 ] }
			className='ServersTable'
			expandedRowRender={serverDescription}
		/>
	)
}

export default ServersTable
