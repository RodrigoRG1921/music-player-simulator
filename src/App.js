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
import SearchScreen from './components/SearchScreen'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min)
}

const getTotalTime = ({minutes, seconds}) => {
  return (minutes*60000)+(seconds*1000)
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
  const [isSearchScreenOpen, setIsSearchScreenOpen] = useState(false)
  const [currentSongObject, setCurrentSongObject] = useState({})
  useEffect(() => {
    const fetchSongs = async () => {
      const songs = await ApiService.getAllSongs()
      const playlists = await ApiService.getAllPlaylists()
      setPlaylists(playlists.data)
      setSongList(songs.data)
    }
    fetchSongs()
  }, [searchSongModal, isPlaylistModalOpen]);

  const handleSubmitPlaylistModal = (newPlaylist) => {
    ApiService.createPlaylist(newPlaylist)
    setIsPlaylistModalOpen(false)
  }

  const handlePlaylistClick = async (id) => {
    const _Playlist = await ApiService.getPlaylistById(id)
    const playlistObject = _Playlist.data
    setCurrentPlaylist(playlistObject)
    setIsSearchScreenOpen(false)
    
  }

  const handleSkipButton = (event) => {
    const currentIndex = currentPlaylist.songs.indexOf(currentSongObject)
      if (event.target.id=="next" && currentIndex<currentPlaylist.songs.length-1){
          const index = currentPlaylist.songs.indexOf(currentSongObject)+1
          setCurrentSong(currentPlaylist.songs[index].name)
          setCurrentSongObject(currentPlaylist.songs[index])
          const totalTime = getTotalTime({minutes:currentPlaylist.songs[index].durationMinutes, seconds: currentPlaylist.songs[index].durationSeconds})
          setCurrentTime(parseInt(totalTime))
      }
      if (event.target.id=="next" && currentIndex == currentPlaylist.songs.length-1){
        setCurrentSong(currentPlaylist.songs[0].name)
        setCurrentSongObject(currentPlaylist.songs[0])
        const totalTime = getTotalTime({minutes:currentPlaylist.songs[0].durationMinutes, seconds: currentPlaylist.songs[0].durationSeconds})
        setCurrentTime(parseInt(totalTime))
      }
      if (event.target.id=="back" && currentIndex>0){
        const index = currentPlaylist.songs.indexOf(currentSongObject)-1
        setCurrentSong(currentPlaylist.songs[index].name)
        setCurrentSongObject(currentPlaylist.songs[index])
        const totalTime = getTotalTime({minutes:currentPlaylist.songs[index].durationMinutes, seconds: currentPlaylist.songs[index].durationSeconds})
        setCurrentTime(parseInt(totalTime))
      } 
  }
  const handleChangeSong = ({ target }) => {
      const {id, value} = target
      setSong({...song, [id]: value})
  }
  
  const handlePauseClick = () => {
      setIsPaused(!isPaused)
  }
  const handleSubmitModal = (_song) => {
      ApiService.createSong(_song)
      setSong({name:"", durationMinutes:"", durationSeconds:""})
      setSearchSongModal(false);

  }

  const handleSongClick = (song) => {
    const totalTime = getTotalTime({minutes:song.durationMinutes, seconds: song.durationSeconds})
    setCurrentSong(song.name)
    setCurrentTime(parseInt(totalTime))
    setSongPlaying(true)
    setIsPaused(false)
    setCurrentSongObject(song)
  }

  const handleRandomClick = () => {
      if(currentPlaylist.songs.length>0){
          getRandomInt(0,currentPlaylist.songs.length>0)
          const songToPlay= currentPlaylist.songs[getRandomInt(0,currentPlaylist.songs.length)]
          setCurrentSong(songToPlay.name)
          setSongPlaying(true)
          const totalTime=((songToPlay.durationMinutes*60000)+(songToPlay.durationSeconds*1000))
          setCurrentTime(parseInt(totalTime))
          setIsPaused(false)  
      } return
  }

  const handleAddSongToPlaylist = (song) => {
    setSongToPlaylist(song)
    console.log(songToPlaylist)
    setAddSongToPlaylistModal(true)
  } 

  const handleSubmitSongToPlaylistModal = (playlistId) => {
    console.log("playlist id: ", playlistId)
    ApiService.AddSongToPlaylist({idPlaylist: playlistId, idSong: songToPlaylist.id})
    setAddSongToPlaylistModal(false)
  }

  useEffect(() => {
      const intervalReference = setInterval(() => {
          if (currentTime>0 && !isPaused){
              setCurrentTime((_currentTime) => _currentTime-1000)
          }else if (currentTime>0 && isPaused){
              setCurrentTime(currentTime)
          } else if (currentTime==0 && !isPaused){
            const currentIndex = currentPlaylist.songs.indexOf(currentSongObject)
            if(currentIndex == currentPlaylist.songs.length-1){
              setCurrentSong(currentPlaylist.songs[0].name)
              setCurrentSongObject(currentPlaylist.songs[0])
              const totalTime = getTotalTime({minutes:currentPlaylist.songs[0].durationMinutes, seconds: currentPlaylist.songs[0].durationSeconds})
              setCurrentTime(parseInt(totalTime))
            }else {
              const index = currentPlaylist.songs.indexOf(currentSongObject)+1
              setCurrentSong(currentPlaylist.songs[index].name)
              setCurrentSongObject(currentPlaylist.songs[index])
              const totalTime = getTotalTime({minutes:currentPlaylist.songs[index].durationMinutes, seconds: currentPlaylist.songs[index].durationSeconds})
              setCurrentTime(parseInt(totalTime))
            }
          }else{
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
        <Button
          title={"Search Song"}
          icon={<BsSearch />}
          handleClick={() => setIsSearchScreenOpen(true)}  />
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
              {isSearchScreenOpen ? 
              <SearchScreen
                songs={songList}
                playlist={ currentPlaylist }
                handleExitClick={() => setIsSearchScreenOpen(false)}
                handleSongClick={ handleSongClick }
                handleAddSongToPlaylist={handleAddSongToPlaylist}
                /> 
              :
              <SongList
                songs={ currentPlaylist === 0 ? songList : currentPlaylist.songs }
                handleSongClick={ handleSongClick }
                playlist={ currentPlaylist}
                handleAddSongToPlaylist={handleAddSongToPlaylist} />}
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
        handleSubmitModal={ handleSubmitPlaylistModal }
      />

    </div>
  )
}
