import React from 'react'
import antIdle from '../images/clouds.png';

function Clouds(props: any) {
  return (
    <img src={antIdle} alt="" className={`absolute top-0 left-0 h-60 z-10 animate-move-cloud`} />
    
  )
}

export default Clouds