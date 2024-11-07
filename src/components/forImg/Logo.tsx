import React from 'react'
import styles from './Logo.module.scss'

interface LogoProps {
  url: string
}

function Logo({ url }: LogoProps) {
  return (
    <div className={styles.logo}>
      <a href="/">
        <div
          className={styles.logo__mask}
          style={{
            maskImage: `url(${url})`,
            WebkitMaskImage: `url(${url})`,
          }}
        />
      </a>
    </div>
  )
}

export default Logo
