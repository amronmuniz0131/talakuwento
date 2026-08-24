import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/pabo.gif';
import antIdle from '../images/pabo.png';
function Pabo() {
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

export default Pabo
