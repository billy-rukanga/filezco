import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import Background from '../../components/Background'
import Button from '../../components/Button'

export default function Home () {
  const router = useRouter()
  const { url } = router.query
  const [link, setLink] = React.useState('')

  React.useEffect(() => {
    if (url) {
      const urlLink = `${process.env.NEXT_PUBLIC_URL}/${url[0]}${window.location.search}`
      setLink(urlLink)
    }
  }, [url])

  return (
    <div className={styles.container}>
      <Head>
        <title>filezco | share files</title>
        <meta name='description' content='Share files' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header>
        <Link href='/'>
          <Image src='/logo.png' alt='fz' width={48} height={48} />
        </Link>
      </header>

      <main className={styles.main}>
        <div className={styles.flexItemRight}>
          <div
            className='card'
            style={{
              width: 400,
              maxWidth: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1
            }}
          >
            <p>{url && url[1]}</p>
            <br />
            <Link href={link} download>
              <Button>
                <i className='bi bi-arrow-bar-down' />
                <span
                  style={{
                    marginLeft: 4
                  }}
                >
                  Download
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.flexItemLeft}>
          <h1>
            Simple.<span className='text-color-secondary'>Easy</span>
            <br />
            <span className='text-color-primary'>Sharing</span>
          </h1>
        </div>
      </main>
      <Background />
      <footer className={styles.footer}>
        Powered by
        <span style={{ fontWeight: 'bold', marginLeft: 4 }}> filezco</span>
      </footer>
    </div>
  )
}
