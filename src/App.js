import React, { useEffect, useState } from 'react'
import { Button } from './components/Button'
import SongList from './components/SongList'
import './App.css'
import { Timer } from './components/Timer'
import Playlist from './components/Playlist'
import { AddModal } from './components/AddModal'
import { BsSearch } from 'react-icons/bs'
import { VscDiffAdded } from 'react-icons/vsc'
import AddPlaylistModal from './components/AddPlaylistModal'
import { AddSongToPlaylistModal } from './components/AddSongToPlaylistModal'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { ApiService } from './lib/api.js'


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min)
}

export const App = () => {
  const [addSongToPlaylistModal, setAddSongToPlaylistModal] = useState(false)
  const [songList, setSongList] = useState([])
  const [playlists, setPlaylists] = useState([{ name: 'All', description: '', id: 0, songs: [] }])
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false)
  const [currentPlaylist, setCurrentPlaylist] = useState(0)
  const [song, setSong] = useState({name:"", durationMinutes:null, durationSeconds:null, playlist:"default"})
  const [songPlaying, setSongPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [currentSong, setCurrentSong] = useState("")
  const [searchSongModal, setSearchSongModal] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [songToPlaylist, setSongToPlaylist] = useState({})


  useEffect(() => {
    const fetchSongs = async () => {
      const songs = await ApiService.getAllSongs()
      setSongList(songs.data)
    }
    fetchSongs()
  }, []);

  const handleSubmitPlaylistModal = (newPlaylist) => {
    const newId = playlists.length;
    setPlaylists((_playlists) => [..._playlists, { ...newPlaylist, id: newId, songs: [] }])
    setIsPlaylistModalOpen(false)
  }

  const handlePlaylistClick = (id) => {
    setCurrentPlaylist(id)
  }

  const handleSkipButton = (event) => {
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
      ApiService.createSong(song)
      setSong({name:"", durationMinutes:"", durationSeconds:""})
      setSearchSongModal(false);

  }

  const handleSongClick = ({
    name,
    durationMinutes,
    durationSeconds
  }) => {
    const totalTime = ((durationMinutes*60000)+(durationSeconds*1000))
    setCurrentSong(name)
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
      setCurrentPlaylist(target.value) 
  }

  const handleAddSongToPlaylist = (song) => {
    setSongToPlaylist(song)
    setAddSongToPlaylistModal(true)
  } 

  const handleSubmitSongToPlaylistModal = (playlistId) => {
    const copyPlaylists = [...playlists]
    copyPlaylists[playlistId].songs.push(songToPlaylist)
    setPlaylists(copyPlaylists)
    setAddSongToPlaylistModal(false)
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
        <Button
          playlists={playlists}
          title={"New Song"}
          handleClick={() => setSearchSongModal(true)}
          icon={<IoMdAddCircleOutline />}  />
        <Button title={"Create Playlist"} handleClick={() => setIsPlaylistModalOpen(true)} icon={<VscDiffAdded />}  />
        { playlists.map((playlist, index) =>
          <Playlist key={ index } { ...playlist } handlePlaylistClick={ handlePlaylistClick } />) }
      </div>

        <div className="app-content"> 
          { songList.length > 0 && (
            <div >
            
              <SongList
                songs={ currentPlaylist === 0 ? songList : playlists[currentPlaylist].songs }
                handleSongClick={ handleSongClick }
                playlist={ playlists[currentPlaylist] }
                handleAddSongToPlaylist={handleAddSongToPlaylist} />
            </div>
          ) }
        </div>

        <div className='player'>
            <Timer currentSong={currentSong}
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
        
      <AddSongToPlaylistModal
        playlists={playlists}
        show={addSongToPlaylistModal}
        handleClose={() => setAddSongToPlaylistModal(false)} 
        handleSubmit={handleSubmitSongToPlaylistModal}
        />

      <AddPlaylistModal
        show={ isPlaylistModalOpen }
        handleClose={ () => setIsPlaylistModalOpen(false) }
        handleChangePlaylist={ handleChangePlaylist }
        handleSubmitModal={ handleSubmitPlaylistModal }
      />

    </div>
  )
}
