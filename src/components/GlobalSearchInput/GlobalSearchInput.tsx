import React from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

interface Props {
  dataSource?: any[]
  filteredData?: ( data: any[] ) => void
  searchValue?: ( value: string ) => void
  searchBy?: string[]
}

const GlobalSearchInput = ( props: Props ) => {

  const search = ( value: string, searchBy: string[] = [ 'name' ] ) => {
    const baseData = props.dataSource
    const filterTable = baseData?.filter( o =>
      Object.keys( o ).some( k =>
        searchBy.some( v => v === k ) &&
        String( o[ k ] )
          .toLowerCase()
          .includes( value.toLowerCase() )
      )
    )
    props.filteredData && filterTable && props.filteredData( filterTable )
  }

  const onSearch = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    let value = e.currentTarget.value
    props.searchValue && props.searchValue( value )
    search( value, props.searchBy )
  }

  return (
    <>
      <Input
        placeholder={ `Search by: ${ props.searchBy?.map( v => ( `${ v } ` ) ) }` }
        onChange={ onSearch }
        style={ { width: 300 } }
        allowClear
        suffix={ <SearchOutlined /> }
      />
    </>
  )
}

export default GlobalSearchInput