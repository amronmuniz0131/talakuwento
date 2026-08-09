
import mountain from '../../images/mount-makiling.png';
import React, { useState } from 'react'
export default function Mountains() {
    const [fruits, showFruits] = useState(false)
    return (
        <img src={mountain} alt="" onClick={(e) => { e.stopPropagation(); showFruits(!fruits); console.log('try') }} className={`hover:cursor-pointer absolute bottom-[35%] left-0 ${!fruits ? "animate-move-left -translate-x-[450px]" : 'animate-move-right translate-x-[450px]'}`} />

    );
}