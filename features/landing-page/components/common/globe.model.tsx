"use client"

import { useRef } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

function EarthGlobe() {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  const earthTexture = useLoader(THREE.TextureLoader, "/texture_earth-1.jpg")


  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.8}
          metalness={0.2}
          emissive="#112244"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  )
}


export function ParticleGlobe() {
  console.log("[v0] ParticleGlobe component rendering")

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        className="bg-black"
        onCreated={() => console.log("[v0] Canvas created successfully")}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[100, 100, 100]} intensity={3} />
        <pointLight position={[-5, -3, -5]} intensity={0.4} color="#4a90e2" />


        {/* Earth with particles */}
        <EarthGlobe />

        {/* Interactive controls */}
        <OrbitControls enableZoom={false} enablePan={false} minDistance={3.5} maxDistance={10} autoRotate={false} />
      </Canvas>
    </div>
  )
}
