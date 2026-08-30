import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/guy-mad-moving.gif';
import antIdle from '../images/guy-mad.png';
function Guy() {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
            setTimeout(() => {
                setPlaying(false);
            }, 3000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="z-10 h-[70vh]" />
  )
}

export default Guy
