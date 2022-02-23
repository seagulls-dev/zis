import Button from 'antd-button-color'
import { AppState } from 'common/models'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import getInvoiceDocumentByInvoice from '../invoicedocument/actions/getInvoiceDocumentByInvoice'

interface ParamTypes {
  id: string
}


const InvoiceDocumentPage = () => {
  const { id } = useParams<ParamTypes>()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { document } = useSelector((state: AppState) => state.invoicedocument)

  useEffect(() => {
    id && dispatch(getInvoiceDocumentByInvoice(Number(id)))
    //eslint-disable-next-line
  }, [])

  return (
    document && document.content.length > 0 &&
    <>
      <Link to={`/billing/invoice/edit/${id}`}>
        <Button>{t('billing.invoicedocument.back')}</Button>
      </Link>
      <object type='application/pdf'
        data={`data:application/pdf;base64,${document.content}`}
        style={{ width: '100%', height: '100%' }}>
      </object>
    </>
  )
}

export default InvoiceDocumentPage
