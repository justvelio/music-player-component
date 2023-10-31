import "./App.css";
import AudioPlayer from "./components/AudioPlayer";
import audioFile from './audio/audio.mp3'

function App() {
  return <div className="container">
    <AudioPlayer audioSrc={audioFile} />
  </div>;
}

export default App;