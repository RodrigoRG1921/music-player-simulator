import React from 'react'
import './Form.css'

export const Form = ({ handleChangeSong, song }) => {
  return (
    <div className="formBox">
       <label>Song</label> <br/>
       <input id="name" onChange={handleChangeSong} value={song.name} /> <br/>
       <label>Song duration</label> <br/>
       <input id="durationMinutes" onChange={handleChangeSong} value={song.durationMinutes} /><span> Minutes</span><br/>
       <input id="durationSeconds" onChange={handleChangeSong} value={song.durationSeconds} /><span> Seconds</span><br/>
    </div>
  )
}
