import React from 'react'
import MaskImage from '../forImg/MaskImage'
import styles from './WebinarCard.module.scss'
import { ProposalsItem } from '../../interfaces/DataInterface'
import formatSpainDate from '../../services/formatSpainDate'
interface WebinarCardProps {
  content: ProposalsItem
}
const WebinarCard = ({ content }: WebinarCardProps) => {
  return (
    <div
      className={styles['webinar-card']}
      style={{ background: content.background }}
    >
      <div className={styles['webinar-card__header']}>
        <div className={styles['webinar-card__img-wrapper']}>
          <MaskImage url={content.author.img} mask={'avatar'} />
        </div>
        <div className={styles['webinar-card__author-info']}>
          <h5>{content.author.name}</h5>
          <p>{content.author.position}</p>
        </div>
      </div>
      <div className={styles['webinar-card__text']}>
        <p>{content.text}</p>
      </div>
      <div className={styles['webinar-card__info']}>
        <div className={styles['webinar-card__tags']}>
          {content.tags.map((tag, index) => (
            <span key={tag + index + 'id'}>{tag}</span>
          ))}
        </div>
        <div className={styles['webinar-card__schedule']}>
          <div className={styles['webinar-card__date']}>
            <img src="/icons/date.svg" alt="" />{' '}
            <p>{formatSpainDate(content.date_from, content.date_to)}</p>
          </div>
          <div className={styles['webinar-card__time']}>
            <img src="/icons/time.svg" alt="" />
            <span>{content.time}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebinarCard
