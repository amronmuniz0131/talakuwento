import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, House } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';
import Sun from '@/components/composables/Sun.tsx'
import Home from './components/elements/house.tsx'
import House2 from './components/elements/house2.tsx'
import ground from './components/images/ground.png'
import Church from './components/elements/church.tsx'
import Clouds from '@/components/composables/Clouds.tsx'
import People from './components/elements/people.tsx'
import Couple from './components/elements/couple.tsx'
import Guy from './components/elements/guy.tsx'
import Father from './components/images/9.png'
import bellMissing from './components/images/bell-missing.png'
import Makopa from './components/elements/makopa.tsx'
import Quiz from '@/components/composables/Quiz.tsx'

function index() {
    const navigate = useNavigate();
    const [dimensions, setDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 700,
        height: typeof window !== 'undefined' ? window.innerHeight : 500
    });

    const [playing, setPlaying] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [trigger, setTrigger] = useState(true)
    const [bellStart, setBell] = useState(false)
    const handleFlip = (e: any) => {
            setCurrentPage(e.data);
        };

    useEffect(() => {
        if (currentPage === 9 - 1) {
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
        "question": "Ano ang nasa simbahan?",
        "choices": [
            "Kampana",
            "Krus",
            "Aklat",
            "Kandila"
        ],
        "answerKey": 0
    },
    {
        "question": "Sino ang nagtago ng kampana?",
        "choices": [
            "Pari",
            "Sundalo",
            "Hari",
            "Magsasaka"
        ],
        "answerKey": 0
    },
    {
        "question": "Ano ang hugis ng bunga?",
        "choices": [
            "Bilog",
            "Kampana",
            "Puso",
            "Bituin"
        ],
        "answerKey": 1
    },
    {
        "question": "Ano ang pangalan ng puno?",
        "choices": [
            "Makahiya",
            "Pinya",
            "Makopa",
            "Duryan"
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
            <div className="relative w-screen h-screen">
                <Sun trigger={trigger} setTrigger={setTrigger} />
                <div 
                // onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } 
                // setIsPlayed(!isPlayed); } }}  
                className={`z-[999] font-body left-[10%] text-2xl bg-white/30 absolute bottom-[50%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                    Noong unang panahon, ang mga tao ay mababait at masunurin. Sila ay masisipag at madasalin. Namumuhay sila nang tahimik at maligaya sa isang nayon.
                    </div>
                <Clouds trigger={trigger} setTrigger={setTrigger} />
                <div className="absolute flex items-end bottom-[0rem] left-[0rem]">
                    <Home />
                    <House2 />
                </div>
            </div>
            <div className="relative bg-blue-400 w-screen h-screen">
                {/* <Sun trigger={trigger} setTrigger={setTrigger} /> */}
                <div className="absolute bottom-0 w-screen">
                    <img src={ground} alt="" />
                </div>
                <div 
                // onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } 
                // setIsPlayed(!isPlayed); } }}  
                className={`z-[999] font-body right-[10%] text-2xl bg-white/30 absolute bottom-[50%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                   Nabalitaan ng mga masasamang loob mula sa isang malayong pook ang tungkol sa gintong kampana. Inakala nilang magkakaroon din sila ng masaganang buhay kung mapapasakanila ito. Lihim nilang pinagplanuhan kung paano nila mananakaw ang kampana.

                    </div>
                <div className="absolute bottom-0 right-0">
                    <Church setBell={setBell} />
                </div>
                <div className="absolute bottom-0 left-[10%]">
                    <People bell={bellStart} />
                </div>
            </div>
            <div className="relative bg-blue-400 w-screen h-screen">
                {/* <Sun trigger={trigger} setTrigger={setTrigger} /> */}
                <div className="absolute bottom-0 w-screen">
                    <img src={ground} alt="" />
                </div>
                <div 
                // onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } 
                // setIsPlayed(!isPlayed); } }}  
                className={`z-[999] font-body right-[10%] text-2xl bg-white/30 absolute bottom-[50%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                   Sa kabutihang palad, nabalitaan ng mga pari ang balak ng mga masasamang loob. Ibinaba nila ang kampana at ibinaon ito sa bakuran ng simbahan. Nangako silang ipagtatanggol nila ang kampana kahit pa ikamatay nila ito.
                    </div>
                <div className="absolute bottom-0 right-0">
                    <img src={bellMissing} alt="" />
                </div>
            </div>
            <div className="relative bg-blue-400 w-screen h-screen">
                {/* <Sun trigger={trigger} setTrigger={setTrigger} /> */}
                <div className="absolute bottom-0 w-screen">
                    <img src={ground} alt="" />
                </div>
                <div 
                // onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } 
                // setIsPlayed(!isPlayed); } }}  
                className={`z-[999] font-body right-[10%] text-2xl bg-white/30 absolute bottom-[50%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                   Galit na galit ang mga masasamang loob nang dumating sila sa simbahan. Hinanap nila nang mabuti ang kampana ngunit hindi nila ito makita. Dahil sa matinding galit, pinatay nila ang lahat ng tao sa loob ng simbahan sapagkat walang nagturo sa pinagtaguan ng kampana.
                   </div>
                <div className="absolute bottom-0 right-0">
                    <img src={bellMissing} alt="" />
                </div>
                <div className="absolute flex items-end bottom-0 left-[10%]">
                    <Couple />
                    <Guy />
                    <img src={Father} alt="" className="h-[70vh]" />
                </div>
            </div>
            <div className="relative bg-blue-400 w-screen h-screen">
                {/* <Sun trigger={trigger} setTrigger={setTrigger} /> */}
                <div className="absolute bottom-0 w-screen">
                    <img src={ground} alt="" />
                </div>
                <div 
                // onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } 
                // setIsPlayed(!isPlayed); } }}  
                className={`z-[999] font-body right-[10%] text-2xl bg-white/30 absolute bottom-[50%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                   Isang araw, nagulat na lamang ang mga mamamayan nang makita nila ang isang punong tumubo at mabilis na lumaki sa bakuran ng simbahan. Nagbunga ito ng marami at ang mga bunga nito ay hugis kampana, makintab na pula sa labas, at maputi na parang bulak ang laman.
                   </div>
                <div className="absolute bottom-0 right-0">
                    <img src={bellMissing} alt="" />
                </div>
                <div className="absolute bottom-0 left-0">
                    <Makopa />
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