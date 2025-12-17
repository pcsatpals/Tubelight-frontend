import { useGLTF } from '@react-three/drei'

export default function Model() {
    const { scene } = useGLTF('/models/scene.gltf')
    return <primitive object={scene} />
}

// useGLTF.preload('/models/scene.gltf')