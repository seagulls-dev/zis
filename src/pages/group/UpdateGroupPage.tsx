import React, { useEffect } from 'react'
import { Link, useParams, RouteComponentProps } from 'react-router-dom'
import { Card, Button, Form, Input, message } from 'antd'
import { GroupOutlined } from '@ant-design/icons/lib/icons'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'common/models'
import { LoadingIndicator } from 'components'
import { tailLayout, formItemLayout } from 'helpers/layoutHelpers'
import getGroup from './actions/getGroup'
import updateGroup from './actions/updateGroup'

interface ParamTypes {
  id: string
}

const GroupPage = (props: RouteComponentProps) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  let { id } = useParams<ParamTypes>()
  const { isLoading, data } = useSelector((state: AppState) => state.group)

  useEffect(() => {
    dispatch(getGroup(id))
    // eslint-disable-next-line
  }, [])

  const onFinish = values => {
    dispatch(updateGroup({
      id: values.id,
      title: values.title
    },
      isSuccess => {
        if (isSuccess) {
          message.success(t('userGroupPage.updated'))
          props.history.replace('/user-group')
        } else {
          message.error('Error update User group')
        }
      }
    ))
  }

  return (
    <Card
      title={<><GroupOutlined /> {t('userGroupPage.update')}</>}
      extra={<Link to='/user-group'><Button> {t('userGroupPage.cancel')} </Button></Link>}
      className='UpdateUserGroupPage'
    >
      {
        isLoading ? <LoadingIndicator /> :
          (
            <Form
              {...formItemLayout}
              name='basic'
              onFinish={onFinish}
            >

              <Form.Item
                name='id'
                initialValue={data && data.id}
                style={{ display: 'none' }}>
                <Input type='hidden' />
              </Form.Item>

              <Form.Item
                label={t('userGroupPage.group_name')}
                name='title'
                initialValue={data && data.title}
                rules={[{ required: true, message: t('userGroupPage.err_group_name') }]}
              >
                <Input />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                  {t('userGroupPage.update')}
                </Button>
              </Form.Item>
            </Form>
          )
      }
    </Card>
  )
}

export default GroupPage