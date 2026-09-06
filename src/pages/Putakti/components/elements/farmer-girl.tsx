import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/farmer-move.gif';
import plantingSound from '../audio/planting a plant.mp3';
import antIdle from '../images/famer.png';
function FarmerGirl() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
          const audio = new Audio(plantingSound);
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
              audio.onended = null;
              audio.pause();
              audio.currentTime = 0;
                setPlaying(false);
            }, 6000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full z-10" />
  )
}

export default FarmerGirl
