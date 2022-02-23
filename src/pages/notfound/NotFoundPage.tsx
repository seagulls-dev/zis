import React, {useEffect} from 'react'
import {Card} from 'antd'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

const NotFoundPage = () => {
  const {t} = useTranslation()

  return (
    <Card>
      <h1>404</h1>
      <Link to="/">{t('dashboardPage.title')}</Link>
    </Card>
  )

}

export default NotFoundPage
