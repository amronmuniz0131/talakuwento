import { useState, useEffect, useRef } from 'react'
import antThrow from '../images/ant-throw-move.gif';
import antIdle from '../images/ant-running.gif';
function AntThrow() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
            setTimeout(() => {
                setPlaying(false);
            }, 2500);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antThrow : antIdle} alt="antThrow" className="h-full z-10 scale-[0.8]" />
  )
}

export default AntThrow
