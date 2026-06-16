import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bantuganBg from '@/images/bantugan-bg.jpg';
import femalePic from '@/images/female-pic.jpg';
import kingPic from '@/images/king-pic.jpg';
import deadPic from '@/images/dead-pic.jpg';

export const BantuganInteractiveBackground = ({ isFullscreen = false }: { isFullscreen?: boolean }) => {
  const [showFemalePic, setShowFemalePic] = useState(false);
  const [showKingPic, setShowKingPic] = useState(false);
  const [showDeadPic, setShowDeadPic] = useState(false);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Base Background */}
      <img
        src={bantuganBg}
        className={`absolute w-full h-full transition-all duration-700 ${isFullscreen ? 'object-contain' : 'object-cover'}`}
        alt=""
      />
      
      {/* Revealed Image Layer - King */}
      <img 
        src={kingPic}
        className={`absolute w-full h-full transition-all ease-in-out pointer-events-none ${isFullscreen ? 'object-contain' : 'object-cover'}`}
        style={{ 
          opacity: showKingPic ? 1 : 0,
          transitionDuration: '800ms'
        }}
        alt=""
      />

      {/* Revealed Image Layer - Females */}
      <img 
        src={femalePic}
        className={`absolute w-full h-full transition-all ease-in-out pointer-events-none ${isFullscreen ? 'object-contain' : 'object-cover'}`}
        style={{ 
          opacity: showFemalePic ? 1 : 0,
          transitionDuration: '800ms'
        }}
        alt=""
      />

      {/* Environmental Effects (Fireflies/Dust/Shimmer) - King */}
      <AnimatePresence>
        {showKingPic && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none"
          >
             {/* Grass/Wind movement effect via subtle wavy overlay over the ground area */}
             <motion.div 
               className="absolute bottom-0 left-[10%] w-[40%] h-[30%] bg-gradient-to-r from-transparent via-yellow-200/5 to-transparent blur-xl mix-blend-overlay"
               animate={{ x: [-20, 20, -20], scale: [1, 1.05, 1] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             />

             {/* Light Ripple effect via subtle light waves */}
             <motion.div 
               className="absolute bottom-[5%] left-[25%] w-[30%] h-[20%] border-[1px] border-white/10 rounded-[50%] blur-md"
               animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
             />
             <motion.div 
               className="absolute bottom-[10%] left-[15%] w-[20%] h-[15%] border-[1px] border-white/10 rounded-[50%] blur-md"
               animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
               transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut", delay: 1 }}
             />

             {/* Particles/Fireflies around the king */}
             {[...Array(12)].map((_, i) => {
               const startX = 15 + Math.random() * 30; // 15% to 45% left side
               const startY = 50 + Math.random() * 40; // 50% to 90% bottom side
               const endX = startX + (Math.random() * 10 - 5);
               const endY = startY - (Math.random() * 10 + 5);
               return (
                 <motion.div
                   key={i}
                   className="absolute w-1.5 h-1.5 bg-[#fde047] rounded-full blur-[1px] shadow-[0_0_6px_2px_rgba(253,224,71,0.5)]"
                   initial={{ 
                     left: `${startX}%`, 
                     top: `${startY}%`,
                     opacity: 0,
                     scale: Math.random() * 0.5 + 0.5
                   }}
                   animate={{ 
                     top: [`${startY}%`, `${endY}%`],
                     left: [`${startX}%`, `${endX}%`],
                     opacity: [0, 1, 0],
                   }}
                   transition={{ 
                     duration: 3 + Math.random() * 4, 
                     repeat: Infinity,
                     ease: "easeInOut",
                     delay: Math.random() * 3
                   }}
                 />
               );
             })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Environmental Effects (Fireflies/Dust/Shimmer) - Females */}
      <AnimatePresence>
        {showFemalePic && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none"
          >
             {/* Grass/Wind movement effect via subtle wavy overlay over the grass area */}
             <motion.div 
               className="absolute bottom-0 right-[10%] w-[40%] h-[30%] bg-gradient-to-r from-transparent via-green-200/5 to-transparent blur-xl mix-blend-overlay"
               animate={{ x: [-20, 20, -20], scale: [1, 1.05, 1] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             />

             {/* Water Ripple effect via subtle light waves */}
             <motion.div 
               className="absolute bottom-[5%] right-[25%] w-[30%] h-[20%] border-[1px] border-white/10 rounded-[50%] blur-md"
               animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
             />
             <motion.div 
               className="absolute bottom-[10%] right-[15%] w-[20%] h-[15%] border-[1px] border-white/10 rounded-[50%] blur-md"
               animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
               transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut", delay: 1 }}
             />

             {/* Particles/Fireflies */}
             {[...Array(12)].map((_, i) => {
               const startX = 55 + Math.random() * 40; // 55% to 95% right side
               const startY = 60 + Math.random() * 35; // 60% to 95% bottom side
               const endX = startX + (Math.random() * 10 - 5);
               const endY = startY - (Math.random() * 10 + 5);
               return (
                 <motion.div
                   key={i}
                   className="absolute w-1.5 h-1.5 bg-[#fef08a] rounded-full blur-[1px] shadow-[0_0_6px_2px_rgba(253,224,71,0.5)]"
                   initial={{ 
                     left: `${startX}%`, 
                     top: `${startY}%`,
                     opacity: 0,
                     scale: Math.random() * 0.5 + 0.5
                   }}
                   animate={{ 
                     top: [`${startY}%`, `${endY}%`],
                     left: [`${startX}%`, `${endX}%`],
                     opacity: [0, 1, 0],
                   }}
                   transition={{ 
                     duration: 3 + Math.random() * 4, 
                     repeat: Infinity,
                     ease: "easeInOut",
                     delay: Math.random() * 3
                   }}
                 />
               );
             })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revealed Image Layer - Dead Pic (Castle Click) - Z-10 to cover everything including previous outdoor effects since it's an indoor scene */}
      <motion.img 
        src={deadPic}
        className={`absolute w-full h-full pointer-events-none z-10 transition-all ${isFullscreen ? 'object-contain' : 'object-cover'}`}
        initial={false}
        animate={{ 
          opacity: showDeadPic ? 1 : 0,
          scale: showDeadPic ? 1.05 : 1
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ 
          transformOrigin: 'center center'
        }}
        alt=""
      />

      {/* Interactive Hotspot for Castle */}
      <div 
        className="absolute z-20 cursor-pointer group"
        style={{
          top: '5%',
          right: '15%',
          width: '45%',
          height: '45%',
        }}
        onClick={(e) => {
          e.stopPropagation();
          setShowDeadPic(!showDeadPic);
        }}
        title={showDeadPic ? "Hide indoor scene" : "Click the castle"}
      >
        {/* Subtle shimmer pulse on hover */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-[#fef08a]/10 group-hover:shadow-[0_0_40px_20px_rgba(254,240,138,0.2)] transition-all duration-500 blur-3xl rounded-[40%]" />
      </div>

      {/* Interactive Hotspot for King */}
      <div 
        className="absolute z-20 cursor-pointer group"
        style={{
          bottom: '5%',
          left: '10%',
          width: '35%',
          height: '70%',
        }}
        onClick={(e) => {
          e.stopPropagation();
          setShowKingPic(!showKingPic);
        }}
        title={showKingPic ? "Hide king scene" : "Click the king"}
      >
        {/* Subtle shimmer pulse on hover */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-[#fde047]/10 group-hover:shadow-[0_0_30px_15px_rgba(253,224,71,0.15)] transition-all duration-500 blur-2xl rounded-[30%]" />
      </div>

      {/* Interactive Hotspot for Females */}
      <div 
        className="absolute z-20 cursor-pointer group"
        style={{
          bottom: '0%',
          right: '0%',
          width: '50%',
          height: '60%',
        }}
        onClick={(e) => {
          e.stopPropagation();
          setShowFemalePic(!showFemalePic);
        }}
        title={showFemalePic ? "Hide female scene" : "Click the ladies"}
      >
        {/* Subtle shimmer pulse on hover */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-[#a7f3d0]/10 group-hover:shadow-[0_0_30px_15px_rgba(167,243,208,0.2)] transition-all duration-500 blur-2xl rounded-[30%]" />
      </div>
    </div>
  );
};
