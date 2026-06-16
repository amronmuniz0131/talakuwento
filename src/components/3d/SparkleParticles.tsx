import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const SparkleParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 300;

  const { positions, colors, sizes, speeds } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    const colorOptions = [
      new THREE.Color('#fcd34d'), // gold
      new THREE.Color('#c084fc'), // purple
      new THREE.Color('#7dd3fc'), // blue
      new THREE.Color('#86efac'), // green
      new THREE.Color('#fda4af'), // pink
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = Math.random() * 15 - 3;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 0.15 + 0.05;
      speeds[i] = Math.random() * 0.5 + 0.2;
    }

    return { positions, colors, sizes, speeds };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < particleCount; i++) {
        // Gentle floating motion
        positions[i * 3 + 1] += Math.sin(time * speeds[i] + i) * 0.002;

        // Slight horizontal drift
        positions[i * 3] += Math.sin(time * 0.3 + i * 0.5) * 0.001;
        positions[i * 3 + 2] += Math.cos(time * 0.2 + i * 0.3) * 0.001;

        // Reset if too high or too low
        if (positions[i * 3 + 1] > 12) positions[i * 3 + 1] = -3;
        if (positions[i * 3 + 1] < -5) positions[i * 3 + 1] = 10;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;

      // Rotate the entire particle system slowly
      particlesRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
