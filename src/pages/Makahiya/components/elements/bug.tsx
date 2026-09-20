import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/leaf.gif';
import antIdle from '../images/leaf.png';
function Bug() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
            setTimeout(() => {
                setPlaying(false);
            }, 6000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-56 z-10" />
  )
}

export default Bug
