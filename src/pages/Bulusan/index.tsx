import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, House } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sun from '@/components/composables/Sun.tsx'
import Bird from './components/elements/bird.tsx'
import Warrior from './components/elements/warrior.tsx'
import tree from './components/images/tree.png'
import River from './components/images/river.gif'
import Spear from './components/elements/spear.tsx'
import Kubo from './components/images/kubo.png'
import Group from './components/elements/group.tsx'
import Quiz from '@/components/composables/Quiz.tsx'
import Ground from './components/images/bg.png'
import Mountain from './components/images/mountain.png'
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
        // const rainAudio = new Audio(rain);
        // rainAudio.loop = true;

        // if (currentPage === 6) {
        //     rainAudio.play().catch(e => console.error("Audio playback failed:", e));
        //     return () => {
        //         rainAudio.pause();
        //         rainAudio.currentTime = 0;
        //     };
        // }
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
        const questions = [
                {
                    "question": "Sino ang pinuno ng mga katutubo?",
                    "choices": [
                        "Datu Bulan",
                        "Datu Juan",
                        "Datu Pedro",
                        "Datu Jose"
                    ],
                    "answerKey": 0
                },
                {
                    "question": "Anong hayop ang dumating sa kanilang lugar?",
                    "choices": [
                        "Aso",
                        "Ibon",
                        "Agila",
                        "Kabayo"
                    ],
                    "answerKey": 1
                },
                {
                    "question": "Ano ang ginamit ni Datu Bulan sa pagpatay sa ibon?",
                    "choices": [
                        "Espada",
                        "Sibat",
                        "Busog at pana",
                        "Itak"
                    ],
                    "answerKey": 2
                },
                {
                    "question": "Ano ang naging kulay ng tubig?",
                    "choices": [
                        "Asul",
                        "Berde",
                        "Dilaw",
                        "Pula"
                    ],
                    "answerKey": 3
                },
        ]
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
                <div 
                // onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } 
                // setIsPlayed(!isPlayed); } }}  
                className={`z-[999] font-body text-2xl mt-40 ml-4 bg-white/30 absolute top-[20%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                    Hindi mapakali ang Amang Langgam nang hindi niya makita ang kanyang bunsong anak sa pila. Kaya dali-dali siyang umalis upang ito’y hanapin, hanggang sa mapadako siya sa ipinagbabawal na pook. Pagtingin niya sa ibaba, nakita niyang nakalutang sa tubig ang kanyang bunsong anak.
                    Masakit man sa kalooban, naibulong niya sa kanyang sarili, “Iyan ang napapala ng mga anak na matigas ang ulo.”    
                </div>
                <img src={River} alt="" className="absolute w-screen bottom-0 left-0" />
            </div>
            <div className="relative h-screen w-screen">
                <Sun setTrigger={setTrigger} trigger={trigger} />
                <img src={Ground} className="absolute bottom-0 right-0 w-screen" />
                <img src={Kubo} className="absolute bottom-[5%] right-0 w-1/2" />
                <div className='absolute left-0 bottom-0'>
                    <Group />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun setTrigger={setTrigger} trigger={trigger} />
                <img src={Kubo} className="absolute bottom-[5%] right-0 w-1/2" />
                <img src={Ground} className="absolute bottom-0 right-0 w-screen" />
                <div className='absolute left-[30%] bottom-0'>
                    <Spear />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun setTrigger={setTrigger} trigger={trigger} />
                <img src={Kubo} className="absolute bottom-[5%] right-0 w-1/2" />
                <div className="flex absolute bottom-0 left-0">
                    <Warrior />
                </div>
                <div className="flex absolute bottom-0 left-[10%]">
                    <Warrior />
                </div>
                <div className="flex absolute bottom-0 left-[20%]">
                    <Warrior />
                </div>
                <div className="flex absolute bottom-0 left-[30%]">
                    <Warrior />
                </div>
                <div className="flex absolute bottom-0 left-[40%]">
                    <Spear />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun setTrigger={setTrigger} trigger={trigger} />
                <img src={tree} alt="" className="absolute bottom-[5%] right-[5%] h-[90%]" />
                <div className='absolute bottom-[15%] right-[10%]'>
                    <Bird />
                </div>
                <div className="flex absolute bottom-0 left-0">
                    <Warrior />
                </div>
                <div className="flex absolute bottom-0 left-[10%]">
                    <Warrior />
                </div>
                <div className="flex absolute bottom-0 left-[20%]">
                    <Warrior />
                </div>
                <div className="flex absolute bottom-0 left-[30%]">
                    <Warrior />
                </div>
                <div className="flex absolute bottom-0 left-[40%]">
                    <Spear />
                </div>
            </div>
            {questions.map((d) => (
                    <div key={d.question} className="relative h-screen w-screen">
                        <Quiz quiz={d} />
                    </div>
                ))}
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