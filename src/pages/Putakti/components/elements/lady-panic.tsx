import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/lady-left-move.gif';
import antIdle from '../images/lady-left.png';
import ladyPanicSound from '../audio/women-enraged.mp3';
function LadyPanic() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
          const audio = new Audio(ladyPanicSound);
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

export default LadyPanic
