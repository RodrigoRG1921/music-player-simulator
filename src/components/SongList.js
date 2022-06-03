import React from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import './SongList.css'
export const SongList = ({ songList, handleSongClick, currentPlaylist }) => {
  let FilteredSongs = []
  if (currentPlaylist == "All"){
    FilteredSongs = songList
  } else{
    FilteredSongs = songList.filter((songObject) => songObject.playlist == currentPlaylist)
  } 
  
  return (
    <div className="songList">
      <div className='songList-title' >
        <h4>{currentPlaylist}</h4>
      </div>
      <div className="songList-content">
        {FilteredSongs.map((songObject) => {
              return (
                <div className="songList-song" key={songObject.name+"1"} >
                  <div>
                    <AiFillPlayCircle onClick={() => handleSongClick(songObject.durationMinutes, songObject.durationSeconds, songObject) } style={{cursor: "pointer"}} />
                    <span>{songObject.name}</span>
                  </div>
                  <span>
                    {songObject.durationMinutes}:{songObject.durationSeconds}
                  </span>
                  </div>
              )
          })}
      </div>
        
    </div>
  )
}
