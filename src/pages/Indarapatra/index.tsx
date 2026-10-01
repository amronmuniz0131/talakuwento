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
import Quiz from '@/components/composables/Quiz.tsx'

import { useNavigate } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';
import first from './components/audio/indarapatra-1.wav'
import second from './components/audio/indarapatra-2.wav'
import third from './components/audio/indarapatra-3.wav'
import fourth from './components/audio/indarapatra-4.wav'
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
        if (currentPage === 8 - 1) {
            const currentLevel = Number(localStorage.getItem("level") ?? 0);
            localStorage.setItem("level", String(currentLevel + 1));
        }
    }, [currentPage]);
    
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
        "question": "Sino ang kapatid ni Indarapatra?",
        "choices": [
            "Sulayman",
            "Kurita",
            "Tarabusaw",
            "Pah"
        ],
        "answerKey": 0
    },
    {
        "question": "Sino ang unang halimaw na pinatay ni Sulayman?",
        "choices": [
            "Pah",
            "Kurita",
            "Tarabusaw",
            "Juris Pakal"
        ],
        "answerKey": 1
    },
    {
        "question": "Sino ang nakapatay kay Sulayman?",
        "choices": [
            "Kurita",
            "Tarabusaw",
            "Pah",
            "Indarapatra"
        ],
        "answerKey": 2
    },
    {
        "question": "Sino ang muling bumuhay kay Sulayman?",
        "choices": [
            "Hari",
            "Dalaga",
            "Indarapatra",
            "Matandang babae"
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
               <Sun setTrigger={setTrigger} trigger={trigger} />
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body right-[5%] text-2xl mt-40 ml-4 bg-white/30 absolute top-[10%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                    Si Indarapatra ay ang matapang na hari ng Mantapuli. Nabalitaan niya ang madalas na pananalakay ng mga dambuhalang ibon at mababangis na hayop sa ibang panig ng Mindanao. Labis niyang ikinalungkot ang mga nangyayaring ito sa mga naninirahan sa labas ng kaharian ng Mantapuli.
                    </div>
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
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body right-[5%] text-2xl mt-40 ml-4 bg-white/30 absolute top-[10%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                    Ipinatawag ni Indarapatra ang kanyang kapatid na si Sulayman, isang matapang na kawal. Inutusan niya si Sulayman na puksain ang mga ibon at hayop na namiminsala sa mga tao. 
                </div>
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
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body right-[5%] text-2xl mt-40 ml-4 bg-white/30 absolute top-[10%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                    nagtanim si Indarapatra ng isang halaman sa may durungawan. Aniya kay Sulayman, “Sa pamamagitan ng halamang ito ay malalaman ko ang nangyayari sa iyo. Kapag ito ay nalanta, nangangahulugan na ikaw ay namatay.”
                </div>
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
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body right-[5%] text-2xl mt-40 ml-4 bg-white/30 absolute top-[10%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                    Nagtungo naman si Sulayman sa Matutum. Hinanap niya ang halimaw na kumakain ng tao na kilala sa tawag na Tarabusaw. Hinagupit siya ni Tarabusaw gamit ang punongkahoy. Nang manghina si Tarabusaw, saka siya sinaksak ni Sulayman ng kanyang sibat.
                    </div>
               <img src={grass} className="absolute bottom-0 left-0 w-full" />
               <img src={Kubo} className="absolute bottom-[5%] right-0 w-1/2" />
               <div className="absolute left-0 bottom-[-5%] scale-x-[-1]">
                    <Dragon />
               </div>
               <div className="absolute left-[35%] bottom-0">
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