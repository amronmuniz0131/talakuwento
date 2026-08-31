import React, {useEffect, useState} from 'react'
import antIdle from '@/images/clouds.png';

function Clouds(props: any) {
    const [show, setShow] = useState(props.trigger)
    useEffect(()=>{
        setShow(props.trigger)
    },[props.trigger])
  return (
    <img src={antIdle} alt="" className={`absolute top-0 left-0 h-60 z-10 animate-move-cloud ${show ? 'hidden' : 'block'}`} />
    
  )
}

export default Clouds