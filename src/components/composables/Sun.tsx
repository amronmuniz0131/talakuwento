
import Sun1 from '@/images/sun1.png'
import Moon from '@/images/moon.png'
import React, { useState, useEffect, useRef } from 'react';

function Sun(props) {
  const [sun, changeSun] = useState(props.trigger)
  const trigger = (trig) => {
    changeSun(trig)
    props.setTrigger(!trig)
  }
  return (
    <div onClick={() => trigger(!sun)} className={`w-screen h-screen z-[99] ${sun ? 'animate-bg-moon bg-[#60A5FA]' : 'animate-bg-sun bg-black'}`}>
        <img onClick={() => trigger(!sun)} src={Sun1} alt="" className={`absolute top-[0rem] left-[0rem] ${sun ? 'animate-out-sun transform translate-x-[0vw]' : 'animate-move-sun transform translate-x-[-80vw]'}`}  />
        <img onClick={() => trigger(!sun)} src={Moon} alt="" className={`absolute top-[0rem] right-0 h-48 w-48 bg-white rounded-full text-2xl ${sun ? 'animate-out-moon transform translate-x-[80vw]' : 'animate-move-moon transform rotate-[-45deg]'}`} />
    </div>
  )
}

export default Sun