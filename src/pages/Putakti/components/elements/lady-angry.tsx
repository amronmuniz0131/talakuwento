import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/lady-move.gif';
import antIdle from '../images/lady-angry.png';
import ladyAngrySound from '../audio/women-enraged.mp3';
function LadyAngry() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
          const audio = new Audio(ladyAngrySound);
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

export default LadyAngry
