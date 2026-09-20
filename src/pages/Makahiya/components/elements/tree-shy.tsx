import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/bloom.gif';
import antIdle from '../images/bloom.png';
function TreeShy() {
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

export default TreeShy
