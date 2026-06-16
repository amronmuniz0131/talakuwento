import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Story } from '@/data/stories';

interface PathConnectorProps {
  stories: Story[];
}

export const PathConnector = ({ stories }: PathConnectorProps) => {
  const particlesRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Create a curved path through all story nodes
  const { curve, points } = useMemo(() => {
    const pathPoints = stories.map(s => new THREE.Vector3(...s.position));
    const curveObj = new THREE.CatmullRomCurve3(pathPoints, false, 'catmullrom', 0.5);
    const pts = curveObj.getPoints(100);
    return { curve: curveObj, points: pts };
  }, [stories]);

  // Create particles along the path
  const particleGeometry = useMemo(() => {
    const particleCount = 50;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const point = curve.getPoint(t);
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y + 0.1;
      positions[i * 3 + 2] = point.z;
      sizes[i] = Math.random() * 0.1 + 0.05;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geometry;
  }, [curve]);

  // Animate particles flowing along the path
  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < 50; i++) {
        const t = ((i / 50) + time * 0.05) % 1;
        const point = curve.getPoint(t);
        positions[i * 3] = point.x;
        positions[i * 3 + 1] = point.y + 0.15 + Math.sin(time * 2 + i) * 0.05;
        positions[i * 3 + 2] = point.z;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Glowing path tube */}
      {/* Glowing path tube with flow shader */}
      <mesh>
        <tubeGeometry args={[curve, 64, 0.15, 8, false]} />
        <shaderMaterial
          ref={materialRef}
          transparent
          uniforms={{
            uTime: { value: 0 },
            uColor: { value: new THREE.Color('#fcd34d') },
            uFlowColor: { value: new THREE.Color('#ffffff') },
          }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float uTime;
            uniform vec3 uColor;
            uniform vec3 uFlowColor;
            varying vec2 vUv;
            void main() {
              float flow = sin(vUv.x * 20.0 - uTime * 3.0);
              float glow = smoothstep(0.0, 1.0, flow);
              vec3 finalColor = mix(uColor, uFlowColor, glow * 0.5);
              float alpha = 0.3 + glow * 0.5; // Pulse transparency
              gl_FragColor = vec4(finalColor, alpha);
            }
          `}
        />
      </mesh>

      {/* Flowing particles */}
      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial
          color="#fef3c7"
          size={0.1}
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </group>
  );
};
