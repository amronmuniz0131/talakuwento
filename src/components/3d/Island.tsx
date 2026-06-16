import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface IslandProps {
  position: [number, number, number];
  scale?: number;
  color?: string;
  floatSpeed?: number;
  floatAmount?: number;
}

export const Island = ({ 
  position, 
  scale = 1, 
  color = '#8b9a6b',
  floatSpeed = 1,
  floatAmount = 0.15
}: IslandProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const initialY = position[1];
  
  // Random offset for each island so they don't all float in sync
  const phaseOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = 
        initialY + Math.sin(state.clock.elapsedTime * floatSpeed + phaseOffset) * floatAmount;
    }
  });

  // Create a softer, more organic island shape
  const islandGeometry = useMemo(() => {
    const geo = new THREE.ConeGeometry(1.5, 0.8, 8, 1);
    geo.rotateX(Math.PI);
    return geo;
  }, []);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Main island top - grassy surface */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.4, 1.5, 0.3, 16]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Island bottom - rocky underside */}
      <mesh position={[0, -0.25, 0]} castShadow>
        <primitive object={islandGeometry} />
        <meshStandardMaterial 
          color="#8b7355" 
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Small decorative elements */}
      <mesh position={[-0.8, 0.4, 0.3]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#90a955" roughness={0.7} />
      </mesh>
      <mesh position={[0.6, 0.35, -0.5]} castShadow>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#a8c66c" roughness={0.7} />
      </mesh>
      <mesh position={[0.2, 0.38, 0.7]} castShadow>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#b5d165" roughness={0.7} />
      </mesh>
    </group>
  );
};
