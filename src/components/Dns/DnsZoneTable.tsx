import React, { useState } from 'react'
import { Input, message, Modal, Space, Table, Tooltip } from 'antd'
import {
  DeleteTwoTone,
  LoadingOutlined,
  PlusCircleTwoTone,
  SaveOutlined,
} from '@ant-design/icons/lib/icons'
import {
  AddDnsRecordParams,
  DnsRecordDetails,
  RemoveDnsRecordParams,
} from 'pages/dns/zone/models'
import Button from 'antd-button-color'
import { AppState } from 'common/models'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import DnsRecordForm from 'components/Dns/DnsRecordForm'
import addDnsRecord from 'pages/dns/zone/actions/addDnsRecord'
import removeDnsRecord from 'pages/dns/zone/actions/removeDnsRecord'
import setSoaTtl from 'pages/dns/zone/actions/setSoaTtl'

interface Props {
  key: string | number
  serviceId: number
}

const DnsZoneTable = (props: Props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const { isLoading, dnszone, isSaving } = useSelector(
    (state: AppState) => state.dnszone
  )

  const hideModal = () => setModalVisible(false)
  const showModal = () => setModalVisible(true)

  const onDnsRecordCreate = (values: AddDnsRecordParams) => {
    dispatch(
      addDnsRecord(
        { ...values, content: values.content.replace(/['"]+/g, '') },
        (isOk) => {
          if (isOk) {
            hideModal()
            message.success(t('dnsPage.record_added'))
          }
        }
      )
    )
  }

  const onDnsRecordDelete = (params: RemoveDnsRecordParams) => {
    dispatch(
      removeDnsRecord(params, (isOk) => {
        isOk && message.success(t('dnsPage.record_removed'))
      })
    )
  }

  const onSetSoaTTL = (e) => {
    const ttlValue = e.currentTarget.parentNode.previousElementSibling.value
    if (ttlValue > 0) {
      dispatch(
        setSoaTtl(
          {
            service_id: props.serviceId,
            domain: dnszone!.domain,
            ttl: ttlValue,
          },
          (isOk) => isOk && message.success(t('dnsPage.ttl_setted'))
        )
      )
    }
  }

  const genFooter = () => (
    <Space>
      <Tooltip title={t('dnsPage.add_record')}>
        <Button
          onClick={() => showModal()}
          type='text'
          icon={<PlusCircleTwoTone style={{ fontSize: 22 }} />}
        />
      </Tooltip>
    </Space>
  )

  return (
    <>
      <Table<DnsRecordDetails>
        bordered
        rowKey='content'
        dataSource={dnszone?.records.sort((a) => (a.type === 'SOA' ? -1 : 1))}
        loading={isLoading}
        pagination={false}
        columns={[
          { title: 'Record name', dataIndex: 'name', width: 180, key: 'name' },
          {
            title: 'TTL',
            dataIndex: 'ttl',
            width: 140,
            key: 'ttl',
            render: (text: number, record: DnsRecordDetails) =>
              record.type === 'SOA' ? (
                <Input
                  type='number'
                  min={1}
                  step={1}
                  style={{ width: 110 }}
                  defaultValue={text}
                  className='ttlinput'
                  disabled={isSaving}
                  addonAfter={
                    isSaving ? (
                      <LoadingOutlined />
                    ) : (
                      <SaveOutlined onClick={onSetSoaTTL} />
                    )
                  }
                />
              ) : (
                <>{text}</>
              ),
          },
          { title: 'Type', dataIndex: 'type', width: 90, key: 'type' },
          {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            ellipsis: true,
          },
          {
            title: 'Actions',
            key: 'actions',
            width: 90,
            align: 'center',
            render: (_, record) => (
              <PopConfirmZis
                onConfirm={() =>
                  onDnsRecordDelete({
                    ...record,
                    domain: dnszone!.domain,
                    service_id: props.serviceId,
                  })
                }
              >
                <Button
                  type='text'
                  icon={<DeleteTwoTone twoToneColor='red' />}
                />
              </PopConfirmZis>
            ),
          },
        ]}
        footer={genFooter}
      />
      <Modal
        destroyOnClose
        style={{ top: 20 }}
        width={545}
        title={
          <>
            {t('dnsPage.create_record_for')} {dnszone?.domain}
          </>
        }
        visible={isModalVisible}
        onCancel={hideModal}
        footer={null}
        confirmLoading={true}
      >
        <DnsRecordForm
          serviceId={props.serviceId}
          onDnsRecordCreate={onDnsRecordCreate}
        />
      </Modal>
    </>
  )
}

export default DnsZoneTable
