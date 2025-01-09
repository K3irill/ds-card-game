import React, { useContext } from 'react'
import styles from './Header.module.scss'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { AppContext, GameContext } from '../../context/Context'

const Header = () => {
  const navigate = useNavigate()
  const appContext = useContext(AppContext)
  if (!appContext) {
    throw new Error('AppContext must be used within an AppProvider')
  }
  const { user } = appContext

  const gameContext = useContext(GameContext)
  if (!gameContext) {
    throw new Error('GameContext must be used within an GameProvider')
  }
  const { isStarted } = gameContext

  let location = useLocation()
  const isActive = (path: string) => location.pathname === path

  const handleLinkClick = (path: string) => {
    if (!isStarted) {
      navigate(path)
    } else {
      alert('Сначала завершите или остановите игру! пж пж пж пж ')
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Link to="/">
          <img src="/icons/logo.svg" alt="logo" />
        </Link>
      </div>
      <nav className={styles['header__nav']}>
        <ul className={styles['header__nav-list']}>
          <li className={styles['header__nav-item']}>
            <button
              onClick={() => handleLinkClick('/results')}
              aria-disabled={isActive('/results')}
              className={` ${styles['header__nav-link']} ${
                isActive('/results') ? styles['header__nav-link--active'] : ''
              }`}
            >
              results
            </button>
          </li>
          <li className={styles['header__nav-item']}>
            <button
              onClick={() => handleLinkClick('/')}
              aria-disabled={isActive('/')}
              className={` ${styles['header__nav-link']} ${
                isActive('/') ? styles['header__nav-link--active'] : ''
              }`}
            >
              Board
            </button>
          </li>
          <li className={styles['header__nav-item']}>
            <button
              onClick={() => handleLinkClick('/settings')}
              aria-disabled={isActive('/settings')}
              className={` ${styles['header__nav-link']} ${
                isActive('/settings') ? styles['header__nav-link--active'] : ''
              }`}
            >
              settings
            </button>
          </li>
        </ul>
      </nav>
      <a
        onClick={() => handleLinkClick('/results')}
        className={styles['header__user']}
      >
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
      </a>
    </header>
  )
}

export default Header
