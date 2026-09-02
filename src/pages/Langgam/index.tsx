import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import grass from './compnents/images/6.png'
import Formation from './compnents/elements/formation'
import Mound from './compnents/images/5.png'
import AntThrow from './compnents/elements/antThrow'
import AntRun from './compnents/elements/antRun.tsx'
import AntJump from './compnents/elements/antJump'
import antRun from './compnents/images/ant-running.gif'
import Lake from './compnents/images/lake.png'
import Mountains from './compnents/images/mountains.png'
import Sun from '@/components/composables/Sun.tsx'
import AntBoss from './compnents/elements/antBoss'
import ground from './compnents/images/ground.png'
import Quiz from '@/components/composables/Quiz.tsx'
import first from './compnents/audio/langgam-1.wav'
import antMove from './compnents/images/ant-boss.gif'
import second from './compnents/audio/langgam-2.wav'
import third from './compnents/audio/langgam-3.wav'
import fourth from './compnents/audio/langgam-4.wav'
import fifth from './compnents/audio/langgam-5.wav'
import sixth from './compnents/audio/langgam-6.wav'
function index() {
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

        const quiz = {
            question: "Bakit naghanap ng mas masarap na pagkain ang Bunsong Langgam?",
            choices: [
                "Dahil napapagod siya sa paghahakot ng pagkain",
                "Dahil nagutom siya bigla",
                "Dahil sinabi ng Tatay Langgam",
                "Dahil wala nang pagkain sa lungga"
            ],
            answerKey: 0
        };
        const quiz2 = {
            question: "Saan nahulog si Bunsong langgam?",
            choices: [
                "Sa Baha",
                "Sa puso mo",
                "Sa Kanal",
                "Sa akin"
            ],
            answerKey: 2
        };
        const quiz3 = {
            question: "Ano ang ginagawa ng mga langgam kapag nalalapit na ang tag-ulan?",
            choices: [
                "Kumakain",
                "Naglalaro",
                "Naghahakot ng pagkain",
                "Natutulog"
            ],
            answerKey: 2
        };
        const quiz4 = {
            question: "Ano ang aral na matututunan sa Alamat ng Langgam?",
            choices: [
                "Makinig sa magulang",
                "Matutong mag handa ng pangangailangan habang maaga pa",
                "Kasipagan at pag-iwas sa katamaran",
                "Lahat ng nabanggit"
            ],
            answerKey: 3
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
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}  className={`z-[999] mt-40 ml-4 bg-white/30 absolute top-[30%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                    Malapit na naman ang tag-ulan kung kaya’t ang isang mag-anak na langgam ay abalang-abala sa paghahakot ng pagkain para sa kanilang lungga.
                </div>
                <img src={grass} alt="" className="absolute bottom-0"/>
                <div className="items-end flex gap-2 absolute bottom-[-10rem] xs:bottom-[-2rem] left-[-8rem]">
                    <Formation />
                </div>
                <div className="absolute bottom-[-2rem] left-[30rem]">
                    <AntThrow />
                </div>
                <div className="absolute bottom-[-2rem] left-[50rem]">
                    <AntJump />
                </div>
                <img src={Mound} alt="" className="absolute xs:bottom-0 bottom-[0rem]  right-[-10rem]" />
            </div>
            <div className="relative h-screen w-screen">
                <Sun setTrigger={setTrigger} trigger={trigger} />
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}  className={`z-[999] mt-40 ml-4 bg-white/50 absolute top-[30%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                    “Hindi kayo lilihis ng landas patungo sa ating lungga, dahil sa gawing kaliwa ay may munting kanal,” sabi ni Tatay Langgam.
                    “Hindi po kami lalayo,” sabi ng Unang Munting Langgam.

                </div>
                <img src={grass} alt="" className="absolute bottom-0"/>
                <div className="items-end flex gap-2 absolute bottom-[-10rem] right-[-50rem] animate-ant-move xs:bottom-[-2rem] ">
                    <Formation />
                </div>
                <div className="absolute bottom-[-2rem] left-[30rem]">
                    <AntThrow />
                </div>
                <div className="absolute bottom-[-2rem] right-[-50rem] animate-ant-move">
                    <AntJump />
                </div>
                <img src={Mound} alt="" className="absolute xs:bottom-0 bottom-[0rem]  right-[-10rem]" />
            </div>
            <div className="relative h-screen w-screen">
                <Sun setTrigger={setTrigger} trigger={trigger} />
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}  className={`z-[999] mt-40 ml-4 bg-white/30 absolute top-[30%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                
                    Abala sa paghahakot ng pagkain ang bawat isa kaya’t hindi nila napansin na ang Bunsong Langgam ay unti-unting humiwalay sa pila.
                </div>
                <img src={grass} alt="" className="absolute bottom-0"/>
                <div className="absolute bottom-[2rem] left-[-30rem] animate-ant-left scale-x-[-1]">
                    <img src={antRun} alt="" className="scale-x-[-1]" />
                </div>
                <img src={Mound} alt="" className="absolute xs:bottom-0 bottom-[0rem]  right-[-10rem]" />
            </div>
            <div className="relative h-screen w-screen">
                <Sun setTrigger={setTrigger} trigger={trigger} />
                <img src={Mountains} alt="" className="bottom-[30%] absolute w-[100%] h-[70%] right-0" />
                <img src={ground} alt="" className="absolute bottom-[-10rem] left-[0rem] w-screen" />
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}  className="z-[999] mt-40 ml-4 bg-white absolute top-[30%] px-4 rounded-xl shadow-md w-1/4">
                    “Napapagod naman ako sa paghahakot ng pagkain. Matagal pa naman ang tag-ulan, naghahanda na kami,” sabi sa sarili ng Bunsong Langgam. “Mas mabuti siguro kung maghanap ako ng mas masarap na pagkain.”
                </div>
                <div className="scale-x-[-1] absolute right-[20rem] bottom-0">
                    <AntRun />
                    </div>
                <img src={Lake} alt="" className="absolute bottom-[-5rem] left-[0rem] w-2/3" />
            </div>
            <div className="relative h-screen w-screen">
                <Sun trigger={trigger} setTrigger={setTrigger} />
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}  className={`z-[999] mt-40 ml-4 bg-white/30 absolute top-[30%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                “Siguro naman ay hindi ako mahuhulog sa kanal kung dahan-dahan akong lalapit,” sabi niya sa sarili.
                Sa kanyang kasabikan na makalapit, hindi niya napansin ang malakas na ihip ng hangin ay biglang umihip kaya nawalan siya ng panimbang at tuloy-tuloy na nahulog sa kanal.    
                </div>
                <img src={Mountains} alt="" className="bottom-[30%] absolute w-[100%] h-[70%] right-0" />
                <img src={ground} alt="" className="absolute bottom-[-10rem] left-[0rem] w-screen" />
                <img src={Lake} alt="" className="absolute bottom-[-5rem] left-[0rem] w-2/3" />
                <div className="scale-x-[-1] absolute right-[40rem] bottom-4">
                    <AntRun />
                    </div>
            </div>
            <div className="relative h-screen w-screen">
                <Sun setTrigger={setTrigger} trigger={trigger} />
                <div onClick={(e) => { e.stopPropagation(); if (audioRef.current) { if (isPlayed) { audioRef.current.pause(); } else { audioRef.current.play().catch(err => console.error("Audio playback failed:", err)); } setIsPlayed(!isPlayed); } }}  className={`z-[999] mt-40 ml-4 bg-white/30 absolute top-[30%] px-4 rounded-xl shadow-md w-1/4 ${trigger ?' text-black' : ' text-white'}`}>
                    Hindi mapakali ang Amang Langgam nang hindi niya makita ang kanyang bunsong anak sa pila. Kaya dali-dali siyang umalis upang ito’y hanapin, hanggang sa mapadako siya sa ipinagbabawal na pook. Pagtingin niya sa ibaba, nakita niyang nakalutang sa tubig ang kanyang bunsong anak.
                    Masakit man sa kalooban, naibulong niya sa kanyang sarili, “Iyan ang napapala ng mga anak na matigas ang ulo.”    
                </div>
                <img src={Mountains} alt="" className="bottom-[30%] absolute w-[100%] h-[70%] right-0" />
                <img src={ground} alt="" className="absolute bottom-[-10rem] left-[0rem] w-screen" />
                <img src={Lake} alt="" className="absolute bottom-[-5rem] left-[0rem] w-2/3" />
                <div className="absolute bottom-0 left-[20rem]">
                    <AntBoss />
                </div>
            </div>
            <div className="relative h-screen w-screen">
                <div className="absolute top-0 left-[1/2] -translate-x-[-50%]">
                <AntBoss />
                </div>
                <Quiz quiz={quiz} />
            </div>
            <div className="relative h-screen w-screen">
                <div className="absolute top-0 left-[1/2] -translate-x-[-50%]">
                <AntBoss />
                </div>
                <Quiz quiz={quiz2} />
            </div>
            <div className="relative h-screen w-screen">
                <div className="absolute top-0 left-[1/2] -translate-x-[-50%]">
                <AntBoss />
                </div>
                <Quiz quiz={quiz3} />
            </div>
            <div className="relative h-screen w-screen">
                <div className="absolute top-0 left-[1/2] -translate-x-[-50%]">
                <AntBoss />
                </div>
                <Quiz quiz={quiz4} />
            </div>
        </HTMLFlipBook>
        {
            currentPage !== 0 && (
            <button className="absolute bottom-4 left-0 z-[999] rounded-full h-36 w-36 bg-white " onClick={goPrev}>Previous</button>
        )}
        <button className="absolute bottom-4 right-0 z-[999] rounded-full h-36 w-36 bg-white " onClick={goNext}>Next</button>
        
    </div>
  )
}

export default index