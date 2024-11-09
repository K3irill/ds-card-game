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
    [stickerPosition[0]]: '-48px',
    [stickerPosition[1]]: '-40px',
  }
  const tagBColor = {
    backgroundColor: content.accent,
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
          <div className={`${styles['article__tags_list']}`}>
            <a style={tagBColor}>{content.tags[0]}</a>
            <ul>
              {content.tags.slice(1).map((tag, index) => {
                return (
                  <li
                    style={{ color: content.accent }}
                    key={tag + index + 'id'}
                  >
                    {tag}
                  </li>
                )
              })}
            </ul>
          </div>
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
