import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/guitar.gif';
import antIdle from '../images/guitar.png';
import PunchSound from '../audio/punch.mp3';
function Guitar(props) {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
        //   const audio = new Audio(PunchSound);
        //    audio.play().catch(e => console.error("Audio playback failed:", e));
            setTimeout(() => {
                setPlaying(false);
            }, 4000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="hover:cursor-pointer h-[50vh] z-10" />
  )
}

export default Guitar
