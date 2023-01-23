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

export {
  getPrices
}
