
import sun from '../../images/sun.png'
import React, { useState, useEffect, useRef } from 'react';

export default function Sun() {

    const [selectedStory, setSelectedStory] = useState(false)
    return (
        <img src={sun} alt="" onClick={(e) => { e.stopPropagation(); setSelectedStory(!selectedStory); console.log('test') }} className={`hover:cursor-pointer absolute -top-[30%] left-0 transition-transform duration-[1200ms] ease-in-out will-change-transform ${!selectedStory ? '-translate-y-[1080px]' : 'translate-y-0'}`} />
    );
}