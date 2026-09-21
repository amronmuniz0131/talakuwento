import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/dancing.gif';
import antIdle from '../images/dancing.png';
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
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="hover:cursor-pointer scale-[0.8] z-10" />
  )
}

export default Dancing
