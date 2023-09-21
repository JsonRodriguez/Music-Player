import { useState } from 'react';
import { getSongs } from './helpers/getSongs';
import './App.css'

import mariahCarey from './images/mariahCarey.jpg';
import elvis from './images/elvis.jpg';
import louis from './images/louis.jpeg';
import s1 from './songs/wy.mp3';
import s2 from './songs/chfil.mp3';
import s3 from './songs/waww.mp3';

const music = new Audio(s1);

function App() {
  const [currentlySong, setCurrentlySong] = useState(0)
  const [isPlayed, setIsPlayed ] = useState(false);
  const [duration, setDuration] = useState('');
  const [iconPlayed, setIconPlayed] = useState('fa-solid fa-play play-button')
  const [titlePlayed, setTitlePlayed] = useState('Play')
  const { author, name, song } = getSongs(currentlySong);

  const imgs = [mariahCarey, elvis, louis];
  const songs = [s1, s2, s3];

  // const activeSong = new Audio(songs[0].song);
  // activeSong.load();

  // const onForward = () => {
  //   if(currentlySong === 2){
  //     setCurrentlySong(0);
  //   }else{
  //     setCurrentlySong(currentlySong+1);
  //   }
  //   loadMusic(song);
  // }

  // const onBackward = () => {
  //   if(currentlySong === 0){
  //     setCurrentlySong(2);
  //   }else{
  //     setCurrentlySong(currentlySong-1);
  //   }
  //   loadMusic(song);
  // }

  // const onPlayed = () => {
  //   if(isPlayed){
  //     pauseMusic();
  //     setIsPlayed(false);
  //     setIconPlayed('fa-solid fa-play play-button');
  //     setTitlePlayed('Play');
  //   }else{
  //     playMusic();
  //     setIsPlayed(true);
  //     setIconPlayed('fa-solid fa-pause play-button');
  //     setTitlePlayed('Stop');
  //   }
  //   playMusic()
  // }

  let musicIndex = 0;
  let isPlaying = false;

  function togglePlay() {
    if (isPlayed) {
        pauseMusic();
    } else {
        playMusic();
    }
  }

  function playMusic() {
    setIsPlayed(true);
    isPlaying = true;
    setIconPlayed('fa-solid fa-pause play-button');
    setTitlePlayed('Stop');
    music.play();
  }

  function pauseMusic() {
    setIsPlayed(false);
    isPlaying = false;
    setIconPlayed('fa-solid fa-play play-button');
    setTitlePlayed('Play');
    music.pause();
  }

  function loadMusic() {
    music.src = songs[musicIndex];
  }

  function changeMusic(direction) {
    musicIndex = currentlySong + direction;

    if(musicIndex === 3){
      musicIndex = 0;
    }else if( musicIndex === -1 ){
      musicIndex = 2;
    }

    loadMusic();
    playMusic();
  }

  const onPlayed = () => {
    togglePlay();
  }

  const onForward = () => {
    if(currentlySong === 2){
      setCurrentlySong(0);
    }else{
      setCurrentlySong(currentlySong+1);
    }
    changeMusic(1)
  }

  const onBackward = () => {
    if(currentlySong === 0){
      setCurrentlySong(2);
    }else{
      setCurrentlySong(currentlySong-1);
    }
    changeMusic(-1);
  }


  return (
    <>
      <div className='background'>
        <img src={ imgs[currentlySong] } id="bg-img" />
      </div>
    
      <div className="container">
        <div className="player-img">
          <img src={ imgs[currentlySong] } className='active' id="cover" />
        </div>

        <h2 id="music-title">{ name }</h2>
        <h3 id="music-artics">{ author }</h3>

        <div className="player-progress" id="player-progress">
          <div className="progress" id="progress"></div>
            <div className="music-duration">
              <span id="current-time">0:00</span>
              <span id="duration">0:00</span>
            </div>
        </div>

        <div className="player-controls">
          <i onClick={ onBackward } className="fa-solid fa-backward" title='Previous'></i>
          <i onClick={ onPlayed } className={ iconPlayed } title={ titlePlayed }></i>
          <i onClick={ onForward } className="fa-solid fa-forward" title='Next'></i>
        </div>
      </div>
    </>
  )
}

export default App
