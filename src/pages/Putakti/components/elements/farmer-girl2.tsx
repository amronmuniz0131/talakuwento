import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/palay-move.gif';
import antIdle from '../images/palay.png';
import palaySound from '../audio/moving-plant.mp3';
function FarmerGirl2() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
          const audio = new Audio(palaySound);
           audio.play().catch(e => console.error("Audio playback failed:", e));
            setTimeout(() => {
              audio.pause();
              audio.currentTime = 0;
                setPlaying(false);
            }, 6000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full z-10" />
  )
}

export default FarmerGirl2
