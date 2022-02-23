import React, {useState} from 'react'
import {Button, Tooltip} from 'antd'
import startJob from 'pages/asyncjob/job/actions/startJob'
import {useTranslation} from 'react-i18next'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import {PlayCircleOutlined, LoadingOutlined} from '@ant-design/icons'
import {useDispatch} from 'react-redux'

interface Props {
	id: number
}

const StartButton = ({id}: Props) => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [isStarting, setStarting] = useState(false)

	const onStart = () => {
		setStarting(true)
		dispatch(startJob(id, () => setTimeout(() => setStarting(false), 500)))
	}

	return (
		<PopConfirmZis onConfirm={onStart}>
			<Tooltip placement='bottom' title={t('asyncJobPage.start_job')}>
				<Button
					type='text'
					disabled={isStarting}
					icon={isStarting ? <LoadingOutlined /> : <PlayCircleOutlined style={{fontSize: '1.6rem'}} />}
				/>
			</Tooltip>
		</PopConfirmZis>
	)
}

export default StartButton
