import React, { useState } from 'react'
import house from '../../images/house.png'
import closeHouse from './components/door-close.gif'
import openHouse from './components/door-open.gif'

function House() {
const [selected, setSelected] = useState(false)
const [playKey, setPlayKey] = useState(0)
  return (
    <div className="contents">
        <img 
        key={playKey}
        onClick={(e) => { e.stopPropagation(); setSelected(!selected); setPlayKey(k => k + 1); }}  
        src={`${selected ? closeHouse : openHouse}?t=${playKey}`} alt="" className="absolute bottom-0 right-8 h-[80%]" />
    </div>
    
  )
}

export default House