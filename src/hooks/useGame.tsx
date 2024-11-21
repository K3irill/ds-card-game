import { useState, useEffect, useContext } from 'react'
import { AppContext, GameContext } from '../context/Context'
import { CardItem } from '../interfaces/card.interface'
import useFetch from '../hooks/useFetch'
import {
  incrementGamesCount,
  incrementGuessCount,
  incrementMistakesCount,
  updatePassage,
} from '../context/contexHandlers'

const useGame = () => {
  const [cards, setCards] = useState<CardItem[]>([])
  const [flippedCards, setFlippedCards] = useState<CardItem[]>([])
  const [isFlipping, setIsFlipping] = useState<boolean>(false)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [gameResult, setGameResult] = useState<string>('success')

  const { images, isLoading, setIsLoading, reloadImages, loadingText } =
    useFetch(6, 'abstract')

  const gameContext = useContext(GameContext)
  if (!gameContext) {
    throw new Error('GameContext must be used within an GameProvider')
  }
  const {
    isStarted,
    setIsStarted,
    isResetGame,
    setIsResetGame,
    resetKey,
    startTimer,
    seconds,
    resetTimer,
    stopTimer,
  } = gameContext

  const appContext = useContext(AppContext)
  if (!appContext) {
    throw new Error('AppContext must be used within an AppProvider')
  }
  const {
    settings,
    setSettings,
    commonStatics,
    setCommonStatics,
    setCurrentStatistics,
    currentStatistics,
  } = appContext

  const createCard = (img: string, id: number, coupleId: number): CardItem => {
    return {
      id: id,
      coupleId: coupleId,
      isGuessed: false,
      isInverted: false,
      img: img,
    }
  }

  useEffect(() => {
    localStorage.setItem('commonStatics', JSON.stringify(commonStatics))
  }, [commonStatics])

  useEffect(() => {
    sessionStorage.setItem(
      'currentStatistics',
      JSON.stringify(currentStatistics),
    )
  }, [currentStatistics])

  const startGame = () => {
    if (images.length === 0) return

    const renderImages = () => {
      const newCards: CardItem[] = images.map((img, i) => {
        return createCard(img, i, i)
      })

      const copyCards: CardItem[] = newCards.map((card, index) => ({
        ...card,
        id: newCards.length + index + 1,
      }))

      const concatArr = [...newCards, ...copyCards].sort(
        () => Math.random() - 0.5,
      )

      setCards(concatArr)
      setIsLoading(false)
    }

    renderImages()
  }

  useEffect(() => {
    if (isStarted && !isLoading && images.length > 0) {
      startGame()
      startTimer()
    }
  }, [images, isLoading, isStarted])

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsFlipping(true)

      const [firstCard, secondCard] = flippedCards

      if (firstCard.coupleId === secondCard.coupleId) {
        incrementGuessCount(setCommonStatics)
        incrementGuessCount(setCurrentStatistics)

        setCards((prevCards) => {
          const updatedCards = prevCards.map((card) =>
            card.coupleId === firstCard.coupleId
              ? { ...card, isGuessed: true }
              : card,
          )

          const guessedCardsCount = updatedCards.filter(
            (card) => card.isGuessed,
          ).length
          const totalCards = updatedCards.length
          const percentage = +((guessedCardsCount / totalCards) * 100).toFixed(
            0,
          )

          setTimeout(() => updatePassage(setCurrentStatistics, percentage), 0)

          if (updatedCards.every((card) => card.isGuessed)) {
            handleGameOver('success')
            resetTimer(settings.timer)
          }

          return updatedCards
        })

        setIsFlipping(false)
      } else {
        incrementMistakesCount(setCommonStatics)
        incrementMistakesCount(setCurrentStatistics)
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isInverted: false }
                : card,
            ),
          )
          setIsFlipping(false)
        }, 1000)
      }

      setFlippedCards([])
    }
  }, [flippedCards])

  useEffect(() => {
    if (currentStatistics.mistakesCount >= settings.maxMistakes)
      handleGameOver('fail')
  }, [flippedCards])

  const handleGameOver = (result: string) => {
    setTimeout(() => {
      incrementGamesCount(setCommonStatics)
      incrementGamesCount(setCurrentStatistics)
      setGameOver(true)
      setGameResult(result)
    }, 0)
  }

  useEffect(() => {
    if (seconds === 0) {
      handleGameOver('fail')
    }
  }, [seconds])

  const handleCardClick = (clickedCard: CardItem) => {
    if (
      clickedCard.isGuessed ||
      isFlipping ||
      flippedCards.length === 2 ||
      clickedCard.isInverted
    )
      return

    setCards((prev) =>
      prev.map((card) =>
        card.id === clickedCard.id ? { ...card, isInverted: true } : card,
      ),
    )
    setFlippedCards((prev) => [...prev, clickedCard])
  }

  const shuffleCards = () => {
    setCards((prevCards) =>
      [...prevCards]
        .map((card) => ({ ...card, isInverted: false, isGuessed: false }))
        .sort(() => Math.random() - 0.5),
    )
  }

  const newGameWithNewImages = () => {
    setCurrentStatistics((prev) => ({
      ...prev,
      guessCount: 0,
      mistakesCount: 0,
      gamePassage: 0,
    }))
    setGameOver(false)

    resetTimer(settings.timer)

    reloadImages()
  }

  const newGameWithCurrentImages = () => {
    setCurrentStatistics((prev) => ({
      ...prev,
      guessCount: 0,
      mistakesCount: 0,
      gamePassage: 0,
    }))
    setGameOver(false)
    shuffleCards()
    resetTimer(settings.timer)
    startTimer()
  }

  useEffect(() => {
    if (isResetGame) {
      newGameWithNewImages()
    }
  }, [isResetGame, resetKey])
  useEffect(() => {
    if (!isLoading && images.length > 0 && isStarted) {
      startTimer()
      startGame()
    }
  }, [isLoading, images, isStarted])

  return {
    cards,
    gameOver,
    gameResult,
    isLoading,
    flippedCards,
    setFlippedCards,
    handleCardClick,
    newGameWithNewImages,
    newGameWithCurrentImages,
    loadingText,
    startGame,
    setIsStarted,
  }
}

export default useGame
