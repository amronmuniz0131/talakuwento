import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/windmill.gif';
import antIdle from '../images/house-1.png';
function House2() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
            setTimeout(() => {
                setPlaying(false);
            }, 6000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full z-10" />
  )
}

export default House2
