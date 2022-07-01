import React from 'react'
import { signOut } from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import { PropTypes } from 'prop-types'
import styles from './Popover.module.css'

Popover.propTypes = {
  show: PropTypes.bool
}
export default function Popover ({ show }) {
  async function onLogout () {
    await signOut()
    window.location.href = '/'
  }

  return (
    <React.Fragment>
      {show &&
        <div className={`card ${styles.popover}`}>
          <button className={styles.btn} onClick={onLogout}>
            <i className="bi bi-box-arrow-right" />
            <span style={{ marginLeft: 4 }}>Signout</span>
          </button>
        </div>}
    </React.Fragment>
  )
}
