import React, { useContext, useEffect, useState } from 'react'
import Card from '../Card/Card'
import styles from './GameBoard.module.scss'
import { CardItem } from '../../interfaces/card.interface'
import useFetch from '../../hooks/useFetch'
import { AppContext } from '../../context/Context'
import {
  incrementGamesCount,
  incrementGuessCount,
  incrementMistakesCount,
  updatePassage,
} from '../../context/contexHandlers'
import GameResultModal from '../modals/game-result-modal/GameResultModal'

const GameBoard = () => {
  const [cards, setCards] = useState<CardItem[]>([])
  const [flippedCards, setFlippedCards] = useState<CardItem[]>([])
  const [isFlipping, setIsFlipping] = useState<boolean>(false)
  const { images, isLoading, setIsLoading, loadingText, reloadImages } =
    useFetch(6, 'abstract')
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [gameResult, setGameResult] = useState<string>('success')

  const createCard = (img: string, id: number, coupleId: number): CardItem => {
    return {
      id: id,
      coupleId: coupleId,
      isGuessed: false,
      isInverted: false,
      img: img,
    }
  }
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
    startGame()
  }, [images])

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
      if (currentStatistics.mistakesCount >= 9) handleGameOver('fail')

      setFlippedCards([])
    }
  }, [flippedCards])

  const handleGameOver = (result: string) => {
    setTimeout(() => {
      incrementGamesCount(setCommonStatics)
      incrementGamesCount(setCurrentStatistics)
      setGameOver(true)
      setGameResult(result)
    }, 0)
  }

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

  const restartGame = () => {
    setCurrentStatistics((prev) => ({
      ...prev,
      // gamesCount: 0,
      guessCount: 0,
      mistakesCount: 0,
      gamePassage: 0,
    }))
    setGameOver(false)
    reloadImages()
  }

  return (
    <div className={styles['game-board']}>
      {gameOver && (
        <GameResultModal
          resetBtn={restartGame}
          textResult={gameResult}
          count={
            gameResult === 'success'
              ? currentStatistics.guessCount
              : currentStatistics.mistakesCount
          }
        />
      )}

      {isLoading ? (
        <div>{loadingText}</div>
      ) : (
        cards.map((card) => (
          <Card
            key={card.id}
            cardObject={card}
            handleCardClick={handleCardClick}
          />
        ))
      )}
    </div>
  )
}

export default GameBoard
