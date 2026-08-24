import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import birds from '../images/bird.gif'
import PinyaMother from '../components/composables/pinia-mother.gif'
import PinyaFirst from '../voice/pinya1st.wav'
import Background from '../images/home-bg.png'
import Sun from './Sample/Sun.tsx'
import House from './Sample/House.tsx'
import Clouds from './Sample/Clouds.tsx'
import Plants from './Sample/Plants.tsx'
export default function MyBook(props: any) {
    const [dimensions, setDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 700,
        height: typeof window !== 'undefined' ? window.innerHeight : 500
    });

    const [playing, setPlaying] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [trigger, setTrigger] = useState(true)

    useEffect(() => {
        // Play PinyaFirst audio when the page at index 1 is shown
        if (currentPage !== 1) return;

        const audio = new Audio(PinyaFirst);
        audio.play().catch(e => console.error("Audio playback failed:", e));

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [currentPage]);

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
                {/* PAGE 1 */}
                <div className="overflow-hidden">
                    <div className={`flex w-full h-full ${trigger ? 'animate-evening-moon bg-cyan-500' : 'animate-morning-sun bg-black'}`} >
                        <div className="relative flex w-full h-full">
                            <Sun trigger={trigger} setTrigger={setTrigger} /> 
                            <Clouds trigger={trigger} />
                            <House />
                            <Plants />
                        </div>
                    </div>
                </div>
                {/* PAGE 2 */}
                <div className="overflow-hidden ">
                    <div className="flex bg-cover bg-center" style={{ backgroundImage: `url(${Background})` }} >
                        <div className="block relative md:flex w-full h-screen">
                            <img src={PinyaMother} alt="" className="h-[60vh] absolute bottom-0 left-[40%] -translate-x-[-50%] w-auto"
                            onClick={() => setPlaying(true)}
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-orange-500">
                    <img src={birds} alt="" className="hover:scale-1.2 transition-transform duration-500 cursor-pointer h-full" />

                </div>
                <div className="bg-gray-600">Page 5</div>
                <div className="bg-red-500">Page 6</div>
                <div className="bg-green-500">Page 7</div>
                <div className="bg-orange-500">Page 8</div>
                <div className="bg-gray-600">Page 9</div>
                <div className="bg-red-500">Page 10</div>
                <div className="bg-green-500">Page 11</div>
                <div className="bg-orange-500">Page 12</div>
            </HTMLFlipBook>
            {
            currentPage !== 0 && (
                <button className="absolute bottom-4 left-0 z-[999] rounded-full h-36 w-36 bg-white " onClick={goPrev}>Previous</button>
            )}
                <button className="absolute bottom-4 right-0 z-[999] rounded-full h-36 w-36 bg-white " onClick={goNext}>Next</button>
        </div >
    );
}
