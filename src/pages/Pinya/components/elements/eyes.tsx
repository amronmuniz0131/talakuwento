import React, { useState, useEffect } from 'react'
import Rabbit from '../images/kid-eyes.gif'
import Bunny from '../images/kid-eyes.png'
import scream from '../audio/kid screaming before becoming a pinya.mp3'

function Eyes() {
const [isGrass, setIsGrass] = useState(false)
const audio = new Audio(scream);
  return (
    <img onClick={(e) => { e.stopPropagation(); setIsGrass(!isGrass); !isGrass && audio.play().catch(e => console.error("Audio playback failed:", e));
 }} 
    src={isGrass ? Rabbit : Bunny} alt="" 
    className="" />
  )
}

export default Eyes