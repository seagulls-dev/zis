import AppBar from './AppBar/AppBar'
import React, {useEffect, useState} from 'react'
import { Redirect, Route } from 'react-router'
import SideNav from './SideNav/SideNav'
import { Layout } from 'antd'
import AppFooter from './AppFooter/AppFooter'
import './routeComponents.scss'
import BreadcrumbZis from './Breadcrumb/BreadcrumbZis'
import { useSelector } from 'react-redux'
import { AppState } from 'common/models'
import { isAllowedHelper } from 'helpers/authHelpers'
import RightSider from './RightSider/RightSider'
import { useTranslation } from 'react-i18next'

const { Footer, Content } = Layout

export const PlainRoute = ({ component: Component, ...rest }: any) => {
  return <Route {...rest} render={props => <Component {...props} />} />
}


export const PrivateRoute = ({
  component: Component,
  canAccess,
  ...rest
}: any) => {
  const { authenticated } = useSelector((state: AppState) => state.auth)
  const { rolesPermissions } = useSelector((state: AppState) => state.role)
  const { self } = useSelector((state: AppState) => state.auth)
  const { t } = useTranslation()

  const [isAllowed, setIsAllowed] = useState<boolean>(false)

  // const isAllowed = isAllowedHelper(canAccess, self, rolesPermissions)
  useEffect(()=>{
    const allowed = isAllowedHelper(canAccess, self, rolesPermissions)
    canAccess && self && rolesPermissions && allowed && setIsAllowed(allowed)
  },[canAccess,self, rolesPermissions])

  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          canAccess && self && rolesPermissions ? (
            isAllowed ? (
              <Layout hasSider>
                <SideNav />
                <Layout >
                  <AppBar />
                  <Layout hasSider style={{ padding: '0  0 0 24px' }} className='Layout'>

                    <Layout>
                      <BreadcrumbZis />

                      <Content style={{ padding: '0 24px 24px 0' }}>
                        <Component {...props} />
                      </Content>

                    </Layout>

                    <RightSider />

                  </Layout>
                  <Footer style={{ background: '#FFF' }}>
                    <AppFooter />
                  </Footer>
                </Layout>
              </Layout>
            ) : (
                <Layout hasSider>
                  <SideNav />
                  <Layout >
                    <AppBar />
                    <Layout style={{ padding: '0 24px 24px' }} className='Layout'>
                      <Content>
                        <h1>{t('errorPage.title')}</h1>
                        <h3>{t('errorPage.content')}</h3>
                      </Content>
                    </Layout>
                    <Footer style={{ background: '#FFF' }}>
                      <AppFooter />
                    </Footer>
                  </Layout>
                </Layout>
              )
          ) : (
              <Layout hasSider>
                <SideNav />
                <Layout >
                  <AppBar />
                  <Layout style={{ padding: '0 24px 24px' }} className='Layout'>
                    <BreadcrumbZis />
                    <Content>
                      <Component {...props} />
                    </Content>
                  </Layout>
                  <Footer style={{ background: '#FFF' }}>
                    <AppFooter />
                  </Footer>
                </Layout>
              </Layout>)
        ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location.pathname }
              }}
              push={true}
            />
          )
      }
    />
  )
}

export const PublicRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={props => (
        <Layout hasSider>
          <SideNav />
          <Layout >
            <AppBar />
            <Layout style={{ padding: '0 24px 24px' }} className='Layout'>
              <BreadcrumbZis />
              <Content>
                <Component {...props} />
              </Content>
            </Layout>
            <Footer style={{ background: '#FFF' }}>
              <AppFooter />
            </Footer>
          </Layout>
        </Layout>
      )}
    />
  )
}
