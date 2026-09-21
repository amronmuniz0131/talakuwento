import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/solo.gif';
import antIdle from '../images/solo.png';
import PunchSound from '../audio/punch.mp3';
function Dulaw(props) {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
        //   const audio = new Audio(PunchSound);
        //    audio.play().catch(e => console.error("Audio playback failed:", e));
            setTimeout(() => {
                setPlaying(false);
            }, 3000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="scale-[0.55] hover:cursor-pointer z-10" />
  )
}

export default Dulaw
