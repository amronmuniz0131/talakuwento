import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, House } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sun from '@/components/composables/Sun.tsx'
import Ground from './components/images/ground.png'
import Spear from './components/elements/spear.tsx'
import Kubo from './components/images/kubo.png'
import Tree from './components/images/tree.png'
import Dancing from './components/elements/dancing.tsx'
import Solo from './components/elements/solo.tsx'
import Group from './components/elements/group.tsx'
import HTMLFlipBook from 'react-pageflip';
import Quiz from '@/components/composables/Quiz.tsx'
import Guitar from './components/elements/guitar.tsx'
import Gong from './components/elements/gong.tsx'
import Boss from './components/elements/boss.tsx'
import Mountain from './components/images/mountain.png'
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
        "question": "Ano ang pangalan ng bayani?",
        "choices": [
            "Lam-ang",
            "Don Juan",
            "Sumarang",
            "Naguilian"
        ],
        "answerKey": 0
    },
    {
        "question": "Sino ang ama ni Lam-ang?",
        "choices": [
            "Don Juan",
            "Sumarang",
            "Ines",
            "Nalbuan"
        ],
        "answerKey": 0
    },
    {
        "question": "Sino ang pinakasalan ni Lam-ang?",
        "choices": [
            "Namongan",
            "Ines Kannoyan",
            "Maria",
            "Aling Rosa"
        ],
        "answerKey": 1
    },
    {
        "question": "Anong hayop ang kasama ni Lam-ang?",
        "choices": [
            "Kabayo",
            "Pusa",
            "Aso at tandang",
            "Kalabaw"
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
                <img src={Ground} alt="" className="absolute bottom-0 left-0" />
                <img src={Kubo} alt="" className="absolute bottom-[20%] right-0 h-[80%]" />
                <div className="absolute bottom-0 left-[50%] translate-x-[-50%]">
                    <Spear />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun setTrigger={setTrigger} trigger={trigger} />
                <img src={Ground} alt="" className="absolute bottom-0 left-0" />
                <img src={Kubo} alt="" className="absolute bottom-[20%] left-0 h-[80%]" />
                <div className="absolute bottom-0 left-[50%] translate-x-[-50%]">
                    <Group />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun setTrigger={setTrigger} trigger={trigger} />
                <img src={Ground} alt="" className="absolute bottom-0 left-0" />
                <img src={Tree} alt="" className="absolute bottom-[20%] right-0 h-[80%]" />
                <div className="absolute bottom-0 left-[30%] translate-x-[-50%]">
                    <Dancing />
                </div>
                <div className="absolute bottom-0 left-[50%] translate-x-[-50%]">
                    <Solo />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun setTrigger={setTrigger} trigger={trigger} />
                <img src={Ground} alt="" className="absolute bottom-0 left-0" />
                <img src={Tree} alt="" className="absolute bottom-[20%] right-0 h-[80%]" />
                <div className="absolute bottom-0 left-[30%] translate-x-[-50%]">
                    <Boss />
                </div>
                <div className="absolute bottom-0 right-[10%]">
                    <Spear />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun setTrigger={setTrigger} trigger={trigger} />
                <img src={Mountain} alt="" className="absolute bottom-0 right-0 w-screen" />
                <img src={Ground} alt="" className="absolute bottom-0 left-0" />
                <div className="absolute bottom-0 left-[20%] scale-x-[-1]">
                    <Gong />
                </div>
                <div className="absolute bottom-0 left-[50%] translate-x-[-50%]">
                    <Guitar />
                </div>
                 <div className="absolute bottom-0 right-[20%]">
                    <Gong />
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