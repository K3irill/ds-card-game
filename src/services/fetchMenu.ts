import { Menu } from '../interfaces/MenuInterface.ts'

const fetchMenu = async (): Promise<Menu> => {
  const response = await fetch('http://localhost:5172/menu')
  const data = await response.json()
  console.log(data)

  return data
}
export default fetchMenu
