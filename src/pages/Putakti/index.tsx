import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, House } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';
import Farmer from './components/elements/farmer.tsx'
import FarmerGirl from './components/elements/farmer-girl.tsx'
import ground from './components/images/6.png'
import FarmerGirl2 from './components/elements/farmer-girl2.tsx'
import Sun from '@/components/composables/Sun.tsx'
import background from './components/images/13.png'
import LadyAngry from './components/elements/lady-angry.tsx'
import bar from './components/images/9.png'
import LadyPanic from './components/elements/lady-panic.tsx'
import Quiz from '@/components/composables/Quiz.tsx'
import first from './components/audio/putakti-1.wav'
import second from './components/audio/putakti-2.wav'
import third from './components/audio/putakti-3.wav'
import fourth from './components/audio/putakti-4.wav'
import fifth from './components/audio/putakti-5.wav'
import sixth from './components/audio/putakti-6.wav'
import seventh from './components/audio/putakti-7.wav'

function index() {
    const questions  = [
            {
        "question": "Sino si Lalapindigowa-i?",
        "choices": [
            "Putakti",
            "Hipon",
            "Itlog",
            "Palaka"
        ],
        "answerKey": 0
    },
    {
        "question": "Sino ang dalawang asawa ni Lalapindigowa-i?",
        "choices": [
            "Odang at Orak",
            "Maria at Rosa",
            "Pina at Duri",
            "Ana at Lina"
        ],
        "answerKey": 0
    },
    {
        "question": "Saan dapat maghatid ng pagkain ang mga asawa?",
        "choices": [
            "Sa bahay",
            "Sa bukid",
            "Sa palengke",
            "Sa gubat"
        ],
        "answerKey": 1
    },
    {
        "question": "Bakit lumiit ang beywang ng putakti?",
        "choices": [
            "Nagutom siya",
            "Nagkasakit siya",
            "Natakot siya",
            "Tumakbo siya"
        ],
        "answerKey": 0
    }
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
    
    
        const [isPlayed, setIsPlayed] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audioFiles = [first, second, third, fourth, fifth, sixth, seventh];
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
            <div className="relative h-screen w-screen">
                <Sun trigger={false} setTrigger={setTrigger} />
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body text-2xl mt-40 ml-4 bg-white/30 absolute top-[20%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                   Si Lalapindigowa-i ay isang masipag na magsasaka. May dalawa siyang asawa
                   </div>
                <img src={ground} className="absolute bottom-0"  alt="" />
                <div className={`absolute left-1/2 -translate-x-1/2 bottom-0`}>
                    <Farmer />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun trigger={false} setTrigger={setTrigger} />
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body text-2xl mt-40 ml-4 bg-white/30 absolute top-[20%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                   Si Odang
                   </div>
                <img src={ground} className="absolute bottom-0"  alt="" />
                <div className={`absolute left-1/2 -translate-x-1/2 bottom-0`}>
                    <Farmer />
                </div>
                <div className={`absolute left-[20%] bottom-4`}>
                    <FarmerGirl />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun trigger={false} setTrigger={setTrigger} />
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body text-2xl mt-40 ml-4 bg-white/30 absolute top-[20%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                   at si Orak
                   </div>
                <img src={ground} className="absolute bottom-0"  alt="" />
                <div className={`absolute left-1/2 -translate-x-1/2 bottom-0`}>
                    <Farmer />
                </div>
                <div className={`absolute left-[20%] bottom-4`}>
                    <FarmerGirl />
                </div>
                <div className={`absolute right-[20%] bottom-4`}>
                    <FarmerGirl2 />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <img src={background} className="absolute bottom-0"  alt="" />
                <img src={bar} className="absolute bottom-0 right-0"  alt="" />
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body text-2xl mt-40 ml-4 bg-white/30 absolute top-[20%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                   Pagkaraan ng maraming araw at buwan ng paghahatid ng pagkain, nagsawa ang mga asawa ni Lalapindigowa-i. Sa daan papuntang bukid, nagalit si Odang at tumangging magdala ng pagkain. Si Orak naman ay ayaw ring maghatid ng pagkain.
                   </div>
                <div className={`absolute flex items-center justify-center left-1/2 -translate-x-1/2 bottom-0`}>
                    <LadyPanic />
                    <LadyAngry />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun trigger={false} setTrigger={setTrigger} />
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body text-2xl mt-40 ml-4 bg-white/30 absolute top-[20%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                   Samantala, si Lalapindigowa-i ay nagutom sa kahihintay sa kanyang dalawang asawa. Pagkaraan ng ilang oras ng paghihintay, nagpasya siyang umuwi. Sa daan, nakita ng gutom na si Lalapindigowa-i ang basag na kaserola at ang mga asawang naluto.
                   </div>
                <img src={ground} className="absolute bottom-0"  alt="" />
                <div className={`absolute left-1/2 -translate-x-1/2 bottom-0`}>
                    <Farmer />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <img src={background} className="absolute bottom-0"  alt="" />
                <img src={bar} className="absolute bottom-0 right-0"  alt="" />
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body text-2xl mt-40 ml-4 bg-white/30 absolute top-[20%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                  Pagkaraan ng ilang oras ng paghihintay, nagpasya siyang umuwi. Sa daan, Hindi na nakita ni Lalapindigowa-i ang mga asawa.
                   </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun trigger={false} setTrigger={setTrigger} />
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body text-2xl mt-40 ml-4 bg-white/30 absolute top-[20%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                   Nagalit siya sa mga asawang naging pabaya at sa sinapit ng mga ito. Dahil sa matinding gutom, hinigpitan niya ang kanyang sinturon. Simula noon, ang beywang ni Lalapindigowa-i ay lumiit nang lumiit dahil wala na siyang mga asawang magluluto para sa kanya.
                   </div>
                <img src={ground} className="absolute bottom-0"  alt="" />
                <div className={`absolute left-1/2 -translate-x-1/2 bottom-0`}>
                    <Farmer />
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