import React from 'react'
import {Radar} from '@ant-design/charts'
import {AppState} from 'common/models'
import {useSelector} from 'react-redux'
import moment from 'moment'

interface Props { }

const UserChart = (props: Props) => {
  const {isLoading, users} = useSelector((state: AppState) => state.user)
  const indexes = [3, 2, 1, 0, 11, 10, 9, 8, 7, 6, 5, 4,]
  const monthes = moment.monthsShort()

  // useEffect(() => {
  // dispatch(getAllUsers(cb => { }, 'roles,company'))
  // eslint-disable-next-line 
  // }, [])

  const config = {
    loading: isLoading,
    data: indexes.map(i => ({name: monthes[i], star: moment(users?.find(user => moment.unix(user.created_at).format('MMM') === monthes[i])?.created_at).format('MM')})),
    xField: 'name',
    yField: 'star',
    meta: {
      star: {
        alias: 'name',
        min: 0,
        nice: true,
      },
    },
    xAxis: {
      line: null,
      tickLine: null,
    },
    yAxis: {
      label: false,
      grid: {
        alternateColor: 'rgba(0, 0, 0, 0.04)',
      },
    },

    point: {},
    area: {},
  }

  return (
    <>
      <Radar {...config} />
      {/* <Line {...config} chartRef={ref} /> */}
    </>
  )
}

export default UserChart