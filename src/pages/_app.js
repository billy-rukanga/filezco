import React from 'react'
import PropTypes from 'prop-types'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/globals.css'

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
}

function MyApp ({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  )
}

export default MyApp
