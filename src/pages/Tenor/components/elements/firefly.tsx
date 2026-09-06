import { useState, useEffect, useRef } from 'react'
import firefly from '../images/firefly.gif';
import fireflyMove from '../images/firefly-singing.gif';
import fireflySound from '../audio/fly.mp3';
function Firefly() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
          const audio = new Audio(fireflySound);
          audio.play().catch(e => console.error("Audio playback failed:", e));
            setTimeout(() => {
                setPlaying(false);
            }, 3000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? fireflyMove : firefly} alt="firefly" className={`${playing ? 'h-72' : 'ml-[340px] h-60'}`} />
  )
}

export default Firefly
