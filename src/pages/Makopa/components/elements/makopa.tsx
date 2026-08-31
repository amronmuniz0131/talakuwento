import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/makopa-move.gif';
import antIdle from '../images/makopa-base.gif';
function Makopa(props) {
    const [playing, setPlaying] = useState(false);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full z-10" />
  )
}

export default Makopa
