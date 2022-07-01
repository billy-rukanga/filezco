import React, { Fragment, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { animated, useSpring } from '@react-spring/web'
import axios from 'axios'
import Button from './Button'
import styles from './Dropzone.module.css'

export default function Dropzone () {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [accessUrl, setAccessUrl] = useState()
  const [uploadProgress, setUploadProgress] = useState(0)

  const springStyles = useSpring({
    loop: { reverse: false },
    from: { x: -400 },
    to: { x: 0 }
  })

  const files = acceptedFiles.map(file =>
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  )

  useEffect(
    () => {
      if (files.length > 0) setDisabled(false)
      else setDisabled(true)
    },
    [files]
  )

  const manageUrl = url => {
    const urlLink = new URL(url)
    return (
      window.location.host + '/download' + urlLink.pathname + urlLink.search
    )
  }

  const handleUpload = async () => {
    setLoading(true)
    const file = acceptedFiles[0]
    const content = new Blob([file], { type: file.type })
    try {
      const response = await fetch('api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          method: 'PUT',
          name: file.path,
          content_type: file.type
        })
      })
      const data = await response.json()
      // uploading file
      const config = {
        headers: { 'content-type': content.type },
        onUploadProgress: function (progressEvent) {
          setUploadProgress(
            Math.round(progressEvent.loaded * 100 / progressEvent.total)
          )
        }
      }
      await axios.put(data.url, content, config)

      // get signed file url
      const signedUrl = await fetch('api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ method: 'GET', name: file.path })
      })
      let { url } = await signedUrl.json()
      url = manageUrl(url)
      setAccessUrl(url)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <animated.div style={springStyles}>
      <section className={styles.container}>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className={styles.uploadIcon}>
            <i className="bi bi-plus-circle" />
            <h6>Add files</h6>
          </div>
        </div>
        {files.length > 0
          ? <aside>
              <h4>Files</h4>
              <ul>
                {files}
              </ul>
            </aside>
          : <br />}
        <Button
          onClick={handleUpload}
          disabled={disabled || loading}
          uploadProgress={uploadProgress}
        >
          {accessUrl
            ? <Fragment>
                <i className="bi bi-share-fill" />
                <span
                  style={{
                    marginLeft: 4
                  }}
                >
                  Share
                </span>
              </Fragment>
            : <Fragment>
                <i className="bi bi-upload" />
                <span
                  style={{
                    marginLeft: 4
                  }}
                >
                  Upload
                </span>
              </Fragment>}
        </Button>
      </section>
    </animated.div>
  )
}
