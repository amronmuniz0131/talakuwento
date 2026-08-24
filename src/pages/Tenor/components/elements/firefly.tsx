import { useState, useEffect, useRef } from 'react'
import firefly from '../images/firefly.gif';
import fireflyMove from '../images/firefly-singing.gif';
function Firefly() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
            setTimeout(() => {
                setPlaying(false);
            }, 2000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? fireflyMove : firefly} alt="firefly" className={`${playing ? 'h-72' : 'ml-[340px] h-60'}`} />
  )
}

export default Firefly
