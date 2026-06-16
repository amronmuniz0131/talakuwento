import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CloudsBackground = () => {
  const cloudsRef = useRef<THREE.Group>(null);

  // Generate random cloud positions
  const clouds = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 40,
        Math.random() * 8 - 4,
        (Math.random() - 0.5) * 40 - 10,
      ] as [number, number, number],
      scale: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.02 + 0.01,
      opacity: Math.random() * 0.3 + 0.2,
    }));
  }, []);

  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.children.forEach((cloud, i) => {
        // Slow drift animation
        cloud.position.x += clouds[i].speed * 0.1;
        if (cloud.position.x > 25) {
          cloud.position.x = -25;
        }
        // Gentle vertical bobbing
        cloud.position.y = clouds[i].position[1] + 
          Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.2;
      });
    }
  });

  return (
    <group ref={cloudsRef}>
      {clouds.map((cloud, i) => (
        <Cloud key={i} {...cloud} />
      ))}
    </group>
  );
};

interface CloudProps {
  position: [number, number, number];
  scale: number;
  opacity: number;
}

const Cloud = ({ position, scale, opacity }: CloudProps) => {
  return (
    <group position={position} scale={scale}>
      {/* Main cloud body - cluster of spheres */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={opacity}
          roughness={1}
        />
      </mesh>
      <mesh position={[-0.8, -0.2, 0]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={opacity * 0.9}
          roughness={1}
        />
      </mesh>
      <mesh position={[0.7, -0.1, 0.2]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={opacity * 0.95}
          roughness={1}
        />
      </mesh>
      <mesh position={[0.3, 0.4, -0.2]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={opacity * 0.85}
          roughness={1}
        />
      </mesh>
    </group>
  );
};
