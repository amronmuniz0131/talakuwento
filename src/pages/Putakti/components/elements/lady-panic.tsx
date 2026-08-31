import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/lady-left-move.gif';
import antIdle from '../images/lady-left.png';
function LadyPanic() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
            setTimeout(() => {
                setPlaying(false);
            }, 2000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full z-10" />
  )
}

export default LadyPanic
