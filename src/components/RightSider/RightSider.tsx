import { CloseCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Layout, Row } from 'antd'
import { AppState } from 'common/models'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import './RightSider.scss'

const { Sider } = Layout

const RightSider = () => {
  let location = useLocation()
  const { content } = useSelector((state: AppState) => state.rightsider)
  const [collapsed, setCollapsed] = useState<boolean>(true)

  const toggle = () => setCollapsed(!collapsed)

  return (
    <Sider
      width={400}
      collapsible
      collapsedWidth={0}
      reverseArrow={true}
      defaultCollapsed={true}
      collapsed={collapsed}
      theme='light'
      className='RightSider'
      trigger={null}
    >
      {
        content && content.path === location.pathname &&
        <Button type='text' className='triggerWrapper' onClick={toggle}>

          {collapsed ? <QuestionCircleOutlined /> : <CloseCircleOutlined />}

        </Button>
      }
      <Row justify='center' align='top'>
        <Col span={22}>
          {
            content &&
            <>
              <h3 className='siderTitle'>{content.title}</h3>
              <Divider />
              <div>
                {content.body}
              </div>
              {
                content.footer &&
                <>
                  <Divider />
                  <div>
                    {content.footer}
                  </div>
                </>
              }
            </>
          }
        </Col>
      </Row>
    </Sider>


  )
}

export default RightSider