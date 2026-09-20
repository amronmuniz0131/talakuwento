import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/ant-tree.gif';
import antIdle from '../images/ant-tree.png';
function AntFall() {
    const [playing, setPlaying] = useState(false);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full z-10" />
  )
}

export default AntFall
