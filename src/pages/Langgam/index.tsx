import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import grass from './compnents/images/6.png'
import Formation from './compnents/elements/formation'
import Mound from './compnents/images/5.png'
import AntThrow from './compnents/elements/antThrow'
import AntJump from './compnents/elements/antJump'
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
                <img src={grass} alt="" className="absolute bottom-0"/>
                <div className="items-end flex gap-2 absolute bottom-[-10rem] xs:bottom-[-2rem] left-[-8rem]">
                    <Formation />
                </div>
                <div className="absolute bottom-[-2rem] left-[30rem]">
                    <AntThrow />
                </div>
                <div className="absolute bottom-[-2rem] left-[50rem]">
                    <AntJump />
                </div>
                <img src={Mound} alt="" className="absolute xs:bottom-0 bottom-[-4rem] xs:scale-[1] scale-[0.6]  right-0" />
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