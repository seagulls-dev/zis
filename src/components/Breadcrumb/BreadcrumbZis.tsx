import React from 'react'
import { breadcrumbNameMap } from 'App'
import { Breadcrumb } from 'antd'
import { Link, useParams, withRouter } from 'react-router-dom'
import store from 'redux/store'
import './BreadcrumbZis.scss'
interface ParamTypes {
  id: string
}
const BreadcrumbZis = withRouter(props => {
  const { location } = props
  const { id } = useParams<ParamTypes>()
  const authenticated = store.getState().auth.authenticated
  const pathSnippets = location.pathname.split('/').filter(i => i)

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    return (
      breadcrumbNameMap[url] &&
      <Breadcrumb.Item key={url}>
        {
          pathSnippets.length !== index + 1 ?
            <Link
              children={breadcrumbNameMap[url]}
              to={id ? `${url}/${id}` : `${url}`}
            /> : breadcrumbNameMap[url]
        }

      </Breadcrumb.Item>
    )
  })

  const breadcrumbItems = [
    <Breadcrumb.Item key='home'>
      {authenticated ? <Link to='/'>Dashboard</Link> : 'Dashboard'}
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems)


  id && breadcrumbItems.length > 2 && breadcrumbItems.push(<Breadcrumb.Item key='id'>{id}</Breadcrumb.Item>)

  return (
    <div className='BreadcrumbZis'>
      {
        !props.history.location.pathname.includes('attach') && <Breadcrumb separator='>'>{breadcrumbItems}</Breadcrumb>
      }
    </div>
  )
})

export default BreadcrumbZis
