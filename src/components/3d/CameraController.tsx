import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface CameraControllerProps {
  targetPosition: [number, number, number] | null;
  defaultPosition: [number, number, number];
  onAnimationComplete?: () => void;
}

export const CameraController = ({ 
  targetPosition, 
  defaultPosition,
  onAnimationComplete 
}: CameraControllerProps) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const isAnimating = useRef(false);
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (targetPosition && !isAnimating.current) {
      isAnimating.current = true;
      
      // Calculate look-at target (the story node position, slightly lower)
      const storyPosition = new THREE.Vector3(
        targetPosition[0],
        targetPosition[1] - 2,
        targetPosition[2] - 8
      );

      // Disable controls during animation
      if (controlsRef.current) {
        controlsRef.current.enabled = false;
      }

      // Animate camera position
      gsap.to(camera.position, {
        x: targetPosition[0],
        y: targetPosition[1],
        z: targetPosition[2],
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          camera.lookAt(storyPosition);
          if (controlsRef.current) {
            controlsRef.current.target.copy(storyPosition);
          }
        },
        onComplete: () => {
          isAnimating.current = false;
          if (controlsRef.current) {
            controlsRef.current.enabled = true;
            controlsRef.current.target.copy(storyPosition);
          }
          onAnimationComplete?.();
        },
      });
    }
  }, [targetPosition, camera, onAnimationComplete]);

  // Reset to default position when targetPosition is null
  useEffect(() => {
    if (targetPosition === null && !isAnimating.current) {
      isAnimating.current = true;
      
      if (controlsRef.current) {
        controlsRef.current.enabled = false;
      }

      const defaultLookAt = new THREE.Vector3(0, 0, 0);

      gsap.to(camera.position, {
        x: defaultPosition[0],
        y: defaultPosition[1],
        z: defaultPosition[2],
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          const progress = gsap.getProperty(camera.position, 'progress') as number || 0;
          lookAtTarget.current.lerpVectors(
            controlsRef.current?.target || new THREE.Vector3(),
            defaultLookAt,
            0.05
          );
          camera.lookAt(lookAtTarget.current);
          if (controlsRef.current) {
            controlsRef.current.target.lerp(defaultLookAt, 0.05);
          }
        },
        onComplete: () => {
          isAnimating.current = false;
          if (controlsRef.current) {
            controlsRef.current.enabled = true;
            controlsRef.current.target.set(0, 0, 0);
          }
          camera.lookAt(defaultLookAt);
        },
      });
    }
  }, [targetPosition, camera, defaultPosition]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={false}
      enableZoom={true}
      enableRotate={true}
      minDistance={8}
      maxDistance={35}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.2}
      rotateSpeed={0.5}
      zoomSpeed={0.8}
      target={[0, 0, 0]}
    />
  );
};
