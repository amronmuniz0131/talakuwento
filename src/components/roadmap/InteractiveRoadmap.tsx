import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Story, stories } from '@/data/stories';
import bgImage from '@/images/map-bg.png';
import welcomePic from '@/images/welcome-pic.png'
interface InteractiveRoadmapProps {
  onStorySelect: (story: Story | null) => void;
}

// Approximate coordinates for the exact story locations mentioned.
// The user can adjust these percentages to perfectly align with their custom image.
const STORY_COORDINATES: Record<string, { top: string; left: string }> = {
  'maria-makiling': { top: '24%', left: '24%' },        // 1. Alamat ni Maria Makiling
  'bantugan': { top: '15%', left: '45%' },              // 2. Epiko Bantugan
  'masamang-kalahi': { top: '18%', left: '65%' },       // 3. Pabula Ang masamang kalahi
  'lawa-ng-bulusan': { top: '40%', left: '82%' },       // 4. Alamat ng lawa ng Bulusan
  'ibalon': { top: '48%', left: '46%' },                // 5. Epiko Ibalon
  'palaka-kalabaw': { top: '70%', left: '12%' },        // 6. Pabula Ang palaka at ang kalabaw
  'makahiya': { top: '75%', left: '42%' },              // 7. Alamat ng makahiya
  'indarapatra-sulayman': { top: '78%', left: '62%' },  // 8. Epiko Indarapat at Sulayman
  'ibig-maging-tenor': { top: '80%', left: '80%' },     // 9. Pabula Ibig maging tenor
};

export const InteractiveRoadmap: React.FC<InteractiveRoadmapProps> = ({ onStorySelect }) => {
  const [hoveredStory, setHoveredStory] = useState<string | null>(null);
  const selectStory = (story: any) => {
    // onStorySelect(story);
    setSelectedStory(story?.id)
  }

  const [selectedStory, setSelectedStory] = useState<any>(null)
  return (
    <div className="roadmap-container">
      {/* Background Image */}
      <img
        src={bgImage}
        alt="Talakuwento Roadmap"
        className="roadmap-image"
      />

      {/* Hotspots Container */}
      <div className="roadmap-image pointer-events-none">
        {/* We need pointer-events-auto on the actual hotspots inside this container */}
        {stories.map((story) => {
          const coords = STORY_COORDINATES[story.id] || { top: '50%', left: '50%' };
          const isHovered = hoveredStory === story.id;

          return (
            <div
              key={story.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto cursor-pointer"
              style={{ top: coords.top, left: coords.left, width: '16%', height: '15%' }}
              onClick={() => selectStory(story)}
            >
              <svg className={`${selectedStory === story.id && 'transition-opacity duration-1000 opacity-0 ease-in'}`} width="289" height="211" viewBox="0 0 289 211" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className={`${selectedStory === story.id ? 'opacity-100 transition-opacity duration-300 ease-in' : 'opacity-0 transition-opacity duration-500'}`} d="M139.5 126.006C162.972 126.006 182 145.034 182 168.506C182 191.978 162.972 211.006 139.5 211.006C116.028 211.006 97.0002 191.978 97 168.506C97 145.034 116.028 126.006 139.5 126.006ZM258.5 124.006C275.345 124.006 289 137.661 289 154.506C289 171.35 275.345 185.006 258.5 185.006C241.655 185.006 228 171.35 228 154.506C228 137.661 241.655 124.006 258.5 124.006ZM30.5 124.005C47.3445 124.005 60.9997 137.66 61 154.505C61 171.349 47.3447 185.005 30.5 185.005C13.6553 185.005 0 171.349 0 154.505C0.000255638 137.66 13.6555 124.005 30.5 124.005ZM216.5 19.0057C236.106 19.0057 252 34.8995 252 54.5057C252 74.1116 236.106 90.0057 216.5 90.0057C196.894 90.0057 181 74.1116 181 54.5057C181 34.8995 196.894 19.0057 216.5 19.0057ZM87.3633 0.0124943C110.2 0.568609 128.263 19.5321 127.707 42.3689C127.151 65.2058 108.186 83.2678 85.3496 82.7117C62.5129 82.1555 44.4508 63.192 45.0068 40.3553C45.5629 17.5185 64.5266 -0.543385 87.3633 0.0124943Z" fill="#D9D9D9" />
                <path className={`${selectedStory === story.id ? 'opacity-0 transition-opacity duration-300 ease-in' : 'opacity-100 transition-opacity duration-500'}`} d="M120.363 27.0125C136.04 27.3943 149.467 36.4506 156.165 49.4793C160.807 47.2527 166.008 46.0057 171.5 46.0057C190.941 46.0057 206.729 61.6331 206.993 81.0115C207.162 81.0088 207.331 81.0057 207.5 81.0057C224.345 81.0057 238 94.661 238 111.506C238 128.35 224.345 142.006 207.5 142.006C199.139 142.006 191.564 138.639 186.055 133.19C178.646 145.652 165.05 154.006 149.5 154.006C135.439 154.006 122.974 147.175 115.238 136.653C109.647 143.576 101.092 148.006 91.5 148.006C74.6554 148.006 61.0001 134.35 61 117.506C61 103.592 70.3167 91.8548 83.0518 88.1912C79.6722 82.0173 77.8232 74.8979 78.0068 67.3553C78.563 44.5186 97.5266 26.4566 120.363 27.0125Z" fill="#D9D9D9" />
              </svg>

              {/* <div
                className={`w-full h-full flex justify-center items-center gap-4 transition-all duration-500 ease-linear transform ${selectedStory == story.id ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-[300px] pointer-events-none'}`}
                onClick={(e) => {
                  if (selectedStory === story.id) {
                    e.stopPropagation();
                  }
                }}
              >
                <img src={welcomePic} alt="" className={`w-full h-full`} />
                <div className="flex flex-col items-center bg-orange-400 rounded-xl gap-2 p-2">



                  <p className="text-white">Are you sure you want to start this story?</p>
                  <button className='bg-white w-1/2 rounded-xl' onClick={() => onStorySelect(story)}>Start</button>
                  <button className='bg-white w-1/2 rounded-xl' onClick={() => { setSelectedStory(null), console.log(selectedStory) }}>Cancel</button>
                </div>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};
