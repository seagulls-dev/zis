import React, { useEffect } from 'react'
import { Card, Input, Space, InputNumber, message, Skeleton } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined, SaveOutlined } from '@ant-design/icons/lib/icons'
import { Form } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import Button from 'antd-button-color'
import PopConfirmZis from 'components/popconfirm/PopConfirmZis'
import deleteCostAllocation from './actions/deleteCostAllocation'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'common/models'
import getCostAllocations from './actions/getCostAllocations'
import createCostAllocation from './actions/createCostAllocation'
import { useTranslation } from 'react-i18next'
import updateCostAllocation from './actions/updateCostAllocation'

const { Item, List } = Form

const CostAllocationsPage = () => {
  const { t } = useTranslation()
  const [form] = useForm()
  const dispatch = useDispatch()

  const { costallocations, isLoading } = useSelector((state: AppState) => state.costallocation)

  useEffect(() => {
    !costallocations && dispatch(getCostAllocations())
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    form.resetFields()
    //eslint-disable-next-line
  }, [costallocations])

  return (
    <>

      <Card
        title={t('billing.cost-allocation.page-title')}
        className='CostAllocationsPage'
        style={{ width: 'max-content' }}
        headStyle={{ background: 'grey' }}
      >

        {
          isLoading ? <Skeleton /> :
            <Form
              form={form}
              name='dynamic_form_nest_item'
              autoComplete='off'
              initialValues={{ costallocations }}
            >
              <List name='costallocations'>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <Space
                        key={field.key}
                        style={{ display: 'flex', marginBottom: 8 }}
                        align='baseline'
                      >

                        <Item
                          {...field}
                          name={[field.name, 'id']}
                          fieldKey={[field.fieldKey, 'id']}
                        >
                          <InputNumber className='idInput' disabled />
                        </Item>
                        <Item
                          {...field}
                          name={[field.name, 'name']}
                          fieldKey={[field.fieldKey, 'name']}
                          rules={[{ required: true, message: 'Missing name' }]}
                        >
                          <Input placeholder='Name' className='nameInput' />
                        </Item>

                        {
                          index === fields.length - 1
                            ?
                            <Item fieldKey={[field.fieldKey, 'addButton']} >
                              <Button
                                onClick={() => add({ id: form.getFieldValue('costallocations').length + 1 })}
                                icon={<PlusCircleOutlined />}
                                type='success'
                              />
                            </Item>
                            :
                            <>
                              <Item fieldKey={[field.fieldKey, 'removeButton']}>

                                <PopConfirmZis
                                  onConfirm={() => {
                                    const name = form.getFieldValue('costallocations')[index].name
                                    const id = form.getFieldValue('costallocations')[index].id
                                    name && dispatch(deleteCostAllocation(id))
                                    remove(field.name)
                                  }}
                                  placement='right'
                                >
                                  <Button type='danger' icon={<MinusCircleOutlined />} />
                                </PopConfirmZis>

                              </Item>
                            </>
                        }


                        <Item fieldKey={[field.fieldKey, 'saveButton']}>
                          <Button
                            onClick={() => {
                              const id = form.getFieldValue('costallocations')[index].id
                              const name = form.getFieldValue('costallocations')[index].name
                              id ?
                                dispatch(updateCostAllocation({ id, name }, isSuccess => isSuccess && message.info(t('billing.cost-allocation.updated')))) :
                                name ?
                                  dispatch(createCostAllocation({ name }, isSuccess => isSuccess && message.info(t('billing.cost-allocation.created')))) :
                                  form.validateFields()
                            }}
                            icon={<SaveOutlined />}
                            type='info'
                          />
                        </Item>

                      </Space>
                    ))}

                  </>
                )}
              </List>
            </Form>

        }
      </Card>

    </>
  )
}

export default CostAllocationsPage