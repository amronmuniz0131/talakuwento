import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Background from '../images/home-bg.png'
import Sun from '@/components/composables/Sun'
import Grass from './components/elements/grass.tsx'
import House from './components/elements/house.tsx'
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
        // if (currentPage !== 1) return;

        // const audio = new Audio(PinyaFirst);
        // audio.play().catch(e => console.error("Audio playback failed:", e));

        // return () => {
        //     audio.pause();
        //     audio.currentTime = 0;
        // };
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
                <div className="relative flex w-screen h-screen">
                    <Sun trigger={trigger} setTrigger={setTrigger} /> 
                    <div className="absolute bottom-0">
                        <Grass />
                    </div>
                    <div className="absolute bottom-0 right-0">
                        <House />
                    </div>
                </div>
                {/* PAGE 2 */}
                {/* <div className="overflow-hidden ">
                    <div className="flex bg-cover bg-center" style={{ backgroundImage: `url(${Background})` }} >
                    </div>
                </div> */}
                {/* <div className="overflow-hidden ">
                    <div className="flex bg-cover bg-center" style={{ backgroundImage: `url(${Background})` }} >
                        <div className="block relative md:flex w-full h-screen">
                            <img src={PinyaMother} alt="" className="h-[60vh] absolute bottom-0 left-[40%] -translate-x-[-50%] w-auto"
                            onClick={() => setPlaying(true)}
                            />
                        </div>
                    </div>
                </div> */}
            </HTMLFlipBook>
            {
            currentPage !== 0 && (
                <button className="absolute bottom-4 left-0 z-[999] rounded-full h-36 w-36 bg-white " onClick={goPrev}>Previous</button>
            )}
                <button className="absolute bottom-4 right-0 z-[999] rounded-full h-36 w-36 bg-white " onClick={goNext}>Next</button>
        </div >
    );
}
