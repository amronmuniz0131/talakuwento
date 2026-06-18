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
              <div
                className={`w-full h-full flex justify-center items-center gap-4 transition-all duration-500 ease-linear ${selectedStory == story.id ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
