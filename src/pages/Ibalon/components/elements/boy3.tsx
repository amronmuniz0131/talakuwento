import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/boy3-punch.gif';
import antIdle from '../images/boy3.png';
import PunchSound from '../audio/punch.mp3';
function Boy3(props) {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
          const audio = new Audio(PunchSound);
           audio.play().catch(e => console.error("Audio playback failed:", e));
            setTimeout(() => {
                setPlaying(false);
            }, 2000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="scale-[0.7] hover:cursor-pointer z-10" />
  )
}

export default Boy3
