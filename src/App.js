import React, { useEffect, useState } from 'react'
import { Button } from './components/Button'
import { SongList } from './components/SongList'
import './App.css'
import { Timer } from './components/Timer'
import { Playlist } from './components/Playlist'
import { AddModal } from './components/AddModal'
import { BsSearch } from 'react-icons/bs'
import { VscDiffAdded } from 'react-icons/vsc'
import { AddPlaylistModal } from './components/AddPlaylistModal'
import {IoMdAddCircleOutline} from 'react-icons/io'


import { SongService } from './lib/service/songs'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)}

export const App = () => {
    const [song, setSong] = useState({name:"", durationMinutes:null, durationSeconds:null, playlist:"default"})
    const [songList, setSongList] = useState([])
    const [songPlaying, setSongPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [currentSong, setCurrentSong] = useState("")
    const [playlist, setPlaylist] = useState("")
    const [currentPlaylist, setCurrentPlaylist] = useState({name:"", songs:[], description:""})
    const [searchSongModal, setSearchSongModal] = useState(false)
    const [playlistModal, setPlaylistModal] = useState(false)
    const [playlists, setPlaylists] = useState([])
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
      setSongList(SongService.createSongs({ quantity: 50 }))
    }, []);

    const handleSkipButton = (event) => {
        console.log(event.target.id)
        /*if (target.id=="next"){
            console.log(currentSong)
            console.log(songList.indexOf(currentSong))
            setCurrentSong(songList[songList.indexOf(currentSong)+1])
        } else if (target.id=="back"){
            setCurrentSong(songList[songList.indexOf(currentSong)-1])
        } */
    }
    const handleChangeSong = ({ target }) => {
        const {id, value} = target
        setSong({...song, [id]: value})
    }

    const handlePauseClick = () => {
        setIsPaused(!isPaused)
    }
    const handleSubmitModal = () => {
        setSongList([...songList, song])
        setCurrentSong(song)
        setSong({name:"", durationMinutes:"", durationSeconds:""})
        setSearchSongModal(false);
    }

    const handleSongClick = (minutes, seconds, song1) => {
        const totalTime=((minutes*60000)+(seconds*1000))
        setCurrentSong(song1)
        setCurrentTime(parseInt(totalTime))
        setSongPlaying(true)
        
    }

    const handleRandomClick = () => {
        if(songList.length>0){
            getRandomInt(0,songList.length)
            setSongPlaying(true)
            setCurrentSong(songList[getRandomInt(0,songList.length)])
            const totalTime=((currentSong.durationMinutes*60000)+(currentSong.durationSeconds*1000))
            setCurrentTime(parseInt(totalTime))
            setIsPaused(false)
        } return
    }

    const handleChangePlaylist = ({target}) => {
        const {id, value} = target
        setCurrentPlaylist({...currentPlaylist, [id]: value})
        console.log(currentPlaylist)
        console.log(playlists)
        
    }

    const handleSubmitPlaylistModal = (newPlaylist) => {
        setPlaylists([...playlists, newPlaylist])
        setPlaylistModal(false)
    }

    const handlePlaylistClick = (playlist) => {
        setCurrentPlaylist(playlist)
    }

    useEffect(() => {
        const intervalReference = setInterval(() => {
            if (currentTime>0 && !isPaused){
                setCurrentTime((_currentTime) => _currentTime-1000)
            }else if (currentTime>0 && isPaused){
                setCurrentTime(currentTime)
            } else{
                setSongPlaying(false)
                clearInterval(intervalReference)           
            }
        },1000)
        return () => {
            clearInterval(intervalReference)
        }
    }, [songPlaying, currentTime, isPaused])
  return (
      
    <div className="app">
        <div className="leftNavbar">
            <Button title={"Search Song"} icon={<BsSearch />}  />
            <Button title={"New Song"} handleClick={() => setSearchSongModal(true)} icon={<IoMdAddCircleOutline />}  />
            <Button title={"Create Playlist"} 
                handleClick={() => setPlaylistModal(true)}
                icon={<VscDiffAdded />}  />
            <Playlist playlist={{name:"All", songs:songList, description:""}} handlePlaylistClick={handlePlaylistClick}  />
            {playlists.map((playlistObject) => {
            
            return ( 
                <Playlist playlist={playlistObject} handlePlaylistClick={handlePlaylistClick}  />
            )
        })}
        </div>
        <div className="app-content">
        {songList.length>0 ? 
            <div >
                <SongList handleSongClick={handleSongClick} currentPlaylist={currentPlaylist}/>
            </div> : <div />}
        </div>
        <div className='player'>
            <Timer currentSong={currentSong.name}
                currentTime={currentTime}
                isPlaying={isPaused}
                handlePauseClick={handlePauseClick}
                handleRandomClick={handleRandomClick}
                handleSkipButton={handleSkipButton}
                /> 
        </div>

        <AddModal handleClose={() => setSearchSongModal(false)}
                  show={searchSongModal}
                  song={song}
                  handleSubmitModal={handleSubmitModal}
                 handleChangeSong={handleChangeSong}
                 playlists ={playlists}
        />
        <AddPlaylistModal show={playlistModal} handleClose={() => setPlaylistModal(false)}
                          handleChangePlaylist={handleChangePlaylist} handleSubmitModal={handleSubmitPlaylistModal}
                          playlist={currentPlaylist}
        />

    </div>
  )
}
