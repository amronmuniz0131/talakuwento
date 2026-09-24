import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/dancing-man.gif';
import antIdle from '../images/dancing-man.png';
import PunchSound from '../audio/punch.mp3';
function Dancing(props) {
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
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="hover:cursor-pointer z-10" />
  )
}

export default Dancing
