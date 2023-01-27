async function getPricesForDay (url) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.error('Response not OK', response.status)
      return []
    } else {
      const json = await response.json()
      return json
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

function generateUrl (dato = new Date().toISOString(), zone = 'NO2') {
  const apiUrl = 'https://www.hvakosterstrommen.no/api/v1/prices'
  const datestring = new Date(dato).toISOString().substring(0, 10)
  const [year, month, day] = datestring.split('-')
  return `${apiUrl}/${year}/${month}-${day}_${zone}.json`
}

function addDays (dateString, numberOfDays) {
  const copyOfDate = new Date(dateString)
  copyOfDate.setDate(copyOfDate.getDate() + numberOfDays)
  return copyOfDate
}

async function getPrices (dato = new Date().toISOString(), zone = 'NO2') {
  const today = new Date(dato).toISOString().substring(0, 10)
  const tomorrow = addDays(dato, 1).toISOString().substring(0, 10)
  const todayUrl = generateUrl(today, zone)
  const tomorrowUrl = generateUrl(tomorrow, zone)
  const todaysPrices = await getPricesForDay(todayUrl)
  const tomorrowsPrices = await getPricesForDay(tomorrowUrl)
  return [...todaysPrices, ...tomorrowsPrices]
}

export {
  getPrices,
  getPricesForDay,
  generateUrl,
  addDays
}
