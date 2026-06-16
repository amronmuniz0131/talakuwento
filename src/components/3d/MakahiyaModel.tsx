import React, { useMemo } from 'react'
import { useGLTF, Center } from '@react-three/drei'

export function MakahiyaModel(props: any) {
  const { scene } = useGLTF('/makahiya.glb') as any
  
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    return clone
  }, [scene])

  return (
    <Center {...props}>
      <primitive object={clonedScene} />
    </Center>
  )
}

useGLTF.preload('/makahiya.glb')
