import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Cow from './components/elements/cow.tsx'
import Sun from './components/elements/Sun.tsx'
import Frog from './components/elements/frog.tsx'
import Lake from './components/images/6.png'
import Mountains from './components/images/mountains.png';
import ground from './components/images/ground.png'
import FrogMom from './components/elements/frogMom.tsx'
import FrogPop from './components/elements/frogPop.tsx'

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
            <div className="bg-blue-400 relative h-screen w-screen">
                <img src={Mountains} alt="" className="bottom-[30%] absolute w-[100%] h-[70%] right-0" />
                <img src={ground} alt="" className="absolute bottom-[-10rem] left-[0rem] w-screen" />
                <Sun trigger={trigger} setTrigger={setTrigger} />
                <img src={Lake} alt="" className="absolute bottom-[-5rem] left-[0rem] w-2/3" />
                <div className="h-1/2 absolute right-0 bottom-[20%]">
                    <Cow />
                </div>
                <div className="absolute right-[30%] bottom-[20%]">
                    <Frog />
                </div>
            </div>
            <div className="bg-blue-400 relative h-screen w-screen">
                <img src={Mountains} alt="" className="bottom-[30%] absolute w-[100%] h-[70%] right-0" />
                <img src={ground} alt="" className="absolute bottom-[-10rem] left-[0rem] w-screen" />
                <Sun trigger={trigger} setTrigger={setTrigger} />
                <img src={Lake} alt="" className="absolute bottom-[-5rem] left-[0rem] w-2/3" />
                <div className="h-1/2 absolute right-0 bottom-[20%]">
                    <Cow />
                </div>
                <div className="absolute right-[30%] bottom-[20%]">
                    <Frog />
                </div>
                <div className="absolute right-[40%] bottom-[40%]">
                    <Frog />
                </div>
                <div className="absolute right-[30%] bottom-[40%]">
                    <Frog />
                </div>
                <div className="absolute right-[40%] bottom-[20%]">
                    <Frog />
                </div>
            </div>
            <div>
                <img src={Mountains} alt="" className="bottom-[30%] absolute w-[100%] h-[70%] right-0" />
                <img src={ground} alt="" className="absolute bottom-[-10rem] left-[0rem] w-screen" />
                <Sun trigger={trigger} setTrigger={setTrigger} />
                <img src={Lake} alt="" className="absolute bottom-[-5rem] left-[0rem] w-2/3" />
                <div className="absolute right-[30%] bottom-[20%]">
                    <FrogMom />
                </div>
                <div className="absolute right-[20%] bottom-[20%]">
                    <Frog />
                </div>
            </div>
            <div>
                <img src={Mountains} alt="" className="bottom-[30%] absolute w-[100%] h-[70%] right-0" />
                <img src={ground} alt="" className="absolute bottom-[-10rem] left-[0rem] w-screen" />
                <Sun trigger={trigger} setTrigger={setTrigger} />

                <img src={Lake} alt="" className="absolute bottom-[-5rem] left-[0rem] w-2/3" />
                <div className="absolute right-[30%] bottom-[20%]">
                    <FrogPop />
                </div>
                <div className="absolute right-[10%] bottom-[20%]">
                    <Frog />
                </div>
                <div className="absolute right-[5%] bottom-[10%]">
                    <Frog />
                </div>
                <div className="absolute right-[20%] bottom-[20%]">
                    <Frog />
                </div>
                <div className="absolute right-[15%] bottom-[10%]">
                    <Frog />
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