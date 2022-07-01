import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import SuperTokensReact from 'supertokens-auth-react'
import * as SuperTokensConfig from '../config/frontendConfig'
import Session from 'supertokens-auth-react/recipe/session'
import { redirectToAuth } from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/globals.css'

if (typeof window !== 'undefined') {
  SuperTokensReact.init(SuperTokensConfig.frontendConfig())
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
}

function MyApp ({ Component, pageProps }) {
  useEffect(
    () => {
      async function doRefresh () {
        if (pageProps.fromSupertokens === 'needs-refresh') {
          if (await Session.attemptRefreshingSession()) {
            location.reload()
          } else {
            redirectToAuth()
          }
        }
      }
      doRefresh()
    },
    [pageProps.fromSupertokens]
  )

  if (pageProps.fromSupertokens === 'needs-refresh') {
    // in case the frontend needs to refresh, we show nothing.
    // Alternatively, you can show a spinner.

    return null
  }

  return (
      <Component {...pageProps} />
  )
}

export default MyApp
