import React, { ReactNode, useEffect } from 'react'
import styles from './WebinarsBlock.module.scss'
import { Proposals } from '../../interfaces/DataInterface'
import WebinarCard from '../../components/WebinarCard'
import RunningLine from '../../components/running-line/RunningLine'
import WebButton from '../../components/buttons/webButton'
interface WebinarsBlockProps {
  content: Proposals
}
function WebinarsBlock({ content }: WebinarsBlockProps) {
  return (
    <>
      <section className={styles['webinars-block']}>
        <div className={`${styles['webinars-block__container']} __container`}>
          <div className={`${styles['webinars-block__content']}`}>
            <div className={`${styles['webinars-block__title']}`}>
              <h2>{content.title}</h2>
            </div>
            <div className={`${styles['webinars-block__btn-wrapper']}`}>
              <WebButton text={content['browse-all-text']} />
            </div>

            <div className={`${styles['webinars-block__cards']}`}>
              {content.items.map((item) => {
                return <WebinarCard content={item} />
              })}
            </div>
          </div>
        </div>
      </section>
      <RunningLine
        ticker={content.ticker}
        label={'sub'}
        optional="run-line--sub-position"
      />
    </>
  )
}

export default WebinarsBlock
