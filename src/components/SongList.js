import React from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import {RiPlayListAddFill} from 'react-icons/ri'

import './SongList.css'
export const SongList = ({ handleSongClick, currentPlaylist, handleAddPlaylist }) => {
  return (
    <div className="songList">
      <div className='songList-title' >
        <h4>{currentPlaylist.name}</h4>
        <p>{currentPlaylist.description}</p>
      </div>
      <div className="songList-content">
        {currentPlaylist.songs.map((songObject) => {
              return (
                <div className="songList-song" key={songObject.name+"1"} >
                  <div>
                    <AiFillPlayCircle onClick={() => handleSongClick(songObject.durationMinutes, songObject.durationSeconds, songObject) } style={{cursor: "pointer"}} />
                    <span>{songObject.name}</span>
                  </div>
                  <div>
                    <RiPlayListAddFill onClick={() => handleAddPlaylist(songObject)} style={{marginRight:"20px"}} />
                    <span>
                      {songObject.durationMinutes}:{songObject.durationSeconds}
                    </span>
                  </div>
                  </div>
              )
          })}
      </div>
        
    </div>
  )
}
