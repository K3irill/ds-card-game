import React, { useEffect } from 'react'
import GamePage from './pages/game-page/GamePage'
import { Route, Routes, useLocation } from 'react-router-dom'
import ResultsPage from './pages/results-page/ResultsPage'
import Header from './components/header/Header'
import SettingsPage from './pages/settings-page/SettingsPage'
import changeBackground from './utils/changeBackground'
const App = () => {
  const location = useLocation()

  useEffect(() => {
    changeBackground(location)
  }, [location.pathname])

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/board" element={<GamePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
