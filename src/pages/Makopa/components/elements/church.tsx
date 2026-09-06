import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/bell-start.gif';
import antIdle from '../images/bell-normal.png';
import BellSound from '../audio/bell.mp3';
function Church(props) {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
          const audio = new Audio(BellSound);
           let playCount = 0;
          const playAudio = () => {
            playCount++;
            audio.play().catch(e => console.error("Audio playback failed:", e));
          };
          audio.onended = () => {
            if (playCount < 6) {
              audio.currentTime = 0;
              playAudio();
            }
          };
          playAudio();
            setTimeout(() => {
              audio.pause();
              audio.currentTime = 0;
                setPlaying(false);
                props.setBell(false)
            }, 6000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full z-10" />
  )
}

export default Church
