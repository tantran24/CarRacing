import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ParisBis } from "../models/Paris-bis";
import { Car } from "../models/Car";
import Loader from "../components/Loader";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { useHelper } from "@react-three/drei/native";
import { Physics, usePlane } from "@react-three/cannon";

import * as THREE from "three";
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
import { Scene } from "../components/Scene";

const GamePlay = () => {
    return (
        <section className="w-full h-screen relative">
            <Canvas className="bg-transparent w-full h-screen">
                <ambientLight />
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

                <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
                    <Scene />
                </Physics>
            </Canvas>
        </section>
    );
};

export default GamePlay;
