import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/ant-build.gif';
import antIdle from '../images/ant-formation.png';
function Formation() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
            setTimeout(() => {
                setPlaying(false);
            }, 2500);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full z-10 scale-[0.6] xs:scale-[0.8]" />
  )
}

export default Formation
