import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/bell-start.gif';
import antIdle from '../images/bell-normal.png';
function Church(props) {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
            props.setBell(true)
            setTimeout(() => {
                setPlaying(false);
                props.setBell(false)
            }, 6000);
        }
    }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full z-10" />
  )
}

export default Church
