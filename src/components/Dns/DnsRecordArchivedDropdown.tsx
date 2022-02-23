import React from 'react'
import { Button, Dropdown, Menu } from 'antd'
import { DownOutlined, HistoryOutlined } from '@ant-design/icons'
import { DnsZoneDetails, DnsRecordDetails } from 'pages/dns/zone/models'

interface Props {
  archivedRecords?: DnsZoneDetails
  onSelect: (record: DnsRecordDetails) => void
}

const DnsRecordArchivedDropdown = (props: Props) => {
  const menu = (
    <Menu>
      {props.archivedRecords?.records.map((record, i) => (
        <Menu.Item
          key={i}
          onClick={() => props.onSelect(record)}
          disabled={record.type === 'SOA'}
        >
          {record.name} {record.type} {record.content}
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <Dropdown overlay={menu}>
      <Button icon={<HistoryOutlined />}>
        History:{' '}
        {props.archivedRecords ? props.archivedRecords.records.length : 0}{' '}
        <DownOutlined />
      </Button>
    </Dropdown>
  )
}

export default DnsRecordArchivedDropdown
