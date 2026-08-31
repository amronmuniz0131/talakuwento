import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Farmer from './components/elements/farmer.tsx'
import FarmerGirl from './components/elements/farmer-girl.tsx'
import ground from './components/images/6.png'
import FarmerGirl2 from './components/elements/farmer-girl2.tsx'
import Sun from '@/components/composables/Sun.tsx'
import background from './components/images/13.png'
import LadyAngry from './components/elements/lady-angry.tsx'
import bar from './components/images/9.png'
import LadyPanic from './components/elements/lady-panic.tsx'

function index() {
    const [dimensions, setDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 700,
        height: typeof window !== 'undefined' ? window.innerHeight : 500
    });

    const [playing, setPlaying] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [trigger, setTrigger] = useState(true)
    const handleFlip = (e: any) => {
            setCurrentPage(e.data);
        };
    
        useEffect(() => {
            function handleResize() {
                setDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
    
    
        const bookRef = useRef(null);
    
        const goNext = () => {
            if (bookRef.current) {
                bookRef.current.pageFlip().flipNext(); // 👈 Programmatic Next
            }
        };
    
        const goPrev = () => {
            if (bookRef.current) {
                bookRef.current.pageFlip().flipPrev(); // 👈 Programmatic Prev
            }
        };
  return (
    <div className="relative z-20">
        {/* @ts-ignore */}
        <HTMLFlipBook width={dimensions.width} height={dimensions.height}
            ref={bookRef}
        useMouseEvents={false}
        onFlip={handleFlip}
        >
            <div className="relative h-screen w-screen">
                <Sun trigger={false} setTrigger={setTrigger} />
                <img src={ground} className="absolute bottom-0"  alt="" />
                <div className={`absolute left-1/2 -translate-x-1/2 bottom-0`}>
                    <Farmer />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun trigger={false} setTrigger={setTrigger} />
                <img src={ground} className="absolute bottom-0"  alt="" />
                <div className={`absolute left-1/2 -translate-x-1/2 bottom-0`}>
                    <Farmer />
                </div>
                <div className={`absolute left-[20%] bottom-4`}>
                    <FarmerGirl />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun trigger={false} setTrigger={setTrigger} />
                <img src={ground} className="absolute bottom-0"  alt="" />
                <div className={`absolute left-1/2 -translate-x-1/2 bottom-0`}>
                    <Farmer />
                </div>
                <div className={`absolute left-[20%] bottom-4`}>
                    <FarmerGirl />
                </div>
                <div className={`absolute right-[20%] bottom-4`}>
                    <FarmerGirl2 />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <img src={background} className="absolute bottom-0"  alt="" />
                <img src={bar} className="absolute bottom-0 right-0"  alt="" />
                <div className={`absolute flex items-center justify-center left-1/2 -translate-x-1/2 bottom-0`}>
                    <LadyPanic />
                    <LadyAngry />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun trigger={false} setTrigger={setTrigger} />
                <img src={ground} className="absolute bottom-0"  alt="" />
                <div className={`absolute left-1/2 -translate-x-1/2 bottom-0`}>
                    <Farmer />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <img src={background} className="absolute bottom-0"  alt="" />
                <img src={bar} className="absolute bottom-0 right-0"  alt="" />
            </div>
            <div className="relative h-screen w-screen">
                <Sun trigger={false} setTrigger={setTrigger} />
                <img src={ground} className="absolute bottom-0"  alt="" />
                <div className={`absolute left-1/2 -translate-x-1/2 bottom-0`}>
                    <Farmer />
                </div>
            </div>
            
        </HTMLFlipBook>
        {
            currentPage !== 0 && (
            <button className="absolute bottom-4 left-0 z-[999] rounded-full h-36 w-36 bg-white " onClick={goPrev}>Previous</button>
        )}
        <button className="absolute bottom-4 right-0 z-[999] rounded-full h-36 w-36 bg-white " onClick={goNext}>Next</button>
        
    </div>
  )
}

export default index