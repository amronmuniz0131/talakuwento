import React, { useState, useEffect } from 'react'
import Rabbit from '../images/rabbit.gif'
import Bunny from '../images/bunny.png'

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