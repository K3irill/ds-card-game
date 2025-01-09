import React, { useEffect, useRef, useState } from 'react'
import styles from './Card.module.scss'
import { CardItem } from '../../interfaces/card.interface'

interface CardProps {
  cardObject: CardItem
  handleCardClick: (a: CardItem) => void
}

const Card = ({ cardObject, handleCardClick }: CardProps) => {
  const [card, setCard] = useState(cardObject)

  useEffect(() => {
    setCard(cardObject)
  }, [cardObject])

  return (
    <div
      className={`${styles.card} ${
        card.isInverted ? styles.card__inverted : ''
      } `}
      onClick={() => handleCardClick(card)}
    >
      <div className={styles.card__inside}>
        <div className={styles.card__front}>
          <div className={styles.card__front_background}></div>
        </div>
        <div className={styles.card__back}>
          <img className={styles.card__image} src={card.img} alt="Card Image" />
        </div>
      </div>
    </div>
  )
}

export default Card
