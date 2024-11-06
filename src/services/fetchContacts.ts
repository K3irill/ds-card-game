const fetchContacts = async () => {
  const response = await fetch('http://localhost:5172/contacts')
  const data = await response.json()
  console.log(data)
}
export default fetchContacts
