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

Playlist.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  handlePlaylistClick: PropTypes.func
}

export default Playlist