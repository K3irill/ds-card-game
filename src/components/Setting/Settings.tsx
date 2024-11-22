import React, { useContext, useState } from 'react'
import styles from './Settings.module.scss'
import TextInput from '../inputs/TextInput'
import { AppContext, GameContext } from '../../context/Context'
import SettingsButton from '../buttons/SettingsButton'
const Settings = () => {
  const appContext = useContext(AppContext)
  if (!appContext) {
    throw new Error('AppContext must be used within an AppProvider')
  }
  const { settings, commonStatics, currentStatistics, setSettings } = appContext

  const gameContext = useContext(GameContext)
  if (!gameContext) {
    throw new Error('GameContext must be used within an GameProvider')
  }
  const { resetTimer } = gameContext

  const [gameTimeValue, setGameTimeValue] = useState(settings.timer)
  const [cardsCount, setCardsCount] = useState(settings.cardsCount)
  const [mistakesCount, setMistakesCount] = useState(settings.maxMistakes)
  const [imageTheme, setImageTheme] = useState(settings.category)
  const [formError, setFormError] = useState<string | null>(null)
  const [isApplied, setIsApplied] = useState<boolean>(false)
  const handleTimeOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameTimeValue(Number(e.target.value))
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
    setCardsCount(20)
    setMistakesCount(5)
    setImageTheme('abstract')
    setSettings((prev) => ({
      ...prev,
      difficulty: 'hard',
    }))
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
    console.log(settings)
    resetTimer(+gameTimeValue)
    setFormError(null)
    setIsApplied(true)
  }

  return (
    <div className={styles['settings-menu']}>
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
              <option value="4">4</option>
              <option value="9">9</option>
              <option value="12">12</option>
              <option value="20">20</option>
            </select>
          </div>
          <div
            className={`${styles['settings-menu__game-mistakes-wrapper']} ${styles['settings-menu__fields']}`}
          >
            <h3>Max mistakes:</h3>
            <TextInput
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
          </div>
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
      <hr className={styles['settings-menu__hr-line']} />
      <div className={styles['settings-menu__user']}>
        <div>
          <h3>User</h3>
          <button>change nickname</button>
          <br />
          <button>change avatar</button>
        </div>
      </div>
    </div>
  )
}

export default Settings
