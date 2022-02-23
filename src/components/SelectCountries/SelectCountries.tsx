import { Select } from 'antd'
import { AppState } from 'common/models'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getCountries from './actions/getCountries'

const { Option } = Select

interface Props {
  // onChange: (value: string) => void
  [propName: string]: {}
}

const SelectCountries = React.forwardRef((props: Props, ref) => {
  const dispatch = useDispatch()
  const { isLoading, countries } = useSelector((state: AppState) => state.countries)

  useEffect(() => {
    dispatch(getCountries())
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
        countries && Object.keys(countries).map(
          (key: string) =>
            <Option key={key} value={key} id={countries[key]}>
              {`(${key}) ${countries[key]} `}
            </Option>
        )
      }
    </Select>
  )
})

export default SelectCountries