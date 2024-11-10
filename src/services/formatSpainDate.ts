const formatSpainDate = (dateFromStr: string, dateToStr?: string) => {
  const [dayFrom, monthFrom, yearFrom] = dateFromStr.split('.')
  const dateFrom = new Date(`${yearFrom}-${monthFrom}-${dayFrom}`)

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }

  const formattedFrom = new Intl.DateTimeFormat('es-ES', options).format(
    dateFrom,
  )

  if (dateToStr) {
    const [dayTo, monthTo, yearTo] = dateToStr.split('.')
    const dateTo = new Date(`${yearTo}-${monthTo}-${dayTo}`)
    const formattedTo = new Intl.DateTimeFormat('es-ES', options).format(dateTo)

    if (dateFrom.getFullYear() === dateTo.getFullYear()) {
      return `${dayFrom} de ${formattedFrom.split(' ')[2]},  ${
        parseInt(dayTo) < 10 ? '0' + (parseInt(dayTo) - 1) : parseInt(dayTo) - 1
      } e ${dayTo} de ${formattedTo.split(' ')[2]} de ${yearTo}`
    }
    return `${formattedFrom}, ${formattedTo}`
  }
  return formattedFrom
}

export default formatSpainDate
