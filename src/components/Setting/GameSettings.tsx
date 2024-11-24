import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext, GameContext } from '../../context/Context'
import styles from './GameSettings.module.scss'
import TextInput from '../inputs/TextInput'
import SettingsButton from '../buttons/SettingsButton'
import UserImagesModal from '../modals/user-images/UserImagesModal'
const GameSettings = () => {
  const appContext = useContext(AppContext)
  if (!appContext) {
    throw new Error('AppContext must be used within an AppProvider')
  }
  const {
    settings,
    setSettings,
    setCardsBy,
    cardsBy,
    usersImageArr,
    setUsersImageArr,
  } = appContext

  const gameContext = useContext(GameContext)
  if (!gameContext) {
    throw new Error('GameContext must be used within an GameProvider')
  }
  const { resetTimer } = gameContext

  const [gameTimeValue, setGameTimeValue] = useState<number>(settings.timer)
  const [cardsCount, setCardsCount] = useState<number>(settings.cardsCount)
  const [mistakesCount, setMistakesCount] = useState<number>(
    settings.maxMistakes,
  )
  const [imageTheme, setImageTheme] = useState<string>(settings.category)
  const [formError, setFormError] = useState<string | null>(null)
  const [isApplied, setIsApplied] = useState<boolean>(false)
  const imagesInputRef = useRef<HTMLInputElement | null>(null)
  const [userImageError, setUserImageError] = useState<string | null>(null)
  const [imageModalOpened, setImageModalOpened] = useState<boolean>(false)
  const [imageRadioError, setImageRadioError] = useState<string | null>(null)

  const handleTimeOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameTimeValue(Number(e.target.value))
    setSettings((prev) => ({
      ...prev,
      difficulty: 'custom',
    }))
  }

  const handleCardsCountOnChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCardsCount(Number(e.target.value))
    setSettings((prev) => ({
      ...prev,
      difficulty: 'custom',
    }))
  }

  const handleMaxMistakesOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMistakesCount(Number(e.target.value))
    setSettings((prev) => ({
      ...prev,
      difficulty: 'custom',
    }))
  }

  const handleImageThemeOnChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setImageTheme(e.target.value)
    setSettings((prev) => ({
      ...prev,
      difficulty: 'custom',
    }))
  }

  const handleEasyBtnOnChange = () => {
    setGameTimeValue(90)
    setCardsCount(9)
    setMistakesCount(20)
    setImageTheme('nature')
    setSettings((prev) => ({
      ...prev,
      difficulty: 'easy',
    }))
  }
  const handleMediumBtnOnChange = () => {
    setGameTimeValue(60)
    setCardsCount(12)
    setMistakesCount(10)
    setImageTheme('food')
    setSettings((prev) => ({
      ...prev,
      difficulty: 'medium',
    }))
  }
  const handleHardBtnOnChange = () => {
    setGameTimeValue(30)
    setCardsCount(16)
    setMistakesCount(5)
    setImageTheme('abstract')
    setSettings((prev) => ({
      ...prev,
      difficulty: 'hard',
    }))
  }
  const handleImagesChange = () => {
    if (imagesInputRef.current) {
      imagesInputRef.current.click()
    }
  }
  const downloadImages = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files

    if (!files || files.length === 0) {
      setUserImageError('No file selected')
      return
    }

    const regex = /image\/(svg\+xml|png|jpeg|jpg)/

    const validImages = Array.from(files).reduce<string[]>((acc, file) => {
      if (!regex.test(file.type)) {
        console.log('Invalid file type!')
        setUserImageError('Invalid file type!')
        return acc
      }

      const image = URL.createObjectURL(file)
      acc.push(image)
      setUserImageError(null)
      return acc
    }, [])

    setUsersImageArr((prev) => [...prev, ...validImages])
    console.log(usersImageArr)
  }

  const handleSubmitGameForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!gameTimeValue || !mistakesCount) {
      setFormError('Fill in all the fields!')
      return
    }

    setSettings((prev) => ({
      ...prev,
      timer: gameTimeValue,
      cardsCount: cardsCount / 2,
      maxMistakes: mistakesCount,
      category: imageTheme,
    }))

    resetTimer(+gameTimeValue)
    setFormError(null)
    setIsApplied(true)
  }
  const handleImageRadio = (value: string) => {
    if (usersImageArr.length < 16) {
      setImageRadioError('You need download minimum 16 images!')
      return
    } else {
      setImageRadioError(null)
    }

    if (value === 'api') {
      setCardsBy('api')
    }
    if (value === 'custom') {
      setCardsBy('custom')
    }
  }

  return (
    <>
      <div className={styles['settings-menu__game']}>
        <form onSubmit={handleSubmitGameForm}>
          {isApplied && (
            <div className={styles['settings-menu__modal']}>
              <p>The settings are applied</p>
              <button onClick={() => setIsApplied(false)}>OK</button>
            </div>
          )}
          <div
            className={`${styles['settings-menu__game-time-wrapper']} ${styles['settings-menu__fields']}`}
          >
            <h3>Game time:</h3>
            <TextInput
              type="number"
              value={gameTimeValue}
              funOnChange={handleTimeOnChange}
              placeholder={'enter time in seconds'}
              setValue={setGameTimeValue}
            />
          </div>
          <div
            className={`${styles['settings-menu__game-cards-wrapper']} ${styles['settings-menu__fields']}`}
          >
            <h3>Cards count:</h3>
            <select
              className={styles['settings-menu__cards-select']}
              onChange={handleCardsCountOnChange}
              value={cardsCount}
              name="cardsCount"
              id="cards-count"
            >
              <option value="9">9</option>
              <option value="12">12</option>
              <option value="16">16</option>
              {/* <option value="20">20</option> */}
            </select>
          </div>
          <div
            className={`${styles['settings-menu__game-mistakes-wrapper']} ${styles['settings-menu__fields']}`}
          >
            <h3>Max mistakes:</h3>
            <TextInput
              type="number"
              value={mistakesCount}
              funOnChange={handleMaxMistakesOnChange}
              placeholder={'enter max amount mistakes'}
              setValue={setMistakesCount}
            />
          </div>
          <div
            className={`${styles['settings-menu__game-cards-wrapper']} ${styles['settings-menu__fields']}`}
          >
            <h3>Image theme:</h3>
            <select
              className={styles['settings-menu__cards-select']}
              onChange={handleImageThemeOnChange}
              value={imageTheme}
              name="imageTheme"
              id="image-theme"
            >
              <option value="nature">Nature</option>
              <option value="city">City</option>
              <option value="technology">Technology</option>
              <option value="food">Food</option>
              <option value="still_life">Still life</option>
              <option value="abstract">Abstract</option>
              <option value="wildlife">Wildlife</option>
            </select>
          </div>

          <div
            className={`${styles['settings-menu__game-difficulty-wrapper']} ${styles['settings-menu__fields']}`}
          >
            <h3>Game difficulty:</h3>
            <div className={styles['settings-menu__difficulty-btns']}>
              <SettingsButton
                type="button"
                text={'easy'}
                backg="#00ff00"
                onClickFunc={handleEasyBtnOnChange}
              />
              <SettingsButton
                type="button"
                text={'medium'}
                backg={'#f9845a'}
                onClickFunc={handleMediumBtnOnChange}
              />
              <SettingsButton
                type="button"
                text={'hard'}
                backg={'#ff0000'}
                onClickFunc={handleHardBtnOnChange}
              />
            </div>
            <p>
              Current difficulty:{'  '}
              <span
                className={`${
                  styles['settings-menu__difficulty--' + settings.difficulty]
                }`}
              >
                {settings.difficulty}
              </span>
            </p>
          </div>
          <div
            className={`${styles['settings-menu__game-images-wrapper']} ${styles['settings-menu__fields']}`}
          >
            <h3>Game images:</h3>
            <div className={styles['settings-menu__images-btns']}>
              <SettingsButton
                type="button"
                text={'Download images'}
                backg="#00ff00"
                onClickFunc={handleImagesChange}
              />
              <input
                ref={imagesInputRef}
                className={styles['settings-menu__user-avatar-input']}
                type="file"
                name="user-images"
                id="user-images"
                multiple
                onChange={downloadImages}
              />
              <button
                type="button"
                onClick={() => setImageModalOpened(true)}
                className={styles['settings-menu__eye-btn']}
              >
                <img src="/icons/eye.svg" alt="watch" />
              </button>
              {userImageError && (
                <p className={styles['settings-menu__radio-error']}>
                  {userImageError}
                </p>
              )}
            </div>
            <div className={styles['settings-menu__radios']}>
              <div className={styles['settings-menu__radio-item']}>
                <label htmlFor="api">Images by random (API & Internet):</label>
                <input
                  type="radio"
                  id="api"
                  name="imageBy"
                  value="api"
                  checked={cardsBy === 'api'}
                  onChange={() => handleImageRadio('api')}
                />
              </div>
              <div className={styles['settings-menu__radio-item']}>
                <label htmlFor="custom">User's images:</label>
                <input
                  type="radio"
                  id="custom"
                  name="imageBy"
                  value="custom"
                  checked={cardsBy === 'custom'}
                  onChange={() => handleImageRadio('custom')}
                />
                {imageRadioError && (
                  <p className={styles['settings-menu__radio-error']}>
                    {imageRadioError}
                  </p>
                )}
              </div>
            </div>
          </div>

          <br />
          <div className={styles['settings-menu__apply']}>
            <SettingsButton
              type="submit"
              text={'apply setting'}
              backg={'rgba(254, 76, 76, 0.83)'}
            />
            {formError && <p>{formError}</p>}
          </div>
        </form>
      </div>
      {imageModalOpened && (
        <UserImagesModal
          images={usersImageArr}
          setImages={setUsersImageArr}
          onClose={setImageModalOpened}
        />
      )}
    </>
  )
}

export default GameSettings
