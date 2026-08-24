import { useState, useEffect, useRef } from 'react'
import sheep from '../images/sheep.png';
import sheepMove from '../images/sheep-moving.gif';
function Sheep() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
            setTimeout(() => {
                setPlaying(false);
            }, 2000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? sheepMove : sheep} alt="sheep" className="h-1/4" />
  )
}

export default Sheep
