import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/boy2-punch.gif';
import antIdle from '../images/boy2.png';
function Boy2(props) {
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

export default Boy2
