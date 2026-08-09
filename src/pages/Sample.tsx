import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import birds from '../images/bird.gif'
import PinyaMother from '../components/composables/pinia-mother.gif'
import PinyaFirst from '../voice/pinya1st.wav'
import Background from '../images/home-bg.png'
import Sun1 from '../images/sun1.png'
import Sun from './Sample/Sun.tsx'
import House from '../images/house.png'
import Grass from '../images/grass.png'
import Clouds from '../images/clouds.png'
import Plants from '../images/plants.png'
export default function MyBook(props: any) {
    const [dimensions, setDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 700,
        height: typeof window !== 'undefined' ? window.innerHeight : 500
    });

    const [playing, setPlaying] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [trigger, setTrigger] = useState(false)

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

    const stories = [
        "Mahal na mahal ni Aling Rosa ang kanyang anak na si Pina. Inaalagaan niya ito nang mabuti at hindi niya pinaggagawa ng mga gawaing-bahay upang hindi ito mapagod. Masaya na siyang pagsilbihan ang anak at gawin ang lahat ng trabaho sa bahay.",
        "Added data_generation_started_at and data_generation_uuid global values to formulas.",
        "Added mobile device data types.",
        "Added a Medical Beneficiary ID data type for the US Medicare system.",
        "You can now use the generate(datatype) function in Formulas to generate data with any of Mockaroo's built-in data types.",
        "You can now return records from a dataset in a Mock API using the from_dataset function.",
        "Added search boxes to each page.",
        "Added the ability to create reusable functions.",
        "Fixed a long standing bug in Sequence where the repeat parameter is not used correctly.",
        "The Password data type now allows you to customize the requirements.",
        "Added a new Password Hash type that returns the bcrypt hash of a random password.",
        "Added a new bcrypt(str) function to formulas.",
        "You can now generate more than 5000 records per file using the API with the new ?background=true parameter.",
        "You can now derive a schema from example CSV, JSON, or XML data.",
        "You can now generate your own custom data types using AI.",
        "You can now generate fields on any topic using AI",
        "Added support for XML attributes by naming fields starting with \"@\"",
        "Added the ability to generate v5 UUIDs via a new uuid_v5(namespace, name) function in formulas",
        "Added the ability to force the quote character on custom file formats.",
    ]

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

    const [selected, setSelected] = useState(false)
    const [selectedStory, setSelectedStory] = useState(false)
    const [openMountain, setMountain] = useState(false)
    const [fruits, showFruits] = useState(false)
    const [sun, changeSun] = useState(false)



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
        <div className="relative">
            {/* @ts-ignore */}
            <HTMLFlipBook width={dimensions.width} height={dimensions.height}
                ref={bookRef}
                useMouseEvents={false}
                onFlip={handleFlip}
            >
                {/* PAGE 1 */}
                <div className="overflow-hidden">
                    <div className={`flex w-full h-full ${trigger ? 'animate-evening-moon bg-yellow-500' : 'animate-morning-sun bg-black'}`} >
                        <div className="relative flex w-full h-full">
                            <Sun trigger={trigger} setTrigger={setTrigger} /> 
                            {/* <img src={Clouds} alt="" className="animate-move-cloud absolute top-[5rem] left-0 h-60" /> */}
                            <img src={House} alt="" className="absolute -bottom-[5rem] -right-[20rem] h-[90%]" />
                            <img src={Plants} alt="" className="absolute -bottom-[5rem] -left-[20rem] h-[90%]" />
                            <img src={Grass} alt="" className="absolute -bottom-[5rem] -left-[20rem] h-[90%]" />
                        </div>
                    </div>
                </div>
                {/* PAGE 2 */}
                <div className="overflow-hidden ">
                    <div className="flex bg-cover bg-center" style={{ backgroundImage: `url(${Background})` }} >
                        <div className="block relative md:flex w-full h-screen">
                            <img src={PinyaMother} alt="" className="h-[50vh] absolute bottom-0 left-[50%] -translate-x-[-50%] w-auto"
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
            <div className="flex gap-2 w-full justify-between absolute bottom-4">
                <button className="z-[999] rounded-full h-36 w-36 bg-white " onClick={goPrev}>Previous</button>
                <button className="z-[999] rounded-full h-36 w-36 bg-white " onClick={goNext}>Next</button>
            </div>
        </div >
    );
}
