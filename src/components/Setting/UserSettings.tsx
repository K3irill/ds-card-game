import React, { useContext, useRef, useState } from 'react'
import { AppContext, GameContext } from '../../context/Context'
import styles from './UserSettings.module.scss'
import TextInput from '../inputs/TextInput'
import SettingsButton from '../buttons/SettingsButton'
const UserSettings = () => {
  const appContext = useContext(AppContext)
  if (!appContext) {
    throw new Error('AppContext must be used within an AppProvider')
  }
  const { settings, setSettings, setUser } = appContext

  const gameContext = useContext(GameContext)
  if (!gameContext) {
    throw new Error('GameContext must be used within an GameProvider')
  }
  const { resetTimer } = gameContext

  const [userName, setUserName] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [avatar, setAvatar] = useState<string | undefined>()
  const [userNameError, setUserNameError] = useState<string | null>(null)
  const [avatarError, setAvatarError] = useState<string | null>(null)

  //user settings
  const changeUserName = () => {
    if (userName.length < 5) {
      setUserNameError('The name is too short!')
      return
    }
    const tag = '@' + userName
    setUser((prev) => ({
      ...prev,
      name: userName,
      tag: `${tag.toLowerCase() + prev.id}`,
    }))
    setUserName('')
    setUserNameError(null)
  }
  const handleAvatarChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const handleUserNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }
  const changeAvatar = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files
    if (!files || files.length === 0) {
      setAvatarError('No file selected')
      return
    }

    const file = files[0]
    const regex = /image\/(svg\+xml|png|jpeg|jpg)/
    if (!regex.test(file.type)) {
      setAvatarError('Invalid file type!')
      return
    }

    const newAvatarUrl = URL.createObjectURL(file)
    setAvatar(newAvatarUrl)

    setUser((prev) => ({
      ...prev,
      img: newAvatarUrl,
    }))
    setAvatarError(null)
  }

  return (
    <div className={styles['settings-menu__user']}>
      <h3>User</h3>
      <div className={styles['settings-menu__user-settings']}>
        <p>User name:</p>
        <div className={styles['settings-menu__user-name']}>
          <TextInput
            value={userName}
            funOnChange={handleUserNameOnChange}
            placeholder={'user name'}
            setValue={setUserName}
            type={'text'}
          />
          <SettingsButton
            type="button"
            text={'change nickname'}
            backg={'#92f95a'}
            onClickFunc={changeUserName}
          />
          {userNameError && (
            <p className={styles['settings-menu__user-error']}>
              {userNameError}
            </p>
          )}
        </div>
        <p>User avatar:</p>
        <div className={styles['settings-menu__user-avatar']}>
          <SettingsButton
            type="button"
            text={'change avatar'}
            backg={'#92f95a'}
            onClickFunc={handleAvatarChange}
          />
          <input
            ref={fileInputRef}
            className={styles['settings-menu__user-avatar-input']}
            type="file"
            name="avatar"
            id="user-avatar"
            onChange={changeAvatar}
          />
          {avatarError && (
            <p className={styles['settings-menu__user-error']}>{avatarError}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserSettings
