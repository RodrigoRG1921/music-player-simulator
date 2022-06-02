import React from 'react'
import './Timer.css'
export const Timer = ({currentSong, currentTime}) => {
  return (
    <div className="playBox">
        <h4>Current Song playing: {currentSong}</h4>
        <span>Time remaining: </span>
        <span>{("0" + Math.floor((currentTime / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((currentTime / 1000) % 60)).slice(-2)}</span>  
    </div>
  )
}
