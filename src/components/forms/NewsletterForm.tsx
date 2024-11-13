import React, { ChangeEventHandler, FocusEventHandler, useState } from 'react'
import { Contacts, SubscriptionSection } from '../../interfaces/DataInterface'
import styles from './NewsletterForm.module.scss'
import EmailInput from '../inputs/EmailInput'
import NewsletterButton from '../buttons/NewsletterButton'

import useValidEmail from '../../hooks/useEmailValid'
import SuccessMessage from '../success-message/SuccessMessage'
interface NewsletterFormProps {
  content: Contacts
}

const NewsletterForm = ({ content }: NewsletterFormProps) => {
  const {
    isValid,
    setValid,
    value,
    handleChange,
    handleBlur,
    setError,
    error,
  } = useValidEmail()
  const [isSubmitted, setSubmitted] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isValid) {
      setSubmitted((prev) => !prev)
      return
    }
    if (!isValid) {
      setError('Formato de email inválido, verifique a ortografía')
      setValid(false)
      return
    }
  }

  return (
    <div className={styles['newsletter']}>
      {!isSubmitted ? (
        <form id="newsletter-form" method="post" onSubmit={handleSubmit}>
          <div className={styles['newsletter__email-input-wrapper']}>
            <EmailInput
              onBlur={handleBlur}
              onChange={handleChange}
              value={value}
              isValid={isValid}
              className={styles['newsletter__email-input']}
              placeholder={content.subscription['email-placeholder']}
            />
            <NewsletterButton
              type="submit"
              text={content.subscription['submit-text']}
            />
          </div>
          {isValid === false && (
            <span className={styles['newsletter__err-text']}>{error}</span>
          )}
        </form>
      ) : (
        <div className={styles['newsletter__success-media']}>
          <SuccessMessage
            text={'Grasias! '}
            // imgUrl="/img/stickers/Message.svg"
          />
        </div>
      )}
    </div>
  )
}

export default NewsletterForm
