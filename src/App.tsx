import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/header/Header'
import ResultsPage from './pages/results-page/ResultsPage'
import SettingsPage from './pages/settings-page/SettingsPage'
import changeBackground from './utils/changeBackground'
import { AppContext, GameContext } from './context/Context.tsx'
import GamePage from './pages/game-page/GamePage.tsx'

const App = () => {
  const location = useLocation()
  const [settings, setSettings] = useState({
    timer: 30,
    difficulty: 'easy',
    boardSize: '4x3',
    downloadImages: 'api',
    themeImages: 'techno',
    maxMistakes: 10,
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
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const [isResetGame, setIsResetGame] = useState<boolean>(false)
  const [resetKey, setResetKey] = useState<number>(0)
  useEffect(() => {
    changeBackground(location)
  }, [location.pathname])

  return (
    <AppContext.Provider
      value={{
        settings,
        setSettings,
        commonStatics,
        setCommonStatics,
        currentStatistics,
        setCurrentStatistics,
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
      </GameContext.Provider>
    </AppContext.Provider>
  )
}

export default App
