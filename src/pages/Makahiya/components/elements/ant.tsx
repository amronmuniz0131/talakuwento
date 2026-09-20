import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/ant.gif';
import antIdle from '../images/ant.png';
function Ant() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
            setTimeout(() => {
                setPlaying(false);
            }, 2000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-24 z-10" />
  )
}

export default Ant
