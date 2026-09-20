import { useState, useEffect, useRef } from 'react'
import cowEat from '../images/cow-eat.gif';
import cowMoo from '../images/cow-moo.gif';
import CowSound from '../audio/cow moo.mp3';
function Cow() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
          const audio = new Audio(CowSound);
           audio.play().catch(e => console.error("Audio playback failed:", e));
            setTimeout(() => {
                setPlaying(false);
            }, 2000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? cowMoo : cowEat} alt="cow-eat" className="h-full" />
  )
}

export default Cow