import React, { Fragment, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { animated, useSpring } from '@react-spring/web'
import axios from 'axios'
import { PropTypes } from 'prop-types'
import Button from './Button'
import styles from './Dropzone.module.css'
import { Circle } from 'rc-progress'

Dropzone.propTypes = {
  user: PropTypes.string
}

export default function Dropzone ({ user }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [accessUrl, setAccessUrl] = useState()
  const [uploadProgress, setUploadProgress] = useState(0)
  const [step, setStep] = useState('default')
  const [error, setError] = useState()

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
      if (files.length > 0) {
        setDisabled(false)
        setError()
      } else setDisabled(true)
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
    setError()
    setStep('Creating upload link')
    const file = acceptedFiles[0]
    try {
      const response = await fetch('api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: file.path,
          content_type: file.type
        })
      })
      const data = await response.json()
      // uploading file
      setStep('Uploading file')
      const config = {
        headers: {
          'content-type': file.type,
          'x-amz-acl': 'private'
        },
        onUploadProgress: function (progressEvent) {
          setUploadProgress(
            Math.round(progressEvent.loaded * 100 / progressEvent.total)
          )
        }
      }

      const formData = new FormData()
      formData.append('file', file)
      await axios.put(data.url, formData, config)

      // get signed file url
      setStep('Signing url')
      const signedUrl = await fetch('api/download-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: file.path })
      })
      let { url } = await signedUrl.json()
      url = manageUrl(url)
      setAccessUrl(url)
      setStep('default')
    } catch (error) {
      console.log(error)
      setStep('default')
      setError('Failed to upload. Try again')
    } finally {
      setLoading(false)
    }
  }

  const shareLink = () => {
    navigator.clipboard.writeText(accessUrl)
    alert('link copied to clipboard')
    window.location.href = '/'
  }
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 1
      }}
    >
      {step === 'default'
        ? <animated.div style={springStyles}>
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
                onClick={() => (accessUrl ? shareLink() : handleUpload())}
                disabled={disabled || loading}
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
              {error &&
                <p style={{ color: 'red' }}>
                  {error}
                </p>}
            </section>
          </animated.div>
        : <Progress step={step} percent={uploadProgress} />}
    </div>
  )
}

const Progress = ({ step, percent }) =>
  <div
    className="card"
    style={{
      width: 400,
      maxWidth: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}
  >
    <Circle
      style={{ width: '60%', marginBottom: 16 }}
      percent={percent}
      strokeWidth={6}
      strokeColor="#8900ff"
    />
    <p>
      {step}
    </p>
  </div>

Progress.propTypes = {
  percent: PropTypes.number,
  step: PropTypes.string
}
