import React, { useState } from 'react'

const useNotify = () => {
  const [isNotificationVisible, setNotificationVisible] = useState(false)

  const throwNotification = (message: string) => {
    setNotificationVisible(true)

    setTimeout(() => {
      setNotificationVisible(false)
    }, 3000)
  }
}

export default useNotify
