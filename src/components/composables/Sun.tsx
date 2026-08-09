
import sun from '../../images/sun.png'
import React, { useState, useEffect, useRef } from 'react';

export default function Sun() {

    const [selectedStory, setSelectedStory] = useState(false)
    return (
        <img src={sun} alt="" onClick={(e) => { e.stopPropagation(); setSelectedStory(!selectedStory) }} className={`h-[100px] w-[150px] hover:cursor-pointer bottom-0 left-0 transition-transform duration-[1200ms] ease-in-out absolute will-change-transform ${!selectedStory ? 'animate-move-up -translate-y-[180px]' : 'animate-move-down '}`} />
    );
}