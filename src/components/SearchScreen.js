import React from 'react'
import SongList from '../components/SongList.js'
import { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'

const SearchScreen = ({ playlist, songs, handleExitClick, handleAddSongToPlaylist, handleSongClick}) => {
    const [search, setSearch] = useState("")
    const handleChange = ({ target }) => {
      setSearch(target.value)
    }

    const filteredSongs = songs.filter((songObject) => songObject.name.toLowerCase().includes(search.toLowerCase()))
    
  return (
    <div>
        <input value={search} onChange={handleChange} /> <AiFillCloseCircle onClick={handleExitClick} />
        <SongList
          songs={filteredSongs}
          playlist={playlist} 
          handleSongClick={ handleSongClick }
          handleAddSongToPlaylist={handleAddSongToPlaylist}
          />
                
    </div>
  )
}

export default SearchScreen