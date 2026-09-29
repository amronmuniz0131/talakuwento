import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/mom-broom-move.gif';
import antIdle from '../images/mom-broom.png';
import brushing from '../audio/brushing.mp3'
function MotherBroom() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
          // const audio = new Audio(brushing);
          //  audio.play().catch(e => console.error("Audio playback failed:", e));
            setTimeout(() => {
                setPlaying(false);
            }, 2000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full scale-[0.8] z-10" />
  )
}

export default MotherBroom
