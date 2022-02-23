import React, { useState } from 'react'
import { Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Item from 'antd/lib/form/FormItem'

interface Props {
  passImage: (avatar: string) => void
  savedAvatar?: string
}

const AvatarUpload = (props: Props) => {
  const { passImage } = props
  const { t } = useTranslation()
  const [avatarUrl, setAvatarUrl] = useState()
  const [loading, setloading] = useState(false)

  const getBase64 = (img: Blob, callback: (args: any) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const normFile = (e: any) => {
    if (Array.isArray(e)) { return e }
    if (e.fileList.length > 1) { e.fileList.shift() }
    return e && e.fileList
  }

  // const customRequest = ({ file, onSuccess }) => {
  //   setTimeout(() => {
  //     onSuccess('ok')
  //   }, 0)
  // }

  const uploadProps = {
    onChange(info: any) {
      if (info.file.status === 'uploading') {
        setloading(true)
        return
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, imageUrl => {
          setAvatarUrl(imageUrl)
          passImage(imageUrl)
        })
        message.success(t('createUserPage.upload_done', { filename: info.file.name }), 5)
      } else if (info.file.status === 'error') {
        message.error(t('createUserPage.upload_failed', { filename: info.file.name }), 5)
      }
    },
  }
  const uploadButton = (
    <div className='avatarUploadBox'>
      {
        loading ?
          <LoadingOutlined /> :
          <PlusOutlined />
      }
      <div className='ant-upload-text'>Upload</div>
    </div>
  )


  return (
    <Item
      // label={t('createUserPage.avatar')}
      valuePropName='fileList'
      getValueFromEvent={normFile}
      className='AvatarUpload alignCenter'
    >
      <Upload
        {...uploadProps}
        data={avatarUrl}
        listType='picture-card'
        className='avatarUploader'
        showUploadList={false}
        beforeUpload={() => false}
      >
        {
          avatarUrl ?
            <div className='alignCenter'>
              <img src={avatarUrl} alt='avatar' style={{ width: '100%' }} />
            </div> :
            uploadButton
        }

      </Upload>
    </Item>
  )

}

export default AvatarUpload