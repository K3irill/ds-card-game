import React, { ReactNode, useEffect } from 'react'
import styles from './SubscribeBlock.module.scss'
import {
  Subscription,
  SubscriptionSection,
} from '../../interfaces/DataInterface'

import SubscribeForm from '../../components/forms/SubscribeForm'
import RunningLine from '../../components/running-line/RunningLine'
interface SubscribeBlockProps {
  content: SubscriptionSection
}
function SubscribeBlock({ content }: SubscribeBlockProps) {
  return (
    <>
      <section className={styles['subscribe-block']}>
        <div className={`${styles['subscribe-block__container']} __container`}>
          <div className={`${styles['subscribe-block__content-wrapper']} `}>
            <div className={`${styles['subscribe-block__content']}`}>
              <div className={`${styles['subscribe-block__description']}`}>
                <h2>{content.title}</h2>
                <p>{content.text}</p>
              </div>
              <div className={`${styles['subscribe-block__form']}`}>
                <SubscribeForm content={content} />
              </div>
            </div>
          </div>
          <div className={`${styles['subscribe-block__illustration']}`}></div>
        </div>
      </section>
      <RunningLine ticker={content.ticker} label={'discount'} />
    </>
  )
}

export default SubscribeBlock
