import { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";
import { PlayCircleOutlined, PauseCircleOutlined, RedoOutlined } from '@ant-design/icons'

const AudioPlayer = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLooping, setIsLooping] = useState(false);

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

  const handleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !isLooping;
      setIsLooping(!isLooping);
    }
  };

  const formatTime = (durationSeconds) => {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

      audioRef.current.addEventListener("ended", () => {
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("ended", () => {
          audioRef.current.currentTime = 0;
          setCurrentTime(0);
          setIsPlaying(false);
        });
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
          <div className="buttons-player">
            <button className="btn" onClick={handlePlayPause}>
              <span>
                {isPlaying ? <PauseCircleOutlined size={'30px'} /> : <PlayCircleOutlined size={'30px'} /> }
              </span>
            </button>
            <button className={`btn-loop ${isLooping ? 'loop-active' : ''}`} onClick={handleLoop}>
              <span><RedoOutlined /></span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
