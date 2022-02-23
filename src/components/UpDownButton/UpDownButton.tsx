import React from 'react'
import { Button } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'

import './UpDownButton.scss'

interface Props {
  onUp: (up: string) => void
  onDown: (down: string) => void
  size?: 'small' | 'large' | 'middle'
  disabledUp?: boolean
  disabledDown?: boolean
}

const UpDownButton = (props: Props) => {
  return (
    <span className='upDownWrapper'>
      <Button
        value={'up'}
        onClick={() => props.onUp('up')}
        className='upDownWrapper_button-up'
        size={props.size}
        icon={<UpOutlined className='upDownWrapper_icnon-up' />}
        disabled={props.disabledUp}
      />
      <Button
        value={'down'}
        onClick={() => props.onDown('down')}
        className='upDownWrapper_button-down'
        size={props.size}
        icon={<DownOutlined className='upDownWrapper_icon-down' />}
        disabled={props.disabledDown}
      />
    </span>
  )
}

export default UpDownButton