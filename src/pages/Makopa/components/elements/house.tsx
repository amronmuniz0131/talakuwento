import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/house2.png';
import antIdle from '../images/house2-open.png';
function House() {
    const [playing, setPlaying] = useState(false);
  return (
    <img onClick={()=> setPlaying(!playing)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full z-10" />
  )
}

export default House
