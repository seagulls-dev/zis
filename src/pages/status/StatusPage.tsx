import React, {useEffect, useState} from 'react'
import {Card, Col, Progress, Row, Space, Statistic} from 'antd'
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons'
import {protectedApiClient} from 'helpers/api'
import axios from 'axios'

interface Services {
	name: string //'service-billing',
	version: string //'3.0.0.1',
	status: string //'OK',
	migration: string //'failed'|'m200523_100749'
}

const StatusPage = () => {
	const [services, setServices] = useState<Services[]>()

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		protectedApiClient
			.get<Services[]>(`/ping/index`, {cancelToken: source.token})
			.then((response) => setServices(response.data))
			.catch((error) => {
				if (axios.isCancel(error)) {
					// console.log( "cancelled", error )
				} else {
					throw error
				}
			})
		return () => source.cancel()
	}, [])

	return (
		<Row gutter={[16, 16]}>
			{services?.map((service, i: number) => (
				<Col flex={2} key={i}>
					<Card>
						<Statistic
							title={
								<Space size='large'>
									{service.version}
									<span style={{fontSize: 10}}>migration: {service.migration}</span>
								</Space>
							}
							value={service.name}
							precision={2}
							// valueStyle={ { color: '#cf1322' } }
							prefix={
								service.status === 'OK' ? (
									<ArrowUpOutlined style={{color: '#52c41a'}} />
								) : (
									<ArrowDownOutlined style={{color: '#cf1322'}} />
								)
							}
							suffix={
								<Progress
									type='circle'
									width={50}
									percent={100}
									status={service.status === 'OK' ? 'success' : 'exception'}
									format={() => <>{service.status}</>}
								/>
							}
						/>
					</Card>
				</Col>
			))}
		</Row>
	)
}

export default StatusPage
