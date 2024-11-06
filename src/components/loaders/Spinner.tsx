import React from 'react'
import styles from './Spinner.module.scss'

function Spinner() {
  return (
    <div className={styles.spinner__wrapper}>
      <div className={styles.spinner}>
        <div className={styles.spinner__circle} />
        <div className={styles.spinner__circle} />
        <div className={styles.spinner__circle} />
        <div className={styles.spinner__circle} />
      </div>
    </div>
  )
}

export default Spinner
