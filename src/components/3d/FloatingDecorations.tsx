import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FloatingDecorations = () => {
  return (
    <group>
      {/* Floating crosses */}
      <FloatingCross position={[-12, 5, -8]} color="#fcd34d" />
      <FloatingCross position={[12, 6, -10]} color="#c084fc" />

      {/* Floating stars */}
      <FloatingStar position={[-6, 7, -5]} scale={0.5} />
      <FloatingStar position={[8, 4, -6]} scale={0.4} />
      <FloatingStar position={[0, 8, -8]} scale={0.6} />

      {/* Rainbow arc */}
      <RainbowArc position={[15, 3, -15]} />

      {/* Floating hearts */}
      <FloatingHeart position={[-10, 3, 5]} />
      <FloatingHeart position={[10, 5, 3]} />

      {/* Orbiting doves */}
      <OrbitingDoves />
    </group>
  );
};

const FloatingCross = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Vertical bar */}
      <mesh>
        <boxGeometry args={[0.15, 0.8, 0.15]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      {/* Horizontal bar */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
};

const FloatingStar = ({ position, scale }: { position: [number, number, number]; scale: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.5;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2 + position[0]) * 0.2;

      // Pulse scale
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      ref.current.scale.setScalar(scale * pulse);
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial
        color="#fef3c7"
        emissive="#fcd34d"
        emissiveIntensity={0.5}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
};

const RainbowArc = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Group>(null);
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={ref} position={position} rotation={[0, 0.5, 0]} scale={0.8}>
      {colors.map((color, i) => (
        <mesh key={i} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[1.5 + i * 0.12, 0.05, 8, 32, Math.PI]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.7}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

const FloatingHeart = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.5;

      // Heartbeat effect
      const beat = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.05;
      ref.current.scale.setScalar(0.3 * beat);
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh position={[-0.25, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#f472b6" emissive="#ec4899" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.25, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#f472b6" emissive="#ec4899" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, -0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.7, 0.7, 0.5]} />
        <meshStandardMaterial color="#f472b6" emissive="#ec4899" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
};

const OrbitingDoves = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, 6, 0]}>
      {[0, 1, 2].map((i) => (
        <Dove key={i} angle={(i / 3) * Math.PI * 2} />
      ))}
    </group>
  );
};

const Dove = ({ angle }: { angle: number }) => {
  const ref = useRef<THREE.Group>(null);
  const radius = 8;

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime;
      ref.current.position.x = Math.cos(angle + time * 0.5) * radius;
      ref.current.position.z = Math.sin(angle + time * 0.5) * radius;
      ref.current.position.y = Math.sin(time * 2 + angle) * 0.5;
      ref.current.rotation.y = -angle - time * 0.5 + Math.PI / 2;

      // Wing flap - increased speed
      const wingAngle = Math.sin(time * 12) * 0.4;
      ref.current.children[1].rotation.z = wingAngle;
      ref.current.children[2].rotation.z = -wingAngle;
    }
  });

  return (
    <group ref={ref} scale={0.15}>
      {/* Body */}
      <mesh>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      {/* Left wing */}
      <mesh position={[-0.8, 0.2, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
      {/* Right wing */}
      <mesh position={[0.8, 0.2, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.3, 0.7]}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
    </group>
  );
};
