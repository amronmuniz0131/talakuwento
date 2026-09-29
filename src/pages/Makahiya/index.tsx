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
import Quiz from '@/components/composables/Quiz.tsx'
import first from './components/audio/makahiya-1.wav'
import second from './components/audio/makahiya-2.wav'
import third from './components/audio/makahiya-3.wav'
import fourth from './components/audio/makahiya-4.wav'
import fifth from './components/audio/makahiya-5.wav'
import sixth from './components/audio/makahiya-6.wav'

function index() {
    const navigate = useNavigate();
    const [dimensions, setDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 700,
        height: typeof window !== 'undefined' ? window.innerHeight : 500
    });

    const questions = [
            {
        "question": "Sino ang masipag na hayop?",
        "choices": [
            "Langgam",
            "Alitaptap",
            "Diwata",
            "Paruparo"
        ],
        "answerKey": 0
    },
    {
        "question": "Sino ang tumulong kay Langgam?",
        "choices": [
            "Bubuyog",
            "Alitaptap",
            "Ibon",
            "Tipaklong"
        ],
        "answerKey": 1
    },
    {
        "question": "Sino ang pinuno ng mga hayop at halaman?",
        "choices": [
            "Tubo",
            "Langgam",
            "Diwata",
            "Alitaptap"
        ],
        "answerKey": 2
    },
    {
        "question": "Bakit tinawag na Makahiya ang punong ligaw?",
        "choices": [
            "May tinik",
            "Mabango",
            "Nagsasara ang dahon",
            "Matamis"
        ],
        "answerKey": 2
    },
    ]

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
    
    
        const [isPlayed, setIsPlayed] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audioFiles = [first, second, third, fourth, fifth, sixth];
        const currentAudio = audioFiles[currentPage];
        if (!currentAudio) return;

        const playAudio = new Audio(currentAudio);
        audioRef.current = playAudio;
        playAudio.play().catch(e => console.error("Audio playback failed:", e));

        return () => {
            playAudio.pause();
            playAudio.currentTime = 0;
        };
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
            <div className="bg-blue-400 relative h-screen w-screen">
                <img src={Background} alt="" className="h-full w-full object-cover"  />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Tree />
                </div>
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body text-2xl mt-40 ml-4 bg-white/70 absolute top-[20%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                Noong unang panahon, may isang punong ligaw na tumutubo sa gubat. Ito ay napakaganda. Ang mga dahon nito ay pinung-pino. Ang mga bulaklak nito ay kulay lila at kumikislap na tila mga bituin. Dahil dito, naging mapagmataas ang punong ligaw.    
                </div>
            </div>
            <div className="bg-blue-400 relative h-screen w-screen">
                <img src={Background} alt="" className="h-full w-full object-cover"  />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Tree />
                </div>
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body text-2xl mt-40 ml-4 bg-white/70 absolute top-[20%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                Minsan, umulan nang malakas. Ang masipag na si Langgam, na naghahakot ng kanyang inipong pagkain, ay inabutan ng ulan sa daan. Lumaki ang tubig kaya umakyat si Langgam sa pinakamalapit na halaman. Nagkataong iyon pala ang punong ligaw.
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
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body text-2xl mt-40 ml-4 bg-white/70 absolute top-[20%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                Nagalit ang punong ligaw. Ipinagtabuyan nito ang kaawa-awang si Langgam. Inuga nito ang mga tangkay kaya nahulog sa tubig ang kawawang langgam.
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
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body text-2xl mt-40 ml-4 bg-white/70 absolute top-[20%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
               Naawa si Alitaptap kay Langgam. Pumitas siya ng dahon at ipinaanod ito sa tubig. 
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
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body text-2xl mt-40 ml-4 bg-white/70 absolute top-[20%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                    Kumapit dito si Langgam at naanod hanggang sa sumabit siya sa Punong Tubo. Pinatuloy siya ni Tubo at binigyan pa ng pagkain.
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
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body right-[20%] text-2xl mt-40 ml-4 bg-white/70 absolute top-[20%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                    Nasaksihan ni Diwata, ang makatarungang pinuno ng mga hayop at halaman, ang buong pangyayari. Pinagkalooban niya ng gantimpala sina Alitaptap at Tubo dahil sa kanilang kabutihan.
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
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body right-[20%] text-2xl mt-40 ml-4 bg-white/70 absolute top-[20%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                    Binigyan ni Diwata ng ilaw si Alitaptap at ginawa niyang matamis ang Punong Tubo. Samantala, pinarusahan niya ang palalo at mapagmataas na punong ligaw. Nawala ang taglay nitong bango at tinubuan ng mga tinik ang katawan nito.
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
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body right-0 text-2xl mt-40 ml-4 bg-white/70 absolute top-[20%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                    Nahiya ang punong ligaw kaya itinitikom nito ang mga dahon tuwing ito ay nasasaling. Mula noon, nakilala ang punong ligaw sa tawag na Makahiya.

                    </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <TreeShy />
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