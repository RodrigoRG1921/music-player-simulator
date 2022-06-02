import React from 'react'
import './Playlist.css'
import { AiFillPlayCircle } from 'react-icons/ai'
import { useState } from 'react'

export const Playlist = ({songList , playlists, handleSongClick}) => {
  const [showSongs, setShowSongs] = useState(false);
  

  return (
    <div className="playlistSquare">
        <h4 onClick={() => setShowSongs(!showSongs)}>{playlists} </h4>
      {showSongs && songList.map((songObject) => {
            return (
              <div className="SongList-song">
                <AiFillPlayCircle onClick={() => handleSongClick(songObject.durationMinutes, songObject.durationSeconds, songObject) } style={{cursor: "pointer"}} />
                    <span key={songObject.name+"1"}>
                      {songObject.name} -    {songObject.durationMinutes}:{songObject.durationSeconds}
                    </span>
                </div>
            )
        })
      }
    </div>
  )
}
