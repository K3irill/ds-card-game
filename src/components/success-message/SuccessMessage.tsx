import React from 'react'
import styles from './SuccessMessage.module.scss'
interface SuccessMessageProps {
  text: string
  imgUrl: string
}
const SuccessMessage = ({ text, imgUrl }: SuccessMessageProps) => {
  return (
    <div className={styles['success-message']}>
      <p>{text}</p>
      {imgUrl && <img src={imgUrl} />}
    </div>
  )
}

export default SuccessMessage
