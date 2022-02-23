import React, {useState} from 'react'
import {Button, Tooltip} from 'antd'
import finishJob from 'pages/asyncjob/job/actions/finishJob'
import {useTranslation} from 'react-i18next'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import {LoadingOutlined, StopOutlined} from '@ant-design/icons'
import {useDispatch} from 'react-redux'

interface Props {
	id: number
}

const FinishButton = ({id}: Props) => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [isFinishing, setFinishing] = useState(false)

	const onStart = () => {
		setFinishing(true)
		dispatch(finishJob(id, () => setTimeout(() => setFinishing(false), 500)))
	}

	return (
		<PopConfirmZis onConfirm={onStart}>
			<Tooltip placement='bottom' title={t('asyncJobPage.finish_job')}>
				<Button
					type='text'
					disabled={isFinishing}
					icon={isFinishing ? <LoadingOutlined /> : <StopOutlined style={{fontSize: '1.6rem'}} />}
				/>
			</Tooltip>
		</PopConfirmZis>
	)
}

export default FinishButton
