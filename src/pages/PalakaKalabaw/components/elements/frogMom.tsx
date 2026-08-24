import { useState, useEffect, useRef } from 'react'
import frogAttack from '../images/frog-attack.gif';
import frogIdle from '../images/frog-idle.gif';
function FrogMom() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
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