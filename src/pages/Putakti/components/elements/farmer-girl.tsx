import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/farmer-move.gif';
import antIdle from '../images/famer.png';
function FarmerGirl() {
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

export default FarmerGirl
