import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ParisBis } from "../models/Paris-bis";
import { Car } from "../models/Car";
import Loader from "../components/Loader";
import { PerspectiveCamera, OrbitControls} from "@react-three/drei";
import { useHelper } from "@react-three/drei/native";
import { Physics, usePlane } from "@react-three/cannon";
import { Sun } from "../components/Sun";
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
            <Canvas className="bg-transparent w-full h-screen" shadows>
                <ambientLight intensity={0.5} />
                {/* Sun and Directional Light */}
                <Sun />
                <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
                    <Scene />
                </Physics>
            </Canvas>
        </section>
    );
};

export default GamePlay;
