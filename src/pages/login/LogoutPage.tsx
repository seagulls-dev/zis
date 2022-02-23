import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import userLogout from 'pages/login/actions/logout'
import {AppState} from 'common/models'
import {LoadingIndicator} from 'components'
import {useTranslation} from 'react-i18next'
import {message} from 'antd'
import {removeCurrentUser} from 'helpers/authHelpers'

const LogoutPage = () => {
	const {t} = useTranslation()
	const {isLoading} = useSelector((state: AppState) => state.auth)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(
			userLogout((isSuccess) => {
				if (isSuccess) {
					removeCurrentUser()
					message.success(t('logoutPage.logouted'))
				}
			}),
		)
		//eslint-disable-next-line
	}, [])

	return isLoading ? <LoadingIndicator /> : <>Logout</>
}

export default LogoutPage
