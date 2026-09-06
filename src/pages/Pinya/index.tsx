import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, House } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';
import Background from './components/images/bg-clean.png'
import Sun from '@/components/composables/Sun'
import Grass from './components/elements/grass.tsx'
import Hug from './components/elements/hug.tsx'
import Kid from './components/images/kid-eyes.png'
import MotherBroom from './components/elements/mother-broom.tsx'
import BgGrass from './components/images/8.png'
import Home from './components/elements/house.tsx'
import Pace from './components/elements/pace.tsx'
import Eyes from './components/elements/eyes.tsx'
import Pineapple from './components/images/7.png'
import MotherCry from './components/elements/mother-cry.tsx'
import Seek from './components/elements/seek.tsx'
export default function MyBook(props: any) {
    const navigate = useNavigate();
    const [dimensions, setDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 700,
        height: typeof window !== 'undefined' ? window.innerHeight : 500
    });

    const [playing, setPlaying] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [trigger, setTrigger] = useState(true)

    useEffect(() => {
        // Play PinyaFirst audio when the page at index 1 is shown
        // if (currentPage !== 1) return;

        // const audio = new Audio(PinyaFirst);
        // audio.play().catch(e => console.error("Audio playback failed:", e));

        // return () => {
        //     audio.pause();
        //     audio.currentTime = 0;
        // };
    }, [currentPage]);

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
                {/* PAGE 1 */}
                <div className="relative flex w-screen h-screen">
                    <Sun trigger={trigger} setTrigger={setTrigger} /> 
                    <div className="absolute bottom-0">
                        <Grass />
                    </div>
                    <div className="absolute bottom-0 right-0">
                        <Home />
                    </div>
                </div>
                <div className="relative w-screen h-screen">
                    <img src={Background} alt="" className="w-full h-full object-cover" />
                    <div className="block absolute bottom-[-15%] md:flex w-full h-screen">
                        <Hug />
                    </div>

                </div>
                <div className="relative w-screen h-screen">
                    <img src={Background} alt="" className="w-full h-full object-cover" />
                    <div className="block absolute bottom-[3%] md:flex h-[50%] left-[70%] translate-x-[-50%]">
                        <img src={Kid} alt="" className="" />
                    </div>
                    <div className="block absolute bottom-0 md:flex left-[50%] translate-x-[-50%]">
                        <MotherBroom />
                    </div>

                </div>
                <div className="relative flex w-screen h-screen">
                    <Sun trigger={trigger} setTrigger={setTrigger} /> 
                    <div className="absolute bottom-0">
                        <Grass />
                    </div>
                    <div className="absolute bottom-0 right-0">
                        <Home />
                    </div>
                    <div className="absolute bottom-[-10%] left-[35%]">
                        <Seek />
                    </div>
                </div>
                <div className="relative flex w-screen h-screen">
                    <Sun trigger={trigger} setTrigger={setTrigger} /> 
                    <div className="absolute bottom-0">
                        <Grass />
                    </div>
                    <div className="absolute bottom-0 right-0">
                        <Home />
                    </div>
                    <div className="absolute bottom-[-10%] h-[80%] left-[35%]">
                        <Pace />
                    </div>
                </div>
                <div className="relative flex w-screen h-screen">
                    <Sun trigger={false} setTrigger={() => {}} /> 
                    <div className="absolute bottom-0">
                        <img src={BgGrass} alt="" />
                    </div>
                    <div className="absolute bottom-0 left-[50%] translate-x-[-50%]">
                        <Eyes />
                    </div>
                </div>
                <div className="relative flex w-screen h-screen">
                    <Sun trigger={false} setTrigger={() => {}} /> 
                    <div className="absolute bottom-0">
                        <img src={BgGrass} alt="" />
                    </div>
                    <div className="absolute bottom-[-22%] left-[30%] translate-x-[-50%]">
                        <img src={Pineapple} alt="" className="scale-[0.5]" />
                    </div>
                    <div className="absolute bottom-0 left-[50%] translate-x-[-50%]">
                        <MotherCry />
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
        </div >
    );
}
