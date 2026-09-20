import React, { useState, useEffect } from 'react'
import Rabbit from '../images/kid-eyes.gif'
import Bunny from '../images/kid-eyes.png'

function Eyes() {
const [isGrass, setIsGrass] = useState(false)
  return (
    <img onClick={(e) => { e.stopPropagation(); setIsGrass(!isGrass); }} 
    src={isGrass ? Rabbit : Bunny} alt="" 
    className="" />
  )
}

export default Eyes