import React, { ChangeEventHandler, FocusEventHandler, useState } from 'react'
import { SubscriptionSection } from '../../interfaces/DataInterface'
import styles from './SubscribeForm.module.scss'
import EmailInput from '../inputs/EmailInput'
import FormButton from '../buttons/FormButton'
import SubCheckbox from '../checkbox/SubCheckbox'
import useValidEmail from '../../hooks/useEmailValid'
import pasteLinkInText from '../../utils/pasteLinkInText'
import SuccessMessage from '../success-message/SuccessMessage'
interface SubscribeFormProps {
  content: SubscriptionSection
}

const SubscribeForm = ({ content }: SubscribeFormProps) => {
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
  const [isCheckboxChecked, setCheckboxChecked] = useState<boolean>(false)

  const termsLink = <a href="#">términos y condiciones</a>
  const privacyLink = <a href="#">aviso de privacidad</a>

  const agreementText = content['agreement-text']
  const wordForReplace = ['términos y condiciones', 'aviso de privacidad']
  const links = [termsLink, privacyLink]

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxChecked(e.target.checked)
    setError(null)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isValid && isCheckboxChecked) {
      setSubmitted((prev) => !prev)
      return
    }
    if (!isValid) {
      setError('Formato de email inválido, verifique a ortografía')
      setValid(false)
      return
    }
    if (!isCheckboxChecked) {
      setError('Marque el acuerdo!')
      return
    }
  }

  return (
    <div className={styles['subscribe-form']}>
      {!isSubmitted ? (
        <form id="subscribe-form" method="post" onSubmit={handleSubmit}>
          <div className={styles['subscribe-form__email-input-wrapper']}>
            <EmailInput
              onBlur={handleBlur}
              onChange={handleChange}
              value={value}
              isValid={isValid}
              className={styles['subscribe-form__email-input']}
              placeholder={content['email-placeholder']}
            />
            <FormButton type="submit" text={content['submit-text']} />
          </div>
          {(isValid === false || isCheckboxChecked === false) && (
            <span className={styles['subscribe-form__err-text']}>{error}</span>
          )}
          {agreementText && (
            <SubCheckbox
              onChange={handleCheckbox}
              text={pasteLinkInText(agreementText, wordForReplace, links)}
            />
          )}
        </form>
      ) : (
        <div className={styles['subscribe-form__success-media']}>
          <SuccessMessage
            text={'Fantástico! Espera La primera carta'}
            imgUrl="/img/stickers/Message.svg"
          />
        </div>
      )}
    </div>
  )
}

export default SubscribeForm
