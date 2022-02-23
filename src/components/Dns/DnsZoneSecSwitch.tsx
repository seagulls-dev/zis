import React from 'react'
import { Switch } from 'antd'
import { AppState } from 'common/models'
import { useDispatch, useSelector } from 'react-redux'
import setDnsSec from 'pages/dns/zone/actions/setDnsSec'

interface Props {
  zone: string
  serviceId: number
}

const DnsZoneSecSwitch = (props: Props) => {
  const dispatch = useDispatch()
  const { dnszone } = useSelector((state: AppState) => state.dnszone)

  const onDnsSecChange = (checked: boolean, e) => {
    e.stopPropagation()
    dispatch(
      setDnsSec({
        service_id: props.serviceId,
        domain: props.zone,
        dnssec: checked ? 1 : 0,
      })
    )
  }

  return dnszone?.domain === props.zone ? (
    <Switch
      className='dnsSecSwitch'
      checkedChildren='DNSSEC'
      unCheckedChildren='DNSSEC'
      defaultChecked={dnszone.dnssec}
      onClick={onDnsSecChange}
    />
  ) : null
}

export default DnsZoneSecSwitch
