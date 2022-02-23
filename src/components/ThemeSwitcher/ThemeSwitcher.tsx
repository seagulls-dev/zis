import React, { useEffect } from 'react'
import { Switch } from 'antd'
import { AppState } from 'common/models'
import { useSelector, useDispatch } from 'react-redux'
import { Theme } from './models'
import { changeTheme, loadTheme } from './actions/theme'
import { ReactComponent as MoonIcon } from 'icons/moon/moon.svg'
import { ReactComponent as SunIcon } from 'icons/sun/sun.svg'
import { FaRegLightbulb } from 'react-icons/fa'
import './ThemeSwitcher.scss'

const ThemeSwitcher = () => {

  const { theme } = useSelector((state: AppState) => state.theme)

  const dispatch = useDispatch()

  function handleChange(checked: boolean) {
    checked ?
      dispatch(changeTheme(Theme.DARK))
      :
      dispatch(changeTheme(Theme.DEFAULT))
  }

  useEffect(() => {
    dispatch(loadTheme())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <FaRegLightbulb size='16' /> <Switch
        className='ThemeSwitcher'
        checked={theme !== Theme.DEFAULT}
        onChange={handleChange}
        checkedChildren={<MoonIcon />}
        unCheckedChildren={<SunIcon style={{ 'float': 'right' }} />}
      />
    </>
  )
}

export default ThemeSwitcher