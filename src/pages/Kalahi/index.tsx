import React, { useState, useEffect, useRef } from 'react';
import Sun from '@/components/composables/Sun.tsx'
import White from './components/elements/white.tsx'
import Brown from './components/elements/brown.tsx'
import Jump from './components/elements/jump.tsx'
import Eat from './components/elements/eat.tsx'
import Peck from './components/elements/peck.tsx'
import chickenWhite from './components/images/chicken-base.png'
import chickenBrown from './components/images/chicken-brown.png'
import { ChevronLeft, ChevronRight, House } from 'lucide-react';
import grass from './components/images/grass.png'
import { useNavigate } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';
function index() {
    const navigate = useNavigate();
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
               <Sun setTrigger={setTrigger} trigger={trigger} />
               <img src={grass} className="absolute bottom-0 left-0 w-full" />
               <div className="absolute bottom-[-120px] right-0">
                 <White />
               </div>
               <div className="absolute bottom-[-120px] left-0">
                 <Brown />
               </div>
            </div>
            <div className="relative h-screen w-screen">
               <Sun setTrigger={setTrigger} trigger={trigger} />
               <img src={grass} className="absolute bottom-0 left-0 w-full" />
               <div className="absolute bottom-[-120px] right-0">
                 <Jump />
               </div>
               <div className="absolute bottom-[-120px] right-[20%]">
                 <Peck />
               </div>
            </div>
            <div className="relative h-screen w-screen">
               <Sun setTrigger={setTrigger} trigger={trigger} />
               <img src={grass} className="absolute bottom-0 left-0 w-full" />
               <div className="absolute bottom-[-120px] right-0">
                 <Eat />
               </div>
                 <img src={chickenBrown} alt="" className="absolute bottom-[-120px] left-0 scale-[0.7]" />
                 <img src={chickenBrown} alt="" className="absolute bottom-[-120px] left-[10%] scale-[0.7]" />
                 <img src={chickenBrown} alt="" className="absolute bottom-[-120px] left-[20%] scale-[0.7]" />
                 <img src={chickenBrown} alt="" className="absolute bottom-[-120px] left-[30%] scale-[0.7]" />
            </div>
            <div className="relative h-screen w-screen">
               <Sun setTrigger={setTrigger} trigger={trigger} />
               <img src={grass} className="absolute bottom-0 left-0 w-full" />
               <div className="absolute bottom-[-120px] right-0">
                 <White />
               </div>
               <div className="absolute bottom-[-120px] left-0 scale-x-[-1]">
                    <White />
               </div>
               <div className="absolute bottom-[-120px] left-[15%] scale-x-[-1]">
                    <Eat />
               </div>
               <div className="absolute bottom-[-120px] left-[30%] scale-x-[-1]">
                    <Eat />
               </div>
            </div>
            <div className="relative h-screen w-screen">
               <Sun setTrigger={setTrigger} trigger={trigger} />
               <img src={grass} className="absolute bottom-0 left-0 w-full" />
                 <img src={chickenBrown} alt="" className="absolute bottom-[-170px] left-0 scale-[0.5]" />
                 <img src={chickenBrown} alt="" className="absolute bottom-[-170px] left-[5%] scale-[0.5]" />
                 <img src={chickenBrown} alt="" className="absolute bottom-[-170px] left-[10%] scale-[0.5]" />
                 <img src={chickenBrown} alt="" className="absolute bottom-[-170px] left-[15%] scale-[0.5]" />
                 <div className="">
                    <img src={chickenWhite} alt="" className="absolute bottom-[-200px] right-0 scale-[0.5]" />
                    <img src={chickenWhite} alt="" className="absolute bottom-[-200px] right-[5%] scale-[0.5]" />
                    <img src={chickenWhite} alt="" className="absolute bottom-[-200px] right-[10%] scale-[0.5]" />
                    <img src={chickenWhite} alt="" className="absolute bottom-[-200px] right-[15%] scale-[0.5]" />
                 </div>
            </div>
            <div className="relative h-screen w-screen">
               <Sun setTrigger={setTrigger} trigger={trigger} />
               <img src={grass} className="absolute bottom-0 left-0 w-full" />
               <div className="absolute right-[0%] bottom-[-300px] scale-[0.4]">
                 <Peck />
               </div>
               <div className="absolute right-[-10%] bottom-[-300px] scale-[0.4]">
                 <White />
               </div>
               <div className="absolute left-0 bottom-[-200px] scale-[0.7]">
                 <Peck />
               </div>
               <div className="absolute left-[10%] bottom-[-200px] scale-[0.7]">
                 <White />
               </div>
               <div className="absolute left-[25%] bottom-[-200px] scale-[0.7]">
                 <Peck />
               </div>
               <div className="absolute left-[35%] bottom-[-200px] scale-[0.7]">
                 <White />
               </div>
               <div className="absolute left-[50%] bottom-[-200px] scale-[0.7]">
                 <Peck />
               </div>
               <div className="absolute left-[60%] bottom-[-200px] scale-[0.7]">
                 <White />
               </div>
            </div>
            <div className="relative h-screen w-screen">
               <Sun setTrigger={setTrigger} trigger={trigger} />
               <img src={grass} className="absolute bottom-0 left-0 w-full" />
               <div className="absolute bottom-[-120px] right-0">
                 <White />
               </div>
               <div className="absolute bottom-[-120px] left-0 scale-x-[-1]">
                    <White />
               </div>
               <div className="absolute bottom-[-120px] left-[15%] scale-x-[-1]">
                    <Eat />
               </div>
               <div className="absolute bottom-[-120px] left-[30%] scale-x-[-1]">
                    <Eat />
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