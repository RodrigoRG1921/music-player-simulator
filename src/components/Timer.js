
import './Timer.css'
import { AiFillPauseCircle } from 'react-icons/ai'
import { AiFillPlayCircle } from 'react-icons/ai'

export const Timer = ({currentSong, currentTime, isPlaying, handlePauseClick}) => {

  return (
    <div className="playBox">
        <h4>Current Song playing: {currentSong}</h4>
        <span>Time remaining: </span>
        <span className='playBox-time'>{("0" + Math.floor((currentTime / 60000) % 60)).slice(-2)}:</span>
        <span className='playBox-time'>{("0" + Math.floor((currentTime / 1000) % 60)).slice(-2)}</span> <br />
        {!isPlaying ? <AiFillPauseCircle style={{marginLeft:"155px", cursor:"pointer"}} onClick={handlePauseClick} /> :
        <AiFillPlayCircle style={{marginLeft:"155px", cursor:"pointer"}} onClick={handlePauseClick} /> }
    </div>
  )
}
