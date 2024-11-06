import React, { useEffect, useState } from 'react'
import Header from './containers/Header/Header.tsx'
import fetchMenu from './services/fetchMenu.ts'
import { Menu } from './interfaces/MenuInterface.ts'
import K3Loader from './components/loaders/K3Loader.tsx'

function App() {
  const [menuData, setMenuData] = useState<Menu | undefined>(undefined)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMenu()
      console.log(data)
      setMenuData(data)
      setLoading(false)
    }
    setTimeout(() => fetchData(), 1500)
  }, [])

  return (
    <>
      {isLoading && <K3Loader />}
      {menuData && <Header content={menuData} />}
    </>
  )
}

export default App
