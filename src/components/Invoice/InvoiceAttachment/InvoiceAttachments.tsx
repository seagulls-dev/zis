import React, { useEffect, useRef, useState } from 'react'
import { Modal, Progress, Upload, Skeleton } from 'antd'
import { CloudDownloadOutlined, PlusOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { UploadFile } from 'antd/es/upload/interface'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import createInvoiceAttachment from './actions/createInvoiceAttachment'
import { AppState } from 'common/models'
import getInvoiceAttachment from './actions/getInvoiceAttachment'
import getInvoiceAttachments from './actions/getInvoiceAttachments'
import { InvoiceAttachmentDetails } from './models'
import deleteInvoiceAttachment from './actions/deleteInvoiceAttachment'
import './InvoiceAttachment.scss'
import Button from 'antd-button-color'
import getInvoice from 'pages/billing/invoice/actions/getInvoice'
import {protectedApiClient} from 'helpers/api'
import { useTranslation } from 'react-i18next'

interface ParamTypes {
  id: string
}

const InvoiceAttachment = () => {
  const { id: invoice_id } = useParams<ParamTypes>()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState()
  const [previewMimeType, setPreviewMimeType] = useState<string>()
  const [previewName, setPreviewName] = useState<string>()
  const [fileList, setFileList] = useState<any[] | undefined>([])
  const [progress, setProgress] = useState(0)

  const { invoice } = useSelector((state: AppState) => state.invoice)
  const { invoiceattachments, isSaving } = useSelector((state: AppState) => state.invoiceattachment)

  const [downloading, setDownloading] = useState<boolean>(false)

  const mounted = useRef(true)

  useEffect(() => {
    if (invoice.id !== Number(invoice_id)) {
      return
    }
    //until upload component's fileList become invoice's attachments, select not in invoice's attachments
    if (invoice.attachments?.length !== fileList?.length) {
      setFileList(
        invoice.attachments?.map(attch => {
          if (!fileList?.find(file => file?.uid === attch.id && !file.percent))
            return {
              uid: attch.id,
              name: attch.name,
              invoice_id: Number(invoice_id),
              // status: 'uploading',
              mime_type: attch.mime_type
            }
        })
      )
    }
    //eslint-disable-next-line
  }, [invoice])

  useEffect(() => {
    //when fileList reaches attachments of invoice
    setTimeout(() => {
      mounted.current = true
      if (

        invoice.attachments?.length &&
        invoice.attachments?.length === fileList?.length
      ) {
        invoice.attachments.forEach(
          (att: InvoiceAttachmentDetails) => {
            // prevent dispatch double (existed) in redux state "invoiceattachments"
            (!invoiceattachments || !(invoiceattachments.some(v => v.id === att.id))) && mounted.current &&
              dispatch(getInvoiceAttachment(att.id, progressEvent => {
                const percent = Math.floor((progressEvent.loaded / progressEvent.total) * 100)
                setFileList(fileList.map(
                  file => file?.uid === att.id ? { ...file, percent, } : { ...file }
                ))
                return () => { mounted.current = false }
              }))
          }
        )
      }
    }, 500)
    //eslint-disable-next-line
  }, [fileList?.length])

  useEffect(() => {
    mounted.current = true
    if (
      mounted.current &&
      invoiceattachments?.length &&
      invoiceattachments?.length === fileList?.length
    )
      setFileList(invoiceattachments?.map(attch => {
        if (attch.invoice_id === Number(invoice_id)) {
          return {
            uid: attch.id,
            name: attch.name,
            invoice_id: Number(invoice_id),
            percent: 100,
            status: 'done',
            // url: `data:${attch.mime_type};base64,${attch.content}`,
            // thumbUrl: `data:${attch.mime_type};base64,${attch.content}`,
            mime_type: attch.mime_type
          }
        }
      }))
    return () => { mounted.current = false }
    //eslint-disable-next-line
  }, [invoiceattachments?.length])


  const handleCancel = () => setPreviewVisible(false)

  const handlePreview = file => {
    // history.push(`/billing/invoice/attach/${file.uid}/${file.mime_type.split('/').join('-')}`)
    // setPreviewVisible(true)
    // setPreviewImage(file.thumbUrl)
    // setPreviewMimeType(file.mime_type)
    // setPreviewName(file.name)
    handleDownload(file)
  }

  const handleDownload = (file) => {
    setDownloading(true)
    protectedApiClient.get<string>(`/billing/invoice-attachment/get-content?id=${file.uid}`,{onDownloadProgress: progressEvent => {
      }})
      .then(response => {
        const downloadLink = document.createElement("a")
        downloadLink.href = `data:${file.mime_type};base64,${response.data}`
        downloadLink.download = file.name
        downloadLink.click()
        setDownloading(false)
      })
      .catch(error => {
        console.log(error)
        setDownloading(false)
      })
  }

  const handleUpload = (info) => {
    if (fileList && info.fileList.length > fileList.length) {
      let reader = new FileReader()
      reader.onload = (e) => {
        info.file.base64 = e.target?.result
        dispatch(
          createInvoiceAttachment({
            invoice_id: Number(invoice_id),
            name: info.file.name,
            content: (e.target?.result as string).split(',')[1]
          },
            (attachment_id, isSuccess) => {
              if (attachment_id) {
                info.file.uid = attachment_id
              }
              !isSuccess ?
                setFileList(info.fileList.filter(v => v.uid !== info.file?.uid))
                :
                dispatch(getInvoiceAttachments(Number(invoice_id)))
            },
            progressEvent => {
              const percent = Math.floor((progressEvent.loaded / progressEvent.total) * 100)
              setProgress(percent)
            })
        )
      }
      reader.readAsDataURL(info.file)
    }
    setFileList(info.fileList)
  }

  const onRemove = (file: UploadFile) => {
    dispatch(
      deleteInvoiceAttachment(
        Number(file.uid),
        isSuccess => isSuccess &&
          dispatch(getInvoiceAttachments(Number(invoice_id)))
      )
    )
  }

  function downloadBase64File(base64Data, fileName) {
    const linkSource = `${base64Data}`
    const downloadLink = document.createElement("a")
    downloadLink.href = linkSource
    downloadLink.download = fileName
    downloadLink.click()
  }

  return (
    <>
      {isSaving ? <Progress percent={progress} /> : null}

      {
        downloading ?
          // <div>{t('billing.invoice.downloading')}</div>
          <Skeleton active />
          :
          <Upload
            className='InvoiceAttachment'
            accept='.png, .pdf, .doc, .docx, .xls, .xlsx, .jpg, .jpeg, .ppt, .pptx'
            listType='text'
            fileList={fileList}
            onPreview={handlePreview}
            onDownload={handleDownload}
            onChange={handleUpload}
            onRemove={onRemove}
            disabled={!invoice_id}
            beforeUpload={() => false}
            maxCount={10}
            showUploadList={{showDownloadIcon: true,downloadIcon: <ArrowDownOutlined />}}
          >

            <Button icon={<PlusOutlined />}>Upload</Button>

          </Upload>
      }

      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={handleCancel}
      >
        {
          previewMimeType?.match('image/*') && <img alt='example' style={{ width: '100%' }} src={previewImage} />
        }

        <Button
          onClick={() => downloadBase64File(previewImage, previewName)}
          icon={<CloudDownloadOutlined style={{ fontSize: 24 }} />}
          style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}
        >
          {previewName}
        </Button>

      </Modal>
    </>
  )

}

export default InvoiceAttachment
