import React, { useEffect, useState } from 'react'
import { Collapse, Space, Tabs, Tooltip, Card } from 'antd'
import {
  CaretRightOutlined,
  GlobalOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons/lib/icons'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'common/models'
import getDnsZones from './actions/getDnsZones'
import getDnsZone from './actions/getDnsZone'
import Button from 'antd-button-color'
import { useTranslation } from 'react-i18next'
import getDnsServices from '../service/actions/getDnsServices'
import DnsZoneTable from 'components/Dns/DnsZoneTable'
import './DnsZonePage.scss'
import Modal from 'antd/lib/modal/Modal'
import DnsZoneForm from 'components/Dns/DnsZoneForm'
import DnsZoneExport from 'components/Dns/DnsZoneExport'
import { DnsServiceDetails } from '../service/models'
import DnsZoneDelete from 'components/Dns/DnsZoneDelete'
import DnsZoneSecSwitch from 'components/Dns/DnsZoneSecSwitch'

const { Panel } = Collapse
const { TabPane } = Tabs

const DnsZonePage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [activeTabKey, setActiveTabKey] = useState('1')
  const [isZoneModalVisible, setZoneModalVisible] = useState<boolean>(false)
  const { dnszones } = useSelector((state: AppState) => state.dnszone)
  const { dnsservices } = useSelector((state: AppState) => state.dnsservice)

  useEffect(() => {
    dispatch(getDnsServices())
    dispatch(getDnsZones({ service_id: 1 }))
    //eslint-disable-next-line
  }, [])

  /**
   * Service ID left menu
   */
  const onTabSelect = (activeKey: string) => {
    dispatch(
      getDnsZones({ service_id: Number(activeKey) }, (isOk) => {
        if (isOk) {
          setActiveTabKey(activeKey)
        }
      })
    )
  }

  const onDomainSelect = (key: string | string[]) => {
    typeof key === 'string' &&
      dispatch(getDnsZone({ service_id: 1, domain: key }))
  }

  const genExtra = (z: string, s: DnsServiceDetails) => (
    <Space size={24} align='center' className='extraWrapper'>
      <DnsZoneSecSwitch zone={z} serviceId={Number(activeTabKey)} />

      <DnsZoneDelete serviceId={s.id} zone={z} />

      <DnsZoneExport serviceId={s.id} zone={z} />
    </Space>
  )

  return (
    <div className='DnsZonePage card-container'>
      <Card
        title='DNS zones'
        extra={
          <Tooltip title={t('dnsPage.create_zone_button')}>
            <Button
              type='text'
              size='small'
              icon={<PlusSquareOutlined style={{ fontSize: 22 }} />}
              onClick={(e) => {
                e.stopPropagation()
                setZoneModalVisible(true)
              }}
            />
          </Tooltip>
        }
      >
        <Tabs
          className='DnsZonePage_tabs'
          tabPosition='left'
          onChange={onTabSelect}
          activeKey={activeTabKey}
        >
          {dnsservices?.map((s) => (
            <TabPane tab={s.driver} key={s.id}>
              <Collapse
                accordion
                className='DnsZonePage_collapse'
                bordered={false}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined
                    rotate={isActive ? 90 : 0}
                    style={{ paddingTop: 17 }}
                  />
                )}
                onChange={(key) => onDomainSelect(key)}
              >
                {dnszones?.map((zone, i) => (
                  <Panel
                    key={zone.name}
                    className='DnsZonePage_panel'
                    header={
                      <span style={{ position: 'absolute', top: 17 }}>
                        {zone.name}
                      </span>
                    }
                    extra={genExtra(zone.name, s)}
                  >
                    <DnsZoneTable key={i} serviceId={Number(activeTabKey)} />
                  </Panel>
                ))}
              </Collapse>
            </TabPane>
          ))}
        </Tabs>
      </Card>
      <Modal
        destroyOnClose
        style={{ top: 20 }}
        width={800}
        title={
          <>
            <GlobalOutlined /> &nbsp;
            {t('dnsPage.create_zone_title')}
          </>
        }
        visible={isZoneModalVisible}
        onCancel={() => setZoneModalVisible(false)}
        footer={null}
        confirmLoading={true}
      >
        <DnsZoneForm setZoneModalVisible={setZoneModalVisible} />
      </Modal>
    </div>
  )
}

export default DnsZonePage
