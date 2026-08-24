import React from 'react'
import clouds from '../../images/clouds.png'

function Clouds(props: any) {
  return (
    <img src={clouds} alt="" className={`animate-move-cloud absolute top-[5rem] left-0 h-60 ${props.trigger ? 'block' : 'hidden'}`} />
    
  )
}

export default Clouds