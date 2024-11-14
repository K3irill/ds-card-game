import { Database } from '../interfaces/DataInterface.ts'

const fetchData = async (): Promise<Database> => {
  const [menuResponse, sectionsResponse, contactsResponse] = await Promise.all([
    fetch('http://localhost:5172/menu'),
    fetch('http://localhost:5172/sections'),
    fetch('http://localhost:5172/contacts'),
  ])
  const [menuData, sectionsData, contactsData] = await Promise.all([
    menuResponse.json(),
    sectionsResponse.json(),
    contactsResponse.json(),
  ])
  const data: Database = {
    menu: menuData,
    sections: sectionsData,
    contacts: contactsData,
  }

  return data
}

export default fetchData
