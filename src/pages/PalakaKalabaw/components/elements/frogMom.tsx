import { useState, useEffect, useRef } from 'react'
import frogAttack from '../images/frog-attack.gif';
import frogIdle from '../images/frog-idle.gif';
import FrogMomSound from '../audio/green tree frog.mp3';
function FrogMom() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
          const audio = new Audio(FrogMomSound);
           audio.play().catch(e => console.error("Audio playback failed:", e));
            setTimeout(() => {
                setPlaying(false);
            }, 2000);
        }
    }, [playing]);
  return (
    <div>
        <img onClick={()=> setPlaying(true)} src={playing ? frogAttack : frogIdle} alt="frog" className="h-56" />
    </div>
  )
}

export default FrogMom