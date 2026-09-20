import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, House } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';
import Background from './components/images/background.png';
import Rain from './components/images/rain.gif';
import Tree from './components/elements/tree';
import Bug from './components/elements/bug';
import Ant from './components/elements/ant';
import AntFall from './components/elements/ant-fall';
import Goddess from './components/elements/goddess';
import TreeShy from './components/elements/tree-shy';
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
            <div className="bg-blue-400 relative h-screen w-screen">
                <img src={Background} alt="" className="h-full w-full object-cover"  />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Tree />
                </div>
            </div>
            <div className="bg-blue-400 relative h-screen w-screen">
                <img src={Background} alt="" className="h-full w-full object-cover"  />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Tree />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Ant />
                </div>
                <div className="absolute top-0 left-0 scale-[0.9]">
                    <img src={Rain} alt="" />
                </div>
                <div className="absolute top-0 right-0 scale-[0.9]">
                    <img src={Rain} alt="" />
                </div>
            </div>
            <div className="bg-blue-400 relative h-screen w-screen">
                <img src={Background} alt="" className="h-full w-full object-cover"  />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Tree />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                    <AntFall />
                </div>
                <div className="absolute top-0 left-0 scale-[0.9]">
                    <img src={Rain} alt="" />
                </div>
                <div className="absolute top-0 right-0 scale-[0.9]">
                    <img src={Rain} alt="" />
                </div>
            </div>
            <div className="bg-blue-400 relative h-screen w-screen">
                <img src={Background} alt="" className="h-full w-full object-cover"  />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Tree />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                    <Ant />
                </div>
                <div className="absolute top-[-10%] left-0 scale-[0.9]">
                    <img src={Rain} alt="" />
                </div>
                <div className="absolute top-[-10%] right-0 scale-[0.9]">
                    <img src={Rain} alt="" />
                </div>
                <div className="absolute bottom-[30%] left-[30%] -translate-x-1/2 scale-x-[-1]">
                    <Bug />
                </div>
            </div>
            <div className="bg-blue-400 relative h-screen w-screen">
                <img src={Background} alt="" className="h-full w-full object-cover"  />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Tree />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                    <Ant />
                </div>
                <div className="absolute top-[-10%] left-0 scale-[0.9]">
                    <img src={Rain} alt="" />
                </div>
                <div className="absolute top-[-10%] right-0 scale-[0.9]">
                    <img src={Rain} alt="" />
                </div>
                <div className="absolute bottom-[10%] left-[45%] -translate-x-1/2 scale-x-[-1]">
                    <Bug />
                </div>
            </div>
            <div className="bg-blue-400 relative h-screen w-screen">
                <img src={Background} alt="" className="h-full w-full object-cover"  />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Tree />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                    <Ant />
                </div>
                <div className="absolute top-[-10%] left-0 scale-[0.9]">
                    <img src={Rain} alt="" />
                </div>
                <div className="absolute top-[-10%] right-0 scale-[0.9]">
                    <img src={Rain} alt="" />
                </div>
                <div className="absolute bottom-[10%] left-[45%] -translate-x-1/2 scale-x-[-1]">
                    <Bug />
                </div>
                <div className="absolute bottom-[-10%] left-0">
                    <Goddess />
                </div>
            </div>
            <div className="bg-blue-400 relative h-screen w-screen">
                <img src={Background} alt="" className="h-full w-full object-cover"  />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Tree />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2  scale-x-[-1]">
                    <Ant />
                </div>
                <div className="absolute bottom-[10%] left-[45%] -translate-x-1/2">
                    <Bug />
                </div>
                <div className="absolute bottom-[-10%] left-0">
                    <Goddess />
                </div>
            </div>
            <div className="bg-blue-400 relative h-screen w-screen">
                <img src={Background} alt="" className="h-full w-full object-cover"  />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <TreeShy />
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