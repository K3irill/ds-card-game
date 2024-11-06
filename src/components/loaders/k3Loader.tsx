import React from 'react'
import styles from './K3Loader.module.scss'

function K3Loader() {
  return (
    <div className={styles.k3loader__wrapper}>
      <div className={styles.k3loader}>
        <p>K</p>
        <img src="/img/heart.svg" alt="" />
      </div>
    </div>
  )
}

export default K3Loader
