import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Button from 'antd-button-color'
import {Form, Input, InputNumber, message, Tabs} from 'antd'
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import {AppState} from 'common/models'
import {useTranslation} from 'react-i18next'
import {CreateDnsZoneParams, DnsZoneDetails} from 'pages/dns/zone/models'
import DnsZoneArchivedDropdown from './DnsZoneArchivedDropdown'
import {protectedApiClient} from 'helpers/api'
import createDnsZone from 'pages/dns/zone/actions/createDnsZone'
import addDnsRecord from 'pages/dns/zone/actions/addDnsRecord'

interface Props {
	setZoneModalVisible: (visible: boolean) => void
}
const {TabPane} = Tabs
const {Item} = Form

const DnsZoneForm = (props: Props) => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [archived, setArchived] = useState<DnsZoneDetails>()
	const [selectedService, setSelectedService] = useState<string>('1')
	const {dnsservices} = useSelector((state: AppState) => state.dnsservice)

	const onDnsZoneCreate = (values: CreateDnsZoneParams) => {
		dispatch(
			createDnsZone({...values}, (isOk) => {
				if (isOk) {
					message.success(t('dnsPage.zone_created'))
					props.setZoneModalVisible(false)
				}
			}),
		)
	}

	const onDnsZoneCreateFromArchive = () => {
		const baseParams = {
			service_id: Number(selectedService),
			domain: archived!.domain,
		}
		const ns = archived?.records.filter((r) => r.type === 'NS')
		selectedService &&
			archived &&
			ns &&
			dispatch(
				createDnsZone(
					{
						...baseParams,
						ns1: ns[0].content,
						ns2: ns[1].content,
					},
					(isOk) => {
						if (isOk) {
							message.success(t('dnsPage.zone_created'))
							archived.records.map(
								(r) =>
									r.type !== 'SOA' &&
									dispatch(
										addDnsRecord(
											{
												...baseParams,
												name: r.name,
												type: r.type,
												content: r.content.replace(/['"]+/g, ''),
												ttl: r.ttl,
											},
											(isOk) => {
												if (isOk) {
													message.success(t('dnsPage.record_created', {record_type: r.type}))
												}
											},
										),
									),
							)
							// props.setZoneModalVisible(false)
						}
					},
				),
			)
	}

	const onHistorySearch = (value: string) => {
		protectedApiClient
			.get<DnsZoneDetails>(`/dns/zone/archived?service_id=${selectedService}&domain=${value}`)
			.then((response) => {
				setArchived(response.data)
			})
			.catch((error) => console.log('error fetching archive'))
	}

	return (
		<Tabs className='DnsZonePage_tabs' tabPosition='left' onChange={(key) => setSelectedService(key)}>
			{dnsservices?.map((s) => (
				<TabPane tab={s.driver} key={s.id}>
					<Form {...formItemLayout} onFinish={onDnsZoneCreate} initialValues={{service_id: Number(selectedService)}}>
						<Item name='service_id' style={{display: 'none'}}>
							<InputNumber type='hidden' />
						</Item>
						<Item label={t('dnsPage.domain')} name='domain'>
							<Input.Search onSearch={onHistorySearch} />
						</Item>
						<Item label={t('dnsPage.ns1')} name='ns1'>
							<Input placeholder='ns1.zcom.com' />
						</Item>
						<Item label={t('dnsPage.ns2')} name='ns2'>
							<Input placeholder='ns2.zcom.com' />
						</Item>

						<Item {...tailLayout}>
							<Button type='primary' size='large' htmlType='submit'>
								{t('dnsPage.dns_zone_button')}
							</Button>
						</Item>
						<DnsZoneArchivedDropdown
							serviceId={Number(selectedService)}
							archived={archived}
							onDnsZoneCreateFromArchive={onDnsZoneCreateFromArchive}
						/>
					</Form>
				</TabPane>
			))}
		</Tabs>
	)
}

export default DnsZoneForm
