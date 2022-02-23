import React, {useEffect, useState, SetStateAction} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import getHistory from './actions/getHistory'
import {AppState} from 'common/models'
import {PageHeader, Skeleton, Table, Input, DatePicker} from 'antd'
import {ColumnsType} from 'antd/es/table'
import {HistoryDetails} from './models'
import moment from 'moment'
import getAllUsers from 'pages/user/actions/getAllUsers'
import JSONPretty from 'react-json-pretty'
import 'react-json-pretty/themes/1337.css'
import {SearchOutlined, CalendarOutlined} from '@ant-design/icons'
import {makeArrayUniq} from 'helpers/arrayHelpers'

const {RangePicker} = DatePicker

const renderLogData = (text: string) => <JSONPretty id='json-pretty' data={text}></JSONPretty>

const renderSubTitle = (historylog: HistoryDetails[], filtered?: HistoryDetails[]) => (
	<>{`History ${historylog ? `(${filtered?.length || historylog.length})` : ''}`}</>
)

interface Props {
	url: string
	id: number
	historyName: string
}

const History = (props: Props) => {
	const dispatch = useDispatch()

	const [filteredHistory, setFilteredHistory] = useState<HistoryDetails[]>()
	const [searchValue, setSearchValue] = useState<string>()
	const [searchDateValues, setDateSearchValues] = useState<string[] | null>()

	const historylog = useSelector(
		(state: AppState) => state.historylog.historyByName[`${props.historyName}-${props.id}`],
	)
	const {isLoading} = useSelector((state: AppState) => state.historylog)
	const {users} = useSelector((state: AppState) => state.user)

	useEffect(() => {
		const filtered = historylog?.filter((log) => Object.values(JSON.parse(log.context)).includes(searchValue))
		setFilteredHistory(filtered)
	}, [searchValue])

	useEffect(() => {
		if (searchDateValues?.length) {
			const filtered = historylog?.filter((log) =>
				moment
					.unix(log.created_at)
					.isBetween(moment(searchDateValues[0]).startOf('day'), moment(searchDateValues[1]).endOf('day'), null, '[]'),
			)
			setFilteredHistory(filtered)
		} else {
			setDateSearchValues(null)
		}
	}, [searchDateValues])

	useEffect(() => {
		dispatch(getHistory(props.url, props.id, props.historyName))
		dispatch(getAllUsers())
		//eslint-disable-next-line
	}, [])

	const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)

	const columns: ColumnsType<HistoryDetails> = [
		{
			title: 'When',
			dataIndex: 'created_at',
			key: 'created_at',
			render: (text) => moment.unix(text).format('LLL'),
			filterDropdown: (
				<RangePicker
					autoFocus
					size='small'
					onChange={(dates, dateStrings) => (dates ? setDateSearchValues(dateStrings) : setFilteredHistory(historylog))}
				/>
			),
			onFilter: (value, record) => record.created_at === value,
			filterIcon: () => <CalendarOutlined style={{color: searchDateValues ? '#1890ff' : undefined}} />,
		},
		{
			title: 'What',
			dataIndex: 'operation',
			key: 'operation',
			filters: makeArrayUniq(historylog, 'operation')?.map((h) => ({text: h.operation, value: h.operation})),
			onFilter: (value, record) => record.operation === value,
		},
		{
			title: 'Who',
			dataIndex: 'user_id',
			key: 'user_id',
			render: (text) => {
				const user = users?.find((user) => user.id === text)
				return (
					<span title={user?.username}>
						{user?.name} {user?.surname}
					</span>
				)
			},
		},
		{
			title: 'IP',
			dataIndex: 'remote_ip',
			key: 'remote_ip',
		},
	]

	return (
		<PageHeader
			subTitle={renderSubTitle(historylog, filteredHistory)}
			extra={
				<Input
					allowClear
					onChange={onSearch}
					placeholder='Search in content'
					value={searchValue}
					suffix={<SearchOutlined />}
				/>
			}>
			{isLoading ? (
				<Skeleton />
			) : (
				<Table<HistoryDetails>
					columns={columns}
					dataSource={filteredHistory || historylog}
					pagination={false}
					rowKey={(record) => record.id}
					size='small'
					expandable={{
						expandedRowRender: (record) => renderLogData(record.context),
					}}
				/>
			)}
		</PageHeader>
	)
}

export default History
