import { useEffect, useState } from 'react'

const useHideHeader = () => {
  const [headerHidden, setHeaderHidden] = useState('')
  const [scrollPosition, setScrollPosition] = useState(
    window.pageYOffset || document.documentElement.scrollTop,
  )
  const [lastScrollPosition, setLastScrollPosition] = useState(scrollPosition)

  const hideHeader = () => {
    if (scrollPosition > lastScrollPosition) {
      setHeaderHidden('hidden')
    } else {
      setHeaderHidden('')
    }
    setLastScrollPosition(scrollPosition)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(
        window.pageYOffset || document.documentElement.scrollTop,
      )
    }

    window.addEventListener('scroll', handleScroll)

    hideHeader()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrollPosition])

  return [headerHidden, setHeaderHidden]
}
export default useHideHeader
