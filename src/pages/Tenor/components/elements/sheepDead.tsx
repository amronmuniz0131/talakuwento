import { useState, useEffect, useRef } from 'react'
import sheepDead from '../images/sheep-dead-before.png';
import sheepDeadMove from '../images/sheep-dead.gif';
import sheepSound from '../audio/sheep.mp3';
function SheepDead() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
           const audio = new Audio(sheepSound);
            audio.play().catch(e => console.error("Audio playback failed:", e));
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? sheepDeadMove : sheepDead} alt="sheepDead" />
  )
}

export default SheepDead
