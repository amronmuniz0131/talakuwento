import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/wolf-move.gif';
import antIdle from '../images/wolf.png';
import WolfSound from '../audio/wolf growl.mp3';
function Wolf(props) {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
          const audio = new Audio(WolfSound);
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

export default Wolf
