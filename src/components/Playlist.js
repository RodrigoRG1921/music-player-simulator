import React from 'react'
import PropTypes from 'prop-types'

import './Playlist.css'

const Playlist = ({
  name,
  description,
  id,
  handlePlaylistClick
}) => (
  <div className="playlistSquare">
    <h4 onClick={ () => handlePlaylistClick(id) }>{ name }</h4>
  </div>
)

<<<<<<< HEAD
export const Playlist = ({playlist, handlePlaylistClick}) => {
  return (
    <div className="playlistSquare">
        <h4 onClick={() => handlePlaylistClick(playlist)}>{playlist.name} </h4>
    
    </div>
  )
=======
Playlist.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  handlePlaylistClick: PropTypes.func
>>>>>>> main
}

export default Playlist