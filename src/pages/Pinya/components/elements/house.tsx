import React, { useEffect, useState } from 'react'
import house from '../../images/house.png'
import closeHouse from '../images/door-close.gif'
import openHouse from '../images/door-open.gif'
import door from '../audio/closing door.mp3'
import doorOpen from '../audio/opening door.mp3'

function Home() {
const [selected, setSelected] = useState(false)
const [playKey, setPlayKey] = useState(0)
const audio = new Audio(selected ? doorOpen : door);
  return (
    <div className="contents">
        <img 
        key={playKey}
        onClick={(e) => { e.stopPropagation(); setSelected(!selected); audio.play().catch(e => console.error("Audio playback failed:", e));
         }}  
        src={`${selected ? closeHouse : openHouse}?t=${playKey}`} alt="" className="h-[80vh]" />
    </div>
    
  )
}

export default Home
