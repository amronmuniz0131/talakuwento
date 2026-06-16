import { useEffect, useRef, Suspense, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, Stars, Cloud, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Story } from '@/data/stories';
import { ForestModel } from '@/components/3d/ForestModel';
import { MakahiyaModel } from '@/components/3d/MakahiyaModel';
import { IndarapatraModel } from '@/components/3d/IndarapatraModel';
import { BantuganInteractiveBackground } from './BantuganInteractiveBackground';
import makilingBg from '@/images/makiling-bg.jpg';
import makilingPicture2 from '@/images/makiling-picture-2.jpg';
import makilingPicture4 from '@/images/makiling-picture-4th-image.jpg';
import palakaKalabawBg from '@/images/palaka-kalabaw-bg.jpg';
import lawaBulusanBg from '@/images/lawa-bulusan-bg.jpg';
import frog1Pic from '@/images/frog1-pic.jpg';
import kalabaw1Pic from '@/images/kalabaw1-pic.jpg';
import treePic from '@/images/tree-pic.jpg';

interface SceneViewProps {
  story: Story;
  showOverlayModel?: boolean;
  setShowOverlayModel?: (show: boolean | ((prev: boolean) => boolean)) => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

const StoryImageLayer = ({ src, isFullscreen, isVisible = true, duration = '700ms' }: { src: string, isFullscreen: boolean, isVisible?: boolean, duration?: string }) => (
  <img 
    src={src} 
    className={`absolute w-full h-full ease-in-out pointer-events-none transition-all ${
      isVisible ? 'opacity-100' : 'opacity-0'
    } ${isFullscreen ? 'object-contain' : 'object-cover'}`}
    style={{ transitionDuration: duration }}
    alt="" 
  />
);

export const SceneView = ({ story, showOverlayModel = false, setShowOverlayModel, isFullscreen = false, onToggleFullscreen }: SceneViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showMakilingReveal, setShowMakilingReveal] = useState(false);
  const [showFarmersReveal, setShowFarmersReveal] = useState(false);
  const [showFrogReveal, setShowFrogReveal] = useState(false);
  const [showKalabawReveal, setShowKalabawReveal] = useState(false);
  const [showTreeReveal, setShowTreeReveal] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, { opacity: 0, scale: 0.9, y: 50 });
      gsap.to(containerRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.4,
      });
    });

    return () => ctx.revert();
  }, [story.id]);



  return (
    <div
      ref={containerRef}
      onClick={() => {
        if (isFullscreen) onToggleFullscreen?.();
      }}
      className={`scene-container w-full h-full relative overflow-hidden shadow-2xl transition-all duration-700 ${
        isFullscreen ? 'rounded-none scale-100 bg-black/90' : 'rounded-[2rem] lg:rounded-[3rem] lg:scale-[0.98] bg-transparent'
      }`}
      style={{
        background: `linear-gradient(180deg, 
          ${story.glowColor}30 0%, 
          ${story.color}20 50%, 
          transparent 100%)`,
      }}
    >
      {/* Universal Fullscreen Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFullscreen?.();
        }}
        className="absolute top-4 right-4 z-[60] p-2 sm:p-3 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-all duration-300 hover:scale-110 shadow-lg"
        title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
      >
        {isFullscreen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Maximize2 className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>

      {story.id === 'bantugan' ? (
        <BantuganInteractiveBackground isFullscreen={isFullscreen} />
      ) : story.id === 'lawa-ng-bulusan' ? (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <StoryImageLayer src={lawaBulusanBg} isFullscreen={isFullscreen} />
        </div>
      ) : story.id === 'palaka-kalabaw' ? (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <StoryImageLayer src={palakaKalabawBg} isFullscreen={isFullscreen} />
          <StoryImageLayer src={frog1Pic} isFullscreen={isFullscreen} isVisible={showFrogReveal} duration="800ms" />
          <StoryImageLayer src={kalabaw1Pic} isFullscreen={isFullscreen} isVisible={showKalabawReveal} duration="800ms" />
          <StoryImageLayer src={treePic} isFullscreen={isFullscreen} isVisible={showTreeReveal} duration="800ms" />

          {/* Interactive Hotspot for Frogs Area */}
          <div 
            className="absolute z-10 cursor-pointer group"
            style={{
              bottom: '0%',
              left: '0%',
              width: '50%',
              height: '50%',
            }}
            onClick={(e) => {
              e.stopPropagation();
              console.log('Frog area clicked! Current state:', showFrogReveal);
              setShowFrogReveal(!showFrogReveal);
            }}
            title={showFrogReveal ? "Hide Frog Details" : "Click the frogs"}
          >
            {/* Shimmer pulse on hover around the frog area */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-[#86efac]/10 group-hover:shadow-[0_0_30px_15px_rgba(134,239,172,0.3)] transition-all duration-500 blur-xl" />
          </div>

          {/* Interactive Hotspot for Kalabaw Area */}
          <div 
            className="absolute z-10 cursor-pointer group"
            style={{
              bottom: '10%',
              right: '0%',
              width: '50%',
              height: '60%',
            }}
            onClick={(e) => {
              e.stopPropagation();
              console.log('Kalabaw area clicked! Current state:', showKalabawReveal);
              setShowKalabawReveal(!showKalabawReveal);
            }}
            title={showKalabawReveal ? "Hide Kalabaw Details" : "Click the buffalo"}
          >
            {/* Shimmer pulse on hover around the buffalo area */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-[#86efac]/10 group-hover:shadow-[0_0_30px_15px_rgba(134,239,172,0.3)] transition-all duration-500 blur-xl" />
          </div>

          {/* Interactive Hotspot for Tree Area */}
          <div 
            className="absolute z-10 cursor-pointer group"
            style={{
              top: '0%',
              left: '0%',
              width: '40%',
              height: '50%',
            }}
            onClick={(e) => {
              e.stopPropagation();
              console.log('Tree area clicked! Current state:', showTreeReveal);
              setShowTreeReveal(!showTreeReveal);
            }}
            title={showTreeReveal ? "Hide Tree Details" : "Click the tree"}
          >
            {/* Shimmer pulse on hover around the tree area */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-[#86efac]/10 group-hover:shadow-[0_0_30px_15px_rgba(134,239,172,0.3)] transition-all duration-500 blur-xl" />
          </div>
        </div>
      ) : story.id === 'maria-makiling' ? (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <StoryImageLayer src={makilingBg} isFullscreen={isFullscreen} />
          <StoryImageLayer src={makilingPicture2} isFullscreen={isFullscreen} isVisible={showMakilingReveal} duration="1000ms" />
          <StoryImageLayer src={makilingPicture4} isFullscreen={isFullscreen} isVisible={showFarmersReveal} duration="700ms" />

          {/* Three.js Magical Particle Effects Layer - Mountain */}
          <div 
            className={`absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-1000 ${
              showMakilingReveal ? 'opacity-60' : 'opacity-0'
            }`}
          >
            <Canvas camera={{ position: [0, 0, 5] }} gl={{ alpha: true }}>
              <ambientLight intensity={1} />
              <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
                <Cloud opacity={0.3} speed={0.4} width={10} depth={1.5} segments={20} position={[0, 1, -2]} />
                <Cloud opacity={0.2} speed={0.3} width={10} depth={1.5} segments={20} position={[2, 2, -3]} color="#a7f3d0" />
              </Float>
            </Canvas>
          </div>

          {/* Three.js Environmental Effects Layer - Farmers */}
          <div 
            className={`absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-700 ease-in-out ${
              showFarmersReveal ? 'opacity-80' : 'opacity-0'
            }`}
          >
            <Canvas camera={{ position: [0, 0, 5] }} gl={{ alpha: true }}>
              <ambientLight intensity={1} />
              <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
                {/* Low hanging mist / water vapor over the lake/fields */}
                <Cloud opacity={0.2} speed={0.4} width={15} depth={2} segments={20} position={[0, -2.5, -2]} color="#e0f2fe" />
                <Cloud opacity={0.15} speed={0.3} width={10} depth={1.5} segments={15} position={[-3, -3, -1]} color="#ccfbf1" />
              </Float>
            </Canvas>
          </div>

          {/* Interactive Hotspot for Mountain */}
          <div 
            className="absolute z-10 cursor-pointer group"
            style={{
              top: '5%',
              left: '10%',
              width: '80%',
              height: '55%',
            }}
            onClick={(e) => {
              e.stopPropagation();
              console.log('Mountain clicked! Current state:', showMakilingReveal);
              setShowMakilingReveal(!showMakilingReveal);
            }}
            title={showMakilingReveal ? "Hide Maria Makiling" : "Click the mountain"}
          >
            {/* Subtle glow pulse on hover */}
            <div className="absolute inset-0 rounded-[50%] bg-white/0 group-hover:bg-white/10 group-hover:shadow-[0_0_40px_20px_rgba(255,255,255,0.2)] transition-all duration-500 blur-2xl" />
          </div>

          {/* Interactive Hotspot for Farmers/Bottom Area */}
          <div 
            className="absolute z-10 cursor-pointer group"
            style={{
              bottom: '0%',
              left: '0%',
              width: '100%',
              height: '40%',
            }}
            onClick={(e) => {
              e.stopPropagation();
              console.log('Farmers clicked! Current state:', showFarmersReveal);
              setShowFarmersReveal(!showFarmersReveal);
            }}
            title={showFarmersReveal ? "Hide Farmers Scene" : "Click the farming area"}
          >
            {/* Shimmer pulse on hover around the rice field */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-[#a7f3d0]/10 group-hover:shadow-[0_0_30px_15px_rgba(167,243,208,0.3)] transition-all duration-500 blur-xl" />
          </div>
        </div>
      ) : (
        <>
          {/* Model 1 (Base Model) - Always visible */}
      <Canvas
        shadows
        camera={{ position: [3, 2, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.8} color="#fef3c7" />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1.5}
            color="#fff7ed"
            castShadow
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color={story.glowColor} />
          <pointLight position={[3, 3, 3]} intensity={0.3} color="#fcd34d" />

          {/* Sky with stars */}
          <Stars
            radius={50}
            depth={30}
            count={800}
            factor={3}
            saturation={0.8}
            fade
            speed={0.5}
          />

          {/* Floating clouds */}
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
            <Cloud position={[-4, 4, -5]} opacity={0.4} speed={0.2} />
          </Float>
          <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
            <Cloud position={[4, 5, -8]} opacity={0.3} speed={0.3} />
          </Float>

          <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.2}>
            {story.id === 'makahiya' ? (
              <MakahiyaModel position={[0, 0, -3]} scale={0.015} />
            ) : story.id === 'indarapatra-sulayman' ? (
              <IndarapatraModel position={[0, -2, -3]} scale={0.1} />
            ) : (
              <ForestModel position={[0, -2.5, -3]} scale={0.2} />
            )}
          </Float>

          {/* Orbit controls for better view */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            minDistance={3}
            maxDistance={30}
            autoRotate={false}
            target={[0, -1, -3]}
          />

          {/* Post-processing */}
          <EffectComposer>
            <Bloom
              intensity={0.4}
              luminanceThreshold={0.5}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
          </EffectComposer>

          <Environment preset="sunset" />
        </Suspense>
      </Canvas>


      </>
      )}

    </div>
  );
};
