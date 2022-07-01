import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { PropTypes } from 'prop-types'
import supertokensNode from 'supertokens-node'
import Session from 'supertokens-node/recipe/session'
import styles from '../../styles/Home.module.css'
import { backendConfig } from '../../config/backendConfig'
import Account from '../../components/Account'
import Background from '../../components/Background'
import Button from '../../components/Button'

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
  const router = useRouter()
  const { url } = router.query
  const [link, setLink] = React.useState('')

  React.useEffect(() => {
    setLink(
      process.env.NEXT_PUBLIC_URL +
        '/' +
        url[0] +
        '/' +
        url[1] +
        '/' +
        window.location.search
    )
  }, [])

  console.log(link)

  return (
    <div className={styles.container}>
      <Head>
        <title>filezco | share files</title>
        <meta name="description" content="Share files" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Link href="/">
          <Image src="/logo.png" alt="fz" width={48} height={48} />
        </Link>
        {userId
          ? <Account />
          : <button>
              <Link href="/auth">Get Started</Link>
            </button>}
      </header>

      <main className={styles.main}>
        <div className={styles.flexItemRight}>
          <div
            className="card"
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
            <p>
              {url[1]}
            </p>
            <br />
            <Link href={link} download>
              <Button>
                <i className="bi bi-arrow-bar-down" />
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
            Simple.<span className="text-color-secondary">Easy</span>
            <br />
            <span className="text-color-primary">Sharing</span>
          </h1>
        </div>
      </main>
      <Background />
      <footer className={styles.footer}>
        Powered by{' '}
        <span style={{ fontWeight: 'bold', marginLeft: 4 }}> filezco</span>
        <span>Powered by Hashnode and Linode</span>
      </footer>
    </div>
  )
}
