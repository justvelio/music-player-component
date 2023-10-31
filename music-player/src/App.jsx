import "./App.css";
import AudioPlayer from "./components/AudioPlayer";
import VideoPlayer from "./components/VideoPlayer";
import audioFile from './audio/audio.mp3';
import videoFile from './video/video.mp4';

function App() {
  return (
    <div className="container">
      <VideoPlayer videoSrc={videoFile} />
      <div className="content">
        <AudioPlayer audioSrc={audioFile} />
      </div>
    </div>
  );
}

export default App;