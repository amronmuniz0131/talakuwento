import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, House } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';
import Sun from '@/components/composables/Sun.tsx'
import Home from './components/elements/house.tsx'
import House2 from './components/elements/house2.tsx'
import ground from './components/images/ground.png'
import Church from './components/elements/church.tsx'
import Clouds from '@/components/composables/Clouds.tsx'
import People from './components/elements/people.tsx'
import Couple from './components/elements/couple.tsx'
import Guy from './components/elements/guy.tsx'
import Father from './components/images/9.png'
import bellMissing from './components/images/bell-missing.png'
import Makopa from './components/elements/makopa.tsx'

function index() {
    const navigate = useNavigate();
    const [dimensions, setDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 700,
        height: typeof window !== 'undefined' ? window.innerHeight : 500
    });

    const [playing, setPlaying] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [trigger, setTrigger] = useState(true)
    const [bellStart, setBell] = useState(false)
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
            <div className="relative w-screen h-screen">
                <Sun trigger={trigger} setTrigger={setTrigger} />
                <Clouds trigger={trigger} setTrigger={setTrigger} />
                <div className="absolute flex items-end bottom-[0rem] left-[0rem]">
                    <Home />
                    <House2 />
                </div>
            </div>
            <div className="relative bg-blue-400 w-screen h-screen">
                {/* <Sun trigger={trigger} setTrigger={setTrigger} /> */}
                <div className="absolute bottom-0 w-screen">
                    <img src={ground} alt="" />
                </div>
                <div className="absolute bottom-0 right-0">
                    <Church setBell={setBell} />
                </div>
                <div className="absolute bottom-0 left-[10%]">
                    <People bell={bellStart} />
                </div>
            </div>
            <div className="relative bg-blue-400 w-screen h-screen">
                {/* <Sun trigger={trigger} setTrigger={setTrigger} /> */}
                <div className="absolute bottom-0 w-screen">
                    <img src={ground} alt="" />
                </div>
                <div className="absolute bottom-0 right-0">
                    <img src={bellMissing} alt="" />
                </div>
            </div>
            <div className="relative bg-blue-400 w-screen h-screen">
                {/* <Sun trigger={trigger} setTrigger={setTrigger} /> */}
                <div className="absolute bottom-0 w-screen">
                    <img src={ground} alt="" />
                </div>
                <div className="absolute bottom-0 right-0">
                    <img src={bellMissing} alt="" />
                </div>
                <div className="absolute flex items-end bottom-0 left-[10%]">
                    <Couple />
                    <Guy />
                    <img src={Father} alt="" className="h-[70vh]" />
                </div>
            </div>
            <div className="relative bg-blue-400 w-screen h-screen">
                {/* <Sun trigger={trigger} setTrigger={setTrigger} /> */}
                <div className="absolute bottom-0 w-screen">
                    <img src={ground} alt="" />
                </div>
                <div className="absolute bottom-0 right-0">
                    <img src={bellMissing} alt="" />
                </div>
                <div className="absolute bottom-0 left-0">
                    <Makopa />
                </div>
            </div>
            
        </HTMLFlipBook>
        {
            currentPage !== 0 && (
            <button className="absolute bottom-4 left-0 z-[999] rounded-full h-36 w-36 bg-white flex items-center justify-center hover:scale-110 transition-transform" onClick={goPrev}>
                <ChevronLeft className="w-20 h-20 text-gray-800" strokeWidth={2.5} />
            </button>
        )}
        <button className="absolute bottom-4 right-0 z-[999] rounded-full h-36 w-36 bg-white flex items-center justify-center hover:scale-110 transition-transform" onClick={goNext}>
            <ChevronRight className="w-20 h-20 text-gray-800" strokeWidth={2.5} />
        </button>
        <button className="absolute top-4 right-4 z-[999] rounded-full h-16 w-16 bg-white flex items-center justify-center hover:scale-110 transition-transform" onClick={() => navigate('/menu')} title="Bumalik sa Menu">
            <House className="w-8 h-8 text-gray-800" strokeWidth={2.5} />
        </button>
        
    </div>
  )
}

export default index