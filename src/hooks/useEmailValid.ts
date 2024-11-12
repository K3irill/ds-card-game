import { ChangeEventHandler, FocusEventHandler, useState } from 'react'

function useValidEmail() {
  const [isValid, setValid] = useState<boolean | null>(null)
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value)
  }

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    console.log(isValid)

    if (event.target.value === '') {
      setValid(null)
    } else {
      setValid(pattern.test(event.target.value))
    }

    isValid
      ? setError(null)
      : setError('Formato de email inválido, verifique a ortografía')
  }
  return {
    isValid,
    setValid,
    value,
    setValue,
    handleChange,
    handleBlur,
    error,
    setError,
  }
}
export default useValidEmail
