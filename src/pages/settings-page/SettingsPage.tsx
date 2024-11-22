import React from 'react'
import Settings from '../../components/Setting/Settings'
import styles from './SettingsPage.module.scss'
const SettingsPage = () => {
  return (
    <div className={styles['settings-page']}>
      <div className={styles['settings-page__container']}>
        <div className={styles['settings-page__headings']}>
          <h2>Game settings</h2>
          <h2>Common settings</h2>
        </div>

        <Settings />
      </div>
    </div>
  )
}

export default SettingsPage
