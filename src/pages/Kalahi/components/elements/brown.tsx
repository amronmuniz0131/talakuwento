import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/chicken-walk.gif';
import antIdle from '../images/chicken-brown.png';
// import PunchSound from '../audio/punch.mp3';
function Brown(props) {
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
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="scale-[0.7] hover:cursor-pointer z-10" />
  )
}

export default Brown
