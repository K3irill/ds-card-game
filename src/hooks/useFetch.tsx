import { useEffect, useState } from 'react'

type ImageData = string

const useFetch = (count: number) => {
  const [images, setImages] = useState<ImageData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchImages = async (
      category: string = 'technology',
    ): Promise<ImageData[]> => {
      try {
        setIsLoading(true)
        setError(null)
        const imagePromises = Array.from({ length: count }).map(async () => {
          const resp = await fetch(
            `https://api.api-ninjas.com/v1/randomimage?category=${category}`,
            {
              headers: {
                'X-Api-Key': 'wyZY3ZBySe5R5mH47H86zg==vumsRaeYWiyZzZ5Z',
                Accept: 'image/jpg',
              },
            },
          )
          if (!resp.ok) {
            throw new Error('Ошибка с запросом к апи')
          }
          const data: ArrayBuffer = await resp.arrayBuffer()
          const binary = new Uint8Array(data).reduce(
            (acc, byte) => acc + String.fromCharCode(byte),
            '',
          )
          const base64String = btoa(binary)
          return `data:image/jpeg;base64,${base64String}`
        })

        return await Promise.all(imagePromises)
      } catch (err: any) {
        setError(err.message || 'произошла ошибка')
        throw new Error(err)
      } finally {
        setIsLoading(false)
      }
    }

    const fetchData = async () => {
      try {
        const imgArray = await fetchImages('nature')
        setImages(imgArray)
      } catch (error) {
        console.error('Error fetching images:', error)
      }
    }

    fetchData()
  }, [count])

  return { images, isLoading, error }
}

export default useFetch
