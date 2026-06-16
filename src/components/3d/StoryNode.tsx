import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Story } from '@/data/stories';

interface StoryNodeProps {
  story: Story;
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
}

export const StoryNode = ({
  story,
  isActive,
  isHovered,
  onClick,
  onHover
}: StoryNodeProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const markerRef = useRef<THREE.Mesh>(null);

  // Animation states
  const [pulseScale, setPulseScale] = useState(1);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y =
        story.position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }

    if (glowRef.current) {
      // Pulse the glow when hovered or active
      const targetOpacity = isHovered || isActive ? 0.8 : 0.3;
      const currentOpacity = (glowRef.current.material as THREE.MeshBasicMaterial).opacity;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        THREE.MathUtils.lerp(currentOpacity, targetOpacity, 0.1);

      // Scale pulse
      const targetScale = isHovered || isActive ? 1.2 : 1;
      glowRef.current.scale.setScalar(
        THREE.MathUtils.lerp(glowRef.current.scale.x, targetScale, 0.1)
      );
    }

    if (markerRef.current) {
      // Rotate marker slowly
      markerRef.current.rotation.y += 0.01;

      // Bounce when active
      if (isActive) {
        markerRef.current.position.y = 0.8 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      } else {
        markerRef.current.position.y = THREE.MathUtils.lerp(markerRef.current.position.y, 0.8, 0.1);
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={story.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Glow effect ring */}
      <mesh ref={glowRef} position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.4, 32]} />
        <meshBasicMaterial
          color={story.glowColor}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Base platform */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.8, 0.2, 16]} />
        <meshStandardMaterial
          color={story.color}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Inner ring detail */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <torusGeometry args={[0.5, 0.08, 8, 24]} />
        <meshStandardMaterial
          color={story.glowColor}
          roughness={0.3}
          metalness={0.3}
          emissive={story.glowColor}
          emissiveIntensity={isActive || isHovered ? 0.5 : 0.2}
        />
      </mesh>

      {/* Center marker orb */}
      <mesh ref={markerRef} position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color={story.glowColor}
          roughness={0.2}
          metalness={0.5}
          emissive={story.color}
          emissiveIntensity={isActive || isHovered ? 0.8 : 0.3}
        />
      </mesh>

      {/* Floating particles around node */}
      {[...Array(5)].map((_, i) => (
        <FloatingParticle
          key={i}
          color={story.glowColor}
          index={i}
          isActive={isActive || isHovered}
        />
      ))}

      {/* Story title label */}
      <Html
        position={[0, 1.6, 0]}
        center
        distanceFactor={8}
        occlude={false}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div
          className={`
            px-4 py-2 rounded-2xl font-display text-sm font-semibold
            whitespace-nowrap transition-all duration-300
            ${isActive || isHovered
              ? 'bg-card/95 shadow-panel scale-110'
              : 'bg-card/80 shadow-soft scale-100'
            }
          `}
          style={{
            color: story.color,
            borderColor: story.color,
            borderWidth: isActive ? '2px' : '1px',
          }}
        >
          <span className="mr-2">{story.icon}</span>
          {story.title}
        </div>
      </Html>
    </group>
  );
};

// Floating particle component
const FloatingParticle = ({
  color,
  index,
  isActive
}: {
  color: string;
  index: number;
  isActive: boolean;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const angle = (index / 5) * Math.PI * 2;
  const radius = 0.6;

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime + index;
      ref.current.position.x = Math.cos(time * 0.5 + angle) * radius;
      ref.current.position.z = Math.sin(time * 0.5 + angle) * radius;
      ref.current.position.y = 0.5 + Math.sin(time * 2) * 0.15;

      const scale = isActive ? 0.06 : 0.04;
      ref.current.scale.setScalar(scale + Math.sin(time * 3) * 0.02);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={isActive ? 0.9 : 0.5} />
    </mesh>
  );
};
