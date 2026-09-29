import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, House } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Mount from './components/images/mount.png'
import Ground from './components/images/ground.png'
import Dear from './components/elements/Dear.tsx'
import Crocs from './components/elements/Crocs.tsx'
import pearl from './components/images/pearl-base.png'
import Pabo from './components/elements/Pabo.tsx'
import crocsEat from './components/images/5.png'
import Sun from './components/elements/Sun.tsx'
import Clouds from './components/elements/Clouds.tsx'
import HTMLFlipBook from 'react-pageflip';
import Quiz from '@/components/composables/Quiz.tsx'
import first from './components/audio/buwaya-1.wav'
import second from './components/audio/buwaya-2.wav'
import third from './components/audio/buwaya-3.wav'
import fourth from './components/audio/buwaya-4.wav'

function index() {
    const navigate = useNavigate();
    const [dimensions, setDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 700,
        height: typeof window !== 'undefined' ? window.innerHeight : 500
    });

    const [playing, setPlaying] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [trigger, setTrigger] = useState(false)
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
        const audioFiles = [first, second, third, fourth];
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
        const questions = [
                {
        "question": "Saan nakatira ang buwaya?",
        "choices": [
            "Ilog Pasig",
            "Dagat",
            "Bundok",
            "Gubat"
        ],
        "answerKey": 0
    },
    {
        "question": "Sino ang gusto niyang pakasalan?",
        "choices": [
            "Agila",
            "Paboreal",
            "Maya",
            "Kalapati"
        ],
        "answerKey": 1
    },
    {
        "question": "Ano ang gusto ng paboreal?",
        "choices": [
            "Pagkain",
            "Perlas at diyamante",
            "Bahay",
            "Ginto"
        ],
        "answerKey": 1
    },
    {
        "question": "Ano ang ginawa ng buwaya sa paboreal?",
        "choices": [
            "Tinulungan",
            "Pinakain",
            "Kinain",
            "Pinalayas"
        ],
        "answerKey": 2
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
                <img src={Ground} alt="ground" className="absolute bottom-0 w-screen" />
                <Sun trigger={trigger} setTrigger={setTrigger} />
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body right-[5%] text-2xl mt-40 ml-4 bg-white/30 absolute top-[10%] px-4 rounded-xl shadow-md w-1/4 ${!trigger ?' text-black' : ' text-white'}`}>
                    Noong unang panahon, may isang batang buwayang namumuhay sa pampang ng Ilog Pasig. Siya ay mabangis at ubod ng sakim. Dahil dito, walang ibang hayop ang naglakas-loob na lumapit sa kanya.
                </div>
                <Clouds trigger={trigger} />
                <img src={Mount} alt="mount" className="absolute left-[-8rem] bottom-0 h-full" />
                <div className="absolute bottom-[-8rem] right-[7rem]">
                    <Dear />
                </div>
                <div className="absolute bottom-[-0rem] left-[10rem]">
                    <Crocs />
                </div>
            </div>
            <div className={`relative h-screen w-screen ${!trigger ? 'bg-blue-400' : 'bg-black'}`}>
                <img src={Ground} alt="ground" className="absolute bottom-0 w-screen" />
                <Clouds trigger={trigger} />
                <Sun trigger={trigger} setTrigger={setTrigger} />
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body right-[5%] text-2xl mt-40 ml-4 bg-white/30 absolute top-[10%] px-4 rounded-xl shadow-md w-1/4 ${!trigger ?' text-black' : ' text-white'}`}>
                    Isang araw, habang siya ay namamahinga sa ibabaw ng isang bato, napag-isipan niyang mag-asawa na. Pasigaw niyang sinabi, “Ibibigay ko ang lahat ng aking pag-aari upang magkaroon ng asawa.”

                </div>
                <img src={Mount} alt="mount" className="absolute left-[-8rem] bottom-0 h-full" />
                <img src={pearl} alt="" className="absolute bottom-[0rem] left-[45%] h-1/4" />
                <div className="absolute bottom-[-0rem] left-[6rem]">
                    <Crocs />
                </div>
                <div className="absolute bottom-[-10rem] right-[4rem] scale-[0.5] scale-x-[-0.5]">
                    <Pabo />
                </div>
            </div>
            <div className="bg-blue-400 relative h-screen w-screen">
                <img src={Ground} alt="ground" className="absolute bottom-0 w-screen" />
                <Clouds trigger={trigger} />
                <Sun trigger={trigger} setTrigger={setTrigger} />
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body right-[5%] text-2xl mt-40 ml-4 bg-white/30 absolute top-[10%] px-4 rounded-xl shadow-md w-1/4 ${!trigger ?' text-black' : ' text-white'}`}>
                “Pakakasalan ko ang buwayang ito. Mayaman siya. Naku! Kung mapapasaakin lamang ang lahat ng kanyang perlas at diyamante, ako ang magiging pinakamasayang asawa sa buong mundo,” sabi ng paboreal sa kanyang sarili.
                </div>
                <img src={Mount} alt="mount" className="absolute left-[-8rem] bottom-0 h-full" />
                <img src={pearl} alt="" className="absolute bottom-[0rem] left-[45%] h-1/4" />
                <div className="absolute bottom-[-0rem] left-[6rem]">
                    <Crocs />
                </div>
                <div className="absolute bottom-[-10rem] right-[10rem] scale-[0.5]">
                    <Pabo />
                </div>
            </div>
            <div className="bg-blue-400 relative h-screen w-screen">
                <img src={Ground} alt="ground" className="absolute bottom-0 w-screen" />
                <Clouds trigger={trigger} />
                <Sun trigger={trigger} setTrigger={setTrigger} />
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body right-[5%] text-2xl mt-40 ml-4 bg-white/30 absolute top-[10%] px-4 rounded-xl shadow-md w-1/4 ${!trigger ?' text-black' : ' text-white'}`}>
                Inanyayahan ng buwaya ang paboreal na umupo sa kanyang bibig upang hindi raw madumihan ng putik ang maganda nitong balahibo. Sinunod naman ng mangmang na ibon ang kahilingan ng buwaya.
                </div>
                <img src={Mount} alt="mount" className="absolute left-[-8rem] bottom-0 h-full" />
                {/* <img src={pearl} alt="" className="absolute bottom-[0rem] left-[45%] h-1/4" /> */}
                <div className="absolute bottom-[-2rem] scale-[0.7] left-[25rem]">
                    <img src={crocsEat} alt="" />
                </div>
                {/* <div className="absolute bottom-[-10rem] right-[10rem] scale-[0.5]">
                    <Pabo />
                </div> */}
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