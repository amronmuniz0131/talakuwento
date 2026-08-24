import { useState, useEffect, useRef } from 'react'
import frogPop from '../images/frog-pop-2.gif';
import frogIdle from '../images/frog-idle.gif';
function FrogPop() {
    const [playing, setPlaying] = useState(false);
  return (
    <div>
        <img onClick={()=> setPlaying(true)} src={playing ? frogPop : frogIdle} alt="frog" className="h-56" />
    </div>
  )
}

export default FrogPop
