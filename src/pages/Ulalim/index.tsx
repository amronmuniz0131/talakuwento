import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, House } from 'lucide-react';
import ground from './components/images/grass.png'
import { useNavigate } from 'react-router-dom';
import Dancing from './components/elements/dancing.tsx'
import grass from './components/images/ground.png'
import Kubo from './components/images/kubo.png'
import Sun from '@/components/composables/Sun.tsx'
import Guard from './components/elements/guard.tsx'
import Dulaw from './components/elements/dulaw.tsx'
import Ulalim from './components/elements/ulalim.tsx'
import Spear from './components/elements/spear.tsx'
import Mount from './components/images/mount.png'
import Weaving from './components/elements/weaving.tsx'
import guy from './components/images/spear.png'
import Jail from './components/images/jail.png'
import Tree from './components/images/tree.png'
import Baby from './components/elements/baby.tsx'
import Quiz from '@/components/composables/Quiz.tsx'

import HTMLFlipBook from 'react-pageflip';
function index() {
    const questions = [
            {
        "question": "Sino ang anak ni Dulaw?",
        "choices": [
            "Ya-u",
            "Banna",
            "Dulliyaw",
            "Duranaw"
        ],
        "answerKey": 1
    },
    {
        "question": "Ano ang nakapagbuntis kay Duranaw?",
        "choices": [
            "Tubig",
            "Nganga",
            "Alak",
            "Prutas"
        ],
        "answerKey": 1
    },
    {
        "question": "Saan nakulong si Dulaw?",
        "choices": [
            "Magobya",
            "Madogyaya",
            "Sakbawan",
            "Kalinga"
        ],
        "answerKey": 2
    },
    {
        "question": "Sino ang pumatay kay Dulliyaw?",
        "choices": [
            "Dulaw",
            "Banna",
            "Ya-u",
            "Duranaw"
        ],
        "answerKey": 1
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
                className={`z-[999] font-body left-[10%] text-2xl bg-white/30 absolute bottom-[50%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                   Ang kuwento ay nagsimula sa nakatakdang kasal nina Ya-u at Dulaw nang makapulot sila ng nganga o ua (tawag ng mga taga-Kalinga). Ang magkasintahan ay naanyayahan sa isang pistahan sa Madogyaya.

                   </div>
                <img src={ground} className="absolute bottom-0 left-0 w-full" />
                <img src={Kubo} className="absolute bottom-[10%] right-0 h-2/3" />
                <div className="absolute bottom-[-10%] left-0">
                    <Dancing />
                </div>
                <div className="absolute bottom-[-10%] left-[30%]">
                    <Weaving />
                </div>
                <div className="absolute bottom-0 right-[20%]">
                    <Ulalim />
                </div>
                <div className="absolute bottom-[-20%] right-0">
                    <Dulaw />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun trigger={false} />
                <div 
                // onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } 
                // setIsPlayed(!isPlayed); } }}  
                className={`z-[999] font-body left-[10%] text-2xl bg-white/30 absolute bottom-[50%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                   Kinabukasan, sa kalagitnaan ng gabi, dumating si Dulaw sa bahay nina Dulliyaw. Habang sila ay kumakain ng nganga, sinabi niya sa babae na siya ay naparoon upang isama ito sa kanilang bahay. Nagulat si Dulliyaw sa sinabi ng lalaki. Pagkatapos noon, nagkagulo sa nayon.
                </div>
                <img src={ground} className="absolute bottom-0 left-0 w-full" />
                <img src={Kubo} className="absolute bottom-[10%] right-0 h-2/3" />
                <div className="absolute bottom-[-10%] left-[50%] translate-x-[-50%]">
                    <Spear />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun setTrigger={setTrigger} trigger={trigger} />
                <div 
                // onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } 
                // setIsPlayed(!isPlayed); } }}  
                className={`z-[999] font-body left-[10%] text-2xl bg-white/30 absolute bottom-[50%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                   Dumating si Guwela, ang kumander ng garison, kasama ang kanyang mga sundalo sa kaitaasan ng Kalinga. Iniutos niyang dakpin si Dulaw na nakaupo pa rin sa puno. Nang mapag-alamang marami ang tutol sa kanya, hindi na siya lumaban at nagpadaig nang siya ay ikinulong sa Sakbawan.

                   </div>
                <img src={guy} className="absolute bottom-0 right-0" />
                <img src={Jail} className="absolute bottom-0 right-0 h-screen w-screen" />
                <img src={ground} className="absolute bottom-0 left-0 w-full" />
                <div className="absolute bottom-0 right-[20%]">
                    <Guard />
                </div>
                <div className="absolute bottom-0 right-[40%]">
                    <Guard />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun setTrigger={setTrigger} trigger={trigger} />
                <div 
                // onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } 
                // setIsPlayed(!isPlayed); } }}  
                className={`z-[999] font-body left-[10%] text-2xl bg-white/30 absolute bottom-[50%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                   Makalipas ang tatlong taon ng pagkakabilanggo, siya ay naging payat at mahina. Humingi si Dulliyaw ng nganga kay Dulaw. Kinuha ni Dulaw ang natitirang nganga sa bahay at ito ay pinagpirapiraso, ngunit bago niya maibigay kay Dulliyaw, bigla itong nawala.

                   </div>
                <img src={guy} className="absolute bottom-0 right-0" />
                <img src={Jail} className="absolute bottom-0 right-0 h-screen w-screen" />
                <img src={ground} className="absolute bottom-0 left-0 w-full" />
                <div className="absolute bottom-0 right-[20%]">
                    <Guard />
                </div>
                <div className="absolute bottom-0 right-[40%]">
                    <Guard />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun setTrigger={setTrigger} trigger={trigger} />
                <div 
                // onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } 
                // setIsPlayed(!isPlayed); } }}  
                className={`z-[999] font-body right-[10%] text-2xl bg-white/30 absolute bottom-[50%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                   Samantala, sa pook ng Magobya, naliligo si Duranaw. Sa kanyang pagligo sa ilog, nakapulot siya ng nganga at kinain ito nang walang alinlangan.
Matapos niyang nguyain ang nganga, siya ay biglang nagbuntis hanggang sa magsilang siya ng isang malusog na lalaki na pinangalanang Banna. Lumipas ang tatlong taon. Si Banna ay mahilig makipaglaro sa mga Agta, subalit madalas siyang tinutukso ng mga kalaro.

                   </div>
                <img src={grass} className="absolute bottom-0 left-0 w-full" />
                <img src={Mount} alt="mount" className="absolute left-[-8rem] bottom-0 h-full" />
                <img src={Tree} alt="tree" className="absolute right-[30%] bottom-0 h-full" />
                <div className="absolute bottom-[-10%] right-[20%]">
                    <Baby />
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