import React, { useState } from 'react'
import Sun1 from '../../images/sun1.png'

function Sun(props) {
  const [sun, changeSun] = useState(true)
  const trigger = (trig) => {
    changeSun(trig)
    props.setTrigger(trig)
  }
  return (
    <div>
        <img onClick={() => trigger(!sun)} src={Sun1} alt="" className={`absolute top-[0rem] left-[0rem] ${sun ? 'animate-out-sun transform translate-x-[0vw]' : 'animate-move-sun transform translate-x-[-80vw]'}`}  />
        <div onClick={() => trigger(!sun)} className={`absolute top-[0rem] right-0 h-48 w-48 bg-white rounded-full text-2xl ${sun ? 'animate-out-moon transform translate-x-[80vw]' : 'animate-move-moon transform rotate-[-45deg]'}`}></div>
    </div>
  )
}

export default Sun