import { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Sky, Stars, Float } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Island } from './Island';
import { StoryNode } from './StoryNode';
import { PathConnector } from './PathConnector';
import { CloudsBackground } from './CloudsBackground';
import { CameraController } from './CameraController';
import { SparkleParticles } from './SparkleParticles';
import { FloatingDecorations } from './FloatingDecorations';
import { AnimatedRing } from './AnimatedRing';
import { stories, Story } from '@/data/stories';

interface RoadmapSceneProps {
  onStorySelect: (story: Story | null) => void;
  selectedStory: Story | null;
}

export const RoadmapScene = ({ onStorySelect, selectedStory }: RoadmapSceneProps) => {
  const [hoveredStory, setHoveredStory] = useState<string | null>(null);

  const handleStoryClick = useCallback((story: Story) => {
    if (selectedStory?.id === story.id) {
      onStorySelect(null);
    } else {
      onStorySelect(story);
    }
  }, [selectedStory, onStorySelect]);

  const defaultCameraPosition: [number, number, number] = [0, 8, 20];

  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ 
          position: defaultCameraPosition, 
          fov: 50,
          near: 0.1,
          far: 100
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

          {/* Ambient and directional lighting */}
          <ambientLight intensity={0.6} color="#fef3c7" />
          <directionalLight
            position={[10, 15, 10]}
            intensity={1.2}
            color="#fff7ed"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          <pointLight position={[-10, 10, -10]} intensity={0.5} color="#c4b5fd" />
          <pointLight position={[10, 5, 10]} intensity={0.3} color="#fcd34d" />
          
          {/* Extra ambient point light */}
          <pointLight 
            position={[0, 10, 0]} 
            intensity={0.3} 
            color="#fcd34d"
            distance={30}
          />

          {/* Background clouds */}
          <CloudsBackground />
          
          {/* Sparkle particles throughout the scene */}
          <SparkleParticles />
          
          {/* Floating decorative elements */}
          <FloatingDecorations />

          {/* Path connecting all story nodes */}
          <PathConnector stories={stories} />

          {/* Story islands and nodes */}
          {stories.map((story, index) => (
            <Float
              key={story.id}
              speed={1.5 + index * 0.2}
              rotationIntensity={0.2}
              floatIntensity={0.3}
              floatingRange={[-0.1, 0.1]}
            >
              <group>
                {/* Floating island base */}
                <Island 
                  position={[story.position[0], story.position[1] - 0.5, story.position[2]]}
                  scale={1.2}
                  color={`hsl(${120 + index * 20}, 40%, 50%)`}
                  floatSpeed={0.5 + index * 0.1}
                />
                
                {/* Interactive story node */}
                <StoryNode
                  story={story}
                  isActive={selectedStory?.id === story.id}
                  isHovered={hoveredStory === story.id}
                  onClick={() => handleStoryClick(story)}
                  onHover={(hovered) => setHoveredStory(hovered ? story.id : null)}
                />
                
                {/* Animated rings around active node */}
                {(selectedStory?.id === story.id || hoveredStory === story.id) && (
                  <AnimatedRing 
                    position={[story.position[0], story.position[1] + 0.5, story.position[2]]}
                    color={story.glowColor}
                    scale={0.8}
                  />
                )}
              </group>
            </Float>
          ))}

          {/* Camera controller with GSAP animations */}
          <CameraController
            targetPosition={selectedStory?.cameraTarget || null}
            defaultPosition={defaultCameraPosition}
          />

          {/* Enhanced post-processing effects */}
          <EffectComposer>
            <Bloom
              intensity={0.4}
              luminanceThreshold={0.7}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.1} darkness={0.3} />
          </EffectComposer>

          {/* Environment for reflections */}
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
};
