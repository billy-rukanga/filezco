import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.css'

Button.propTypes = {
  onClick: PropTypes.func,
  loading: PropTypes.bool
}

export default function Button ({ onClick, loading }) {
  return (
    <button className={styles.btn} disabled={loading} onClick={onClick}>
      Upload
    </button>
  )
}
