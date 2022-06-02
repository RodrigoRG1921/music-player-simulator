import React, { useEffect, useState } from 'react'
import { Button } from './components/Button'
import { Form } from './components/Form'
import { SongList } from './components/SongList'
import './App.css'
import { Timer } from './components/Timer'
import { Playlist } from './components/Playlist'
import { AddModal } from './components/AddModal'
import { BsSearch } from 'react-icons/bs'
import { FaRandom } from 'react-icons/fa'
import { VscDiffAdded } from 'react-icons/vsc'
import { AddPlaylistModal } from './components/AddPlaylistModal'


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
    const [currentPlaylist, setCurrentPlaylist] = useState([])
    const [searchSongModal, setSearchSongModal] = useState(false)
    const [playlistModal, setPlaylistModal] = useState(false)
    const [playlists, setPlaylists] = useState([])

    const handleChangeSong = ({ target }) => {
        const {id, value} = target
        setSong({...song, [id]: value})
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
        getRandomInt(0,songList.length)
        setSongPlaying(true)
        setCurrentSong(songList[getRandomInt(0,songList.length)])
        console.log("currentSong" + currentSong)
        const totalTime=((currentSong.durationMinutes*60000)+(currentSong.durationSeconds*1000))
        setCurrentTime(parseInt(totalTime))
    }

    const handleChangePlaylist = ({target}) => {
        setCurrentPlaylist(target.value)
        
    }

    const handleSubmitPlaylistModal = () => {
        setPlaylists([...playlists, currentPlaylist])
        setPlaylistModal(false)
        console.log(playlists)
    }

    useEffect(() => {
        const intervalReference = setInterval(() => {
            if (currentTime>0){
                setCurrentTime((_currentTime) => _currentTime-1000)
            
            }else{
                setSongPlaying(false)
                clearInterval(intervalReference)
            }
        },1000)
        return () => {
            clearInterval(intervalReference)
        }
    }, [songPlaying, currentTime])
  return (
    <div className="App">
        <div className="ButtonBar">
            <Button title={"Search Song"} handleClick={() => setSearchSongModal(true)} icon={<BsSearch />}  />
            <Button title={"Create Playlist"} handleClick={() => setPlaylistModal(true)} icon={<VscDiffAdded />}  />
        </div>
        {songList.length>0 ? 
            <div>
                <SongList songList={songList} handleSongClick={handleSongClick} />
                <Button title={"Random Song"} handleClick={handleRandomClick} icon={<FaRandom />} />
            </div> : <div />}
        {songPlaying && 
            <Timer currentSong={currentSong.name} currentTime={currentTime} />
        }
        {playlists.map((playlist) => {
            const FilteredSongs = songList.filter((songObject) => songObject.playlist == playlist)
            return ( 
                <Playlist playlists={playlist} songList={FilteredSongs} />
            )
        })}

        <AddModal handleClose={() => setSearchSongModal(false)}
                  show={searchSongModal}
                  song={song}
                  handleSubmitModal={handleSubmitModal}
                 handleChangeSong={handleChangeSong}
                 playlists ={playlists}
        />
        <AddPlaylistModal show={playlistModal} handleClose={() => setPlaylistModal(false)}
                          handleChangePlaylist={handleChangePlaylist} handleSubmitModal={handleSubmitPlaylistModal}
        />

    </div>
  )
}
