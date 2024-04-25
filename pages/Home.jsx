import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from '@react-three/fiber'
import { ParisBis } from '../models/Paris-bis'
import Loader from '../components/Loader'
import { Physics } from '@react-three/rapier'
import {  Island } from "../models/Island";
import { PerspectiveCamera} from '@react-three/drei'
import { useHelper } from '@react-three/drei/native';

import * as THREE from 'three'
import {
  EffectComposer,
  N8AO,
  Bloom,
  TiltShift2,
  HueSaturation,
  SMAA,
  ChromaticAberration,
  Vignette,
  LUT,
} from "@react-three/postprocessing";
const MyCamera = () => {
  const camera = useRef()
  useHelper(camera, THREE.CameraHelper)

  return (
    <PerspectiveCamera ref={camera} near={1} far={4} position={[0, 5, 0]} />
  )
}

const Home = () => {

  const adjustMapForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -60.5, -43];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screen = [1, 1, 1];
    }
    return [screenScale, screenPosition];
  }

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition];
  };
  const [islandScale, islandPosition] = adjustIslandForScreenSize();
  const [mapScale, mapPosition] = adjustMapForScreenSize();

  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  return (
    <section className='w-full h-screen relative'>

      <Canvas 
      className='bg-transparent w-full h-screen'
              camera={{near: 0.01, far: 100,position: [10, 0, 5]}}>
       

      </Canvas>

    </section>
  )
}

export default Home
