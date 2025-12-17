'use client'

import { useGLTF } from '@react-three/drei'

export function GlobeModel() {
  const { scene } = useGLTF('/globe-pack-2.glb', true)

  return (
    <primitive
      object={scene}
      position={[0, 0, 0]}
      dispose={null}
    />
  )
}

useGLTF.preload('/globe-pack.glb')
