import React, { useEffect, useState } from 'react'
import Header from './containers/Header/Header.tsx'
import { Database } from './interfaces/DataInterface.ts'
import K3Loader from './components/loaders/k3Loader.tsx'
// eslint-disable-next-line import/no-named-default
import { default as requestToData } from './services/fetchData.ts'
import useData from './hooks/useData.ts'
import { useTheme } from './components/ThemeContext.tsx'

function App() {
  const { theme, toggleTheme } = useTheme()
  const { contentData, isLoading, error } = useData(requestToData)
  useEffect(() => {
    toggleTheme()
  }, [])
  return (
    <>
      {isLoading && <K3Loader />}
      {error && <p>{error}</p>}
      {contentData && <Header content={contentData.menu} />}
    </>
  )
}

export default App
