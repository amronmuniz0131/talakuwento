import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/mom-pace.gif';
import antIdle from '../images/mom-pace.png';
import steps from '../audio/steps.mp3'
function Pace() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
          const audio = new Audio(steps);
           audio.play().catch(e => console.error("Audio playback failed:", e));
            setTimeout(() => {
              audio.pause();
                setPlaying(false);
            }, 5000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full scale-[0.8] z-10" />
  )
}

export default Pace
