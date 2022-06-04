import React from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import './SongList.css'
export const SongList = ({ songList, handleSongClick }) => {
  return (
    <div className="SongList">
      <h4>All songs</h4>
        {songList.map((songObject) => {
            return (
              <div className="SongList-song">
                <AiFillPlayCircle onClick={() => handleSongClick(songObject.durationMinutes, songObject.durationSeconds, songObject) } style={{cursor: "pointer"}} />
                    <span key={songObject.name+"1"}>
                      {songObject.name} -    {songObject.durationMinutes}:{songObject.durationSeconds}
                    </span>
                </div>
            )
        })}
    </div>
  )
}
