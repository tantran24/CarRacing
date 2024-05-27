import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from '@react-three/fiber'
import { ParisBis } from '../models/Paris-bis'
import {Car} from '../models/Car'
import Loader from '../components/Loader'
//import { Physics } from '@react-three/rapier'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { useHelper } from '@react-three/drei/native';
import { Physics, usePlane } from "@react-three/cannon";

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
    <>
      <PerspectiveCamera ref={camera} near={1} far={4} position={[0, 5, 0]} />
      <OrbitControls camera={camera.current} />
    </>    
  )
}

const GamePlay = () => {

  

  return (
    <section className='w-full h-screen relative'>

      <Canvas 
      className='bg-transparent w-full h-screen'>
      
        <Suspense fallback={<Loader/>}>
        

            <ambientLight/>
            <directionalLight
            position={[10, 50, -30]}
            intensity={1}
            shadow-bias={-0.0001}
            shadow-mapSize={[4096, 4096]}
            shadow-camera-left={-300}
            shadow-camera-right={300}
            shadow-camera-top={300}
            shadow-camera-bottom={-300}
            castShadow
          />
            <ParisBis position={[0, 0, 0]} />
          <Physics broadphase="SAP" contactEquationRelaxation={4} friction={1e-3} allowSleep>
            <Plane position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]} userData={{ id: 'floor' }} />
            <Car speed={0.01} angularVelocity={[0, 0.5, 0]} modelPath='../src/assets/3D/vino/scene.gltf' />
          </Physics>


        </Suspense>

      </Canvas>

    </section>
  )
}

export default GamePlay

function Plane(props) {
  const [ref] = usePlane(() => ({ type: 'Static', material: 'ground', ...props }))
  return null
}