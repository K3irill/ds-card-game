import React from 'react'
import styles from './Article.module.scss'
import MaskImage from './forImg/MaskImage.tsx'
import { SectionItem } from '../interfaces/DataInterface.ts'
import formatSpainDate from '../services/formatSpainDate.ts'
import { useTheme } from './ThemeContext.tsx'

interface ArticleProps {
  content: SectionItem
}

export const Article = ({ content }: ArticleProps) => {
  const { theme } = useTheme()
  const stickerPosition = content.stamp.position.split('-')
  const stickerStyle = {
    [stickerPosition[0]]: '0',
    [stickerPosition[1]]: '0',
  }

  return (
    <article
      className={`${styles.article} ${styles['article__' + content.size]}`}
    >
      <div className={`${styles['article__img-wrapper']} `}>
        <MaskImage url={content.img.url} mask={content.img.shape} />
        <img
          src={`/img/stickers/${content.stamp.word}.svg`}
          alt={content.stamp.word}
          style={stickerStyle}
          className={` ${styles['article__sticker']}`}
        />
      </div>
      <div className={` ${styles['article__content-wrapper']}`}>
        <div className={` ${styles['article__content']}`}>
          <ul className={` ${styles['article__tags_list']}`}>
            {content.tags.map((tag, index) => {
              const tagColor =
                index === 0
                  ? { backgroundColor: content.accent }
                  : { color: content.accent }

              return (
                <li style={tagColor} key={tag + 'id'}>
                  {tag}
                </li>
              )
            })}
          </ul>
          <div className={styles['article__description']}>
            <h1
              className={` ${styles['article__title']} ${
                styles['article__title--' + theme]
              }`}
            >
              {content.title}
            </h1>
            <p className={` ${styles['article__text']}`}>{content.text}</p>
          </div>
          <div className={` ${styles['article__info']}`}>
            <p>
              <span>
                <img src="/icons/date.svg" alt="" />
              </span>
              {formatSpainDate(content.date)}
            </p>
            <p>
              <span>
                <img src="/icons/time.svg" alt="" />
              </span>
              {content.duration} min
            </p>
          </div>
        </div>
        {content.size === 'full-size' && (
          <button className={styles.article__button}>
            {content['browse-text']}
          </button>
        )}
      </div>
    </article>
  )
}
