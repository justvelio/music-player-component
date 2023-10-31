import { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";
import { GrPause, GrPlay } from "react-icons/gr";

const AudioPlayer = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef(null);

  const handleSeek = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = e.target.value;
      setCurrentTime(e.target.value);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const formatTime = (durationSeconds) => {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    // console.log("source:", audioSrc);
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  return (
    <>
      <div className="content">
        <div className="card">
          <img
            src="https://f4.bcbits.com/img/0011240899_25.jpg"
            alt="Masta Ace"
          />
          <p className="song-name">Masta Ace - Smart Dummies</p>
          <p className="info">(Prod. by Zoom & Rectape)</p>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
          />
          <audio ref={audioRef} src={audioSrc} />

          <div className="duration">
            <p>{formatTime(currentTime)}</p>
            <p>{formatTime(duration)}</p>
          </div>
          <button className="btn" onClick={handlePlayPause}>
            <span>
              {isPlaying ? <GrPause style={{ back: 'white'}} size='22px'/> : <GrPlay style={{ color: 'white'}} size='22px'/>}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
