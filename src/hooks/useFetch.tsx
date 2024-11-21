import { useEffect, useState } from 'react'

type ImageData = string

const useFetch = (count: number, category = 'nature') => {
  const [images, setImages] = useState<ImageData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [loadingText, setLoadingText] = useState<string | null>(
    'Загружаем изображения. пурум-пум-пум',
  )
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const fetchImages = async (): Promise<ImageData[]> => {
      try {
        setIsLoading(true)
        setLoadingText('Загружаем изображения. пурум-пум-пум')
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
        return []
      } finally {
        setLoadingText(null)
      }
    }

    const fetchData = async () => {
      try {
        const imgs = await fetchImages()
        if (imgs.length > 0) {
          setImages(imgs)
        } else {
          setError('Не удалось загрузить изображения')
        }
      } catch (err) {
        console.warn(err)
        setError('Произошла ошибка при загрузке изображений')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [count, category, reloadKey])

  const reloadImages = () => setReloadKey((key) => key + 1)

  return {
    images,
    isLoading,
    error,
    setIsLoading,
    loadingText,
    setLoadingText,
    reloadImages,
  }
}

export default useFetch
