import React, { useEffect } from 'react'
import { changeFont, loadFont } from './actions/font'
import { MdFormatSize } from 'react-icons/md'
import { Switch } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from 'common/models'
import { FontSize } from './models'
import { FaSearchPlus, FaSearchMinus } from 'react-icons/fa'
interface Props { }

const FontSwitcher = (props: Props) => {
  const dispatch = useDispatch()

  const { fontSize } = useSelector((state: AppState) => state.font)

  function handleChange(checked: boolean) {

    checked ?
      dispatch(changeFont(FontSize.BIG))
      :
      dispatch(changeFont(FontSize.DEFAULT))
  }

  useEffect(() => {
    dispatch(loadFont())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='FontSizeSwitcher'>
      <MdFormatSize size='18' /> <Switch
        className='ThemeSwitcher'
        checked={fontSize !== FontSize.DEFAULT}
        onChange={handleChange}
        checkedChildren={<FaSearchMinus />}
        unCheckedChildren={<FaSearchPlus style={{ 'float': 'right' }} />}
      />

    </div>
  )
}

export default FontSwitcher