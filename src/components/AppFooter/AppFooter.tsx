import React from 'react'
import './AppFooter.scss'
import { ApiOutlined } from '@ant-design/icons'

const AppFooter = () => {
  return (
    <div className='AppFooter'>
      <div className='AppFooter_container'>
        <a
          href='https://zistest.zcom.cz/swagger/doc'
          target='_blank'
          rel='noopener noreferrer'
        >
          <ApiOutlined style={{ fontSize: '22px', color: '#08c' }} /> &nbsp; ZIS
          Swagger{' '}
        </a>

        <div className='AppFooter_container_version'>
          {document
            .querySelector('meta[name="version"]')
            ?.getAttribute('content')}
        </div>
      </div>
    </div>
  )
}

export default AppFooter
