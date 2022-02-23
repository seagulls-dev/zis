import React, { useEffect, useState } from 'react'
import { ProductDetails, UpdatedProductDetails } from 'pages/billing/product/models'
import { UpdateCustomerServiceParams } from 'pages/billing/customerservice/models'
import { Form, Input, Tree } from 'antd'
import { treeSearch, convertToTree, recursiveReturn } from 'helpers/arrayHelpers'
import { useTranslation } from 'react-i18next'
import './CustomerServiceChildrensTree.scss'
import { FormInstance } from 'antd/lib/form/Form'

interface Props {
  products?: ProductDetails[]
  dataToUpdate?: UpdateCustomerServiceParams
  selectedProduct?: ProductDetails
  form: FormInstance
}
const { Item } = Form

const CustomerServiceChildrensTree = ({ products, dataToUpdate, selectedProduct, form }: Props) => {
  const { t } = useTranslation()
  const [selectedKeys, setSelectedKeys] = useState<number[]>()
  const [filteredTree, setFilteredTree] = useState<UpdatedProductDetails[]>()

  const updateTree = (arr) => arr?.map((val) => {
    let serviceId = dataToUpdate?.children?.find(data => data.product_id === val.id)?.id
    return {
      ...val,
      name:
        <span className='treeBranch'>
          <span>{val.name}</span>
          {
            val.parent_id !== null &&
            <Item
              className='inputWrapper'
              style={{ marginBottom: '0' }}
              name={`${serviceId}-${val.id}-unit_count`}
              initialValue={dataToUpdate?.children?.find(v => v.product_id === val.id)?.unit_count}
            >
              <Input
                ref={ref => Input[val.id] = ref}
                type='number'
                min={0}
                placeholder={t('billing.customer-services.unit_count')}
                addonAfter={val.unit ? val.unit : '...'}
                id={`${val.id}-unit_count`}
              />
            </Item>
          }
        </span>
    }
  })

  useEffect(() => {
    selectedProduct && setFilteredTree(treeSearch(convertToTree(updateTree(products)), selectedProduct.id, true, false))
    //eslint-disable-next-line
  }, [selectedProduct, products])

  useEffect(() => {
    setSelectedKeys(dataToUpdate ? recursiveReturn(dataToUpdate, 'product_id') : [])
  }, [dataToUpdate])


  return (
    <div className='CustomerServiceChildrensTree'>
      {
        selectedProduct && filteredTree && filteredTree[0].children &&
        <Item name='treechilds' label={t('billing.customer-services.childrens')}>
          <Tree
            treeData={filteredTree}
            selectedKeys={selectedKeys}
            expandedKeys={selectedProduct && (selectedProduct.parent_id ? [selectedProduct.parent_id] : [selectedProduct.id])}
            defaultExpandAll
            multiple
            blockNode
            checkStrictly
          />
        </Item>
      }
    </div>

  )
}

export default CustomerServiceChildrensTree
