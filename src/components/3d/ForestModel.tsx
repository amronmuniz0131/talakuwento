import { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ForestModelProps {
  position?: [number, number, number];
  scale?: number;
}

// Interactive mesh component with click animation
function InteractiveMesh({ geometry, material, onClick }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationStart = useRef(0);

  useFrame((state) => {
    if (meshRef.current && isAnimating) {
      const elapsed = state.clock.elapsedTime - animationStart.current;
      const progress = Math.min(elapsed / 0.5, 1); // 0.5 second animation

      if (progress < 1) {
        // Bounce and pulse animation
        const bounce = Math.sin(progress * Math.PI * 4) * (1 - progress) * 0.3;
        const pulse = 1 + Math.sin(progress * Math.PI * 2) * 0.2;
        meshRef.current.scale.set(pulse, pulse, pulse);
        meshRef.current.position.y = bounce;
      } else {
        // Reset
        meshRef.current.scale.set(1, 1, 1);
        meshRef.current.position.y = 0;
        setIsAnimating(false);
      }
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    setIsAnimating(true);
    animationStart.current = performance.now() / 1000;
    if (onClick) onClick(e);
  };

  return (
    <mesh
      ref={meshRef}
      castShadow
      receiveShadow
      geometry={geometry}
      material={material}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    />
  );
}

export function ForestModel({ position = [0, -2, 0], scale = 0.003 }: ForestModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('/hand_painted_forest.glb') as any;

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      // Slow rotation
      groupRef.current.rotation.y += 0.001;
    }
  });

  const handleElementClick = (elementName: string) => {
    console.log(`Clicked on: ${elementName}`);
  };

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group scale={0.01}>
          <group position={[0, 0, 2257.051]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0?.geometry} material={materials.TextureMaterial} onClick={() => handleElementClick('Element 1')} />
            <InteractiveMesh geometry={nodes.BackSide_0?.geometry} material={materials.TextureMaterial} onClick={() => handleElementClick('Element 1 Back')} />
          </group>
          <group position={[0, 0, 2368.794]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_1?.geometry} material={materials.TextureMaterial_0} onClick={() => handleElementClick('Element 2')} />
            <InteractiveMesh geometry={nodes.BackSide_0_1?.geometry} material={materials.TextureMaterial_0} onClick={() => handleElementClick('Element 2 Back')} />
          </group>
          <group position={[0, 0, 2368.794]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_2?.geometry} material={materials.TextureMaterial_1} onClick={() => handleElementClick('Element 3')} />
            <InteractiveMesh geometry={nodes.BackSide_0_2?.geometry} material={materials.TextureMaterial_1} onClick={() => handleElementClick('Element 3 Back')} />
          </group>
          <group position={[0, 0, 2368.794]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_3?.geometry} material={materials.TextureMaterial_2} onClick={() => handleElementClick('Element 4')} />
            <InteractiveMesh geometry={nodes.BackSide_0_3?.geometry} material={materials.TextureMaterial_2} onClick={() => handleElementClick('Element 4 Back')} />
          </group>
          <group position={[0, 0, 2368.794]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_4?.geometry} material={materials.TextureMaterial_3} onClick={() => handleElementClick('Element 5')} />
            <InteractiveMesh geometry={nodes.BackSide_0_4?.geometry} material={materials.TextureMaterial_3} onClick={() => handleElementClick('Element 5 Back')} />
          </group>
          <group position={[12.354, 3.174, 2368.794]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_5?.geometry} material={materials.TextureMaterial_4} onClick={() => handleElementClick('Element 6')} />
            <InteractiveMesh geometry={nodes.BackSide_0_5?.geometry} material={materials.TextureMaterial_4} onClick={() => handleElementClick('Element 6 Back')} />
          </group>
          <group position={[0, 0, 2368.794]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_6?.geometry} material={materials.TextureMaterial_5} onClick={() => handleElementClick('Element 7')} />
            <InteractiveMesh geometry={nodes.BackSide_0_6?.geometry} material={materials.TextureMaterial_5} onClick={() => handleElementClick('Element 7 Back')} />
          </group>
          <group position={[0, 0, 2368.794]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_7?.geometry} material={materials.TextureMaterial_6} onClick={() => handleElementClick('Element 8')} />
            <InteractiveMesh geometry={nodes.BackSide_0_7?.geometry} material={materials.TextureMaterial_6} onClick={() => handleElementClick('Element 8 Back')} />
          </group>
          <group position={[0, 0, 2368.794]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_8?.geometry} material={materials.TextureMaterial_7} onClick={() => handleElementClick('Element 9')} />
            <InteractiveMesh geometry={nodes.BackSide_0_8?.geometry} material={materials.TextureMaterial_7} onClick={() => handleElementClick('Element 9 Back')} />
          </group>
          <group position={[0, 0, 2368.794]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_9?.geometry} material={materials.TextureMaterial_8} onClick={() => handleElementClick('Element 10')} />
            <InteractiveMesh geometry={nodes.BackSide_0_9?.geometry} material={materials.TextureMaterial_8} onClick={() => handleElementClick('Element 10 Back')} />
          </group>
          <group position={[0, 0, 2368.794]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_10?.geometry} material={materials.TextureMaterial_9} onClick={() => handleElementClick('Element 11')} />
            <InteractiveMesh geometry={nodes.BackSide_0_10?.geometry} material={materials.TextureMaterial_9} onClick={() => handleElementClick('Element 11 Back')} />
          </group>
          <group position={[-1216.217, 374.635, 2522.136]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_11?.geometry} material={materials.TextureMaterial_10} onClick={() => handleElementClick('Element 12')} />
            <InteractiveMesh geometry={nodes.FrontSide_1?.geometry} material={materials.TextureMaterial_1_12} onClick={() => handleElementClick('Element 13')} />
            <InteractiveMesh geometry={nodes.FrontSide_2?.geometry} material={materials.TextureMaterial_2_13} onClick={() => handleElementClick('Element 14')} />
            <InteractiveMesh geometry={nodes.FrontSide_3?.geometry} material={materials.TextureMaterial_3_14} onClick={() => handleElementClick('Element 15')} />
            <InteractiveMesh geometry={nodes.BackSide_0_11?.geometry} material={materials.TextureMaterial_10} onClick={() => handleElementClick('Element 12 Back')} />
            <InteractiveMesh geometry={nodes.BackSide_1?.geometry} material={materials.TextureMaterial_1_12} onClick={() => handleElementClick('Element 13 Back')} />
            <InteractiveMesh geometry={nodes.BackSide_2?.geometry} material={materials.TextureMaterial_2_13} onClick={() => handleElementClick('Element 14 Back')} />
            <InteractiveMesh geometry={nodes.BackSide_3?.geometry} material={materials.TextureMaterial_3_14} onClick={() => handleElementClick('Element 15 Back')} />
          </group>
          <group position={[0, 0, 2368.794]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_12?.geometry} material={materials.TextureMaterial_11} onClick={() => handleElementClick('Element 16')} />
            <InteractiveMesh geometry={nodes.BackSide_0_12?.geometry} material={materials.TextureMaterial_11} onClick={() => handleElementClick('Element 16 Back')} />
          </group>
          <group position={[0, 0, 2368.794]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_13?.geometry} material={materials.TextureMaterial_12} onClick={() => handleElementClick('Element 17')} />
            <InteractiveMesh geometry={nodes.BackSide_0_13?.geometry} material={materials.TextureMaterial_12} onClick={() => handleElementClick('Element 17 Back')} />
          </group>
          <group position={[0, 0, 2368.794]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_14?.geometry} material={materials.TextureMaterial_13} onClick={() => handleElementClick('Element 18')} />
            <InteractiveMesh geometry={nodes.BackSide_0_14?.geometry} material={materials.TextureMaterial_13} onClick={() => handleElementClick('Element 18 Back')} />
          </group>
          <group position={[0, 0, 2368.794]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_15?.geometry} material={materials.TextureMaterial_14} onClick={() => handleElementClick('Element 19')} />
            <InteractiveMesh geometry={nodes.BackSide_0_15?.geometry} material={materials.TextureMaterial_14} onClick={() => handleElementClick('Element 19 Back')} />
          </group>
          <group position={[-836.816, 587.012, 2541.359]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_16?.geometry} material={materials.TextureMaterial_15} onClick={() => handleElementClick('Element 20')} />
            <InteractiveMesh geometry={nodes.BackSide_0_16?.geometry} material={materials.TextureMaterial_15} onClick={() => handleElementClick('Element 20 Back')} />
          </group>
          <group position={[-897.196, 616.226, 2630.615]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_17?.geometry} material={materials.TextureMaterial_16} onClick={() => handleElementClick('Element 21')} />
            <InteractiveMesh geometry={nodes.BackSide_0_17?.geometry} material={materials.TextureMaterial_16} onClick={() => handleElementClick('Element 21 Back')} />
          </group>
          <group position={[62.796, 2164.424, 2969.496]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_18?.geometry} material={materials.TextureMaterial_17} onClick={() => handleElementClick('Element 22')} />
            <InteractiveMesh geometry={nodes.BackSide_0_18?.geometry} material={materials.TextureMaterial_17} onClick={() => handleElementClick('Element 22 Back')} />
          </group>
          <group position={[586.368, 195.882, 3672.447]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_19?.geometry} material={materials.TextureMaterial_18} onClick={() => handleElementClick('Element 23')} />
            <InteractiveMesh geometry={nodes.BackSide_0_19?.geometry} material={materials.TextureMaterial_18} onClick={() => handleElementClick('Element 23 Back')} />
          </group>
          <group position={[881.997, 186.125, 3777.281]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_20?.geometry} material={materials.TextureMaterial_19} onClick={() => handleElementClick('Element 24')} />
            <InteractiveMesh geometry={nodes.BackSide_0_20?.geometry} material={materials.TextureMaterial_19} onClick={() => handleElementClick('Element 24 Back')} />
          </group>
          <group position={[625.928, -1008.44, 2482.921]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_21?.geometry} material={materials.TextureMaterial_20} onClick={() => handleElementClick('Element 25')} />
            <InteractiveMesh geometry={nodes.BackSide_0_21?.geometry} material={materials.TextureMaterial_20} onClick={() => handleElementClick('Element 25 Back')} />
          </group>
          <group position={[0, 0, 2368.794]} scale={39.37}>
            <InteractiveMesh geometry={nodes.FrontSide_0_22?.geometry} material={materials.TextureMaterial_21} onClick={() => handleElementClick('Element 26')} />
            <InteractiveMesh geometry={nodes.BackSide_0_22?.geometry} material={materials.TextureMaterial_21} onClick={() => handleElementClick('Element 26 Back')} />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/hand_painted_forest.glb');
