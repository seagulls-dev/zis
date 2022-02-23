import React from 'react'
import { Collapse } from 'antd'
import { DnsZoneDetails } from 'pages/dns/zone/models'
import Button from 'antd-button-color'
import './DnsZoneArchivedDropdown.scss'

interface Props {
  serviceId?: number
  archived?: DnsZoneDetails
  onDnsZoneCreateFromArchive: () => void
}

const { Panel } = Collapse

const DnsZoneArchivedDropdown = (props: Props) => {
  return (
    <>
      <Collapse
        className='DnsZoneArchivedDropdown'
        collapsible={!props.archived ? 'disabled' : 'header'}
      >
        <Panel
          header={`Archived zone ${
            props.archived ? props.archived.domain : ''
          }: ${
            props.archived?.records ? props.archived?.records.length : 0
          } records`}
          key='1'
        >
          <>
            {props.archived?.records
              .sort((a) => (a.type === 'SOA' ? -1 : 1))
              .map((record, i) => (
                <div key={i} className='dnsRecords'>
                  <div>{record.name} </div>
                  <div>{record.type}</div>
                  <div>{record.content}</div>
                </div>
              ))}
            <Button
              onClick={() => props.onDnsZoneCreateFromArchive()}
              className='createButton'
            >
              Create from archived
            </Button>
          </>
        </Panel>
      </Collapse>
    </>
  )
}

export default DnsZoneArchivedDropdown
