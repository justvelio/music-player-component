import { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";
import { GrPause, GrPlay, GrUnlink, GrUpdate } from "react-icons/gr";

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

      // Watch for the 'ended' event to reset the playback
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
          <span className="song-name">Masta Ace - Smart Dummies</span>
          <span className="info">(Prod. by Zoom & Rectape)</span>
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
                {isPlaying ? <GrPause size="22px" /> : <GrPlay size="22px" />}
              </span>
            </button>
            <button className="btn-loop" onClick={handleLoop}>
              <span>{isLooping ? <GrUnlink /> : <GrUpdate />}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
