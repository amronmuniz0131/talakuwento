import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AnimatedRingProps {
  position: [number, number, number];
  color: string;
  scale?: number;
}

export const AnimatedRing = ({ position, color, scale = 1 }: AnimatedRingProps) => {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 1.0;
      ring1Ref.current.rotation.y = time * 0.6;
      const pulse = 1 + Math.sin(time * 2) * 0.1;
      ring1Ref.current.scale.setScalar(pulse);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = time * -0.8;
      ring2Ref.current.rotation.z = time * 1.2;
      const pulse = 1 + Math.sin(time * 2.5 + 1) * 0.1;
      ring2Ref.current.scale.setScalar(pulse);
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = time * 1.4;
      ring3Ref.current.rotation.z = time * -0.4;
      const pulse = 1 + Math.sin(time * 3 + 2) * 0.1;
      ring3Ref.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1, 0.02, 8, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[0.8, 0.02, 8, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.5}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[0.6, 0.02, 8, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.4}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
};
