import React, { useContext, useRef, useState } from 'react'
import styles from './Settings.module.scss'
import { AppContext, GameContext } from '../../../context/Context'
import GameSettings from '../../../components/Setting/GameSettings'
import UserSettings from '../../../components/Setting/UserSettings'
const Settings = () => {
  const appContext = useContext(AppContext)
  if (!appContext) {
    throw new Error('AppContext must be used within an AppProvider')
  }
  const { setUser } = appContext

  const gameContext = useContext(GameContext)
  if (!gameContext) {
    throw new Error('GameContext must be used within an GameProvider')
  }

  return (
    <div className={styles['settings-menu']}>
      <GameSettings />
      <hr className={styles['settings-menu__hr-line']} />
      <UserSettings />
    </div>
  )
}

export default Settings
