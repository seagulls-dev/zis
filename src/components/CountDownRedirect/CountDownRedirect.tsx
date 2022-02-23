import Button from 'antd-button-color'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { RouteComponentProps } from 'react-router-dom'

interface Props { value: number, url: string }

type AllProps = RouteComponentProps<{}> & Props

const CountDownRedirect: React.FunctionComponent<AllProps> = (props) => {
  const { t } = useTranslation()
  const [counter, setCounter] = React.useState(props.value)
  const [isCanceled, setCanceled] = React.useState<boolean>()

  React.useEffect(() => {
    counter > 0 && setTimeout(
      () => setCounter(counter - 1)
      , 1000)
    counter === 0 && !isCanceled && props.history.push('/billing/invoice')
    //eslint-disable-next-line 
  }, [counter])

  return (!isCanceled ? <>{t('countedDownRedirect.redirect-after')} {counter} {t('countedDownRedirect.sec')} <Button onClick={() => setCanceled(true)}>Cancel</Button> </> : <></>)
}

export default CountDownRedirect