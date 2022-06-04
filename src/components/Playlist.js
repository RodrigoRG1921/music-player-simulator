import React from 'react'
import './Playlist.css'


export const Playlist = ({playlist, handlePlaylistClick}) => {
  return (
    <div className="playlistSquare">
        <h4 onClick={() => handlePlaylistClick(playlist)}>{playlist.name} </h4>
    
    </div>
  )
}
