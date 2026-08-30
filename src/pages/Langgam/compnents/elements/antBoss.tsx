import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/ant-boss.gif';
import antIdle from '../images/ant-boss-stay.png';
import AntJump from './antJump';
function AntBoss() {
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

export default AntBoss
