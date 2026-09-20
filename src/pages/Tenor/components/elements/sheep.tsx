import { useState, useEffect, useRef } from 'react'
import sheep from '../images/sheep.png';
import sheepMove from '../images/sheep-moving.gif';
import sheepSound from '../audio/dancing footstep.mp3';
function Sheep() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
            const audio = new Audio(sheepSound);
            audio.play().catch(e => console.error("Audio playback failed:", e));
            setTimeout(() => {
                setPlaying(false);
            }, 2000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? sheepMove : sheep} alt="sheep" className="h-1/4" />
  )
}

export default Sheep
