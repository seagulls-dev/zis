import React, {useState} from 'react'
import {Button, Tooltip} from 'antd'
import cancelJob from 'pages/asyncjob/job/actions/cancelJob'
import {useTranslation} from 'react-i18next'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import {LoadingOutlined, CloseCircleOutlined} from '@ant-design/icons'
import {useDispatch} from 'react-redux'

interface Props {
	id: number
}

const CancelButton = ({id}: Props) => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [isCanceling, setCanceling] = useState(false)

	const onStart = () => {
		setCanceling(true)
		dispatch(cancelJob(id, () => setTimeout(() => setCanceling(false), 500)))
	}

	return (
		<PopConfirmZis onConfirm={onStart}>
			<Tooltip placement='bottom' title={t('asyncJobPage.cancel_job')}>
				<Button
					type='text'
					disabled={isCanceling}
					icon={isCanceling ? <LoadingOutlined /> : <CloseCircleOutlined style={{fontSize: '1.6rem'}} />}
				/>
			</Tooltip>
		</PopConfirmZis>
	)
}

export default CancelButton
