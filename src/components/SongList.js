import React from 'react'
import PropTypes from 'prop-types'
import { AiFillPlayCircle } from 'react-icons/ai'
import './SongList.css'

const SongList = ({
  songs,
  handleSongClick,
  playlist
}) => (
  <div className="songList">
    <div className='songList-title' >
      <h4>{ playlist.name }</h4>
    </div>
    <div className="songList-content">
      { songs.map((song, index) => (
        <div className="songList-song" key={ `${song.name}-${index}` } >
          <div>
            <AiFillPlayCircle
              onClick={ () =>
                handleSongClick(song) }
              style={{ cursor: "pointer" }} />
            <span>{song.name}</span>
          </div>
          <span>
            { `${song.durationMinutes}:${song.durationSeconds}` }
          </span>
        </div>
      )) }
    </div>
      
  </div>
)

SongList.propTypes = {
  songs: PropTypes.array,
  handleSongClick: PropTypes.func,
  playlist: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string
  })
}

export default SongList
