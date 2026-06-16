import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import bundokMakilingImg from '../images/bundok_makiling_opt.gif';
import birds from '../images/birds.gif'

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

    return (
        // @ts-ignore
        <HTMLFlipBook width={dimensions.width / 2} height={dimensions.height}>
            <div className="bg-blue-400 text-white">
                <div className="flex items-center w-full justify-center h-full flex-col">
                    <div>
                        Bundok ng makiling
                    </div>
                    {
                        stories.map((story, index) => (
                            <div key={index}>
                                {story}
                            </div>
                        ))
                    }
                    <div>
                        story
                    </div>
                    <div>
                        story
                    </div>
                </div>
            </div>
            <div className="bg-red-500 overflow-hidden">
                <ClickableGif src={bundokMakilingImg} alt="Bundok Makiling" className="h-full hover:scale-[1.2] transition-transform duration-500" />
            </div>
            <div className="bg-green-400 text-white">
                <div className="flex items-center w-full justify-center h-full flex-col">
                    <div>
                        Bundok ng makiling
                    </div>
                    {
                        stories.map((story, index) => (
                            <div key={index}>
                                {story}
                            </div>
                        ))
                    }
                    <div>
                        story
                    </div>
                    <div>
                        story
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
    );
}
