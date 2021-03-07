
import './App.css';
import React from 'react'

const sounds =  [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
];

function App() {
  const [volume, setVolume]= React.useState(1);
  const [recording, setRecording]= React.useState("");
  const [speed, setSpeed] =React.useState(0.5)
  console.log(recording)
  const playrecording=()=>{
    let index = 0;

    let recordingArray = recording.split(" ");
    const interval = setInterval(() => {
     const audioTag= document.getElementById(recordingArray[index]); 
     audioTag.volume=volume;
     audioTag.currentTime=0;
     audioTag.play();
     
     index++;
    },speed*600);
    setTimeout(() =>clearInterval(interval), speed*600*recordingArray.length-1
     
      
    );
  };
  
  return (
    <div className="bg-success min-vh-100 text-center">
     <div id="drum-machine" className="text-white">
       <h1 className="pt-5">DRUM MACHINE</h1>
        {sounds.map(sound=>{
          return< Pad key={sound.id} sound={sound} volume={volume} setRecording={setRecording} />
        })}npm
        <h4>Volume</h4>
        <input
         type="range"
          step="0.01"
           onChange={e=>setVolume(e.target.value)}
            value={volume}
            max="1"
            min="0"
            className="w-50"
        />
        <h4>{recording}</h4>
        {recording && (
          <>
            <button onClick={playrecording} className="btn btn-success">PLAY</button>
            <button onClick={()=>setRecording("")} className="btn btn-danger">CLEAR</button>
          </>
        )}
        <h4>Speed Slider</h4>
        <input
        type="range"
        step="0.01"
        onChange={e=>setSpeed(e.target.value)}
        value={speed}
        min="0.1"
        max="1.2"
        className="w-50"
        />
     </div>
    </div>
  );
}

function Pad({sound, volume, setRecording}){
  const [active, setActive]= React.useState(false)

  const handleKeypress=(e)=>{
    if (e.keyCode === sound.keyCode)
      playsound();
  }

  React.useEffect(()=>{
    document.addEventListener('keydown', handleKeypress)
    return ()=>{
      document.removeEventListener('keydown', handleKeypress)
    }
    // eslint-disable-next-line
  },[])

  const playsound=()=>{
    const audioTag= document.getElementById(sound.keyTrigger);
    audioTag.currentTime = 0
    audioTag.play();
    setActive(true);
    setTimeout(()=>setActive(false),200);
    audioTag.volume= volume;
    setRecording(prev => prev + sound.keyTrigger + " ");
    
  }
  return(
    <div onClick= {playsound} id= "drum-pad" className={`btn btn-secondary m-3 p-4 text-white ${active && 'btn-warning'}`}>
      <audio id={sound.keyTrigger} src={sound.url} />
      {sound.keyTrigger}
    </div>
  )
}

export default App;
