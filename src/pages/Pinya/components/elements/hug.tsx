import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/mom-hug.gif';
import antIdle from '../images/mom-hug.png';
import hugging from '../audio/hugging.mp3'
function Hug() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {

          const audio = new Audio(hugging);
           audio.play().catch(e => console.error("Audio playback failed:", e));
            setTimeout(() => {
                setPlaying(false);
            }, 5000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full scale-[0.8] z-10" />
  )
}

export default Hug
