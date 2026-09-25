import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/warrior-animated.gif';
import antIdle from '../images/warrior-base.png';
function Warrior(props) {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
        //   const audio = new Audio(PunchSound);
        //    audio.play().catch(e => console.error("Audio playback failed:", e));
            setTimeout(() => {
                setPlaying(false);
            }, 2000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="hover:cursor-pointer h-[40rem] z-10" />
  )
}

export default Warrior
