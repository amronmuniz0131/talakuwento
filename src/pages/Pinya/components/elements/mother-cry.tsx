import React, { useState, useEffect } from 'react'
import Rabbit from '../images/mother-crying.gif'
import Bunny from '../images/mother-crying.png'
import crying from '../audio/crying female.mp3'

function Grass() {
const [isGrass, setIsGrass] = useState(false)
useEffect(() => {
        if (isGrass) {
          const audio = new Audio(crying);
           audio.play().catch(e => console.error("Audio playback failed:", e));
            setTimeout(() => {
              audio.pause()
                setIsGrass(false);
            }, 5000);
        }
    }, [isGrass]);
  return (
    <img onClick={(e) => { e.stopPropagation(); setIsGrass(!isGrass); }} 
    src={isGrass ? Rabbit : Bunny} alt="" 
    className="h-[75%] w-[75%]" />
  )
}

export default Grass