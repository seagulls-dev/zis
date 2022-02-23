import React from 'react'
import {Button, Table, Space} from 'antd'
import {DeleteTwoTone, EditTwoTone, CheckCircleTwoTone, StopTwoTone} from '@ant-design/icons/lib/icons'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import {useSelector} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {AppState} from 'common/models'
import ToggleCertificates from './ToggleCertificates'
import {CertificateDetails, CertificateVhost} from 'pages/certificate/models'

interface TableProps {
	setDataToUpdate: (values: CertificateDetails) => void
	showModal: () => void
	onDelete: (id: number) => void
}
export const CertificateTable = ({setDataToUpdate, showModal, onDelete}: TableProps) => {
	const {t} = useTranslation()
	const {certificates} = useSelector((state: AppState) => state.certificate)

	const childrenColumns = [
		{
			title: t('certificatesPage.key'),
			ellipsis: true,
			dataIndex: 'key',
			key: 'key',
			width: '10%',
		},
		{
			title: t('certificatesPage.crt'),
			dataIndex: 'crt',
			key: 'crt',
			width: '12%',
			ellipsis: true,
		},
		{
			title: t('certificatesPage.ca_crt'),
			dataIndex: 'ca_crt',
			key: 'ca_crt',
			width: '12%',
			ellipsis: true,
		},
		{
			title: t('certificatesPage.comment'),
			dataIndex: 'comment',
			key: 'comment',
		},
	]
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: '4%',
		},
		{
			title: t('certificatesPage.name'),
			dataIndex: 'name',
			key: 'name',
			width: '10%',
		},
		{
			title: t('certificatesPage.challenge'),
			dataIndex: 'challenge',
			key: 'challenge',
			width: '10%',
		},
		{
			title: t('certificatesPage.auto_prolong'),
			dataIndex: 'auto_prolong',
			key: 'auto_prolong',
			width: '7%',
			render: (text: number) =>
				text && !isNaN(text) ? <CheckCircleTwoTone twoToneColor='green' /> : <StopTwoTone twoToneColor='red' />,
		},
		{
			title: t('certificatesPage.vhosts'),
			dataIndex: 'servers',
			key: 'servers',
			render: (text: CertificateVhost[], record: CertificateDetails) => (
				<ToggleCertificates usedOnVhosts={text} certificateId={record.id} />
			),
		},
		{
			title: t('certificatesPage.action'),
			key: 'action',
			width: 96,
			render: (text, record: CertificateDetails) => (
				<Space>
					<PopConfirmZis onConfirm={() => onDelete(record.id)}>
						<Button type='text' icon={<DeleteTwoTone twoToneColor='red' />} />
					</PopConfirmZis>

					<Button
						type='text'
						icon={<EditTwoTone twoToneColor='green' />}
						onClick={() => {
							setDataToUpdate(record)
							showModal()
						}}
					/>
				</Space>
			),
		},
	]

	const nestedTable = (props) => (
		<Table
			{...props}
			scroll
			columns={childrenColumns}
			dataSource={certificates?.map((cert) => ({
				key: cert.key,
				crt: cert.crt,
				ca_crt: cert.ca_crt,
				comment: cert.comment,
			}))}
		/>
	)

	return (
		<Table<CertificateDetails>
			rowKey='id'
			columns={columns}
			expandable={{
				expandedRowRender: nestedTable,
			}}
			dataSource={certificates?.map((cert) => ({
				id: cert.id,
				name: cert.name,
				challenge: cert.challenge,
				servers: cert.servers,
				auto_prolong: cert.auto_prolong,
			}))}
		/>
	)
}
export default CertificateTable
