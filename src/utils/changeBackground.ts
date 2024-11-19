import { Location } from 'react-router-dom'

const changeBackground = (location: Location) => {
  const rootElement = document.getElementById('root')
  if (rootElement) {
    rootElement.classList.remove('bg-board', 'bg-results', 'bg-settings')
  }

  switch (location.pathname) {
    case '/board':
      if (rootElement) rootElement.classList.add('bg-board')
      break
    case '/results':
      if (rootElement) rootElement.classList.add('bg-results')
      break
    case '/settings':
      if (rootElement) rootElement.classList.add('bg-settings')
      break
    default:
      if (rootElement) rootElement.classList.add('bg-board')
      break
  }
}
export default changeBackground
