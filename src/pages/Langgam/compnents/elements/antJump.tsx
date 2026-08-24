import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/ant-jump.gif';
import antIdle from '../images/ant-walking.gif';
function AntJump() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
            setTimeout(() => {
                setPlaying(false);
            }, 2000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full scale-[0.8] z-10" />
  )
}

export default AntJump
