import React, { useState, useEffect, useRef } from 'react';
import Sun from '@/components/composables/Sun.tsx'
import White from './components/elements/white.tsx'
import Brown from './components/elements/brown.tsx'
import Jump from './components/elements/jump.tsx'
import Eat from './components/elements/eat.tsx'
import Peck from './components/elements/peck.tsx'
import chickenWhite from './components/images/chicken-base.png'
import chickenBrown from './components/images/chicken-brown.png'
import { ChevronLeft, ChevronRight, House } from 'lucide-react';
import grass from './components/images/grass.png'
import { useNavigate } from 'react-router-dom';
import Quiz from '@/components/composables/Quiz.tsx'
import HTMLFlipBook from 'react-pageflip';
import first from './components/audio/kalahi-1.wav'
import second from './components/audio/kalahi-2.wav'
import third from './components/audio/kalahi-3.wav'
import fourth from './components/audio/kalahi-4.wav'
import fifth from './components/audio/kalahi-5.wav'
function index() {
  const questions =[
    {
            "question": "Sino ang masamang manok?",
            "choices": [
                "Toniong Tandang",
                "Tenoriong Talisain",
                "Lolitang Leghorn",
                "Denang Dumalaga"
            ],
            "answerKey": 1
        },
        {
            "question": "Sino ang banyagang manok?",
            "choices": [
                "Lolitang Leghorn",
                "Aling Martang",
                "Denang Dumalaga",
                "Toniong Tandang"
            ],
            "answerKey": 0
        },
        {
            "question": "Sino ang tumulong kay Tenoriong?",
            "choices": [
                "Denang",
                "Lolitang",
                "Toniong",
                "Martang"
            ],
            "answerKey": 2
        },
        {
          "question": "Ano ang aral ng pabula?",
          "choices": [
              "Mahalin ang kalahi",
              "Maging mayabang",
              "Manakit ng iba",
              "Iwasan ang pamilya"
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
        const audioFiles = [first, null, second, third, fourth, null, fifth];
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
               <Sun setTrigger={setTrigger} trigger={trigger} />
               <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body right-[5%] text-2xl mt-40 ml-4 bg-white/30 absolute top-[10%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                  Mula nang mapatakbo ni Toniong Tandang si Tenoriong Talisain, ito ay humanap ng ibang lipunan at madaling nakapamayagpag muli sa Talisain.
                </div>
               <img src={grass} className="absolute bottom-0 left-0 w-full" />
               <div className="absolute bottom-[-120px] right-0">
                 <White />
               </div>
               <div className="absolute bottom-[-120px] left-0">
                 <Brown />
               </div>
            </div>
            <div className="relative h-screen w-screen">
               <Sun setTrigger={setTrigger} trigger={trigger} />
               <img src={grass} className="absolute bottom-0 left-0 w-full" />
               <div className="absolute bottom-[-120px] right-0">
                 <Jump />
               </div>
               <div className="absolute bottom-[-120px] right-[20%]">
                 <Peck />
               </div>
            </div>
            <div className="relative h-screen w-screen">
               <Sun setTrigger={setTrigger} trigger={trigger} />
               <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body right-[5%] text-2xl mt-40 ml-4 bg-white/30 absolute top-[10%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                  Ang mga katyaw na Leghorn doon ay madaling nasilaw sa balitang bilis at lakas ni Tenoriong Talisain. Madali rin niyang naging kaibigan ang isa sa pinakamagandang banyagang manok na si Lolitang Leghorn.
                  </div>
               <img src={grass} className="absolute bottom-0 left-0 w-full" />
               <div className="absolute bottom-[-120px] right-0">
                 <Eat />
               </div>
                 <img src={chickenBrown} alt="" className="absolute bottom-[-120px] left-0 scale-[0.7]" />
                 <img src={chickenBrown} alt="" className="absolute bottom-[-120px] left-[10%] scale-[0.7]" />
                 <img src={chickenBrown} alt="" className="absolute bottom-[-120px] left-[20%] scale-[0.7]" />
                 <img src={chickenBrown} alt="" className="absolute bottom-[-120px] left-[30%] scale-[0.7]" />
            </div>
            <div className="relative h-screen w-screen">
               <Sun setTrigger={setTrigger} trigger={trigger} />
               <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body right-[5%] text-2xl mt-40 ml-4 bg-white/30 absolute top-[10%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                  “Naku!” ang bulalas ng dumalaga. “Ako pala ay sinisiraan ni Tenoriong Talisain. Ako raw ay naging kasintahan niya…”
                   </div>
               <img src={grass} className="absolute bottom-0 left-0 w-full" />
               <div className="absolute bottom-[-120px] right-0">
                 <White />
               </div>
               <div className="absolute bottom-[-120px] left-0 scale-x-[-1]">
                    <White />
               </div>
               <div className="absolute bottom-[-120px] left-[15%] scale-x-[-1]">
                    <Eat />
               </div>
               <div className="absolute bottom-[-120px] left-[30%] scale-x-[-1]">
                    <Eat />
               </div>
            </div>
            <div className="relative h-screen w-screen">
               <Sun setTrigger={setTrigger} trigger={trigger} />
               <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body right-[5%] text-2xl mt-40 ml-4 bg-white/30 absolute top-[10%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                  Makalipas ang ilang araw, dumating si Toniong Tandang na kasama si Tenoriong Talisain. Gusot-gusot na ang balahibo ng katyaw. Pilay pa ang isang paa, pasa-pasa ang buong katawan, at halos hindi na makagulapay.
                  </div>
               <img src={grass} className="absolute bottom-0 left-0 w-full" />
                 <img src={chickenBrown} alt="" className="absolute bottom-[-170px] left-0 scale-[0.5]" />
                 <img src={chickenBrown} alt="" className="absolute bottom-[-170px] left-[5%] scale-[0.5]" />
                 <img src={chickenBrown} alt="" className="absolute bottom-[-170px] left-[10%] scale-[0.5]" />
                 <img src={chickenBrown} alt="" className="absolute bottom-[-170px] left-[15%] scale-[0.5]" />
                 <div className="">
                    <img src={chickenWhite} alt="" className="absolute bottom-[-200px] right-0 scale-[0.5]" />
                    <img src={chickenWhite} alt="" className="absolute bottom-[-200px] right-[5%] scale-[0.5]" />
                    <img src={chickenWhite} alt="" className="absolute bottom-[-200px] right-[10%] scale-[0.5]" />
                    <img src={chickenWhite} alt="" className="absolute bottom-[-200px] right-[15%] scale-[0.5]" />
                 </div>
            </div>
            <div className="relative h-screen w-screen">
               <Sun setTrigger={setTrigger} trigger={trigger} />
               <img src={grass} className="absolute bottom-0 left-0 w-full" />
               <div className="absolute right-[0%] bottom-[-300px] scale-[0.4]">
                 <Peck />
               </div>
               <div className="absolute right-[-10%] bottom-[-300px] scale-[0.4]">
                 <White />
               </div>
               <div className="absolute left-0 bottom-[-200px] scale-[0.7]">
                 <Peck />
               </div>
               <div className="absolute left-[10%] bottom-[-200px] scale-[0.7]">
                 <White />
               </div>
               <div className="absolute left-[25%] bottom-[-200px] scale-[0.7]">
                 <Peck />
               </div>
               <div className="absolute left-[35%] bottom-[-200px] scale-[0.7]">
                 <White />
               </div>
               <div className="absolute left-[50%] bottom-[-200px] scale-[0.7]">
                 <Peck />
               </div>
               <div className="absolute left-[60%] bottom-[-200px] scale-[0.7]">
                 <White />
               </div>
            </div>
            <div className="relative h-screen w-screen">
               <Sun setTrigger={setTrigger} trigger={trigger} />
               <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}
                className={`z-[999] font-body right-[5%] text-2xl mt-40 ml-4 bg-white/30 absolute top-[10%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                  “Nakita mo na, Tenoriong Talisain!” ang wika ni Aling Martang Manok. “Iyang kalahi, kahit masamain mo, ay hindi ka matitiis.”
                  </div>
               <img src={grass} className="absolute bottom-0 left-0 w-full" />
               <div className="absolute bottom-[-120px] right-0">
                 <White />
               </div>
               <div className="absolute bottom-[-120px] left-0 scale-x-[-1]">
                    <White />
               </div>
               <div className="absolute bottom-[-120px] left-[15%] scale-x-[-1]">
                    <Eat />
               </div>
               <div className="absolute bottom-[-120px] left-[30%] scale-x-[-1]">
                    <Eat />
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