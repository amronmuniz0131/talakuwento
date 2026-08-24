import { useState, useEffect, useRef } from 'react'
import sheepDead from '../images/sheep-dead-before.png';
import sheepDeadMove from '../images/sheep-dead.gif';
function SheepDead() {
    const [playing, setPlaying] = useState(false);
    // useEffect(() => {
    //     if (playing) {
    //         setTimeout(() => {
    //             setPlaying(false);
    //         }, 2000);
    //     }
    // }, [playing]);
  return (
    <img onClick={()=> setPlaying(true)} src={playing ? sheepDeadMove : sheepDead} alt="sheepDead" />
  )
}

export default SheepDead
