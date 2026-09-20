import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, House } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sun from '@/components/composables/Sun.tsx';
import Mountains from './components/images/mountains.png'
import ground from './components/images/ground.png'
import Sheep from './components/elements/sheep.tsx';
import Firefly from './components/elements/firefly.tsx';
import fog from './components/images/fog.png'
import tree from './components/images/tree.png'
import SheepDead from './components/elements/sheepDead.tsx'
import notes from './components/images/notes.gif'
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
                <img src={Mountains} alt="" className="bottom-[30%] absolute w-[100%] h-[70%] right-0" />
                <Sun trigger={trigger} setTrigger={setTrigger} />
                <img src={ground} alt="" className="absolute bottom-[-10rem] left-[0rem] w-screen" />
                {/* <img src={fog} alt="" className="absolute bottom-[0rem] left-[0rem] w-screen h-[100%]" /> */}
                <div className="absolute bottom-0">
                    <Sheep />
                </div>
                <img src={tree} alt="" className="absolute bottom-[5rem] right-[0rem] scale-[0.75]" />
                <div className="absolute bottom-[50%] left-[50%] translate-x-[-50%]">
                    <img src={notes} alt="" />
                </div>
            </div>
            <div className="bg-blue-400 relative h-screen w-screen">
                <img src={Mountains} alt="" className="bottom-[30%] absolute w-[100%] h-[70%] right-0" />
                <img src={ground} alt="" className="absolute bottom-[-10rem] left-[0rem] w-screen" />
                {/* <img src={fog} alt="" className="absolute bottom-[0rem] left-[0rem] w-screen h-[100%]" /> */}
                <Sun trigger={trigger} setTrigger={setTrigger} />
                <div className="absolute bottom-0">
                    <Sheep />
                </div>
                <img src={tree} alt="" className="absolute bottom-[5rem] right-[0rem] scale-[0.75]" />
                <div className="absolute bottom-[50%] left-[50%] translate-x-[-50%]">
                    <Firefly />
                </div>
            </div>
            <div className="bg-black relative h-screen w-screen">
                <img src={Mountains} alt="" className="bottom-[30%] absolute w-[100%] h-[70%] right-0" />
                <img src={ground} alt="" className="absolute bottom-[-10rem] left-[0rem] w-screen" />
                {/* <img src={fog} alt="" className="absolute bottom-[0rem] left-[0rem] w-screen h-[100%]" />
                <img src={fog} alt="" className="absolute bottom-[20rem] left-[40rem] w-screen h-[100%]" /> */}
                <img src={fog} alt="" className="absolute bottom-[20%] left-[-30%] animate-move-fog " />
                <img src={fog} alt="" className="absolute bottom-[40%] left-[50%] animate-move-fog " />
                <img src={fog} alt="" className="absolute bottom-[0%] left-[0rem] animate-move-fog " />
                <Sun trigger={false} />
                <div className="absolute bottom-0">
                    <Sheep />
                </div>
                <img src={tree} alt="" className="absolute bottom-[5rem] right-[0rem] scale-[0.75]" />
            </div>
            <div className="bg-black relative h-screen w-screen">
                <img src={Mountains} alt="" className="bottom-[30%] absolute w-[100%] h-[70%] right-0" />
                <img src={ground} alt="" className="absolute bottom-[-10rem] left-[0rem] w-screen" />
                <img src={fog} alt="" className="absolute bottom-[0rem] left-[0rem] w-screen h-[100%]" />
                <Sun trigger={trigger} setTrigger={setTrigger} />
                <div className="absolute left-[20rem] bottom-0">
                    <SheepDead />
                </div>
                <img src={tree} alt="" className="absolute bottom-[5rem] right-[0rem] scale-[0.75]" />
                
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