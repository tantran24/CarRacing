import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from '@react-three/fiber'
import { ParisBis } from '../models/Paris-bis'
import Loader from '../components/Loader'
import { Physics } from '@react-three/rapier'
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


}

export default Home
