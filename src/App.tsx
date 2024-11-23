import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/header/Header'
import ResultsPage from './pages/results-page/ResultsPage'
import SettingsPage from './pages/settings-page/SettingsPage'
import changeBackground from './utils/changeBackground'
import { AppContext, GameContext } from './context/Context.tsx'
import GamePage from './pages/game-page/GamePage.tsx'
import useTimer from './hooks/useTimer.tsx'
import { UserResultData } from './interfaces/gameSetting.interface.tsx'

const App = () => {
  const location = useLocation()
  const [settings, setSettings] = useState({
    timer: 30,
    difficulty: 'easy',
    cardsCount: 12,
    downloadImages: 'api',
    themeImages: 'techno',
    maxMistakes: 10,
    category: 'nature',
  })

  const [commonStatics, setCommonStatics] = useState({
    title: 'Common static',
    gamesCount: 0,
    guessCount: 0,
    mistakesCount: 0,
  })

  const [currentStatistics, setCurrentStatistics] = useState({
    title: 'Current static',
    gamesCount: 0,
    guessCount: 0,
    mistakesCount: 0,
    gamePassage: 0,
  })
  const [user, setUser] = useState({
    name: 'Vaas Montenegro',
    tag: '@VaasMontenegro',
    img: 'https://i.pinimg.com/736x/dc/38/5c/dc385c948cd14acfc6445dfb4a6593f5.jpg',
    id: '0001',
  })

  const [userResultData, setUserResultData] = useState<UserResultData[]>([])

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
            <Route path="/" element={<div>Hello</div>} />
            <Route path="/board" element={<GamePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        <footer>
          <p className="author">
            made by K<span>3</span>irill
          </p>
        </footer>
      </GameContext.Provider>
    </AppContext.Provider>
  )
}

export default App
