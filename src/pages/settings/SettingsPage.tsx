import React, {useEffect, useState} from 'react'
import {Card, Input, Button, Row, Col, message} from 'antd'
import Form, {useForm} from 'antd/lib/form/Form'
import {useTranslation} from 'react-i18next'
import {SettingOutlined} from '@ant-design/icons'
import {useSelector, useDispatch} from 'react-redux'
import {AppState} from "../../common/models";
import { Store } from 'antd/lib/form/interface'
import Item from 'antd/lib/form/FormItem'
import {SettingsDetails} from "./models";
import {formItemLayout, tailLayout} from 'helpers/layoutHelpers'
import updateSetting from './actions/updateSetting'
import getSettingsSelf from './actions/getSettingsSelf'

enum Scope {
  APP = 'app',
  USER = 'user',
  CUSTOMER = 'customer'
}

const SettingsPage = props => {
  const {t} = useTranslation()
  const [form] = useForm()
  const dispatch = useDispatch()

  const {settings} = useSelector((state: AppState) => state.setting)

  const [data, setData] = useState<SettingsDetails[]>()
  useEffect(() => {
    const filtered = settings?.filter(item => item.scope === Scope.APP).sort((a,b) => ((a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)))
    setData(filtered)
  },[settings])

  const updateRecord = (id,name) => {
    const value = form.getFieldValue(name)
    const item = {
      id: id,
      name: name,
      value: value,
      scope: Scope.APP
    }
    dispatch(updateSetting(item, isSuccess => {
      if (!isSuccess) message.error(t('settingsPage.error'))
    }))
  }

  return (
    <>
      <Card
        title={
          <>
            <SettingOutlined /> {t('settingsPage.title')}
          </>
        }
      >
        <Form
          {...formItemLayout}
          form={form}
        >
          {
            data?.map((item) => (
              <Row key={item.id}>
                <Col span={18}>
                  <Item name={item.name} label={item.name} initialValue={item.value} key={item.id}>
                    <Input />
                  </Item>
                </Col>
                <Col span={4} offset={2}>
                  <Button onClick={e=>updateRecord(item.id,item.name)}>
                    {t('settingsPage.update')}
                  </Button>
                </Col>
              </Row>
            ))
          }
        </Form>
      </Card>
    </>
  )
}

export default SettingsPage
