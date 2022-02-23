import React from 'react'
import {Popconfirm, message} from 'antd'
import {useTranslation} from 'react-i18next'

interface Props {
	title?: string
	onConfirm?: (e: any) => void
	onCancel?: (e: any) => void
	okText?: string
	cancelText?: string
	children?: any
	placement?:
		| 'top'
		| 'left'
		| 'right'
		| 'bottom'
		| 'topLeft'
		| 'topRight'
		| 'bottomLeft'
		| 'bottomRight'
		| 'leftTop'
		| 'leftBottom'
		| 'rightTop'
		| 'rightBottom'
		| undefined
}

const PopConfirmZis = (props: Props) => {
	const {title, onConfirm, onCancel, okText, cancelText, children, placement, ...restProps} = props
	const {t} = useTranslation()

	const confirm = () => {
		message.success(t('popconfirm.confirmed'))
	}

	const cancel = () => {
		message.error(t('popconfirm.canceled'))
	}

	return (
		<Popconfirm
			title={title ? title : t('popconfirm.sure')}
			onConfirm={onConfirm ? onConfirm : confirm}
			onCancel={onCancel ? onCancel : cancel}
			okText={okText ? okText : t('popconfirm.yes')}
			cancelText={cancelText ? cancelText : t('popconfirm.no')}
			{...restProps}
			style={{
				minWidth: '330px',
				width: '100%',
			}}
			placement={placement}>
			{children}
		</Popconfirm>
	)
}

export default PopConfirmZis
