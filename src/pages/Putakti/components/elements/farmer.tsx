import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/farmer-guy-move.gif';
import antIdle from '../images/famer-guy.png';
import FarmerSound from '../audio/man talking.mp3';
function Farmer() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
          const audio = new Audio(FarmerSound);
           audio.play().catch(e => console.error("Audio playback failed:", e));
            setTimeout(() => {
              audio.pause();
              audio.currentTime = 0;
                setPlaying(false);
            }, 2000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full z-10" />
  )
}

export default Farmer
