import React, { useState } from 'react'
import Grass from '../../images/rabbit.gif'
import Bunny from '../../images/bunny.png'

function Plants() {
const [isGrass, setIsGrass] = useState(false)
  return (
    <img onClick={(e) => { e.stopPropagation(); setIsGrass(!isGrass); }} 
    src={isGrass ? Grass : Bunny} alt="" 
    className="hover:cursor-pointer absolute -bottom-[0rem] -left-[10rem] h-[70%]" />
  )
}

export default Plants