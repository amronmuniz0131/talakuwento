import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/pabo.gif';
import antIdle from '../images/pabo.png';
import paboSound from '../audio/peacock.mp3';
function Pabo() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
          const audio = new Audio(paboSound);
           audio.play().catch(e => console.error("Audio playback failed:", e));
            setTimeout(() => {
                setPlaying(false);
            }, 2000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full z-10" />
  )
}

export default Pabo
