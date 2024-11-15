import React, { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import NavButton from '../../components/buttons/NavButton.tsx'
import { Menu } from '../../interfaces/DataInterface.ts'
import IconButton from '../../components/buttons/IconButton.tsx'
import Logo from '../../components/forImg/Logo.tsx'
import useHideHeader from '../../hooks/useHideHeader.ts'

interface HeaderProps {
  content: Menu
}
function Header({ content }: HeaderProps) {
  const [headerHidden, setHeaderHidden] = useHideHeader()

  return (
    <header
      className={`${styles.header} ${styles['header--' + headerHidden]} `}
    >
      <div className={`${styles.header__container} __container`}>
        <div className={styles['header__logo-block']}>
          <Logo url={content.logo} />
        </div>
        <nav className={styles.header__navigation}>
          <ul className={styles['header__nav-list']}>
            {content.header?.map((item) => {
              return (
                <li key={item.label} className={styles['header__nav-item']}>
                  <NavButton buttonName={item.label} />
                </li>
              )
            })}
          </ul>
        </nav>
        <div className={styles['header__search-block']}>
          <IconButton url="/icons/search.svg" />
          <a className={styles['header__link-ebac']} href="/">
            EBAC
            <span>
              <img src="/icons/arrow.svg" alt="to outside" />
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
