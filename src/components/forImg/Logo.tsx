import React from 'react'
import styles from './Logo.module.scss'

interface LogoProps {
  url: string
}

function Logo({ url }: LogoProps) {
  return (
    <div className={styles.logo}>
      <a className={styles.logo__link} href="/">
        <img className={styles.logo__img} src={url} alt="logo" />
      </a>
    </div>
  )
}

export default Logo
