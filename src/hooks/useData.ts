import { useEffect, useState } from 'react'
import { Database } from '../interfaces/DataInterface.ts'

function useData(fetchFunction: () => Promise<Database>) {
  const [contentData, setContentData] = useState<Database | undefined>(
    undefined,
  )
  const [isLoading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFunction()
        setContentData(data)
      } catch (err) {
        setError(`Ошибка при загрузке данных: ${err} `)
      } finally {
        setTimeout(() => setLoading(false), 2000)
      }
    }
    fetchData()
  }, [fetchFunction])

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLoading])

  return { contentData, isLoading, error }
}
export default useData
