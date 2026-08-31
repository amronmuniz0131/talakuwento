import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/goddess-spell.gif';
import antIdle from '../images/goddess.png';
function Goddess(props) {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
            setTimeout(() => {
                setPlaying(false);
            }, 2000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="scale-[0.7] hover:cursor-pointer z-10" />
  )
}

export default Goddess
