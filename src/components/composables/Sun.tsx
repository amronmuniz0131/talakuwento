
import Sun1 from '@/images/sun1.png'
import Moon from '@/images/moon.png'
import React, { useState, useEffect, useRef } from 'react';

function Sun(props) {
  const [sun, changeSun] = useState(props.trigger)
  const [clicked, setClicked] = useState(false)
  const trigger = (trig) => {
    changeSun(trig)
    props.setTrigger(trig)
    setClicked(true)
  }
  return (
    <div onClick={() => trigger(!sun)} className={`w-screen h-screen z-[99] ${sun ? `${clicked ? 'animate-bg-moon ' : ''}bg-[#60A5FA]` : `${clicked ? 'animate-bg-sun ' : ''}bg-black`}`}>
        <img onClick={() => trigger(!sun)} src={Sun1} alt="" className={`absolute top-[0rem] left-[0rem] ${sun ? `${clicked ? 'animate-out-sun ' : ''}transform translate-x-[0vw]` : `${clicked ? 'animate-move-sun ' : ''}transform translate-x-[-80vw]`}`}  />
        <img onClick={() => trigger(!sun)} src={Moon} alt="" className={`absolute top-[0rem] right-0 h-48 w-48 bg-white rounded-full text-2xl ${sun ? `${clicked ? 'animate-out-moon ' : ''}transform translate-x-[80vw]` : `${clicked ? 'animate-move-moon ' : ''}transform rotate-[-45deg]`}`} />
    </div>
  )
}

export default Sun