import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { animated, useSpring } from '@react-spring/web'
import Button from './Button'
import styles from './Dropzone.module.css'

export default function Dropzone () {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  const [loading, setLoading] = useState(true)

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
      if (files.length > 0) setLoading(false)
      else setLoading(true)
    },
    [files]
  )

  const handleUpload = async () => {
    setLoading(true)
    const formData = new FormData()
    const file = acceptedFiles[0]
    formData.append(file.path, file)
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: file.path })
      })
      const data = await response.json()
      await fetch(data.url, {
        method: 'POST',
        body: formData
      })
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
          <p>
            Drag &apos;n&apos; drop some files here, or click to select files
          </p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>
            {files}
          </ul>
        </aside>
        <Button onClick={handleUpload} loading={loading} />
      </section>
    </animated.div>
  )
}
