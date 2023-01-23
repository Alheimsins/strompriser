async function getPrices (url) {
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

function generateUrl(dato = new Date(), zone = 'NO2') {
    const apiUrl = 'https://www.hvakosterstrommen.no/api/v1/prices'
    const datestring = dato.toISOString().substring(0, 10)
    const [year, month, day] = datestring.split('-')
    return `${apiUrl}/${year}/${month}-${day}_${zone}.json`
}

export {
  getPrices,
  generateUrl
}
