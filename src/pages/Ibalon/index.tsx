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
import Quiz from '@/components/composables/Quiz'
function index() {
    const questions = [
            {
        "question": "Sino ang tatlong bayani ng Ibalon?",
        "choices": [
            "Baltog, Handiong, Bantong",
            "Madali, Bantugan, Lam-ang",
            "Juan, Dula, Bantong",
            "Baltog, Sural, Hablon"
        ],
        "answerKey": 0
    },
    {
        "question": "Sino ang tumulong kay Baltog?",
        "choices": [
            "Bantong",
            "Handiong",
            "Sural",
            "Oriol"
        ],
        "answerKey": 1
    },
    {
        "question": "Sino ang halimaw na ginawang bato ang mga tao?",
        "choices": [
            "Rabut",
            "Oriol",
            "Baltog",
            "Handiong"
        ],
        "answerKey": 0
    },
    {
        "question": "Ano ang pinarusa ng Diyos sa Ibalon?",
        "choices": [
            "Tagtuyot",
            "Sunog",
            "Baha",
            "Bagyo"
        ],
        "answerKey": 2
    },
    ]
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
                <div 
                // onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } 
                // setIsPlayed(!isPlayed); } }}  
                className={`z-[999] font-body right-[5%] text-2xl mt-40 ml-4 bg-white/30 absolute top-[10%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                    Si Baltog ay nakarating sa lupain ng Ibalon dahil sa pagtugis niya sa isang malaking baboy-ramo. Siya ay nagmula pa sa lupain ng Batavara. Mayaman ang lupain ng Ibalon at doon na siya nanirahan. Siya ang kinilalang hari ng Ibalon. Naging maunlad ang pamumuhay ng mga tao.
                </div>
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
                <div 
                // onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } 
                // setIsPlayed(!isPlayed); } }}  
                className={`z-[999] font-body right-[5%] text-2xl mt-40 ml-4 bg-white/30 absolute top-[10%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                    Naging lalo pang maunlad at masagana ang Ibalon. Subalit may isang halimaw na muling lumitaw. Ito ay kalahating tao at kalahating hayop. Siya si Rabut. Nagagawa niyang gawing bato ang mga tao o hayop na kanyang maengkanto.
                </div>
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
                <div 
                // onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } 
                // setIsPlayed(!isPlayed); } }}  
                className={`z-[999] font-body right-[5%] text-2xl mt-40 ml-4 bg-white/30 absolute top-[10%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                    Nalaman ni Bantong na sa araw ay tulog na tulog si Rabut, kaya’t pinatay niya ito habang natutulog.
                </div>
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
                <div 
                // onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } 
                // setIsPlayed(!isPlayed); } }}  
                className={`z-[999] font-body right-[5%] text-2xl mt-40 ml-4 bg-white/30 absolute top-[10%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                    Nagalit ang Diyos sa ginawang pataksil na pagpatay kay Rabut. Bagama’t masama si Rabut, dapat ay binigyan pa rin siya ng pagkakataong ipagtanggol ang sarili. Pinarusahan ng Diyos ang Ibalon sa pamamagitan ng isang napakalaking baha.
                </div>
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
                <div 
                // onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } 
                // setIsPlayed(!isPlayed); } }}  
                className={`z-[999] font-body left-1/2 transform -translate-x-1/2 text-2xl bg-white/30 absolute bottom-[10%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                    Si Indarapatra ay ang matapang na hari ng Mantapuli. Nabalitaan niya ang madalas na pananalakay ng mga dambuhalang ibon at mababangis na hayop sa ibang panig ng Mindanao. Labis niyang ikinalungkot ang mga nangyayaring ito sa mga naninirahan sa labas ng kaharian ng Mantapuli.
                    </div>
                <img src={flood} alt="" className="absolute bottom-[-10%]" />
                <img src={clouds} alt="" className='absolute top-0 left-0' />
                <img src={clouds} alt="" className='absolute top-0 right-0' />
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