import React, { useEffect, useState } from 'react'
import GamePage from './pages/game-page/GamePage'
import { Route, Routes, useLocation } from 'react-router-dom'
import ResultsPage from './pages/results-page/ResultsPage'
import Header from './components/header/Header'
import SettingsPage from './pages/settings-page/SettingsPage'
import changeBackground from './utils/changeBackground'
import { AppContext } from './context/Context.tsx'

const App = () => {
  const location = useLocation()
  const [settings, setSettings] = useState({
    timer: 30,
    difficulty: 'easy',
    boardSize: '4x3',
    downloadImages: 'api',
    themeImages: 'techno',
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
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<div>Hello</div>} />
          <Route path="/board" element={<GamePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </AppContext.Provider>
  )
}

export default App
