import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { PropTypes } from 'prop-types'
import supertokensNode from 'supertokens-node'
import Session from 'supertokens-node/recipe/session'
import Dropzone from '../components/Dropzone'
import styles from '../styles/Home.module.css'
import { backendConfig } from '../config/backendConfig'

export async function getServerSideProps (context) {
  // this runs on the backend, so we must call init on supertokens-node SDK
  supertokensNode.init(backendConfig())
  let session
  try {
    session = await Session.getSession(context.req, context.res)
  } catch (err) {
    if (err.type === Session.Error.TRY_REFRESH_TOKEN) {
      return { props: { fromSupertokens: 'needs-refresh' } }
    } else if (err.type === Session.Error.UNAUTHORISED) {
      return { props: {} }
    } else {
      throw err
    }
  }

  return {
    props: { userId: session.getUserId() }
  }
}

Home.propTypes = {
  userId: PropTypes.string
}
export default function Home ({ userId }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>filezco | share files</title>
        <meta name="description" content="Share files" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Image src="/logo.png" alt="fz" width={64} height={64} />
        <div className={`flex ${styles.title}`}>
          <a>Upload</a>
          <a>Board</a>
          <a>Features</a>
        </div>
        {userId
          ? <p>
              <img
                src="https://ui-avatars.com/api/?name=John+Doe&rounded=true&size=54"
                alt="avatar"
              />
            </p>
          : <div className="flex">
              <Link href="/auth">
                <a>Sign up</a>
              </Link>
              <button>
                <Link href="/auth">Get Started</Link>
              </button>
            </div>}
      </header>

      <main className={styles.main}>
        <div className={styles.flexItemRight}>
          <Dropzone />
        </div>
        <div className={styles.flexItemLeft}>
          <h1>
            Simple.<br />
            <span className="text-color-primary">Sharing</span>
          </h1>
        </div>
      </main>

      <footer className={styles.footer}>
        Powered by{' '}
        <span style={{ fontWeight: 'bold', marginLeft: 4 }}> filezco</span>
      </footer>
    </div>
  )
}
