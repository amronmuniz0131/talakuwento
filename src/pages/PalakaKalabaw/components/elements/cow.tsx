import { useState, useEffect, useRef } from 'react'
import cowEat from '../images/cow-eat.gif';
import cowMoo from '../images/cow-moo.gif';
function Cow() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
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