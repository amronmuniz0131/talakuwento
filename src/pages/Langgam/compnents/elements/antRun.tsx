import { useState, useEffect, useRef } from 'react'
import antBuildRun from '../images/ant-running.gif';
import antIdle from '../images/ant-throw.png';
function AntRun() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
            setTimeout(() => {
                setPlaying(false);
            }, 2000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuildRun : antIdle} alt="ant-build" className="h-full scale-[0.8] z-10" />
  )
}

export default AntRun
