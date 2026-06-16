import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cloud } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface ClickableCloudProps {
  position: [number, number, number];
  cloudId: number;
  onClick?: (cloudId: number) => void;
  offset?: number;
}

export const ClickableCloud = ({
  position,
  cloudId,
  onClick,
  offset = 0,
}: ClickableCloudProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const baseSpeed = 0.1 + cloudId * 0.02;
  const baseOpacity = 0.4 + (cloudId % 3) * 0.1;

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + cloudId) * 0.3;

      // Slow drift + offset from dragging
      groupRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.1 + cloudId * 2) * 0.5 + offset * 0.01;

      // Scale animation on hover
      const targetScale = isHovered ? 1.2 : 1;
      // Only lerp scale if NOT clicking (let GSAP handle click animation)
      if (!isClicked) {
        groupRef.current.scale.setScalar(
          THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1)
        );
      }
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation?.();
    setIsClicked(true);
    onClick?.(cloudId);

    // Smooth elastic bounce animation using GSAP
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: 0.8,
        y: 0.8,
        z: 0.8,
        duration: 0.1,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(groupRef.current!.scale, {
            x: 1.2,
            y: 1.2,
            z: 1.2,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)',
          });
        }
      });
    }

    // Reset click state after animation
    setTimeout(() => setIsClicked(false), 3000);
  };

  const handlePointerOver = (e: any) => {
    e.stopPropagation?.();
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation?.();
    setIsHovered(false);
    document.body.style.cursor = 'grab';
  };

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Cloud with hover effect */}
      <Cloud
        opacity={isHovered ? baseOpacity + 0.2 : baseOpacity}
        speed={baseSpeed}
        segments={20}
        color={isHovered ? '#fef3c7' : '#ffffff'}
      />

      {/* Glow ring when hovered */}
      {isHovered && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <ringGeometry args={[1.5, 2, 32]} />
          <meshBasicMaterial
            color="#fcd34d"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Star Rain Particle System */}
      {isClicked && (
        <StarRain />
      )}
    </group>
  );
};

// Star Rain particle effect
const StarRain = () => {
  const ref = useRef<THREE.Points>(null);

  // Create more particles for the rain
  const particleCount = 60;

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Start near the center/bottom of the cloud
      pos[i * 3] = (Math.random() - 0.5) * 3;     // Spread X
      pos[i * 3 + 1] = (Math.random() * 1) - 1;   // Start Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2; // Spread Z

      // Random fall speed
      spd[i] = Math.random() * 0.1 + 0.05;
    }
    return [pos, spd];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      const posAttribute = ref.current.geometry.attributes.position;
      const positionsArray = posAttribute.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        // Apply gravity/falling to Y
        positionsArray[i * 3 + 1] -= speeds[i] * (delta * 60); // Speed scale

        // Reset if too low (looping rain for the duration)
        if (positionsArray[i * 3 + 1] < -5) {
          positionsArray[i * 3 + 1] = 0;
        }
      }
      posAttribute.needsUpdate = true;

      // Rotate entire system slightly
      ref.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#fbbf24" // Golden/Star color
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};
