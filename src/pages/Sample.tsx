import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import bundokMakilingImg from '../images/bundok_makiling_opt.gif';
import birds from '../images/birds.gif'
import makiling from '../images/welcome-pic.png'

const ClickableGif = ({ src, alt, className }: any) => {
    const [playing, setPlaying] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            if (canvasRef.current) {
                canvasRef.current.width = img.width;
                canvasRef.current.height = img.height;
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                }
                setLoaded(true);
            }
        };
        img.src = src;
    }, [src]);

    return (
        <div className={`relative overflow-hidden group ${className}`} onClick={() => setPlaying(true)}>
            {!playing ? (
                <>
                    <canvas ref={canvasRef} className="w-full h-full object-cover" />
                    {loaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors cursor-pointer">
                            <div className="bg-white/80 rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 ml-1 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 4l12 6-12 6z" />
                                </svg>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <img src={`${src}?t=${Date.now()}`} alt={alt} className="w-full h-full object-cover" />
            )}
        </div>
    );
};

export default function MyBook(props: any) {
    const [dimensions, setDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 700,
        height: typeof window !== 'undefined' ? window.innerHeight : 500
    });

    const stories = [
        "Users can now be restricted to read-only access to project resources.",
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

    return (
        // @ts-ignore
        // <HTMLFlipBook width={dimensions.width / 2} height={dimensions.height}>
        //     <div className="bg-blue-400 text-white">
        //         <div className="flex items-center w-full justify-center h-full flex-col">
        //             <div>
        //                 Bundok ng makiling
        //             </div>
        //             {
        //                 stories.map((story, index) => (
        //                     <div key={index}>
        //                         {story}
        //                     </div>
        //                 ))
        //             }
        //             <div>
        //                 story
        //             </div>
        //             <div>
        //                 story
        //             </div>
        //         </div>
        //     </div>
        //     <div className="bg-red-500 overflow-hidden">
        //         <ClickableGif src={bundokMakilingImg} alt="Bundok Makiling" className="h-full hover:scale-[1.2] transition-transform duration-500" />
        //     </div>
        //     <div className="bg-green-400 text-white">
        //         <div className="flex items-center w-full justify-center h-full flex-col">
        //             <div>
        //                 Bundok ng makiling
        //             </div>
        //             {
        //                 stories.map((story, index) => (
        //                     <div key={index}>
        //                         {story}
        //                     </div>
        //                 ))
        //             }
        //             <div>
        //                 story
        //             </div>
        //             <div>
        //                 story
        //             </div>
        //         </div>
        //     </div>
        //     <div className="bg-orange-500">
        //         <img src={birds} alt="" className="hover:scale-1.2 transition-transform duration-500 cursor-pointer h-full" />

        //     </div>
        //     <div className="bg-gray-600">Page 5</div>
        //     <div className="bg-red-500">Page 6</div>
        //     <div className="bg-green-500">Page 7</div>
        //     <div className="bg-orange-500">Page 8</div>
        //     <div className="bg-gray-600">Page 9</div>
        //     <div className="bg-red-500">Page 10</div>
        //     <div className="bg-green-500">Page 11</div>
        //     <div className="bg-orange-500">Page 12</div>
        // </HTMLFlipBook>
        <div className="bg-black h-screen overflow-auto">
            <div className="flex">
                <div className="block md:flex">
                    <svg className={`w-full max-w-[491px] h-auto transition-all duration-500 ease-in-out ${selected ? 'animate-shake' : ''}`} viewBox="0 0 491 670" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => { setSelected(!selected), showFruits(!selected) }}>
                        <path d="M294.5 85C333.74 85 367.828 102.533 385.054 128.283C444.811 134.348 491 174.89 491 224C491 236.251 488.124 247.967 482.882 258.749C482.56 264.653 481.57 270.418 479.971 276C481.952 282.914 483 290.11 483 297.5C483 350.795 428.603 394 361.5 394C297.443 394 244.964 354.628 240.333 304.69C228.646 348.293 179.884 381 121.5 381C54.3974 381 0 337.795 0 284.5C0 231.205 54.3974 188 121.5 188C181.123 188 230.713 222.11 241.028 267.1C240.351 262.976 240 258.77 240 254.5C240 248.368 240.721 242.371 242.098 236.557C212.097 222.339 192 196.286 192 166.5C192 121.489 237.891 85 294.5 85ZM241.971 271.899C242.264 273.688 242.497 275.491 242.666 277.309C242.783 276.871 242.904 276.435 243.028 276C242.64 274.644 242.286 273.277 241.971 271.899Z" fill="#0A803B" />
                        <ellipse cx="215.5" cy="188.5" rx="145.5" ry="115.5" fill="#156737" />
                        <ellipse cx="181.5" cy="163" rx="152.5" ry="121" fill="#0A803B" />
                        <path d="M251.698 291H260.613L448.801 262.38L269 338.807V663C269 666.866 265.866 670 262 670H225C221.134 670 218 666.866 218 663V336.734L171.336 289.088L79.3291 269.238L149.257 266.543L78.3262 194.117L226.259 283.766L231.657 189.038L251.698 291Z" fill="#713D3D" />
                        <ellipse cx="204.5" cy="147.5" rx="112.5" ry="89.5" fill="#0C6732" />
                        <path d="M160.5 0C178.691 0 194.8 9.56631 204.699 24.2676C213.989 18.4651 225.731 15 238.5 15C268.6 15 293 34.2518 293 58C293 66.5968 289.801 74.6029 284.293 81.3213C297.363 95.6328 305 112.904 305 131.5C305 180.929 251.05 221 184.5 221C117.95 221 64 180.929 64 131.5C64 129.053 64.1342 126.63 64.3936 124.232C56.0523 116.679 51 106.805 51 96C51 72.2518 75.4005 53 105.5 53C105.746 53 105.992 53.0043 106.237 53.0068C108.817 23.2741 132.126 0 160.5 0Z" fill="#0A803B" />
                        <ellipse className={`${fruits ? 'transition-all duration-300 ease-in' : 'transition-all duration-300 opacity-0'}`} cx="117" cy="110.5" rx="25" ry="25.5" fill="#BF5236" />
                        <ellipse className={`${fruits ? 'transition-all duration-300 ease-in' : 'transition-all duration-300 opacity-0'}`} cx="126.869" cy="98.2761" rx="3" ry="10" transform="rotate(-54.2598 126.869 98.2761)" fill="white" />
                    </svg>
                    <svg onClick={() => { setMountain(!openMountain) }} className="w-full max-w-[670px] h-auto" viewBox="0 0 5266 2942" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className={`${openMountain && 'animate-move-up -translate-y-[1080px]'}`} d="M1760.81 1154.48L1858.24 1052.31L1884.97 1190.94L2007.24 1120.36L1993.83 1260.9L2131.04 1227.63L2078.58 1358.7L2219.6 1365.43L2132.33 1476.41L2265.75 1522.6L2150.75 1604.5L2265.75 1686.4L2132.33 1732.59L2219.6 1843.57L2078.58 1850.3L2131.04 1981.37L1993.83 1948.1L2007.24 2088.64L1884.97 2018.06L1858.24 2156.69L1760.81 2054.52L1696.1 2180L1631.4 2054.52L1533.97 2156.69L1507.24 2018.06L1384.97 2088.64L1398.38 1948.1L1261.17 1981.37L1313.63 1850.3L1172.61 1843.57L1259.88 1732.59L1126.46 1686.4L1241.46 1604.5L1126.46 1522.6L1259.88 1476.41L1172.61 1365.43L1313.63 1358.7L1261.17 1227.63L1398.38 1260.9L1384.97 1120.36L1507.24 1190.94L1533.97 1052.31L1631.4 1154.48L1696.1 1029L1760.81 1154.48Z" fill="#EEFF00" />
                        <path className={`${openMountain && 'animate-move-right translate-x-[450px]'}`} d="M2599.42 32.3025C2618.03 14.2935 2647.57 14.2934 2666.18 32.3024L4827.63 2123.98C4858.63 2153.99 4837.4 2206.48 4794.25 2206.48H471.354C428.209 2206.48 406.97 2153.99 437.974 2123.98L2599.42 32.3025Z" fill="#3D623B" />
                        <path className={`${openMountain && 'animate-move-left -translate-x-[450px]'}`} d="M1309.31 803.795C1328.46 781.545 1362.92 781.545 1382.07 803.795L1834.34 1329.25L2155.51 1024.02C2174.04 1006.41 2203.12 1006.41 2221.65 1024.02L2393.21 1187.07L2695.83 872.361C2714.72 852.721 2746.15 852.721 2765.03 872.361L3985.38 2141.48C4014.71 2171.98 3993.1 2222.75 3950.78 2222.75H2508.5C2505.6 2223.28 2502.58 2223.56 2499.45 2223.56H191.928C150.873 2223.56 128.766 2175.37 155.548 2144.25L1309.31 803.795Z" fill="#487B3C" />
                    </svg>
                    <svg onClick={() => { setSelectedStory(!selectedStory) }} className={`w-full max-w-[289px] h-auto ${selectedStory ? 'transition-opacity duration-1000 opacity-0 ease-in' : ''}`} viewBox="0 0 289 211" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1760.81 1154.48L1858.24 1052.31L1884.97 1190.94L2007.24 1120.36L1993.83 1260.9L2131.04 1227.63L2078.58 1358.7L2219.6 1365.43L2132.33 1476.41L2265.75 1522.6L2150.75 1604.5L2265.75 1686.4L2132.33 1732.59L2219.6 1843.57L2078.58 1850.3L2131.04 1981.37L1993.83 1948.1L2007.24 2088.64L1884.97 2018.06L1858.24 2156.69L1760.81 2054.52L1696.1 2180L1631.4 2054.52L1533.97 2156.69L1507.24 2018.06L1384.97 2088.64L1398.38 1948.1L1261.17 1981.37L1313.63 1850.3L1172.61 1843.57L1259.88 1732.59L1126.46 1686.4L1241.46 1604.5L1126.46 1522.6L1259.88 1476.41L1172.61 1365.43L1313.63 1358.7L1261.17 1227.63L1398.38 1260.9L1384.97 1120.36L1507.24 1190.94L1533.97 1052.31L1631.4 1154.48L1696.1 1029L1760.81 1154.48Z" fill="#EEFF00" />
                        <path className={`${selectedStory ? 'opacity-100 transition-opacity duration-500 ease-in' : 'opacity-0 transition-opacity duration-500'}`} d="M139.5 126.006C162.972 126.006 182 145.034 182 168.506C182 191.978 162.972 211.006 139.5 211.006C116.028 211.006 97.0002 191.978 97 168.506C97 145.034 116.028 126.006 139.5 126.006ZM258.5 124.006C275.345 124.006 289 137.661 289 154.506C289 171.35 275.345 185.006 258.5 185.006C241.655 185.006 228 171.35 228 154.506C228 137.661 241.655 124.006 258.5 124.006ZM30.5 124.005C47.3445 124.005 60.9997 137.66 61 154.505C61 171.349 47.3447 185.005 30.5 185.005C13.6553 185.005 0 171.349 0 154.505C0.000255638 137.66 13.6555 124.005 30.5 124.005ZM216.5 19.0057C236.106 19.0057 252 34.8995 252 54.5057C252 74.1116 236.106 90.0057 216.5 90.0057C196.894 90.0057 181 74.1116 181 54.5057C181 34.8995 196.894 19.0057 216.5 19.0057ZM87.3633 0.0124943C110.2 0.568609 128.263 19.5321 127.707 42.3689C127.151 65.2058 108.186 83.2678 85.3496 82.7117C62.5129 82.1555 44.4508 63.192 45.0068 40.3553C45.5629 17.5185 64.5266 -0.543385 87.3633 0.0124943Z" fill="#D9D9D9" />
                        <path className={`${selectedStory ? 'opacity-0 transition-opacity duration-500 ease-in' : 'opacity-100 transition-opacity duration-500'}`} d="M120.363 27.0125C136.04 27.3943 149.467 36.4506 156.165 49.4793C160.807 47.2527 166.008 46.0057 171.5 46.0057C190.941 46.0057 206.729 61.6331 206.993 81.0115C207.162 81.0088 207.331 81.0057 207.5 81.0057C224.345 81.0057 238 94.661 238 111.506C238 128.35 224.345 142.006 207.5 142.006C199.139 142.006 191.564 138.639 186.055 133.19C178.646 145.652 165.05 154.006 149.5 154.006C135.439 154.006 122.974 147.175 115.238 136.653C109.647 143.576 101.092 148.006 91.5 148.006C74.6554 148.006 61.0001 134.35 61 117.506C61 103.592 70.3167 91.8548 83.0518 88.1912C79.6722 82.0173 77.8232 74.8979 78.0068 67.3553C78.563 44.5186 97.5266 26.4566 120.363 27.0125Z" fill="#D9D9D9" />
                    </svg>
                </div>
            </div>


        </div>
    );
}
