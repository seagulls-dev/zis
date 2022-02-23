import { Select } from 'antd'
import { AppState } from 'common/models'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getCurrencies from './actions/getCurrencies'

const { Option } = Select

interface Props {
  // onChange: (value: string) => void
  [propName: string]: {}
}

const SelectCurrencies = React.forwardRef((props: Props, ref) => {
  const dispatch = useDispatch()
  const { currencies, isLoading } = useSelector((state: AppState) => state.currencies)

  useEffect(() => {
    !currencies && dispatch(getCurrencies())
    //eslint-disable-next-line
  }, [])

  return (
    <Select
      {...props}
      loading={isLoading}
      showSearch
      optionFilterProp='id'
    >
      {
        currencies && Object.keys(currencies).map(
          (key: string) =>
            <Option key={key} value={currencies[key]} id={currencies[key]}>
              {currencies[key]}
            </Option>
        )
      }
    </Select>
  )
})

export default SelectCurrencies