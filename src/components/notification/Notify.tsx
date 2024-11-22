import React from 'react'
import styles from './Notify.module.scss'
interface NotifyProps {
  img: string
  text: string
}

const Notify = ({ img, text }: NotifyProps) => {
  return (
    <div className={styles.notification}>
      <img src={img} alt="!!!" />
      <p>{text}</p>
    </div>
  )
}

export default Notify
