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
        setLoading(false)
      }
    }
    setTimeout(() => fetchData(), 1500)
  }, [fetchFunction])

  return { contentData, isLoading, error }
}
export default useData
