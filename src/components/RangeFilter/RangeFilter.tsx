import React, {useEffect, useState} from 'react'
import moment, { Moment } from 'moment'
import { useTranslation } from 'react-i18next'
import { DatePicker } from 'antd'
import './RangeFilter.scss'
import { CloseCircleOutlined } from '@ant-design/icons'

import {useSelector} from 'react-redux'
import {AppState} from 'common/models'

const { RangePicker } = DatePicker


type period =
  'ACT_WEEK' |
  'ACT_MONTH' |
  'ACT_QUARTER' |
  'ACT_HALF' |
  'ACT_YEAR' |

  'FIRST_HALF_AGO' |
  'SECOND_HALF_AGO' |
  'THIRD_HALF_AGO' |

  'PREV_WEEK' |
  'PREV_MONTH' |
  'PREV_QUARTER' |
  'PREV_YEAR' |

  'TWO_MONTH_AGO' |
  'TWO_QUARTER_AGO' |
  'TWO_YEAR_AGO' |

  'THREE_MONTH_AGO' |
  'THREE_QUARTER_AGO' |
  'THREE_YEAR_AGO' |

  'MONTH_BEFORE_YEAR' |
  'QUARTER_BEFORE_YEAR'

interface Props {
  periods: period[]
  onSelect: (Array: [Moment, Moment] | undefined) => void
  [propName: string]: {}
}


