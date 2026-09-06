import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/crocs-talk.gif';
import antIdle from '../images/crocs.png';
import buwayaSound from '../audio/crocodile growl.mp3';
function Crocs() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
          const audio = new Audio(buwayaSound);
           audio.play().catch(e => console.error("Audio playback failed:", e));
            setTimeout(() => {
                setPlaying(false);
            }, 2000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full scale-[0.8] z-10" />
  )
}

export default Crocs
