const formatSpainDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split('.')

  const date = new Date(`${year}-${month}-${day}`)

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
  const spainDate = new Intl.DateTimeFormat('es-ES', options).format(date)
  return spainDate
}
export default formatSpainDate
