import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/pinya-seek.gif';
import antIdle from '../images/pinya-seek.png';
import seek from '../audio/hmmm kid.mp3'
function Seek() {   
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
          const audio = new Audio(seek);
           audio.play().catch(e => console.error("Audio playback failed:", e));
            setTimeout(() => {
                audio.pause()
                setPlaying(false);
            }, 3000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full scale-[0.8] z-10" />
  )
}

export default Seek
