import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, House } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ground from './components/images/ground.png'
import Sun from '@/components/composables/Sun'
import Tree from './components/images/tree.png'
import Boy1 from './components/elements/boy1';
import Boy2 from './components/elements/boy2';
import Pig from './components/elements/pig'
import Boy3 from './components/elements/boy3';
import pigDead from './components/images/pig-dead.png'
import wolfDead from './components/images/wolf-dead.png'
import Wolf from './components/elements/wolf'
import Goddess from './components/elements/goddess'
import flood from './components/images/river.gif'
import clouds from './components/images/rain.gif'
import WolfSleep from './components/images/wolf-sleep.gif'
import rain from './components/audio/rain sound.mp3'
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

    useEffect(() => {
        const rainAudio = new Audio(rain);
        rainAudio.loop = true;

        if (currentPage === 6) {
            rainAudio.play().catch(e => console.error("Audio playback failed:", e));
            return () => {
                rainAudio.pause();
                rainAudio.currentTime = 0;
            };
        }
    }, [currentPage]);
    
    
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
                <Sun trigger={trigger} setTrigger={setTrigger} />
                <img src={ground} alt="" className="absolute bottom-0" />
                <img src={Tree} alt="" className="absolute bottom-[5%] right-0" />
                <div className="absolute left-0 bottom-[0%]">
                    <Boy1 />
                </div>
                <div className="absolute left-[25%] bottom-[0%]">
                    <Pig />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun trigger={trigger} setTrigger={setTrigger} />
                <img src={ground} alt="" className="absolute bottom-0" />
                <img src={Tree} alt="" className="absolute bottom-[5%] right-0" />
                <div className="absolute left-0 bottom-[0%]">
                    <Boy1 />
                </div>
                <div className="absolute left-[25%] bottom-[0%]">
                    <img src={pigDead} alt="" className="scale-[0.7]" />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun trigger={false} setTrigger={undefined} />
                <img src={ground} alt="" className="absolute bottom-0" />
                <img src={Tree} alt="" className="absolute bottom-[5%] right-0" />
                <div className="absolute left-0 bottom-[0%]">
                    <Boy1 />
                </div>
                <div className="absolute left-[25%] bottom-[0%]">
                    <Wolf />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun trigger={true} setTrigger={undefined} />
                <img src={ground} alt="" className="absolute bottom-0" />
                <img src={Tree} alt="" className="absolute bottom-[5%] right-0" />
                <div className="absolute flex left-[-15%] bottom-[0%]">
                    <Boy1 />
                </div>
                <div className="absolute flex left-[0%] bottom-[0%]">
                    <Boy2 />
                </div>
                <div className="absolute flex left-[15%] bottom-[0%]">
                    <Boy3 />
                </div>
                <div className="absolute right-[15%] bottom-[-15%]">
                    <img src={WolfSleep} className="scale-[0.5]" alt="" />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun trigger={true} setTrigger={undefined} />
                <img src={ground} alt="" className="absolute bottom-0" />
                <img src={Tree} alt="" className="absolute bottom-[5%] right-0" />
                <div className="absolute flex left-[-15%] bottom-[0%]">
                    <Boy1 />
                </div>
                <div className="absolute flex left-[0%] bottom-[0%]">
                    <Boy2 />
                </div>
                <div className="absolute flex left-[15%] bottom-[0%]">
                    <Boy3 />
                </div>
                <div className="absolute right-[15%] bottom-[-15%]">
                    <img src={wolfDead} alt="" className="scale-[0.5]" />
                </div>
            </div>
            <div className="relative bg-gray-800 h-screen w-screen">
                {/* <Sun trigger={true} setTrigger={undefined} /> */}
                <img src={ground} alt="" className="absolute bottom-0" />
                <img src={Tree} alt="" className="absolute bottom-[5%] right-0" />
                <div className="absolute flex left-[-15%] bottom-[0%]">
                    <Boy1 />
                </div>
                <div className="absolute flex left-[0%] bottom-[0%]">
                    <Boy2 />
                </div>
                <div className="absolute flex left-[15%] bottom-[0%]">
                    <Boy3 />
                </div>
                <div className="absolute flex right-[10%] bottom-[0%]">
                    <Goddess />
                </div>
            </div>
            <div className="relative bg-gray-800 h-screen w-screen">
                {/* <Sun trigger={true} setTrigger={undefined} /> */}
                <img src={Tree} alt="" className="absolute bottom-[5%] right-0" />
                <img src={flood} alt="" className="absolute bottom-[-10%]" />
                <img src={clouds} alt="" className='absolute top-0 left-0' />
                <img src={clouds} alt="" className='absolute top-0 right-0' />
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