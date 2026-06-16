import { useRef, useState, useEffect, useCallback, Suspense } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Environment, Sky, Stars, Float } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import gsap from 'gsap';
import * as THREE from 'three';
import { Island } from './Island';
import { StoryNode } from './StoryNode';
import { PathConnector } from './PathConnector';
import { ClickableCloud } from './ClickableCloud';
import { SparkleParticles } from './SparkleParticles';
import { FloatingDecorations } from './FloatingDecorations';
import { AnimatedRing } from './AnimatedRing';
import { stories, Story } from '@/data/stories';

interface DraggableRoadmapProps {
  onStorySelect: (story: Story | null) => void;
  selectedStory: Story | null;
  onCloudClick?: (cloudId: number) => void;
}

// Camera that responds to drag and zoom
const DraggableCameraController = ({
  offset,
  selectedStory,
  defaultPosition,
}: {
  offset: number;
  selectedStory: Story | null;
  defaultPosition: [number, number, number];
}) => {
  const { camera, gl } = useThree();
  // Start the camera a bit further away and higher up for the intro animation
  const targetRef = useRef({ x: 0, y: 10, z: 25 });
  const lookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  
  // Track zoom distance separately
  const zoomRef = useRef(defaultPosition[2]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (selectedStory) return; // Disable zoom when focusing on a story
      e.preventDefault();
      
      const zoomSpeed = 0.015;
      const minZoom = 5;  // Max zoom in
      const maxZoom = 25; // Max zoom out
      
      zoomRef.current += e.deltaY * zoomSpeed;
      zoomRef.current = THREE.MathUtils.clamp(zoomRef.current, minZoom, maxZoom);
    };

    const canvas = gl.domElement;
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [selectedStory, gl]);

  useEffect(() => {
    if (selectedStory) {
      // Animate to selected story
      gsap.to(targetRef.current, {
        x: selectedStory.cameraTarget[0],
        y: selectedStory.cameraTarget[1],
        z: selectedStory.cameraTarget[2],
        duration: 1.2,
        ease: 'power2.inOut',
      });
      gsap.to(lookAtRef.current, {
        x: selectedStory.position[0],
        y: selectedStory.position[1],
        z: selectedStory.position[2],
        duration: 1.2,
        ease: 'power2.inOut',
      });
    } else {
      // Return to default with offset
      gsap.to(targetRef.current, {
        x: defaultPosition[0] - offset * 0.01,
        y: defaultPosition[1],
        // Note: z is handled by useFrame for smooth scrolling
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(lookAtRef.current, {
        x: -offset * 0.01,
        y: 0,
        z: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [selectedStory, offset, defaultPosition]);

  useFrame(() => {
    if (!selectedStory) {
      // Apply smooth damping to zoom target
      targetRef.current.z = THREE.MathUtils.lerp(targetRef.current.z, zoomRef.current, 0.05);
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetRef.current.x, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetRef.current.y, 0.08);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetRef.current.z, 0.08);

    camera.lookAt(lookAtRef.current);
  });

  return null;
};

export const DraggableRoadmap = ({
  onStorySelect,
  selectedStory,
  onCloudClick,
}: DraggableRoadmapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [hoveredStory, setHoveredStory] = useState<string | null>(null);

  const defaultCameraPosition: [number, number, number] = [0, 5, 12];

  // Mouse/touch handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (selectedStory) return; // Don't drag when a story is selected
    setIsDragging(true);
    setStartX(e.clientX);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  }, [selectedStory]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setCurrentOffset(scrollOffset + diff);
  }, [isDragging, startX, scrollOffset]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    setScrollOffset(currentOffset);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  }, [currentOffset]);

  const handlePointerLeave = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      setScrollOffset(currentOffset);
    }
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  }, [isDragging, currentOffset]);

  // Handle story click
  const handleStoryClick = useCallback((story: Story) => {
    if (selectedStory?.id === story.id) {
      onStorySelect(null);
    } else {
      onStorySelect(story);
    }
  }, [selectedStory, onStorySelect]);

  // Cloud positions
  const cloudPositions: [number, number, number][] = [
    [-15, 5, -10],
    [-8, 6, -15],
    [0, 4, -12],
    [8, 7, -14],
    [15, 5, -11],
    [-12, 3, -8],
    [12, 4, -9],
    [-5, 8, -18],
    [5, 6, -16],
    // Additional clouds for more atmosphere
    [-20, 6, -12],
    [20, 5, -13],
    [-18, 4, -16],
    [18, 7, -15],
    [-10, 8, -20],
    [10, 5, -19],
    [0, 7, -22],
    [-25, 5, -14],
    [25, 6, -12],
    [-3, 9, -17],
    [3, 4, -21],
  ];

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-grab select-none touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      <Canvas
        shadows
        camera={{
          position: [0, 10, 25], // Start further away for zoom-in effect
          fov: 50,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Sky and atmosphere */}
          <Sky
            distance={450000}
            sunPosition={[100, 20, 100]}
            inclination={0.6}
            azimuth={0.25}
            rayleigh={0.5}
          />
          <Stars
            radius={100}
            depth={50}
            count={2000}
            factor={4}
            saturation={0.8}
            fade
            speed={1}
          />

          {/* Lighting */}
          <ambientLight intensity={0.6} color="#fef3c7" />
          <directionalLight
            position={[10, 15, 10]}
            intensity={1.2}
            color="#fff7ed"
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <pointLight position={[-10, 10, -10]} intensity={0.5} color="#c4b5fd" />
          <pointLight position={[10, 5, 10]} intensity={0.3} color="#fcd34d" />

          {/* Clickable clouds */}
          {cloudPositions.map((pos, i) => (
            <ClickableCloud
              key={i}
              position={pos}
              cloudId={i}
              onClick={onCloudClick}
              offset={currentOffset}
            />
          ))}

          {/* Sparkle particles */}
          <SparkleParticles />

          {/* Floating decorations */}
          <FloatingDecorations />

          {/* Path connecting stories */}
          <group position={[currentOffset * 0.01, 0, 0]}>
            <PathConnector stories={stories} />
          </group>

          {/* Story islands and nodes */}
          {stories.map((story, index) => (
            <group key={story.id} position={[currentOffset * 0.01, 0, 0]}>
              <Island
                position={[story.position[0], story.position[1] - 0.5, story.position[2]]}
                scale={1.2}
                color={`hsl(${120 + index * 20}, 40%, 50%)`}
                floatSpeed={0.8 + Math.random() * 0.5} // Randomized speed
                floatAmount={0.2 + Math.random() * 0.1} // Randomized amount
              />
              <StoryNode
                story={story}
                isActive={selectedStory?.id === story.id}
                isHovered={hoveredStory === story.id}
                onClick={() => handleStoryClick(story)}
                onHover={(hovered) => setHoveredStory(hovered ? story.id : null)}
              />
              {(selectedStory?.id === story.id || hoveredStory === story.id) && (
                <AnimatedRing
                  position={[story.position[0], story.position[1] + 0.5, story.position[2]]}
                  color={story.glowColor}
                  scale={0.8}
                />
              )}
            </group>
          ))}

          {/* Camera controller */}
          <DraggableCameraController
            offset={currentOffset}
            selectedStory={selectedStory}
            defaultPosition={defaultCameraPosition}
          />

          {/* Post-processing */}
          <EffectComposer>
            <Bloom
              intensity={0.4}
              luminanceThreshold={0.7}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.1} darkness={0.3} />
          </EffectComposer>

          <Environment preset="sunset" />
        </Suspense>
      </Canvas>


    </div>
  );
};
