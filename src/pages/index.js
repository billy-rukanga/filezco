import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Dropzone from '../components/Dropzone'
import styles from '../styles/Home.module.css'
import Background from '../components/Background'

export default function Home () {
  return (
    <div className={styles.container}>
      <Head>
        <title>filezco | share files</title>
        <meta name="description" content="Share files" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Image src="/logo.png" alt="fz" width={48} height={48} />
      </header>

      <main className={styles.main}>
        <div className={styles.flexItemRight}>
          <Dropzone/>
        </div>
        <div className={styles.flexItemLeft}>
          <h1>
            Simple.<span className="text-color-secondary">Easy</span><br />
            <span className="text-color-primary">Sharing</span>
          </h1>
        </div>
      </main>
      <Background />
      <footer className={styles.footer}>
        <span style={{ fontWeight: 'bold', marginLeft: 4 }}> filezco</span>
      </footer>
    </div>
  )
}
