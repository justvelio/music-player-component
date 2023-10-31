import './VideoPlayer.css';

const VideoPlayer = ({ videoSrc }) => {
    return (
        <video autoPlay loop muted playsInline ref={(ref) => { if (ref) ref.playbackRate = 0.8; }} className="video-container">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    };
  
  export default VideoPlayer;