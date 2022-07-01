import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.css'

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node
}

export default function Button ({
  onClick,
  disabled,
  children
}) {
  return (
    <button className={styles.btn} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
