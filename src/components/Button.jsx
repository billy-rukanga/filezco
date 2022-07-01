import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.css'

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  uploadProgress: PropTypes.number
}

export default function Button ({
  onClick,
  disabled,
  uploadProgress,
  children
}) {
  return (
    <button className={styles.btn} disabled={disabled} onClick={onClick}>
      <span className={styles.loader} style={{ width: uploadProgress }} />
      {children}
    </button>
  )
}
