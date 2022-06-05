const ApiService = (() => {
  const apiBaseUrl = 'http://localhost:8080'
  const getAllSongs = async () => {
    try{
      const response = await fetch(`${apiBaseUrl}/songs`, {method: 'GET'})
      return await response.json()
    } catch (error) {
      console.error(error)
    }
  }
  const createSong = async (song) => {
    try{
      const response = await fetch( `${apiBaseUrl}/songs`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(song)
      })
      
    } catch(error) {
      console.error(error)
    }
  }
  return {
    getAllSongs,
    createSong
  }
})()
  
  export {
    ApiService
  }
  