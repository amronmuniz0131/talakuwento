import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/palay-move.gif';
import antIdle from '../images/palay.png';
function FarmerGirl2() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
            setTimeout(() => {
                setPlaying(false);
            }, 6000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full z-10" />
  )
}

export default FarmerGirl2
