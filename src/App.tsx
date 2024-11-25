import React, { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/header/Header'
import ResultsPage from './pages/results-page/ResultsPage'
import SettingsPage from './pages/settings-page/SettingsPage'
import changeBackground from './utils/changeBackground'
import { AppContext, GameContext } from './context/Context.tsx'
import GamePage from './pages/game-page/GamePage.tsx'
import useTimer from './hooks/useTimer.tsx'
import {
  CommonStatistics,
  CurrentStatistics,
  GameSettings,
  user,
  UserResultData,
} from './interfaces/gameSetting.interface.tsx'
import useAudio from './hooks/useAudio.tsx'

const App = () => {
  const location = useLocation()
  const [settings, setSettings] = useState<GameSettings>({
    timer: 30,
    difficulty: 'easy',
    cardsCount: 12,
    downloadImages: 'api',
    themeImages: 'techno',
    maxMistakes: 10,
    category: 'nature',
  })

  const [commonStatics, setCommonStatics] = useState<CommonStatistics>({
    title: 'Common statistics',
    gamesCount: 0,
    guessCount: 0,
    mistakesCount: 0,
  })

  const [currentStatistics, setCurrentStatistics] = useState<CurrentStatistics>(
    {
      title: 'Current statistics',
      gamesCount: 0,
      guessCount: 0,
      mistakesCount: 0,
      gamePassage: 0,
    },
  )
  const [user, setUser] = useState<user>({
    name: 'Grinch',
    tag: '@grinch0001',
    img: 'https://img.staticdj.com/29d966a2704515bd56b83e4f17a4ce01.jpeg',
    id: '0001',
  })
  const [usersImageArr, setUsersImageArr] = useState<string[]>([
    '/img/stock-cards/1.jpg',
    '/img/stock-cards/2.jpg',
    '/img/stock-cards/3.jpg',
    '/img/stock-cards/4.jpg',
    '/img/stock-cards/5.jpg',
    '/img/stock-cards/6.jpg',
    '/img/stock-cards/7.jpg',
    '/img/stock-cards/8.jpg',
    '/img/stock-cards/9.jpg',
    '/img/stock-cards/10.jpg',
  ])
  const {
    currentTrack,
    musicFiles,
    toggleMusic,
    nextTrack,
    handleTrackEnd,
    audioRef,
    isPlaying,
  } = useAudio()
  const [userResultData, setUserResultData] = useState<UserResultData[]>([])
  const [cardsBy, setCardsBy] = useState<'api' | 'custom'>('api')
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const [isResetGame, setIsResetGame] = useState<boolean>(false)
  const [resetKey, setResetKey] = useState<number>(0)
  const { seconds, startTimer, resetTimer, stopTimer } = useTimer(
    settings.timer,
  )

  const storedCommonStatics = localStorage.getItem('commonStatics')
  const storedCurrentStatistics = sessionStorage.getItem('currentStatistics')

  useEffect(() => {
    if (storedCommonStatics) {
      setCommonStatics(JSON.parse(storedCommonStatics))
    }
    if (storedCurrentStatistics) {
      setCurrentStatistics(JSON.parse(storedCurrentStatistics))
    }
  }, [])

  useEffect(() => {
    changeBackground(location)
  }, [location.pathname])

  function resetStats() {
    setCurrentStatistics((prev) => ({
      ...prev,
      guessCount: 0,
      mistakesCount: 0,
      gamePassage: 0,
    }))
  }

  return (
    <AppContext.Provider
      value={{
        settings,
        setSettings,
        commonStatics,
        setCommonStatics,
        currentStatistics,
        setCurrentStatistics,
        userResultData,
        setUserResultData,
        resetStats,
        user,
        setUser,
        cardsBy,
        setCardsBy,
        usersImageArr,
        setUsersImageArr,
      }}
    >
      <GameContext.Provider
        value={{
          isStarted,
          setIsStarted,
          isResetGame,
          setIsResetGame,
          resetKey,
          setResetKey,
          seconds,
          startTimer,
          resetTimer,
          stopTimer,
        }}
      >
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<GamePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        <footer>
          <p className="author">
            made by K<span>3</span>irill
            <button className="music-btn" onClick={toggleMusic}>
              <img
                src={!isPlaying ? '/icons/loud-off.svg' : '/icons/loud.svg'}
                alt=""
              />
            </button>
          </p>
          <audio
            onEnded={handleTrackEnd}
            ref={audioRef}
            src={musicFiles[currentTrack]}
          />
        </footer>
      </GameContext.Provider>
    </AppContext.Provider>
  )
}

export default App
