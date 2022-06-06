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
  const getAllPlaylists = async () => {
    try{
      const response = await fetch( `${apiBaseUrl}/playlists`, {method: 'GET'})
      return await response.json()
    } catch(error) {
      console.error(error)
    }
  }
  const getPlaylistById = async (id) => {
    try{
      const response = await fetch( `${apiBaseUrl}/playlists/${id}`, {method: 'GET'})
      return await response.json()
    } catch(error) {
      console.error(error)
    }
  }
  const createPlaylist = async (newPlaylist) => {
    try{
      const response = await fetch( `${apiBaseUrl}/playlists`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlaylist)
      })
    } catch(error) {
      console.error(error)
    } 
  }
  const AddSongToPlaylist = async ({idPlaylist, idSong}) => {
    try{
      const response = await fetch(`${apiBaseUrl}/playlists/${idPlaylist}/songs/${idSong}`, {
      method: 'POST',
      headers: {"Content-Type": "application/json" }
    })
    } catch(error) {
      console.error(error)
    }
  }
  return {
    getAllSongs,
    createSong,
    getAllPlaylists,
    getPlaylistById,
    createPlaylist,
    AddSongToPlaylist
  }
})()
  
  export {
    ApiService
  }
  