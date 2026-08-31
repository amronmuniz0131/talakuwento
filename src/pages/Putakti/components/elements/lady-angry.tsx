import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/lady-move.gif';
import antIdle from '../images/lady-angry.png';
function LadyAngry() {
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

export default LadyAngry
