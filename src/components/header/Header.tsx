import React from 'react'
import styles from './Header.module.scss'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
} from 'react-router-dom'
import GamePage from '../../pages/game-page/GamePage'
interface user {
  name: string
  tag: string
  img: string
  id: number
}
const Header = () => {
  let location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const user: user = {
    name: 'nePROSTOchel2024',
    tag: '@prochel',
    img: 'https://cdn1.ozone.ru/s3/multimedia-5/6349201877.jpg',
    id: 1,
  }
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Link to="/board">
          <img src="/icons/logo.svg" alt="logo" />
        </Link>
      </div>
      <nav className={styles['header__nav']}>
        <ul className={styles['header__nav-list']}>
          <li className={styles['header__nav-item']}>
            <Link
              to="/results"
              aria-disabled={isActive('/results')}
              className={` ${styles['header__nav-link']} ${
                isActive('/results') ? styles['header__nav-link--active'] : ''
              }`}
            >
              results
            </Link>
          </li>
          <li className={styles['header__nav-item']}>
            <Link
              to="/board"
              aria-disabled={isActive('/board')}
              className={` ${styles['header__nav-link']} ${
                isActive('/board') ? styles['header__nav-link--active'] : ''
              }`}
            >
              Board
            </Link>
          </li>
          <li className={styles['header__nav-item']}>
            <Link
              to="/settings"
              aria-disabled={isActive('/settings')}
              className={` ${styles['header__nav-link']} ${
                isActive('/settings') ? styles['header__nav-link--active'] : ''
              }`}
            >
              settings
            </Link>
          </li>
        </ul>
      </nav>
      <Link to="/results" className={styles['header__user']}>
        <div className={styles['header__user-wrapper']}>
          {user ? (
            <>
              <div className={styles['header__user-info']}>
                <p className={styles['header__user_name']}>{user.name}</p>
                <p className={styles['header__user_tag']}>{user.tag}</p>
              </div>

              <div>
                <img
                  className={styles['header__user_avatar']}
                  src={user.img}
                  alt="avatarka"
                />
              </div>
            </>
          ) : (
            <>
              <p className={styles['header__user_name']}>Player</p>
              <div>
                <img
                  className={styles['header__user_avatar']}
                  src="https://i.pinimg.com/736x/74/4f/8f/744f8f1fe02667b7260dcecf7001e1d6.jpg"
                  alt="avatar"
                />
              </div>
            </>
          )}
        </div>
      </Link>
    </header>
  )
}

export default Header
