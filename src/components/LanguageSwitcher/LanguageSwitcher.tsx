import { SUPPORTED_LANGUAGES } from 'i18n'
import moment from 'moment'
import React from 'react'
import { Menu, Dropdown } from 'antd'
import { DownOutlined, GlobalOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './LanguageSwitcher.scss'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language, () => {
      moment.locale(i18n.language)
    })
  }

  const langDropdown = (
    <Menu>
      {
        SUPPORTED_LANGUAGES.map((lng, i) => (
          <Menu.Item key={i}>
            <div data-value={lng} onClick={(e) => changeLanguage(e.currentTarget.dataset.value!)} >
              {i18n.t(`languageSwitcher.${lng}`)}
            </div>
          </Menu.Item>

        ))
      }
    </Menu>

  )

  return (
    <Dropdown overlay={langDropdown}>
      <div className='ant-dropdown-link'>
        <GlobalOutlined />
        <span className='text-uppercase'>{i18n.language}  </span> <DownOutlined />
      </div>
    </Dropdown >
  )
}

export default LanguageSwitcher
