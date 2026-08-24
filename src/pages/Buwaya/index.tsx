import React, { useState, useEffect, useRef } from 'react';
import Mount from './components/images/mount.png'
import Ground from './components/images/ground.png'
import Dear from './components/elements/Dear.tsx'
import Crocs from './components/elements/Crocs.tsx'
import pearl from './components/images/pearl-base.png'
import Pabo from './components/elements/Pabo.tsx'
import crocsEat from './components/images/5.png'
import Sun from './components/elements/Sun.tsx'
import Clouds from './components/elements/Clouds.tsx'
import HTMLFlipBook from 'react-pageflip';
function index() {
    const [dimensions, setDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 700,
        height: typeof window !== 'undefined' ? window.innerHeight : 500
    });

    const [playing, setPlaying] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [trigger, setTrigger] = useState(false)
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
            <div className="bg-blue-400 relative h-screen w-screen">
                <img src={Ground} alt="ground" className="absolute bottom-0 w-screen" />
                <Clouds trigger={trigger} />
                <img src={Mount} alt="mount" className="absolute left-[-8rem] bottom-0 h-full" />
                <div className="absolute bottom-[-8rem] right-[7rem]">
                    <Dear />
                </div>
                <div className="absolute bottom-[-0rem] left-[10rem]">
                    <Crocs />
                </div>
            </div>
            <div className={`relative h-screen w-screen ${!trigger ? 'bg-blue-400' : 'bg-black'}`}>
                <img src={Ground} alt="ground" className="absolute bottom-0 w-screen" />
                <Clouds trigger={trigger} />
                <Sun trigger={trigger} setTrigger={setTrigger} />
                <img src={Mount} alt="mount" className="absolute left-[-8rem] bottom-0 h-full" />
                <img src={pearl} alt="" className="absolute bottom-[0rem] left-[45%] h-1/4" />
                <div className="absolute bottom-[-0rem] left-[6rem]">
                    <Crocs />
                </div>
                <div className="absolute bottom-[-10rem] right-[4rem] scale-[0.5] scale-x-[-0.5]">
                    <Pabo />
                </div>
            </div>
            <div className="bg-blue-400 relative h-screen w-screen">
                <img src={Ground} alt="ground" className="absolute bottom-0 w-screen" />
                <Clouds trigger={trigger} />
                <Sun trigger={trigger} setTrigger={setTrigger} />
                <img src={Mount} alt="mount" className="absolute left-[-8rem] bottom-0 h-full" />
                <img src={pearl} alt="" className="absolute bottom-[0rem] left-[45%] h-1/4" />
                <div className="absolute bottom-[-0rem] left-[6rem]">
                    <Crocs />
                </div>
                <div className="absolute bottom-[-10rem] right-[10rem] scale-[0.5]">
                    <Pabo />
                </div>
            </div>
            <div className="bg-blue-400 relative h-screen w-screen">
                <img src={Ground} alt="ground" className="absolute bottom-0 w-screen" />
                <Clouds trigger={trigger} />
                <Sun trigger={trigger} setTrigger={setTrigger} />
                <img src={Mount} alt="mount" className="absolute left-[-8rem] bottom-0 h-full" />
                {/* <img src={pearl} alt="" className="absolute bottom-[0rem] left-[45%] h-1/4" /> */}
                <div className="absolute bottom-[-2rem] scale-[0.7] left-[25rem]">
                    <img src={crocsEat} alt="" />
                </div>
                {/* <div className="absolute bottom-[-10rem] right-[10rem] scale-[0.5]">
                    <Pabo />
                </div> */}
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