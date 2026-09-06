import React, { useState, useEffect } from 'react'
import Rabbit from '../images/mother-crying.gif'
import Bunny from '../images/mother-crying.png'

function Grass() {
const [isGrass, setIsGrass] = useState(false)
useEffect(() => {
        if (isGrass) {
            setTimeout(() => {
                setIsGrass(false);
            }, 4000);
        }
    }, [isGrass]);
  return (
    <img onClick={(e) => { e.stopPropagation(); setIsGrass(!isGrass); }} 
    src={isGrass ? Rabbit : Bunny} alt="" 
    className="h-[75%] w-[75%]" />
  )
}

export default Grass