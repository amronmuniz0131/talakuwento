import React, { useState, useEffect, useRef } from 'react';
import Sun from '@/components/composables/Sun.tsx'
import { ChevronLeft, ChevronRight, House } from 'lucide-react';
import Dancing from './components/elements/dancing.tsx'
import Spear from './components/elements/spear.tsx'
import Solo from './components/elements/solo.tsx'
import Dragon from './components/elements/dragon.tsx'
import grass from './components/images/grass.png'
import Wolf from './components/elements/wolf.tsx'
import Kubo from './components/images/kubo.png'
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
               <img src={Kubo} className="absolute bottom-[5%] right-0 w-1/2" />
               <div className="absolute left-[10%] bottom-[5%]">
                    <Dancing />
               </div>
               <div className="absolute left-[30%] bottom-[-15%]">
                    <Solo />
               </div>
            </div>
            <div className="relative h-screen w-screen">
               <Sun setTrigger={setTrigger} trigger={trigger} />
               <img src={grass} className="absolute bottom-0 left-0 w-full" />
               <img src={Kubo} className="absolute bottom-[5%] right-0 w-1/2" />
               <div className="absolute left-0 bottom-[-5%] scale-x-[-1]">
                    <Wolf />
               </div>
               <div className="absolute left-[35%] bottom-0">
                    <Spear />
               </div>
            </div>
            <div className="relative h-screen w-screen">
               <Sun setTrigger={setTrigger} trigger={trigger} />
               <img src={grass} className="absolute bottom-0 left-0 w-full" />
               <img src={Kubo} className="absolute bottom-[5%] right-0 w-1/2" />
               <div className="absolute left-[10%] bottom-[5%]">
                    <Dancing />
               </div>
               <div className="absolute left-[30%] bottom-[-15%]">
                    <Solo />
               </div>
            </div>
            <div className="relative h-screen w-screen">
               <Sun setTrigger={setTrigger} trigger={trigger} />
               <img src={grass} className="absolute bottom-0 left-0 w-full" />
               <img src={Kubo} className="absolute bottom-[5%] right-0 w-1/2" />
               <div className="absolute left-0 bottom-[-5%] scale-x-[-1]">
                    <Dragon />
               </div>
               <div className="absolute left-[35%] bottom-0">
                    <Spear />
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