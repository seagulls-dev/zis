import React from 'react'
import LogoLoader from './img/LogoLoader.svg'
import LogoLoaderWhite from './img/LogoLoaderWhite.svg'
import { useSelector } from 'react-redux'
import { AppState } from 'common/models'
import './LoadingIndicator.scss'

interface Props {
  background?: boolean
}
const LoadingIndicator = (props: Props) => {
  const { theme } = useSelector((state: AppState) => state.theme)
  return (
    <div className={`LoadingIndicator ${props.background ? 'white-bg' : ''}`}>
      <img
        src={
          theme === 'DARK' ?
            LogoLoaderWhite :
            LogoLoader
        }
        alt='Loading...'
      />
    </div>
  )
}

export default LoadingIndicator
