import Button from 'antd-button-color'
import { AppState } from 'common/models'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Skeleton } from 'antd'
import getAttachContentById from '../invoicedocument/actions/getAttachContentById'

interface ParamTypes {
  id: string
  mime_type: string
}

const InvoiceAttachmentPage = () => {
  const { id, mime_type } = useParams<ParamTypes>()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { baseContent } = useSelector((state: AppState) => state.invoicedocument)

  const type = mime_type.split('-').join('/')

  useEffect(() => {
    id && dispatch(getAttachContentById(Number(id)))
  },[])


  return (
      <>
        <Link to={`/billing/invoice/edit`}>
          <Button>{t('billing.invoicedocument.back')}</Button>
        </Link>
        {
          baseContent?
            <>
              {
                mime_type.includes('image') && <img src={`data:image/${mime_type};base64, ${baseContent}`}/>
              }
              {
                mime_type.includes('pdf') &&
                <object type='application/pdf'
                        data={`data:application/pdf;base64, ${baseContent}`}
                        style={{ width: '100%', height: '100%' }}>
                </object>
              }
            </>
            :
            <Skeleton active />
        }
      </>
  )
}

export default InvoiceAttachmentPage