const RangeFilter = React.forwardRef(({ periods, onSelect, ...rest }: Props, ref) => {
  const { t } = useTranslation()
  const [range, setRange] = useState<[Moment, Moment]>()
  const actHalfYear: number = (moment().quarter() < 3) ? 1 : 2

  const {customer} = useSelector((state: AppState) => state.customer)
  const {customerservices} = useSelector((state: AppState) => state.customerservice)

  const [start, setStart] = useState<string>()
  const [end, setEnd] = useState<string>()

  useEffect(() => {
    const billing_period = customer?.billing_period
    if (customerservices && customerservices.length > 0) {
      const refer = customerservices.find(item => item.invoiced_by != null || item.date_from != null)
      const start_date = refer?.invoiced_by ? moment(refer?.invoiced_by).add(1,'day').format() : refer?.date_from
      setStart(start_date)
      switch (billing_period) {
        case 'month':
          const t = moment(start_date).endOf('month')
          setEnd(t.format())
          break
        case 'quarter_year':
          const t1 = moment(start_date).add(2,'month').endOf('month')
          setEnd(t1.format())
          break
        case 'half_year':
          const t2 = moment(start_date).add(5,'month').endOf('month')
          setEnd(t2.format())
          break
        case 'year':
          const t3 = moment(start_date).add(1,'year')
          setEnd(t3.format())
          break
      }
    }
    else {
      setStart('')
    }
  },[customer,customerservices])

  useEffect(() => {
    if (rest.initial === true) {
      setStart(rest.initRange[0].startOf('month').format())
      setEnd(rest.initRange[1].endOf('month').format())
    }
  },[rest])

  const getRanges = (v) => {
    switch (v) {
      case 'ACT_WEEK':
        return [moment().startOf('isoWeek'), moment().endOf('isoWeek')]
      case 'ACT_MONTH':
        return [moment().startOf('month'), moment().endOf('month')]
      case 'ACT_QUARTER':
        return [moment().startOf('quarters'), moment().endOf('quarter')]
      case 'ACT_HALF':
        if (actHalfYear === 1)
          return [moment().startOf('year'), moment().startOf('year').quarter(1).endOf('month')]
        else
          return [moment().startOf('year').quarter(3).startOf('month'), moment().endOf('year')]
      case 'ACT_YEAR':
        return [moment().startOf('year').startOf('year'), moment().endOf('year')]

      case 'PREV_WEEK':
        return [moment().subtract(1, 'week').startOf('isoWeek'), moment().subtract(1, 'week').endOf('isoWeek')]
      case 'PREV_MONTH':
        return [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      case 'PREV_QUARTER':
        return [moment().subtract(1, 'quarter').startOf('quarter'), moment().subtract(1, 'quarter').endOf('quarter')]
      case 'PREV_YEAR':
        return [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]

      case 'FIRST_HALF_AGO':
        if (actHalfYear === 1)
          return [moment().subtract(1, 'year').month(6).startOf('month'), moment().subtract(1, 'year').endOf('year')]
        if (actHalfYear === 2)
          return [moment().startOf('year'), moment().month(5).endOf('month')]
        break
      case 'SECOND_HALF_AGO':
        if (actHalfYear === 1)
          return [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').month(5).endOf('year')]
        if (actHalfYear === 2)
          return [moment().subtract(1, 'year').month(6).startOf('month'), moment().subtract(1, 'year').endOf('year')]
        break
      case 'THIRD_HALF_AGO':
        if (actHalfYear === 1)
          return [moment().subtract(2, 'year').month(6).startOf('month'), moment().subtract(2, 'year').endOf('year')]
        if (actHalfYear === 2)
          return [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').month(5).endOf('month')]
        break

      case 'TWO_MONTH_AGO':
        return [moment().subtract(2, 'month').startOf('month'), moment().subtract(2, 'month').endOf('month')]
      case 'TWO_QUARTER_AGO':
        return [moment().subtract(2, 'quarter').startOf('quarter'), moment().subtract(2, 'quarter').endOf('quarter')]
      case 'TWO_YEAR_AGO':
        return [moment().subtract(2, 'year').startOf('year'), moment().subtract(2, 'year').endOf('year')]

      case 'THREE_MONTH_AGO':
        return [moment().subtract(3, 'month').startOf('month'), moment().subtract(3, 'month').endOf('month')]
      case 'THREE_QUARTER_AGO':
        return [moment().subtract(3, 'quarter').startOf('quarter'), moment().subtract(3, 'quarter').endOf('quarter')]
      case 'THREE_YEAR_AGO':
        return [moment().subtract(3, 'year').startOf('year'), moment().subtract(3, 'year').endOf('year')]

      case 'MONTH_BEFORE_YEAR':
        return [moment().subtract(1, 'year').startOf('month'), moment().subtract(1, 'year').endOf('month')]
      case 'QUARTER_BEFORE_YEAR':
        return [moment().subtract(1, 'year').startOf('quarter'), moment().subtract(1, 'year').endOf('quarter')]
    }
  }



  const ranges: {} = []

  periods.map(v => {
    let splited = v.split('_')
    let filterName = ''
    let r = getRanges(v)
    if (splited[1] === 'WEEK') {
      splited[0] === 'ACT' ?
        filterName = `${t(`RangeFilter.ACT`)} ${t(`RangeFilter.${splited[1]}`)}` :
        splited[0] === 'PREV' ?
          filterName = `${t(`RangeFilter.PREV`)} ${t(`RangeFilter.${splited[1]}`)}` :
          filterName = `${t(`RangeFilter.${splited[1]}`)} ${r && r[0].week()}`
    }
    if (splited[1] === 'MONTH') {
      filterName = `${r && r[0].format('MMMM')} ${r && r[0].year()}`
    }
    if (splited[1] === 'QUARTER') {
      filterName = `${r && r[0].quarter()} ${t(`RangeFilter.${splited[1]}`)} ${r && r[0].year()}`
    }
    if (splited[1] === 'YEAR') {
      filterName = `${t(`RangeFilter.YEAR`)} ${r && r[0].year()}`
    }
    if (splited[1] === 'HALF') {
      if (splited[0] === 'SECOND') filterName = `${r && r[1].quarter() < 3 ? 1 : 2} ${t('RangeFilter.HALF')} ${r && r[0].year()}`
      if (splited[0] === 'THIRD') filterName = `${r && r[1].quarter() < 3 ? 1 : 2} ${t('RangeFilter.HALF')} ${r && r[0].year()}`
      if (splited[0] === 'ACT') filterName = `${t(`RangeFilter.${splited[0]}`)} ${r && r[0].year()}`
      if (splited[0] === 'FIRST') filterName = `${t(`RangeFilter.${splited[0]}`)} ${r && r[0].year()}`
    }
    if (splited[1] === 'BEFORE') {
      if (splited[0] === 'MONTH') filterName = `${r && r[1].format('MMMM')} ${r && r[0].year()}`
      if (splited[0] === 'QUARTER') filterName = `${r && r[1].quarter()} ${t('RangeFilter.QUARTER')} ${r && r[0].year()}`
    }
    return ranges[`${filterName} `] = getRanges(v)
  })

  const handlePicker = (dates) => {
    if (!dates) {
      onSelect(undefined)
      setRange(undefined)
    } else {
      onSelect(dates)
      setRange(dates)
    }
  }

  return (
    <div className='RangeFilter'>

      {
        start &&
        <RangePicker
            defaultValue={[moment(start), moment(end)]}
            onChange={handlePicker}
            format='DD.MM.YYYY'
            clearIcon={<CloseCircleOutlined />}
            ranges={{ ...ranges }}
            {...rest}
        />
      }
      {
        !start &&
        <RangePicker
            onChange={handlePicker}
            format='DD.MM.YYYY'
            clearIcon={<CloseCircleOutlined />}
            ranges={{ ...ranges }}
            {...rest}
        />
      }
    </div>
  )
})

export default RangeFilter
