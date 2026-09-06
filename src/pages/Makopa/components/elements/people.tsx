import { useState, useEffect, useRef } from 'react'
import antBuild from '../images/group-mov.gif';
import PeopleSound from '../audio/group.mp3';
import antIdle from '../images/group.png';
import bell from "../images/11.png"
function People(props) {
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (playing) {
          const audio = new Audio(PeopleSound);
           audio.play().catch(e => console.error("Audio playback failed:", e));
            setTimeout(() => {
                setPlaying(false);
            }, 3000);
        }
    }, [playing]);
  return (
    <div className="relative">
        <img src={bell} alt="" className={`scale-[10%] top-[-22%] left-[20%] absolute ${!props.bell ? 'block' : 'hidden' }`} />
        <img onClick={()=> setPlaying(true)} src={playing ? antBuild : antIdle} alt="ant-build" className="h-full z-10" />
    </div>
  )
}

export default People
