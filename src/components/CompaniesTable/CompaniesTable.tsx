import React, { useState, useEffect } from 'react'
import { Table, Space, Badge, Row, Col, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { LoadingIndicator } from 'components'
import { CompanyDetails } from 'pages/company/models'
import Highlighter from 'react-highlight-words'
import { AutoComplete } from 'antd'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import { Link } from 'react-router-dom'
import { ColumnsType } from 'antd/es/table'
import Button from 'antd-button-color'
import { PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import './CompaniesTable.scss'
import {DeleteTwoTone, EditTwoTone} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import {AppState} from "../../common/models";

interface Props {
  data: CompanyDetails[] | undefined
  isLoading: boolean
  onDelete: (id: number) => void
  setDataToUpdate: (values: CompanyDetails) => void
  showModal: () => void
}

const CompaniesTable = ({
  data,
  isLoading,
  onDelete,
  setDataToUpdate,
  showModal,
}: Props) => {
  const { t } = useTranslation()
  const [dataSource, setDataSource] = useState<CompanyDetails[]>()
  const [idValue, setIdValue] = useState('')
  const [valueName, setNameValue] = useState('')
  const columns: ColumnsType<CompanyDetails> = []
  const expandableColumns: any[] = []

  const { settings } = useSelector((state : AppState) => state.setting)
  const [pageSize, setPageSize] = useState<string>()

  useEffect(() => {
    setDataSource(data)
    const size = settings?.find(item => item.name === 'grid_page_size')
    setPageSize(size?.value)
  }, [data])

  const FilterByNameInput = data && (
    <AutoComplete
      placeholder="Search Name"
      options={data.map((v) => ({value: v.name}))}
      style={{width: 200}}
      value={idValue}
      onChange={(currentValue) => {
        setIdValue(currentValue)
        const filteredData = data?.filter((item) => item.name.toLowerCase().includes(currentValue.toLowerCase()))
        setDataSource(filteredData)
      }}
      filterOption={(inputValue, option) =>
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    />
  )

  const FilterByIdInput = data && (
    <AutoComplete
      placeholder='Search ID'
      options={data.map((v) => ({ value: v.company_number }))}
      style={{ width: 200 }}
      value={valueName}
      onChange={(currValue) => {
        setNameValue(currValue)
        const filteredData = data.filter((entry) =>
          entry.company_number.includes(currValue)
        )
        setDataSource(filteredData)
      }}
      filterOption={(inputValue, option) =>
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    />
  )

  expandableColumns.push(
    { title: t('companiesPage.address_1'), dataIndex: 'street', key: 'street' },
    { title: t('companiesPage.city'), dataIndex: 'city', key: 'city' },
    { title: t('companiesPage.zip'), dataIndex: 'zip', key: 'zip' },
    { title: t('companiesPage.region'), dataIndex: 'region', key: 'region' },
    {
      title: t('companiesPage.file_number'),
      dataIndex: 'file_number',
      key: 'file_number',
    },
    {
      title: t('companiesPage.note'),
      dataIndex: 'note',
      key: 'note',
      ellipsis: true,
    }
  )

  columns.push(
    {
      title: FilterByNameInput,
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            color: '#2d9259',
            padding: 0,
          }}
          searchWords={[valueName]}
          textToHighlight={text.toString()}
          autoEscape
        />
      ),
    },
    {
      title: FilterByIdInput,
      dataIndex: 'company_number',
      key: 'company_number',
      render: (text: string) => (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            color: '#2d9259',
            padding: 0,
          }}
          searchWords={[idValue]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
    },
    { title: t('companiesPage.country'), dataIndex: 'country', key: 'country' },
    {
      title: t('companiesPage.email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('companiesPage.phone'),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: t('companiesPage.vat_payer'),
      dataIndex: 'vat_payer',
      key: 'vat_payer',
      className: 'centered',
      render: (record: number) =>
        record === 1 ? <Badge status='success' /> : <Badge status='error' />,
      filters: [
        { text: 'Yes', value: 1 },
        { text: 'No', value: 0 },
      ],
      onFilter: (value, record) => record.vat_payer === value,
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      width: 140,
      render: (_: string, record: CompanyDetails) => (
        <Space size='middle'>
          <Button
            type='text'
            size='small'
            onClick={() => {
              showModal()
              setDataToUpdate(record)
            }}
            icon={<EditTwoTone twoToneColor='green' />}
          />
          <PopConfirmZis onConfirm={() => onDelete(record.id)}>
            <Button
              type='text'
              danger
              size='small'
              disabled={record.deleted_at ? true : false}
              icon={<DeleteTwoTone twoToneColor='red' />}
            />
          </PopConfirmZis>
        </Space>
      ),
    }
  )

  const expandedRowRender = (record: CompanyDetails) => {
    return (
      <Row>
        <Col span='12'>
          <Form>
            <Form.Item label='address' className='label-bold'>
              <span>{record.street + ' ' + record.city + ' ' + record.region + ' ' + record.zip + ' ' + record.country}</span>
            </Form.Item>
            <Form.Item label='city' className='label-bold'>
              <span>{record.city}</span>
            </Form.Item>
            <Form.Item label='zip' className='label-bold'>
              <span>{record.zip}</span>
            </Form.Item>
            <Form.Item label='region' className='label-bold'>
              <span>{record.region}</span>
            </Form.Item>
            <Form.Item label='country' className='label-bold'>
              <span>{record.country}</span>
            </Form.Item>
          </Form>
        </Col>
        <Col span='12'>
          <Form>
            <Form.Item label='file number' className='label-bold'>
              <span>{record.file_number}</span>
            </Form.Item>
            <Form.Item label='note' className='label-bold'>
              <span>{record.note}</span>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    )
  }

  return !isLoading && dataSource && pageSize ? (
    <Table<CompanyDetails>
      className='CompaniesTable'
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => `${record.id}`}
      showHeader={true}
      expandable={{ expandedRowRender }}
      style={{ whiteSpace: 'pre' }}
      rowClassName={(record) => (record.customer === null ? 'noCustomer' : '')}
      pagination={{defaultPageSize: parseInt(pageSize), showSizeChanger: false}}
    />
  ) : (
    <LoadingIndicator />
  )
}

export default CompaniesTable
