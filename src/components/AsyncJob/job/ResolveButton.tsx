import React, {useState} from 'react'
import {Button, Tooltip} from 'antd'
import resolveJob from 'pages/asyncjob/job/actions/resolveJob'
import {useTranslation} from 'react-i18next'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import {LoadingOutlined, SyncOutlined} from '@ant-design/icons'
import {useDispatch} from 'react-redux'

interface Props {
	id: number
}

const ResolvButton = ({id}: Props) => {
	const {t} = useTranslation()
	const dispatch = useDispatch()
	const [isResolving, setResolving] = useState(false)

	const onStart = () => {
		setResolving(true)
		dispatch(resolveJob(id, () => setTimeout(() => setResolving(false), 500)))
	}

	return (
		<PopConfirmZis onConfirm={onStart}>
			<Tooltip placement='bottom' title={t('asyncJobPage.resolve_job')}>
				<Button
					type='text'
					disabled={isResolving}
					icon={isResolving ? <LoadingOutlined /> : <SyncOutlined style={{fontSize: '1.6rem'}} />}
				/>
			</Tooltip>
		</PopConfirmZis>
	)
}

export default ResolvButton
