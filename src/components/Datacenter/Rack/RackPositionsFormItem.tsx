import React, {Key, useEffect, useState} from 'react'
import {Form, InputNumber, Select, Tooltip} from 'antd'
import Tree, {DataNode} from 'antd/lib/tree'
import {AppState} from 'common/models'
import {arrayFromCount} from 'helpers/arrayHelpers'
import {BlockDetails} from 'pages/datacenter/block/models'
import {RackDetails} from 'pages/datacenter/rack/models'
import {BladeContainerDetails} from 'pages/inventory/bladecontainer/models'
import {PhysicalServerDetails} from 'pages/inventory/physicalserver/models'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import UsizeKeys from '../Block/UsizeKeys'
import './RackPositionsFormItem.scss'
import getDatacenters from 'pages/datacenter/datacenter/actions/getDatacenters'

interface Props {
  dataToUpdate?: BlockDetails | BladeContainerDetails | PhysicalServerDetails
  type?: string
  usizeDisabled?: boolean
  rackRequired?: boolean
}
const {Item} = Form

const RackPositionsFormItem = (props: Props) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const {racks} = useSelector((state: AppState) => state.rack)
  const {datacenters} = useSelector((state: AppState) => state.datacenter)
  const [selectedUsize, setSelectedUsize] = useState<number | undefined>()
  const [selectedRack, setSelectedRack] = useState<RackDetails | undefined>(racks?.find(r => r.id === props.dataToUpdate?.rack_id))
  const [selectedKeys, setSelectedKeys] = useState<Key[] | undefined>(
    props.dataToUpdate?.rack_pos ? [props.dataToUpdate.rack_pos] : []
  )

  useEffect(() => {
    !datacenters && dispatch(getDatacenters())
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    setSelectedUsize(props.dataToUpdate?.u_size)
  }, [props.dataToUpdate])

  const treeData = (data: RackDetails, selectedUsize: number) => {
    const list: DataNode[] | undefined = []
    //eslint-disable-next-line
    arrayFromCount(data.u_count).map(v => {
      const keys = arrayFromCount(selectedUsize).map((_, i) => v + i)
      const isOccupiedPosition = data?.positions?.some(p => p.position === v)
      const isCurrentPosition = data?.positions?.filter(p => p.id === props.dataToUpdate?.id && p.type === props.type).some(p => p.position === v)
      const isSomeFromKeysCurrent = keys.some(k => props.dataToUpdate?.rack_pos === k)
      const isUsizeAvail =
        props.dataToUpdate ?
          !keys.some(key => data.positions?.some(pos =>
            (pos.position === key && !isCurrentPosition && !isSomeFromKeysCurrent) ||
            key > data.u_count
          ))
          :
          !keys.some(key => data.positions?.some(pos => pos.position === key || key > data.u_count))


      const treeNode: DataNode = {
        title: isOccupiedPosition && !isCurrentPosition ?
          <Tooltip
            title={selectedRack?.positions?.find(p => p.position === v)?.comment}
            key={`${v}-tooltip`}
            placement='left'
          >
            <div className='BlockTree Occupied'>{v} <small className='secondary'> &nbsp; {t('BlockPage.occupied')}</small></div>
          </Tooltip> :
          isUsizeAvail ?
            <div className='BlockTree Avail'>
              {isCurrentPosition && <small>{t('BlockPage.current')} &nbsp; </small>}
              <UsizeKeys keys={keys} />
            </div>
            :
            <div className={isOccupiedPosition && v !== props.dataToUpdate?.rack_pos ? `BlockTree Avail` : 'BlockTree'}>
              <span>{v}  <small className='secondary'>{t('BlockPage.no-space')}</small></span>
            </div>,
        key: v,
        className: !isUsizeAvail && !isOccupiedPosition && isUsizeAvail ? 'NotAvail' : '',
        disabled: !isUsizeAvail, // enable edit current position, for create action disabled
        selectable: isUsizeAvail
      }
      list.push(treeNode)
    })
    return list
  }

  const onSelect = (keys: React.Key[], info: any) => {
    setSelectedKeys([info.node.key])
  }

  return (
    <>
      <Item name='u_size' label={t('BladeContainersPage.u_size')} rules={[{required: true}]}>
        <InputNumber min={1} disabled={props.usizeDisabled} onChange={value => setSelectedUsize(Number(value))} />
      </Item>
      <Item name='rack_id' rules={[{required: props.rackRequired}]} label={t('BladeContainersPage.rack_id')}>
        <Select
          options={racks?.map(r => ({
            label: <div className='RackOptionLabel'><span>{r.name}</span> <small>{datacenters?.find(d => d.id === r.datacenter_id)?.name}</small></div>,
            value: r.id
          }))}
          onChange={value => setSelectedRack(racks?.find(r => r.id === value))}
        />
      </Item>
      {
        selectedRack && selectedUsize &&
        <Item
          name='rack_pos'
          label={t('BlockPage.rack_pos')}
          rules={[{required: true}]}
          valuePropName='checkedKeys'
          trigger='onSelect'
          className='rackPositions'
        >
          <Tree
            blockNode
            onSelect={onSelect}
            className='RackPositionsTree'
            selectedKeys={selectedKeys}
            checkedKeys={selectedKeys}
            treeData={treeData(selectedRack, selectedUsize)}
          />

        </Item>
      }
    </>
  )
}

export default RackPositionsFormItem