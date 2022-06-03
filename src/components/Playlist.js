import React from 'react'
import './Playlist.css'


export const Playlist = ({songList , playlist, handleSongClick, handlePlaylistClick}) => {
  return (
    <div className="playlistSquare">
        <h4 onClick={() => handlePlaylistClick(playlist)}>{playlist} </h4>
    
    </div>
  )
}
