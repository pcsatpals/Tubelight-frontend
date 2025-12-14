"use client";

import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function GlobeModel() {
  const { scene, animations } = useGLTF("/globe.glb");
  const mixer = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (!animations.length) return;

    mixer.current = new THREE.AnimationMixer(scene);
    mixer.current.clipAction(animations[0]).play();

    return () => {
      mixer.current?.stopAllAction();
      mixer.current = null;
    };
  }, [animations, scene]);

  // useFrame((_, delta) => {
  //   mixer.current?.update(delta);
  // });

  return <primitive
    object={scene}
    scale={2.5}
    position={[0, 0, 0]}
  />;
}

useGLTF.preload("/globe.glb");