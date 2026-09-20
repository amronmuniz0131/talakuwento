import { useState, useEffect, useRef } from 'react'
import frogJump from '../images/frog-2-jump.gif';
import frogIdle from '../images/frog-2-idle.gif';
import FrogSound from '../audio/frog.mp3';
function Frog() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
          const audio = new Audio(FrogSound);
           audio.play().catch(e => console.error("Audio playback failed:", e));
            setTimeout(() => {
                setPlaying(false);
            }, 2000);
        }
    }, [playing]);
  return (
    <div>
        <img onClick={()=> setPlaying(true)} src={playing ? frogJump : frogIdle} alt="frog" className={`${playing ? 'h-60' : 'h-40'}`} />
    </div>
  )
}

export default Frog