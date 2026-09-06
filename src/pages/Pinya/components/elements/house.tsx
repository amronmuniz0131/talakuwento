import React, { useState } from 'react'
import house from '../../images/house.png'
import closeHouse from '../images/door-close.gif'
import openHouse from '../images/door-open.gif'

function Home() {
const [selected, setSelected] = useState(false)
const [playKey, setPlayKey] = useState(0)
  return (
    <div className="contents">
        <img 
        key={playKey}
        onClick={(e) => { e.stopPropagation(); setSelected(!selected); }}  
        src={`${selected ? closeHouse : openHouse}?t=${playKey}`} alt="" className="" />
    </div>
    
  )
}

export default Home
