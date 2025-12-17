'use client'

import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { AnimationMixer, Object3D } from 'three'
import * as THREE from 'three'

export function GlobeModel() {
  const { scene } = useGLTF('/globe-pack.glb', true)

  // const mixer = useRef<AnimationMixer | null>(null)

  // // Play only one (e.g. rotation) clip instead of all
  // useEffect(() => {
  //   if (!animations.length) return
  //   return () => {
  //     mixer.current?.stopAllAction()
  //     mixer.current = null
  //   }
  // }, [animations, scene])

  // // Advance animation every frame
  // useFrame((_, delta) => {
  //   if (mixer.current) mixer.current.update(delta * 0.5) // 0.5 = slower, smoother
  // })

  // // ONE‑TIME glow tweak; if this is too strong, remove or narrow by name
  // useEffect(() => {
  //   scene.traverse((child: Object3D) => {
  //     if (child instanceof THREE.Mesh) {
  //       const mat = child.material as THREE.Material | THREE.Material[]
  //       const apply = (m: any) => {
  //         m.transparent = true
  //         m.depthWrite = false
  //         m.blending = THREE.AdditiveBlending
  //       }
  //       if (Array.isArray(mat)) mat.forEach(apply)
  //       else if (mat) apply(mat)
  //     }
  //   })
  // }, [scene])

  return (
    <primitive
      scale={1}
      object={scene}
      position={[0, 0, 0]}
      dispose={null}
    />
  )
}

useGLTF.preload('/globe-pack.glb')
