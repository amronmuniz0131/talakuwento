import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/couple-move.gif';
import antIdle from '../images/couple-mad.png';
function Couple() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
            setTimeout(() => {
                setPlaying(false);
            }, 3000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full z-10" />
  )
}

export default Couple
