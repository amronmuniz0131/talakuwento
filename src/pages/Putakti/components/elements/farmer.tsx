import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/farmer-guy-move.gif';
import antIdle from '../images/famer-guy.png';
function Farmer() {
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

export default Farmer
