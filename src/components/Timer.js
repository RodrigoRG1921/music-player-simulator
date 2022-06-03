
import './Timer.css'
import { AiFillPauseCircle, AiFillPlayCircle  } from 'react-icons/ai'
import { FaRandom } from 'react-icons/fa'
import { BiSkipNext } from 'react-icons/bi'

export const Timer = ({currentSong, currentTime, isPlaying, handlePauseClick, handleRandomClick, handleSkipButton}) => {

  return (
    <div className="playBox">
        <span>Current Song playing: {currentTime>0 ? currentSong : ""}</span>
        <div className="playBox-center">
        <FaRandom className="playBox-icons" onClick={handleRandomClick} style={{cursor: "pointer", marginRight:"10px"}}/>
        <BiSkipNext className="playBox-icons" onClick={handleSkipButton} size="35px" style={{transform: "rotate(180deg)"}} id="back" />
        {!isPlaying ? <AiFillPauseCircle className="playBox-central-icons" size="30px " onClick={handlePauseClick} /> :
        <AiFillPlayCircle className="playBox-central-icons" size="30px" onClick={handlePauseClick} /> }
        <div onClick={handleSkipButton} id="next">
          <BiSkipNext className="playBox-icons" size="35px" />
        </div>
        
        </div>
        <div className="playbox-timer">
          <span>Time remaining: </span>
          <span className='playBox-time'>{("0" + Math.floor((currentTime / 60000) % 60)).slice(-2)}:</span>
          <span className='playBox-time'>{("0" + Math.floor((currentTime / 1000) % 60)).slice(-2)}</span>
        </div>
    </div>
  )
}
